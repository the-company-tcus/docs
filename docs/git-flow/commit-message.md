---
id: commit-message
title: Commit Message
sidebar_position: 3
tags:
  - git
  - guide
---

# Commit Message

Every developer in the team MUST follow this commit message convention.

Every commit message will be automatically linted with
[commitlint](https://commitlint.js.org/#/) by running the git `commit-msg`
hook using [Husky](https://typicode.github.io/husky/#/) to ensure each commit
message has the same format **before the commit is created**.

## Conventional Commit Message Format:

Each commit message consists of a **header**, a **body**, and a **footer** :

```
<header>
<BLANK LINE>
<body>
<BLANK LINE>
<footer>
```

- The `header` is mandatory and must follow the [Commit Message
  Header](#commit-message-header) format.

- The `body` is optional and must follow the [Commit Message
  Body](#commit-message-body) format.

- The `footer` is optional and must follow the [Commit Message
  Footer](#commit-message-footer) format.

:::note

The `BLANK LINE` between `header` and `body` is **optional** or can be
**multiple**, but it is recommend to **keep only one `BLANK LINE`**.

:::

### Commit Message Header:

The header is built from these main parts:

```
[<jiraIds>] <type>(<scope>)<mark>: <subject>
```

- `jiraIds` **(required)**: Reference Jira issue ID(s).

  - Rule details:

    - Jira issue ID consists of a project key **(UPPERCASE)** and an issue ID
      **(number)**, separated by a dash **(“-”)**, and wrapped by a pair of
      brackets **(“[]”)**.

    - For multiple ticket IDs, each ID **can’t be duplicated** and must be
      separated by a colon and whitespace **(“, ”)**.

  - Examples of **incorrect** jiraIds for this rule:

    ```
    COM-123 // Missing wrapping brackets
    [com-123] // Jira ID is not UPPERCASE
    [COM-123 - COM-234] // Incorrect multiple Jira ID separator
    [COM-123, COM-123] // Duplicate Jria ID
    [123-COM] // Incorrect Jira ID format
    ```

  - Examples of correct jiraIds for this rule:

    ```
    [COM-123]
    [COM-123, COM-234]
    ```

- `type` **(required)**: Describe the commit type.

  - Rule details:

    - Must be one of the following:

      - **feat**: A new feature.

      - **fix**: A bug fix.

      - **docs**: Documentation only changes.

      - **style**: Changes that do not affect the meaning of the code
        (white-space, formatting, missing semi-colons, etc).

      - **refactor**: A code change that neither fixes a bug nor adds a feature.

      - **perf**: A code change that improves performance.

      - **test**: Adding missing tests or correcting existing tests.

      - **build**: Changes that affect the build system or external dependencies
        (example scopes: gulp, broccoli, npm).

      - **ci**: Changes to our CI configuration files and scripts (example
        scopes: Travis, Circle, BrowserStack, SauceLabs).

      - **chore**: Other changes that don't modify src or test files.

      - **revert**: Reverts a previous commit.

- `scope` **(optional)**: The scope should be the name of the npm package
  affected (as perceived by the person reading the changelog generated from
  commit messages).

  - Rule details:

    - One or multiple scopes, separated by a colon and whitespace **(“, “)**,
      and wrapped by a pair of parenthesis **(“()”)**.

- `mark` **(optional)**: A exclamation mark **(“!”)** to indicate breaking
  changes.

  - Rule details:

    - Append a `!` after the type/scope. Requires if the commit has a footer
      `BREAKING CHANGE` or `BREAKING-CHANGE`.

- `subject` **(required)**: Contains a succinct description of the change.

  - Rule details:

    - Is a **mandatory** part of the format.

    - Use the imperative, present tense: "change" not "changed" nor "changes".

    - Don't capitalize the first letter.

    - No dot **(“.”)** at the end.

### Commit Message Body:

Just as in the `subject`, use the imperative, present tense: "fix" not "fixed"
nor "fixes".

Explain the motivation for the change in the commit message body. This commit
message should explain why you are making the change. You can include a
comparison of the previous behavior with the new behavior in order to illustrate
the impact of the change.

### Commit Message Footer:

The footer can contain information about breaking changes and deprecations and
is also the place to reference GitHub issues, Jira tickets, and other PRs that
this commit closes or is related to. For example:

```
BREAKING CHANGE: <breaking change summary>
<BLANK LINE>
<breaking change description + migration instructions>
<BLANK LINE>
<BLANK LINE>
Fixes #<issue number>
```

or

```
DEPRECATED: <what is deprecated>
<BLANK LINE>
<deprecation description + recommended update path>
<BLANK LINE>
<BLANK LINE>
Closes #<pr number>
```

The Breaking Change section should start with the phrase "BREAKING CHANGE: "
followed by a summary of the breaking change, a blank line, and a detailed
description of the breaking change that also includes migration instructions.

Similarly, a Deprecation section should start with "DEPRECATED: " followed by a
short description of what is deprecated, a blank line, and a detailed
description of the deprecation that also mentions the recommended update path.

### Special commit:

- Merge commit: won’t be linted because most of this commit type will be
  committed via the GitHub page.

- Revert commit: If the commit reverts a previous commit, it should begin with
  `revert: `, followed by the header of the reverted commit.

  - Rule details: The content of the commit message body should contain:

    - Information about the SHA of the commit being reverted in the following
      format: `This reverts commit <SHA>`.

    - A clear description of the reason for reverting the commit message.

  - Examples of correct revert commit:

    ```
    revert: feat(pencil): add 'graphiteWidth' option

    ## This reverts commit 667ecc1654a317a13331b17617d973392f415f02.

    Revert: feat(pencil): add 'graphiteWidth' option

    This reverts commit 667ecc1654a317a13331b17617d973392f415f02.
    ```

## Submit a Commit:

### Console (Recommend):

Use the [commitizen](https://github.com/commitizen/cz-cli) CLI to build a commit
message:

- Stage modified files:

```bash
git add .
```

- Run npm script:

```bash
pnpm cm
```

- Follow instructions from CLI

- Push the commit:

```bash
git push origin dev
```

### GitHub Desktop:

:::note

Since `v13.0.0` _lint-staged_ no longer supports Node.js 12. Please upgrade your
Node.js version to at least `14.13.1`, or `16.0.0` onward.

:::

- Tick each file to stage modified files.

- Type commit header and body.

- Click `Commit to <branch>` button.

- Click `Push origin` button.

## Troubleshoot:

### Command not found:

If you're running Git from an app (like GitHub Desktop) and the command can be
found in your terminal, this means that the `PATH` in your app is different from
your terminal.

You can run `echo $PATH` in your terminal and configure your app to use the same
value.

Finally, if you're using a script for managing versions like `nvm`, `n`, `rbenv`,
`pyenv`, ... you can use `~/.huskyrc` to load the necessary before running
hooks.

For example, for `nvm` that would be:

```
# ~/.huskyrc

# This loads nvm.sh and sets the correct PATH before running hook

export NVM_DIR="$HOME/.nvm"
[ -s "$NVM_DIR/nvm.sh" ] && \. "$NVM_DIR/nvm.sh"
```

For asdf users:

```
# ~/.huskyrc

# This loads asdf.sh and sets the correct PATH before running hook

export ASDF_DIR="$HOME/.asdf"
[ -s "$ASDF_DIR/asdf.sh" ] && \. "$ASDF_DIR/asdf.sh"
```

### GitHub Desktop: “`SyntaxError: Unexpected token '.'`":

Make sure your Node.js is at least `14.13.1`, or `16.0.0` onward. If you are
using `nvm` or `asdf`, please refer to [Command not found](#command-not-found)
section to edit your `PATH` correctly.

## Related Articles:

- Angular Commit Message Format:
  https://github.com/angular/angular/blob/main/CONTRIBUTING.md#-commit-message-format

- Conventional Commit Message Format:
  https://github.com/conventional-changelog/conventional-changelog/tree/master/packages/conventional-commits-parser

- Commitizen CLI: https://github.com/commitizen/cz-cli

- Commitizen CLI for Jira:
  https://github.com/digitalroute/cz-conventional-changelog-for-jira
