---
id: git-hooks
title: Git Hooks
sidebar_position: 1
tags:
  - git
  - guide
---

# Git Hooks

This document will guide developers to Git hooks.

## Getting Started

> Like many other Version Control Systems, Git has a way to fire off custom
> scripts when certain important actions occur. There are two groups of these
> hooks: client-side and server-side. Client-side hooks are triggered by
> operations such as committing and merging, while server-side hooks run on
> network operations such as receiving pushed commits. You can use these hooks
> for all sorts of reasons.

## Configured Git Hooks

The repository will use [Husky](https://typicode.github.io/husky/#/) to run
configured git hooks:

- `pre-commit`:

  - The `pre-commit` hook is run first, before you even type in a commit
    message. It’s used to inspect the snapshot that’s about to be committed, to
    see if you’ve forgotten something, to make sure tests run, or to examine
    whatever you need to inspect in the code.

  - This process will be run by
    [lint-staged](https://github.com/okonet/lint-staged).

- `commit-msg`:

- Validate the project state or commit message before allowing a commit to go
  through.

- Each commit will be linted using [commitlint](https://commitlint.js.org/#/) to
  ensure the commit message follow [Conventional Commits
  1.0.0](https://www.conventionalcommits.org/en/v1.0.0/) and have the correct
  format.

## Bypass Hooks

You can bypass `pre-commit` and `commit-msg` hooks using Git `-n/--no-verify`
option:

```bash
git commit -m "yolo!" --no-verify
```

For Git commands that don't have a `--no-verify` option, you can use `HUSKY`
environment variable:

```bash
HUSKY=0 git push # yolo!
```

## Related Articles

- [Husky documentation](https://typicode.github.io/husky/#/)
- [Git Hooks](https://git-scm.com/book/en/v2/Customizing-Git-Git-Hooks)
- [Lint-staged documentation](https://github.com/okonet/lint-staged)
