# Contributing

## Setup

```bash
git clone https://github.com/Vitalcheffe/Aegis.git
cd Aegis
bun install
bun test
```

## Before you PR

- Run `bun test` — all 234 tests must pass
- Keep comments short — notes to yourself, not API docs
- TODOs are welcome if they're honest

## What I'm looking for

- Bug reports with reproduction
- New motion models or measurement types
- Improvements to the IMM mixing (weights can NaN on extreme turns)
- Better multi-target association (GNN isn't optimal for >10 targets)

## What I'm not looking for

- Refactor-only PRs
- Changes that add JSDoc blocks (use // comments instead)
