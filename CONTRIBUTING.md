# Contributing to tspiper

Thanks for your interest in improving the project! This document explains how
to get set up and what we expect from contributions.

## Ground rules

- Keep it small. The whole point of tspiper is that it is a tiny, readable,
  **zero-runtime-dependency** pipeline. New runtime dependencies will not be
  merged; dev dependencies need a good reason.
- Behaviour changes must come with tests.

## Development setup

```bash
git clone https://github.com/eduelias/tspiper.git
cd tspiper
nvm use          # picks up the Node version from .nvmrc
npm install
npm test         # runs the Jest suite
```

There is no dedicated build script; the TypeScript compiler emits to `dist/`
using the settings in `tsconfig.json`:

```bash
npx tsc
```

## Project scripts

| Command | What it does |
|---|---|
| `npm test` | Runs the Jest test suite (`src/__tests__/`). |
| `npm run gb` | Regenerates the barrel file `src/index.ts` with barrelsby. Run this after adding, renaming, or removing a source file. |

## Making changes

1. Create a branch: `git checkout -b feat/short-description`.
2. Write code **and tests**. Tests live in `src/__tests__/` and are picked up
   by the `testRegex` in `package.json`.
3. Run `npm test` (all green) and make sure `npx tsc` compiles cleanly.
4. If you added or removed source files, run `npm run gb` to refresh the
   barrel exports.
5. Keep commits focused with a clear message and open a pull request.

## Coding conventions

- TypeScript, `noImplicitAny` is on — keep everything typed.
- Follow the existing style: small classes, interfaces for every contract,
  doc comments on public methods.
- Public behaviour changes should update `README.md`.

## Reporting bugs / requesting features

Open an issue with your Node version, a minimal reproduction (a failing test
is ideal), and what you expected to happen.
