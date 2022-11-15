---
id: clone-repository
title: Clone Repository
sidebar_position: 1
tags:
  - git
  - guide
---

# Clone Repository

This document will guide developers to clone the repository.

## Getting Started

Most of our repositories are hosted on GitHub as **private repositories**.
Unlike public repositories, private repositories require authentication to
clone. We will go through the steps to clone a private repository using both CLI
and Github Desktop.

You can use both SSH and Personal Access Token (PAT) to authenticate. But SSH is
simpler and easy to use.

## Using Personal Access Token

### Creating a Personal Access Token

:::info

This document is derived from the GitHub Official Documentation, page [Creating
a personal access
token](https://docs.github.com/en/authentication/keeping-your-account-and-data-secure/creating-a-personal-access-token).

:::

1. [Verify your email
   address](https://docs.github.com/en/github/getting-started-with-github/verifying-your-email-address),
   if it hasn't been verified yet.

2. In the upper-right corner of any page, click your profile photo, then click
   **Settings**.

   ![Settings icon in the user
bar](https://docs.github.com/assets/cb-34573/images/help/settings/userbar-account-settings.png)

3. In the left sidebar, click **Developer settings**.

4. In the left sidebar, under **Personal access tokens**, click **Tokens
   (classic)**.

5. Select **Generate new token**, then click **Generate new token (classic)**.

6. Give your token a descriptive name.

   ![Token description
field](https://docs.github.com/assets/cb-3880/images/help/settings/token_description.png)

7. To give your token an expiration, select the **Expiration** drop-down menu,
   then click a default or use the calendar picker.

   ![Token expiration
field](https://docs.github.com/assets/cb-39847/images/help/settings/token_expiration.png)

8. Select the scopes you'd like to grant this token. To use your token to access
   repositories from the command line, select **repo**. A token with no assigned
   scopes can only access public information. For more information, see
   "[Available
   scopes](https://docs.github.com/en/apps/building-oauth-apps/scopes-for-oauth-apps#available-scopes)".

   ![Selecting token
scopes](https://docs.github.com/assets/cb-43299/images/help/settings/token_scopes.gif)

9. Click Generate token.

   ![Generate token
button](https://docs.github.com/assets/cb-10912/images/help/settings/generate_token.png)

   ![Newly created
token](https://docs.github.com/assets/cb-33474/images/help/settings/personal_access_tokens.png)

10. To use your token to access resources owned by an organization that uses
    SAML single sign-on, authorize the token. For more information, see
    "[Authorizing a personal access token for use with SAML single
    sign-on](https://docs.github.com/en/enterprise-cloud@latest/authentication/authenticating-with-saml-single-sign-on/authorizing-a-personal-access-token-for-use-with-saml-single-sign-on)"
    in the GitHub Enterprise Cloud documentation.

### Clone the repository using CLI

1. Open the terminal and navigate to the directory where you want to clone the
   repository.

2. Clone with URL, it's just like cloning a public repository, but you need to
   add your PAT to the URL. For example:

   ```bash
   git clone https://<your-username>:<your-pat>@github.com/<your-username>/<your-repo>.git
   ```

### Clone the repository using Github Desktop

1. Open Github Desktop and click **File** > **Clone repository**.

2. Click **URL**.

3. Enter the URL of the repository you want to clone. For example:

   ```bash
   https://<your-username>:<your-pat>@github.com/<your-username>/<your-repo>.git
   ```

## Using SSH Key

### Generating new SSH Key

:::info

This section is derived from the GitHub Official Documentation, page
[Generating a new SSH key and adding it to the
ssh-agent](https://docs.github.com/en/authentication/connecting-to-github-with-ssh/generating-a-new-ssh-key-and-adding-it-to-the-ssh-agent).

:::

1. Open Terminal.

2. Paste the text below, substituting in your GitHub email address.

   ```bash
   $ ssh-keygen -t ed25519 -C "your_email@example.com"
   ```

   :::note

   If you are using a legacy system that doesn't support the Ed25519 algorithm,
   use:

   ```bash
   $ ssh-keygen -t rsa -b 4096 -C "your_email@example.com"
   ```

   :::

   This creates a new SSH key, using the provided email as a label.

   ```
   > Generating public/private ALGORITHM key pair.
   ```

   When you're prompted to "Enter a file in which to save the key", you can press
   **Enter** to accept the default file location. Please note that if you created
   SSH keys previously, ssh-keygen may ask you to rewrite another key, in which
   case we recommend creating a custom-named SSH key. To do so, type the default
   file location and replace id_ssh_keyname with your custom key name.

   ```
   > Enter a file in which to save the key (/home/YOU/.ssh/ALGORITHM):[Press enter]
   ```

3. At the prompt, type a secure passphrase. For more information, see "[Working
   with SSH key
   passphrases.](https://docs.github.com/en/articles/working-with-ssh-key-passphrases)"

   ```
   > Enter passphrase (empty for no passphrase): [Type a passphrase]
   > Enter same passphrase again: [Type passphrase again]
   ```

### Adding SSH Key to Github

:::info

This section is derived from the GitHub Official Documentation, page [Adding a
new SSH key to your GitHub
account](https://docs.github.com/en/authentication/connecting-to-github-with-ssh/adding-a-new-ssh-key-to-your-github-account).

:::

1. Copy the SSH public key to your clipboard.

   If your SSH public key file has a different name than the example code, modify
   the filename to match your current setup. When copying your key, don't add any
   newlines or whitespace.

   ```bash
   $ cat ~/.ssh/id_ed25519.pub
   # Then select and copy the contents of the id_ed25519.pub file
   # displayed in the terminal to your clipboard
   ```

   :::tip

   Alternatively, you can locate the hidden `.ssh` folder, open the file in your
   favorite text editor, and copy it to your clipboard.

   :::

2. In the upper-right corner of any page, click your profile photo, then click
   **Settings**.

   ![Settings icon in the user
bar](https://docs.github.com/assets/cb-34573/images/help/settings/userbar-account-settings.png)

3. In the "Access" section of the sidebar, click **SSH and GPG keys**.

4. Click **New SSH key** or **Add SSH key**.

   ![SSH Key
button](https://docs.github.com/assets/cb-28257/images/help/settings/ssh-add-ssh-key-with-auth.png)

5. In the "Title" field, add a descriptive label for the new key. For example,
   if you're using a personal laptop, you might call this key "Personal laptop".

6. Select the type of key, either authentication or signing. For more
   information about commit signing, see "[About commit signature
   verification.](https://docs.github.com/en/articles/about-commit-signature-verification)"

7. Paste your key into the "Key" field.

   ![The key
field](https://docs.github.com/assets/cb-47495/images/help/settings/ssh-key-paste-with-type.png)

8. Click **Add SSH key**.

   ![The Add key
button](https://docs.github.com/assets/cb-6592/images/help/settings/ssh-add-key.png)

9. If prompted, confirm access to your account on GitHub. For more information,
   see "[Sudo
   mode.](https://docs.github.com/en/authentication/keeping-your-account-and-data-secure/sudo-mode)"

### Testing your SSH connection

:::info

This section is derived from the GitHub Official Documentation, page
[Testing your SSH
connection](https://docs.github.com/en/authentication/connecting-to-github-with-ssh/testing-your-ssh-connection).

:::

1. Open Terminal.

2. Enter the following:

   ```
   $ ssh -T git@github.com
   # Attempts to ssh to GitHub
   ```

   You may see a warning like this:

   ```
   > The authenticity of host 'github.com (IP ADDRESS)' can't be established.
   > RSA key fingerprint is SHA256:nThbg6kXUpJWGl7E1IGOCspRomTxdCARLviKw6E5SY8.
   > Are you sure you want to continue connecting (yes/no)?
   ```

3. Verify that the fingerprint in the message you see matches [GitHub's public
   key
   fingerprint](https://docs.github.com/en/github/authenticating-to-github/githubs-ssh-key-fingerprints).
   If it does, then type `yes`:

   ```
   > Hi USERNAME! You've successfully authenticated, but GitHub does not
   > provide shell access.
   ```

### Clone the repository using CLI

1. Go to the repository on GitHub.

2. Click the **Code** button.

3. Click the **SSH** tab.

4. Click the clipboard icon to copy the clone URL for the repository.

5. Open Terminal and navigate to the directory where you want to clone the
   repository.

6. Clone the repository using the URL you copied in step 4:

   ```bash
   $ git clone git@github.com:<your-username>/<your-repo>.git
   ```

### Clone the repository using Github Desktop

1. Go to the repository on GitHub.

2. Click the **Code** button.

3. Click the **SSH** tab.

4. Click the clipboard icon to copy the clone URL for the repository.

5. Open Github Desktop and click **File** > **Clone repository**.

6. Click **URL**.

7. Enter the URL of the repository you want to clone. For example:

   ```bash
   $ git clone git@github.com:<your-username>/<your-repo>.git
   ```
