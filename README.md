# BlockHeight Artwork

BlockHeight Artwork is a small, dependency-free TypeScript package for making deterministic generative architectural SVGs. It contains the artwork engine and its tests, extracted from the BlockHeight project. The package does not connect to Chia or any other chain, and it does not mint or store NFTs.

The current example uses renderer `blockheight-4` and the same default options as the studio. Run it with Node.js 24:

```sh
npm test
npm run render
```

`npm run render` writes `examples/example.svg` and `examples/example.json`. The input file records the seed, block height, renderer version, and options used to create the SVG. The generated example is covered by the MIT license along with the code and documentation.

![Example architectural artwork](examples/example.svg)

New here? Follow the [step-by-step getting started guide](docs/getting-started.md) to open and customize your first image. Agents and developers should also read [AGENTS.md](AGENTS.md). No `npm install` or build is needed.

## Use the renderer

The current engine is exported as `renderSvg4` from `src/shared/art2.ts`. Pass a 64-character lowercase hexadecimal seed, a positive safe integer block height, the exact version string, and a complete parameter object:

```ts
import { renderSvg4 } from "./src/shared/art2.js";
import { studioDefaults } from "./src/shared/studio-defaults.js";
import type { Art2Params, Artwork4 } from "./src/shared/art2.js";

const artwork: Artwork4 = {
  seed: "0123456789abcdef".repeat(4),
  blockHeight: 2_814_440,
  rendererVersion: "blockheight-4",
  params: { ...studioDefaults } as Art2Params,
};

const svg = renderSvg4(artwork);
```

The package's `npm run render` command demonstrates the same call and writes the SVG and its input record. The renderer is a pure function: it needs no RPC client, credentials, database, wallet, or network access.

## Options

The studio defaults are defined in [`src/shared/studio-defaults.ts`](src/shared/studio-defaults.ts). `blockheight-4` accepts these options:

| Area | Option | Values |
| --- | --- | --- |
| Colour | `palette` | `futuradora`, `c1`–`c14` |
| Colour | `mix` | `none`, `little`, `much` |
| Structure | `structure` | `quiet`, `layered`, `dense` |
| Structure | `walls` | `few`, `some`, `many` |
| Structure | `spacing` | `none`, `tight`, `airy` |
| Structure | `shapes` | `few`, `balanced`, `many` |
| Structure | `glass` | `solid`, `mixed`, `glassy` |
| Structure | `lines` | `fine`, `regular`, `heavy` |
| Size and view | `blocksize` | `small`, `medium`, `large` |
| Size and view | `zoom` | `out`, `normal`, `in`, `close` |
| Size and view | `view` | `classic`, `high`, `low`, `flipped` |
| Composition | `composition` | `single`, `chain` |
| Composition | `axis` | `x`, `z`, `vertical` |
| Composition | `satellites` | `one`, `two`, `three` |
| Composition | `reach` | `near`, `mid`, `far` |
| Composition | `wires` | `straight`, `loose` |
| Finish | `frame` | `none`, `thin`, `bold` |
| Finish | `fill` | `none`, `dust`, `panel` |
| Finish | `caption` | `low`, `bottom`, `topleft`, `topright`, `none` |
| Finish | `ground` | `none`, `grid`, `shadow`, `both` |
| Finish | `hatch` | `none`, `light`, `dense` |
| Finish | `twist` | `none`, `slight`, `strong` |
| Finish | `slices` | `none`, `little`, `much`, `fan` |
| Finish | `bevel` | `none`, `subtle`, `bold` |
| Finish | `occlusion` | `none`, `soft`, `deep` |
| Finish | `cutaway` | `none`, `corner` |
| Finish | `material` | `none`, `concrete`, `metal`, `frosted` |
| Finish | `connectors` | `none`, `collars`, `nodes` |
| Finish | `accents` | `none`, `edges`, `shapes`, `wall` |
| Block symbols | `annotations` | `none`, `full` |
| Block symbols | `eventlayout` | `none`, `elongated`, `tiled`, `stacked` |

The renderer also accepts `markers` and `explained` for compatibility with previously saved artwork. They are frozen historical values and are not offered as new choices. Event layouts describe how supplied block event data is drawn; they do not fetch block data. With no `chain` digest in the artwork input, the engine renders a generative design without real block annotations.

## Determinism and versions

The same validated input produces the same SVG bytes. The seed drives an artistic pseudorandom generator; it is not a cryptographic seed generator. Applications that issue or sell artwork must create and authorize seeds outside this package.

Renderer versions are immutable output contracts. Existing versions stay available for old inputs; a change that alters emitted SVG bytes belongs in a new renderer version. `renderSvg4` requires `rendererVersion: "blockheight-4"` and validates the input before drawing. PNG bytes are outside this package's contract because rasterizers and compression tools can differ.

`blockheight-4` keeps color, glass, and inner-shape choices on separate random streams so those choices do not reshuffle the wall layout. Its caption chooses an ink with at least 4.5:1 contrast against the paper. The version can render a validated, caller-supplied block digest, but this standalone package contains no block reader or RPC client.

## Project files

- `src/shared/art.ts` implements the original compact `blockheight-1` renderer and shared deterministic drawing helpers.
- `src/shared/art2.ts` implements renderers `blockheight-2`, `blockheight-3`, and current `blockheight-4`.
- `src/shared/palettes.ts`, `geometry.ts`, `event-layout.ts`, `annotations.ts`, `digest.ts`, `format.ts`, and `studio-defaults.ts` support the renderers.
- `src/shared/render.ts` dispatches an artwork input to its recorded renderer version.
- `tests/` contains renderer, geometry, annotation, layout, and formatting tests.
- `docs/art-engine.md` records the engine design and version history.

See [`CONTRIBUTING.md`](CONTRIBUTING.md) for local development notes and [`docs/extraction-plan.md`](docs/extraction-plan.md) for the extraction scope and publication status.

## License

Code, documentation, and generated example outputs are provided under the MIT License. See [`LICENSE`](LICENSE).
