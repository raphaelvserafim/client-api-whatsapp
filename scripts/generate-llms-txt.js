#!/usr/bin/env node

/**
 * Generates llms.txt — a machine-readable reference of every public method,
 * type, and service exposed by @raphaelvserafim/client-api-whatsapp.
 *
 * Usage:  node scripts/generate-llms-txt.js
 */

const fs = require('fs');
const path = require('path');

const ROOT = path.resolve(__dirname, '..');
const SRC = path.join(ROOT, 'src');

// ---------------------------------------------------------------------------
// 1. Read package.json
// ---------------------------------------------------------------------------
const pkg = JSON.parse(fs.readFileSync(path.join(ROOT, 'package.json'), 'utf-8'));

// ---------------------------------------------------------------------------
// 2. Read service map from Wame.ts  (readonly <prop>: <ServiceClass>)
// ---------------------------------------------------------------------------
const whatsappSrc = fs.readFileSync(path.join(SRC, 'Wame.ts'), 'utf-8');

// Match lines like:  readonly instance: InstanceService;
const serviceMapRegex = /readonly\s+(\w+)\s*:\s*(\w+Service)\s*;/g;
const serviceMap = []; // { prop, className }
let m;
while ((m = serviceMapRegex.exec(whatsappSrc)) !== null) {
  serviceMap.push({ prop: m[1], className: m[2] });
}

// ---------------------------------------------------------------------------
// 3. Parse every service file to extract public async methods
// ---------------------------------------------------------------------------

/**
 * Extract the return type from the source starting just after the closing `)` of
 * the parameter list. Handles inline object types inside generics like
 * `Promise<{ status: number; data: Foo[] }>`.
 */
function extractReturnType(src, pos) {
  // Skip whitespace and the colon
  while (pos < src.length && /\s/.test(src[pos])) pos++;
  if (src[pos] === ':') pos++;
  while (pos < src.length && /\s/.test(src[pos])) pos++;

  // Now collect the return type, balancing <>, {}, ()
  let result = '';
  let angleDepth = 0;
  let braceDepth = 0;
  let parenDepth = 0;

  for (; pos < src.length; pos++) {
    const ch = src[pos];
    if (ch === '<') angleDepth++;
    else if (ch === '>') angleDepth--;
    else if (ch === '(') parenDepth++;
    else if (ch === ')') parenDepth--;

    if (ch === '{') {
      if (angleDepth > 0) {
        // Inside a generic — this brace is part of the type
        braceDepth++;
      } else {
        // This is the opening brace of the method body — stop
        break;
      }
    } else if (ch === '}') {
      braceDepth--;
    }

    result += ch;
  }

  return result.trim() || 'Promise<unknown>';
}

/**
 * Given the full text of a service file, return an array of method descriptors:
 *   { name, signature, returnType, params: [{ name, type, optional }] }
 *
 * The regex deliberately captures multi-line signatures (e.g. MessageService.send).
 */
