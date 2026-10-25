import { readFile, writeFile, mkdir } from 'node:fs/promises';
import { renderArtwork } from '../src/shared/render.js';
import { studioDefaults } from '../src/shared/studio-defaults.js';

const artwork = process.argv[2]
  ? JSON.parse(await readFile(process.argv[2], 'utf8'))
  : { seed: 'ab'.repeat(32), blockHeight: 2814440,
      rendererVersion: 'blockheight-4', params: studioDefaults };
const svg = renderArtwork(artwork);
await mkdir('examples', { recursive: true });
await writeFile('examples/example.svg', svg);
await writeFile('examples/example.json', JSON.stringify(artwork, null, 2) + '\n');
console.log('Wrote examples/example.svg and examples/example.json');
