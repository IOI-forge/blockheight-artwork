# Extraction plan

This package extracts the deterministic artwork engine from the private `IOI-forge/Blox` project into a standalone community repository. The intent is to publish only the reusable renderer, its support modules, focused tests, documentation, and a reproducible SVG example.

## Scope

Included scope:

- The shared TypeScript artwork renderers and their direct support modules
- Renderer, geometry, layout, annotation, digest, and formatting tests
- A minimal Node.js 24 package setup with no dependencies
- A generated SVG example and the exact input record used to render it
- Community documentation and MIT licensing for code, docs, and examples

Excluded scope:

- Web application, server, worker, database, deployment, and operator configuration
- Chia RPC clients, credentials, wallet and minting integrations
- The historical browser prototype and its client-side minting implementation
- Upstream operational documentation unrelated to running the art package

## Steps and status

1. **Inspect upstream artwork scope** — complete. The source is in `src/shared/`; the current renderer is `renderSvg4` in `src/shared/art2.ts`. Upstream `docs/art-engine.md` records the renderer history. The legacy prototype is archival and is not imported by this package.
2. **Copy only artwork dependencies and relevant tests** — complete in this working tree. The standalone source and tests are present; no server, chain RPC, minting, or database implementation is included.
3. **Add standalone package tooling** — complete in the working tree. The Node.js 24 package uses Node's built-in test runner and a local `node:module` `registerHooks` loader resolving relative `.js` imports to `.ts` source files. `npm run render` uses current studio defaults and writes `examples/example.svg` plus `examples/example.json`.
4. **Document the engine and contribution flow** — complete in the working tree. This plan, `README.md`, `docs/art-engine.md`, and `CONTRIBUTING.md` describe scope, use, deterministic versions, and local commands.
5. **Confirm license and example output** — complete locally. MIT license added; SVG and input generated. All seven standalone test files pass; all 16 copied source/test files match upstream Git blob hashes. See provenance.json for the exact source tree and the excluded upstream chain-integration suites.
6. **Publish the repository** — target: public repository [IOI-forge/blockheight-artwork](https://github.com/IOI-forge/blockheight-artwork), branch `main`. The user created this repository and authorized the initial import.

## Publication scope

The initial import contains the standalone package and documentation only. Private application history is not imported. The upstream Blox repository remains unchanged. See [validation](validation.md) for local checks and their limits; remote CI results are available in the repository's Actions tab after publication.
