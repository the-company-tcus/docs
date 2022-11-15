---
id: pre-commit-tasks
title: Pre-commit Tasks
sidebar_position: 3
tags:
  - git
  - guide
---

# Pre-commit Tasks

The project will use [Husky](https://typicode.github.io/husky/#/) to run
[lint-staged](https://github.com/okonet/lint-staged) for `pre-commit` hook to
inspect staged files before typing the commit message.

## Getting Started

About [lint-staged](https://github.com/okonet/lint-staged):

> Linting makes more sense when run before committing your code. By doing so you
> can ensure no errors go into the repository and enforce code style. But
> running a lint process on a whole project is slow, and linting results can be
> irrelevant. Ultimately you only want to lint files that will be committed.

> This project contains a script that will run arbitrary shell tasks with a list
> of staged files as an argument, filtered by a specified glob pattern.

## Configuration Files

The project will have a root configuration file to run tasks for common files:
`.md`, `.html`, or `.css` files.

In monorepo repository, each package will have a separate configuration file. When running, _lint-staged_ will always use the configuration closest to a staged file, so having separate configuration files makes sure linters do not "leak" into other packages.

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