function parseServiceMethods(src) {
  const methods = [];

  // Strategy: find each `async <name>(` then manually balance parentheses to
  // grab the full parameter list, even when it spans many lines.
  const asyncIdx = [];
  const asyncRe = /\basync\s+(\w+)\s*\(/g;
  let am;
  while ((am = asyncRe.exec(src)) !== null) {
    asyncIdx.push({ name: am[1], start: am.index, parenStart: am.index + am[0].length - 1 });
  }

  for (const entry of asyncIdx) {
    // Balance parens from parenStart
    let depth = 0;
    let i = entry.parenStart;
    for (; i < src.length; i++) {
      if (src[i] === '(') depth++;
      else if (src[i] === ')') { depth--; if (depth === 0) break; }
    }
    const paramStr = src.substring(entry.parenStart + 1, i).trim();

    // Now find return type — after `)` look for `: <ReturnType> {`
    // We need to handle inline object types inside generics, e.g. Promise<{ status: number }>
    // Strategy: skip past `: `, then balance <> and {} to find the method body `{`.
    const returnType = extractReturnType(src, i + 1);

    // Parse individual params from paramStr
    const params = parseParams(paramStr);

    const signatureParts = params.map(p => {
      const opt = p.optional ? '?' : '';
      return `${p.name}${opt}: ${p.type}`;
    });
    const signature = `${entry.name}(${signatureParts.join(', ')}): ${returnType}`;

    methods.push({ name: entry.name, signature, returnType, params });
  }

  return methods;
}

/**
 * Split a (potentially complex, multi-line) parameter string into individual
 * parameters, respecting nested braces / angle brackets / parens.
 */
function parseParams(raw) {
  if (!raw) return [];

  const params = [];
  let depth = 0; // tracks {, <, (, [
  let current = '';

  for (let i = 0; i < raw.length; i++) {
    const ch = raw[i];
    if (ch === '{' || ch === '<' || ch === '(' || ch === '[') depth++;
    if (ch === '}' || ch === '>' || ch === ')' || ch === ']') depth--;
    if (ch === ',' && depth === 0) {
      params.push(current.trim());
      current = '';
    } else {
      current += ch;
    }
  }
  if (current.trim()) params.push(current.trim());

  return params.map(p => {
    // Handle default values: e.g. `reply: boolean = false`
    const noDefault = p.replace(/\s*=\s*[^,]+$/, '');
    const hasDefault = noDefault !== p;

    const colonIdx = noDefault.indexOf(':');
    if (colonIdx === -1) return { name: noDefault, type: 'unknown', optional: false };

    let name = noDefault.substring(0, colonIdx).trim();
    const type = noDefault.substring(colonIdx + 1).trim();
    const optional = name.endsWith('?') || hasDefault;
    name = name.replace(/\?$/, '');
    return { name, type, optional };
  });
}

// ---------------------------------------------------------------------------
// 4. Generate example arguments based on type
// ---------------------------------------------------------------------------
// Exported string-literal unions (`export type Provider = 'whatsapp' | ...`),
// so a param typed `Provider` renders as "whatsapp" rather than an object.
const STRING_UNION_ALIASES = (() => {
  const src = fs.readFileSync(path.join(SRC, 'types', 'index.ts'), 'utf-8');
  const map = {};
  const re = /^export\s+type\s+(\w+)\s*=\s*((?:\s*\|?\s*'[^']*')+)\s*;/gm;
  let am;
  while ((am = re.exec(src)) !== null) {
    map[am[1]] = am[2].match(/'([^']*)'/)[1];
  }
  return map;
})();

function exampleValue(paramName, type) {
  const t = type.trim();

  // Named string-literal union (e.g. Provider) — pick first member
  if (STRING_UNION_ALIASES[t]) return `"${STRING_UNION_ALIASES[t]}"`;

  // String literal union — pick first
  if (/^['"]/.test(t) || /^\(?\s*['"]/.test(t)) {
    const first = t.match(/['"]([^'"]+)['"]/);
    return first ? `"${first[1]}"` : `"${paramName}"`;
  }

  // Simple primitives
  if (t === 'string') return `"${paramName}"`;
  if (t === 'number') return '0';
  if (t === 'boolean') return 'false';

  // Arrays
  if (/\[\]\s*$/.test(t) || /^Array</.test(t)) return '[]';

  // Inline object type (starts with {)
  if (t.startsWith('{')) return `{ /* ${paramName} */ }`;

  // Known interface / named type
  return `{ /* ${t} */ }`;
}

// ---------------------------------------------------------------------------
// 5. Read types/index.ts for all exported interfaces and enums
// ---------------------------------------------------------------------------
const typesSrc = fs.readFileSync(path.join(SRC, 'types', 'index.ts'), 'utf-8');

function extractTypeDefinitions(src) {
  const blocks = [];
  // `export type X = ...;` aliases first — they are referenced by the
  // interfaces below (e.g. Provider), so define them before use.
  // `DOC` matches an immediately-preceding jsdoc block. The inner alternation
  // is tempered so it cannot run past its own `*/` and swallow the
  // declarations in between.
  const DOC = String.raw`(?:\/\*\*(?:[^*]|\*(?!\/))*\*\/\n)?`;
  const aliasRe = new RegExp(`^${DOC}export\\s+type\\s+\\w+\\s*=[^;]*?;$`, 'gm');
  let am;
  while ((am = aliasRe.exec(src)) !== null) {
    blocks.push(am[0]);
  }
  // Match `export interface ...` and `export enum ...` blocks
  const blockRe = new RegExp(`^${DOC}export\\s+(interface|enum)\\s+(\\w+)[\\s\\S]*?^}`, 'gm');
  let bm;
  while ((bm = blockRe.exec(src)) !== null) {
    blocks.push(bm[0]);
  }
  return blocks;
}

const typeBlocks = extractTypeDefinitions(typesSrc);

// ---------------------------------------------------------------------------
// 6. Build service sections
// ---------------------------------------------------------------------------
const serviceFiles = fs.readdirSync(path.join(SRC, 'services'))
  .filter(f => f.endsWith('Service.ts'))
  .sort();

const serviceSections = [];
const serviceListLines = [];

for (const entry of serviceMap) {
  const filePath = path.join(SRC, 'services', `${entry.className}.ts`);
  if (!fs.existsSync(filePath)) continue;
  const src = fs.readFileSync(filePath, 'utf-8');
  const methods = parseServiceMethods(src);

  serviceListLines.push(`- wa.${entry.prop} → ${entry.className}`);

  let section = `## wa.${entry.prop}\n`;
  for (const m of methods) {
    section += `// ${m.signature}\n`;
    const args = m.params.map(p => exampleValue(p.name, p.type)).join(', ');
    section += `await wa.${entry.prop}.${m.name}(${args});\n\n`;
  }
  serviceSections.push(section.trimEnd());
}

// ---------------------------------------------------------------------------
// 7. Assemble the final llms.txt
// ---------------------------------------------------------------------------
const output = `# ${pkg.name}
> ${pkg.description}
Version: ${pkg.version}

## Installation
npm i ${pkg.name}

## Initialization
import { Wame, TypeMessage, StatusPresence } from '${pkg.name}';
const wa = new Wame({ server: "https://us.api-wa.me", key: "YOUR_KEY" });
// \`WhatsApp\` is exported as a deprecated alias of \`Wame\` (same behavior).

## Multi-channel (WhatsApp / Instagram / Messenger)
// \`provider\` selects the channel: "whatsapp" (default), "instagram", "messenger".
// Set it per call on the send body, or as a client default via new Wame({ ..., provider }).
await wa.message.send({ type: TypeMessage.TEXT, body: { to, text: "Hi", provider: "instagram" } });
// Supported on: text, template, button, audio, image, video, document sends.
// Webhook events expose provider, official, instance (your instance key — route by it,
// since instanceId is the IG/Page account id on Instagram/Messenger) and, for messages,
// fromUserId + profile + chatType. Instagram story replies carry context.story.url.

## Available Services
${serviceListLines.join('\n')}

${serviceSections.join('\n\n')}

## Type Definitions
\`\`\`typescript
${typeBlocks.join('\n\n')}
\`\`\`

## Custom HTTP Client
\`\`\`typescript
import { Wame, IHttpClient, RequestOptions } from '${pkg.name}';

class MyHttpClient implements IHttpClient {
  async request<T>(options: RequestOptions): Promise<T> {
    // your custom implementation (fetch, got, etc.)
  }
}

const wa = new Wame(
  { server: "https://us.api-wa.me", key: "YOUR_KEY" },
  new MyHttpClient()
);
\`\`\`

## Error Handling
\`\`\`typescript
import { WhatsAppError } from '${pkg.name}';

try {
  await wa.message.send(data);
} catch (err) {
  if (err instanceof WhatsAppError) {
    console.error(err.message);
  }
}
\`\`\`
`;

fs.writeFileSync(path.join(ROOT, 'llms.txt'), output, 'utf-8');
console.log('llms.txt generated successfully (%d bytes)', Buffer.byteLength(output));
