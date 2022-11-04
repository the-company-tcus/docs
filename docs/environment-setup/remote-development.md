---
id: remote-development
title: Remote Development
sidebar_position: 2
tags:
  - environment
  - guide
  - setup
---

# Remote Development

If you want to start your work full-featured and isolated, then you can read
through this documentation to set up a remote developing environment inside a
Docker Container with the VSCode.

## Getting Started:

### System requirements:

**Local / Remote Host**:

- **Windows**: [Docker Desktop](https://www.docker.com/products/docker-desktop) 2.0+
  on Windows 10 Pro/Enterprise. Windows 10 Home (2004+) requires Docker Desktop
  2.3+ and the [WSL 2
  back-end](https://aka.ms/vscode-remote/containers/docker-wsl2). (Docker
  Toolbox is not supported. Windows
  container images are not supported.)

- **macOS**: [Docker Desktop](https://www.docker.com/products/docker-desktop) 2.0+.

- **Linux**: [Docker CE/EE](https://docs.docker.com/install/#supported-platforms)
  18.06+ and [Docker Compose](https://docs.docker.com/compose/install) 1.21+.
  (The Ubuntu snap package is not supported.)

- **Remote hosts**: 1 GB RAM is required, but at least 2 GB RAM and a 2-core CPU
  is recommended.

Other [Docker compliant
CLIs](https://code.visualstudio.com/remote/advancedcontainers/docker-options)
may work, but are not officially supported. Note
that [attaching to a Kubernetes
cluster](https://code.visualstudio.com/docs/remote/attach-container#_attach-to-a-container-in-a-kubernetes-cluster)
only requires a properly configured kubectl CLI.

**Containers**:

- x86_64 / ARMv7l (AArch32) / ARMv8l (AArch64) Debian 9+, Ubuntu 16.04+, CentOS
  / RHEL 7+

- x86_64 Alpine Linux 3.9+

### Installation:

:::info

This section will guide how to setup on Ubuntu with Docker Desktop.

:::

1. Install and configure Docker for your operating system:

   a. Linux:

   **Install using the repository**:

   Before you install Docker Engine for the first time on a new host machine,
   you need to set up the Docker repository. Afterward, you can install and
   update Docker from the repository

   **Set up the repository**:

   Update the apt package index and install packages to allow apt to use a
   repository over HTTPS:

   ```bash
    $ sudo apt-get update

    $ sudo apt-get install \
    ca-certificates \
    curl \
    gnupg \
    lsb-release
   ```

   Add Docker’s official GPG key:

   ```bash
    $ sudo mkdir -p /etc/apt/keyrings
    $ curl -fsSL https://download.docker.com/linux/ubuntu/gpg | sudo gpg --dearmor -o /etc/apt/keyrings/docker.gpg
   ```

   Use the following command to set up the repository:

   ```bash
   $ echo \
   "deb [arch=$(dpkg --print-architecture) signed-by=/etc/apt/keyrings/docker.gpg] https://download.docker.com/linux/ubuntu \
   $(lsb_release -cs) stable" | sudo tee /etc/apt/sources.list.d/docker.list > /dev/null
   ```

   **Install Docker Engine**:

   Update the `apt` package index, and install the latest version of Docker
   Engine, containerd, and Docker Compose, or go to the next step to install a
   specific version:

   ```bash
   $ sudo apt-get update
   $ sudo apt-get install docker-ce docker-ce-cli containerd.io docker-compose-plugin
   ```

<details>
  <summary>Install Docker Desktop</summary>

**Stop the Docker Engine service**:

```bash
sudo systemctl stop docker docker.socket containerd
```

:::info

We generally recommend stopping the Docker Engine while you’re using Docker
Desktop to prevent the Docker Engine from consuming resources and to prevent
conflicts.

:::

On Ubuntu, the Docker Engine may be configured to automatically start as a
system service when your machine starts. Use the following command to disable
the Docker Engine service, and to prevent it from starting automatically:

```bash
sudo systemctl disable docker docker.socket containerd
```

**Download Docker Desktop**:

You can go to page [Docker Desktop release
notes](https://docs.docker.com/desktop/release-notes/) to download the latest
Linux DEB package.

Then install the package:

```bash
sudo apt install -y docker-desktop-4.12.0-amd64.deb
```

</details>

2. Install [Visual Studio Code](https://code.visualstudio.com/) or [Visual Studio
   Code Insiders](https://code.visualstudio.com/insiders/).

3. Install the [Remote Development extension
   pack](https://aka.ms/vscode-remote/download/extension), or install only [Dev
   Containers](https://marketplace.visualstudio.com/items?itemName=ms-vscode-remote.remote-containers)
   extension if you don’t want to install both Remote-SSH and WSL extensions.

## Working with Containers

The Remote-Containers extension supports two primary operating models:

- You can use a container as your [full-time development
  environment](https://code.visualstudio.com/docs/remote/create-dev-container#_create-a-devcontainerjson-file).

- You can [attach to a running
  container](https://code.visualstudio.com/docs/remote/attach-container) to
  inspect it.

## About .devcontainer.json file:

In your repository, there is a directory `.devcontainer/devcontainer.json` to
configure VSCode’s container.

Example:

```json
{
  "name": "my-project-devcontainer",
  "image": "mcr.microsoft.com/devcontainers/base:ubuntu", // Any generic, debian-based image.
  // 5173 port for Vite
  "forwardPorts": [5173],
  "features": {
    "ghcr.io/devcontainers/features/git:1": {
      "version": "latest"
    },
    "ghcr.io/devcontainers/features/python:1": {
      "version": "3.9"
    },
    "ghcr.io/devcontainers/features/node:1": {
      "version": "lts"
    }
  },
  "postCreateCommand": "curl -sSL https://install.python-poetry.org | python3 -",
  "customizations": {
    // Configure properties specific to VS Code.
    "vscode": {
      "settings": {},
      // Add the IDs of extensions you want installed when the container is created.
      "extensions": [
        "nrwl.angular-console",
        "editorconfig.editorconfig",
        "ms-python.vscode-pylance",
        "ms-python.python",
        "formulahendry.auto-rename-tag",
        "ms-playwright.playwright",
        "esbenp.prettier-vscode",
        "stkb.rewrap",
        "zixuanchen.vitest-explorer",
        "voorjaar.windicss-intellisense",
        "eamodio.gitlens",
        "dbaeumer.vscode-eslint",
        "usernamehw.errorlens",
        "mikestead.dotenv",
        "naumovs.color-highlight",
        "streetsidesoftware.code-spell-checker"
      ]
    }
  }
}
```

Brief explanation:

- **image**: Base image to build container, this can be any generic or
  Debian-based image.

- **forwardPorts**: An array of port numbers or `"host:port"` values (e.g.
  `[3000, "db:5432"]`) that should always be forwarded from inside the primary
  container to the local machine (including on the web).

- **features**: Self-contained, shareable units of installation code and
  development container configuration. This is already configured to provide all
  the necessary packages so you can run without any errors.

- **postCreateCommand**: This command is the last of three that finalizes
  container setup when a dev container is created. It happens after
  `updateContentCommand` and once the dev container has been assigned to a user
  for the first time. This can be used to install other packages that don’t have
  pre-built features.

- **customizations**: Add custom settings (like system-wide settings) or
  pre-install extensions to the development container. Because we already
  configure settings in file `.vscode/settings.json` (workspace settings), we
  won’t configure much in the `settings` field.

:::info

The `extensions` field will **install extensions within the container**, not
like in file `.vscode/extensions.json`, which only recommend.

:::

## Related Articles:

- Developing inside a Container:
  https://code.visualstudio.com/docs/remote/containers

- devcontainer.json reference:
  https://containers.dev/implementors/json_reference/

- Available Features: https://containers.dev/features
