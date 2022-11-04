---
id: tool-version-manager
title: Tool Version Manager
sidebar_position: 1
tags:
  - environment
  - guide
  - setup
---

# Tool Version Manager

Manage our package versions is relatively tricky, NodeJS has its
[nvm](https://github.com/nvm-sh/nvm), Python with
[pyenv](https://github.com/pyenv/pyenv), or Go with
[goenv](https://github.com/syndbg/goenv). How about a central tool version
manager?

Luckily, I stumbled upon a tool that perfectly fits my needs:
[asdf-vm](https://asdf-vm.com/) a.k.a `asdf`, which will handle all my favorite
packages with a single CLI tool, same experience but fewer installation steps
🫶.

> `asdf` is a tool version manager. All tool version definitions are contained
> within one file (`.tool-versions`) which you can check in to your project's
> Git repository to share with your team, ensuring everyone is using the exact
> same versions of tools.

`asdf` has [Elixir](https://github.com/asdf-vm/asdf-elixir),
[Erlang](https://github.com/asdf-vm/asdf-erlang),
[NodeJS](https://github.com/asdf-vm/asdf-nodejs), or
[Ruby](https://github.com/asdf-vm/asdf-ruby) as first-party plugins. However,
its support is very generous, which comes from community plugins, i.e.,
[asdf-community](https://github.com/asdf-community), a collaborative,
community-driven project for long-term maintenance of asdf plugins.

:::note

But why do we have to use this? Doesn’t each language have its tool version
manager?

- `asdf` means to be **a central tool**, which replaces other tools’ complexity
  with simpler and easy to use commands.

:::

## Getting Started:

### Install dependencies:

```bash
sudo apt install curl git
```

### Download asdf:

|   **git**    | `git clone https://github.com/asdf-vm/asdf.git ~/.asdf --branch v0.10.2` |
| :----------: | :----------------------------------------------------------------------: |
| **Homebrew** |                           `brew install asdf`                            |

### Install asdf:

Bash & Git:

```bash
echo ". $HOME/.asdf/asdf.sh" >> ~/.bashrc
echo ". $HOME/.asdf/completions/asdf.bash" >> ~/.bashrc
```

### Install plugins:

:::info

Each plugin has dependencies so we need to check the plugin repo where they
should be listed.

:::

#### asdf-nodejs:

Use [node-build](https://github.com/nodenv/node-build) under the hood

**Dependencies**:

|       OS       |         Dependency Installation         |
| :------------: | :-------------------------------------: |
| Linux (Debian) | `apt-get install dirmngr gpg curl gawk` |

**Install the plugin**:

```bash
asdf plugin add nodejs https://github.com/asdf-vm/asdf-nodejs.git
```

#### asdf-python:

Use
[python-build](https://github.com/pyenv/pyenv/tree/master/plugins/python-build)
(from [pyenv](https://github.com/pyenv/pyenv)) under the hood

**Dependencies**:

|       OS       |                                                                                           Dependency Installation                                                                                            |
| :------------: | :----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------: |
| Linux (Debian) | `apt-get install make build-essential libssl-dev zlib1g-dev \ libbz2-dev libreadline-dev libsqlite3-dev wget curl llvm \ libncursesw5-dev xz-utils tk-dev libxml2-dev libxmlsec1-dev libffi-dev liblzma-dev` |

**Install the plugin**:

```bash
asdf plugin-add python
```

:::info

If you still have problems, each plugin might be built on a specific package,
(e.g., `asdf-nodejs` utilizes `node-build` or `asdf-python` uses `python-build`
under the hood), you can go to that package and find solutions.

:::

### Install a version:

#### asdf-nodejs:

```bash
asdf install nodejs latest
```

:::info

`asdf` enforces exact versions. `latest` is a helper throughout `asdf` that will
resolve to the actual version number at the time of execution.

:::

#### asdf-python:

```bash
asdf install python 3.9.13
```

### Set a version:

#### Global:

Global defaults are managed in `$HOME/.tool-versions`. Set a global version with:

##### asdf-nodejs:

```bash
asdf global nodejs latest
```

##### asdf-python:

```bash
asdf global python 3.9.13
```

#### Local:

Local versions are defined in the `$PWD/.tool-versions` file (your current
working directory). Usually, this will be the Git repository for a project.
When in your desired directory execute:

##### asdf-nodejs:

```bash
asdf local nodejs latest
```

`$PWD/.tool-versions` will then look like this:

```
nodejs 18.9.1
```

##### asdf-python:

```bash
asdf local python 3.9.13
```

`$PWD/.tool-versions` will then look like this:

```
python 3.9.13
```

Then you can easily install all dependencies with this command, just like Yarn
or npm or Pnpm:

```bash
asdf install
```

## Going further with Nix:

`asdf` is great, but [Nix](https://nixos.org/) is much better, it has a big
[ecosystem](https://nixos.wiki/wiki/Nix_Ecosystem) with a thousand packages
managed by [nixpkgs](https://github.com/NixOS/nixpkgs), a Linux distribution
[NixOS](https://nixos.org/), or even [Nix programming
language](https://nixos.wiki/wiki/Overview_of_the_Nix_Language)!

However, NixOS has a steep learning curve and is quite hard to get comfortable
with for the first time, like its [garbage
collector](https://nixos.org/manual/nix/stable/package-management/garbage-collection.html)
or [Flakes](https://nixos.wiki/wiki/Flakes).

So it will take time and more research to bring Nix into action. Stay tuned .

## Related Articles:

- Switching from pyenv, rbenv, goenv and nvm to asdf: https://jinyuz.dev/2020/07/switching-from-pyenv-rbenv-goenv-and-nvm-to-asdf/

- ASDF, the version manager for all your languages: https://alchemist.camp/episodes/asdf-language-versions

- Why Learning NixOS is Difficult, and How to Fix It:
  https://ostina.to/posts/2019-03-29-why-nixos-is-hard-and-how-to-fix.html
