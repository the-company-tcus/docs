---
id: deployment-guide
title: Document Site Deployment
sidebar_position: 4
tags:
  - guide
  - deployment
---

# Hướng dẫn triển khai trên môi trường Azure

## Tổng quan

Hệ thống Kubernetes của nhóm được triển khai trên môi trường Azure với dịch vụ
Azure Kubernetes Service (AKS). Nhóm sẽ triển khai hệ thống tự động với công cụ
Terraform.

## Công cụ

- Hệ thống được kiểm tra & triển khai với cấu hình như sau:

  - Hệ điều hành: Ubuntu 22.10.

  - Terminal: zsh 5.9 (x86_64-ubuntu-linux-gnu).

- Công cụ (terminal):

  - `kubectl`: Công cụ để triển khai Kubernetes resource

    ```bash
    $ kubectl version --short
    Client Version: v1.27.3
    Kustomize Version: v5.0.1
    Server Version: v1.26.4+k3s1
    ```

  - `kustomize`: Công cụ để cài đặt resource

    ```bash
    $ kustomize version
    v5.0.3
    ```

  - `terraform`: Công cụ để triển khai hệ thống tự động

    ```bash
    $ terraform --version
    Terraform v1.5.2
    on linux_amd64
    ```

  - `azure-cli`: Công cụ để giao tiếp với Azure

    ```bash
    $ az --version
    azure-cli                         2.50.0

    core                              2.50.0
    telemetry                          1.0.8

    Dependencies:
    msal                              1.22.0
    azure-mgmt-resource             23.1.0b2
    ```

  - `helm`: Công cụ để quản lý Kubernetes resource

    ```bash
    $ helm version
    version.BuildInfo{Version:"v3.12.1", GitCommit:"f32a527a060157990e2aa86bf45010dfb3cc8b8d", GitTreeState:"clean", GoVersion:"go1.20.4"}
    ```

  - `helmfile`: Công cụ để quản lý helm chart

    ```bash
    $ helmfile version
    Version            0.154.0
    Git Commit         c498af3
    Build Date         24 May 23 06:31 +07 (1 month ago)
    Commit Date        24 May 23 06:29 +07 (1 month ago)
    Dirty Build        no
    Go version         1.20.4
    Compiler           gc
    Platform           linux/amd64
    ```

  - `argocd`: Công cụ để giao tiếp với ArgoCD server

    ```bash
    $ argocd version
    argocd: v2.7.5+a2430af
      BuildDate: 2023-06-16T15:00:03Z
      GitCommit: a2430af1c356b283e5e3fc5bde1f5e2b5199f258
      GitTreeState: clean
      GoVersion: go1.19.10
      Compiler: gc
      Platform: linux/amd64
    ```

  - Các công cụ phụ: `curl`, `wget`, `jq`, `gpg`.

## Cài đặt công cụ

Clone repo `gitops` về máy:

```bash
$ git clone https://github.com/the-company-tcus/gitops.git
```

Chuyển đến thư mục `scripts/install-tools`:

```bash
$ cd scripts/install-tools
```

Cài đặt tất cả các công cụ:

```bash
$ ./setup.sh
```

Cài đặt công cụ thủ công:

- Cài đặt `kubectl`:

  ```bash
  $ ./kubectl.setup.sh
  ```

- Cài đặt `kustomize`:

  ```bash
  $ ./kustomize.setup.sh
  ```

- Cài đặt `terraform`:

  ```bash
  $ ./terraform.setup.sh
  ```

- Cài đặt `azure-cli`:

  ```bash
  $ ./azure.setup.sh
  ```

- Cài đặt `helm`:

  ```bash
  $ ./helm.setup.sh
  ```

- Cài đặt `helmfile`:

  ```bash
  $ ./helmfile.setup.sh
  ```

- Cài đặt `argocd`:

  ```bash
  $ ./argocd.setup.sh
  ```

## Triển khai hệ thống

### Tổng quan

Để triển khai nhóm sẽ làm theo các bước sau:

1. Tạo Azure Kubernetes Service (AKS) cluster bằng `terraform`.

2. Cài đặt helm chart bằng `helmfile`.

3. Cài đặt và cấu hình `vault`.

4. Cài đặt và cấu hình `argocd`.

### Khởi tạo Azure Kubernetes Service (AKS) cluster

1. Đăng nhập vào Azure:

   ```bash
   $ az login
   ```

   Người dùng sẽ được yêu cầu truy cập vào đường dẫn và bắt đầu quá trình đăng
   nhập.

2. Truy cập thông tin của account:

   Người dùng sẽ cần hai thông tin sau để xác thực với Terraform:

   - Subscription ID: ID của subscription mà người dùng muốn triển khai hệ thống
     lên.

     ```bash
     $ az account subscription list
     [
         {
             "authorizationSource": "RoleBased",
             "displayName": "Azure for Students",
             "id": "/subscriptions/2ff486ee-879e-4387-8efa-e48e7801ab5f",
             "state": "Enabled",
             "subscriptionId": "2ff486ee-879e-4387-8efa-e48e7801ab5f",
             "subscriptionPolicies": {
             "locationPlacementId": "Public_2014-09-01",
             "quotaId": "AzureForStudents_2018-01-01",
             "spendingLimit": "On"
             }
         }
     ]
     ```

     Hoặc có thể truy cập vào `Home/Subscriptions/<SUBSCRIPTION-NAME>` để lấy
     Subscription ID.

     ![subscription_id](https://github-production-user-asset-6210df.s3.amazonaws.com/64480713/252148494-ec3ab979-71b4-4b87-9c8b-509e74f19abc.png)

   - Tenant ID: ID của tenant mà người dùng muốn triển khai hệ thống lên.

     ```bash
     $ az account show
     {
         "environmentName": "AzureCloud",
         "homeTenantId": "40127cd4-45f3-49a3-b05d-315a43a9f033",
         "id": "2ff486ee-879e-4387-8efa-e48e7801ab5f",
         "isDefault": true,
         "managedByTenants": [],
         "name": "Azure for Students",
         "state": "Enabled",
         "tenantId": "40127cd4-45f3-49a3-b05d-315a43a9f033",
         "user": {
             "name": "19127631@student.hcmus.edu.vn",
             "type": "user"
         }
     }
     ```

     Hoặc có thể truy cập vào `Home/Azure Active Directory` để lấy Tenant ID.

     ![tenant_id](https://github-production-user-asset-6210df.s3.amazonaws.com/64480713/252148288-251a355c-5427-48a7-bfd0-6e9f28c8e895.png)

3. Cập nhập thông tin xác thực cho Terraform:

Người triển khai sẽ cập nhật hai thông tin `subscription_id` và `tenant_id` vào
file `terraform.tfvars` trong thư mục `terraform/azure`:

```hcl
subscription_id = "2ff486ee-879e-4387-8efa-e48e7801ab5f"
tenant_id       = "40127cd4-45f3-49a3-b05d-315a43a9f033"

user_principal_names = [
  "19127626@student.hcmus.edu.vn",
  "19127373@student.hcmus.edu.vn",
  "19127294@student.hcmus.edu.vn",
  "19127607@student.hcmus.edu.vn",
  "19127597@student.hcmus.edu.vn",
]
```

Ngoài ra, người triển khai cần cập nhật thông tin `user_principal_names` với
email của các thành viên trong nhóm.

4. Khởi tạo Terraform:

   ```bash
   $ terraform init
   ```

5. Kiểm tra các tài nguyên sẽ được tạo ra:

   ```bash
    $ terraform plan
   ```

Terraform sẽ tạo ra các tài nguyên sau:

- Resource Group: `ethi-group`.

- AKS Cluster: `ethi`

  - Node pool: `agentpool`.
  - Node Count: `1`.
  - VM Size: `Standard_B2ms`.
  - Kubernetes Version: `1.26.3`.

- Role Assignment:

  - Role Definition Name: `Azure Kubernetes Service RBAC Cluster Admin`.
  - Principal ID: Các `Object ID` của thành viên trong nhóm.

6. Triển khai hệ thống:

   ```bash
   $ terraform apply
   ```

### Cài đặt helm chart

Cài đặt các helm chart bằng `helmfile`:

```bash
$ helmfile sync
```

### Cài đặt và cấu hình vault

1. Khởi tạo vault:

   ```bash
   $ kubectl -n vault exec vault-0 -- vault operator init -key-shares=1 -key-threshold=1 -format=json > cluster-keys.json
   ```

   Vault sẽ được khởi tạo với số lượng key-share là `1` và key-threshold là `1`.
   File `cluster-keys.json` sẽ chứa thông tin về `unseal key` và `root token`
   của vault.

2. Đăng nhập vào vault

   ```bash
   $ kubectl -n vault exec vault-0 -- vault login
   ```

   Người triển khai sẽ được yêu cầu nhập `root_token` trong file
   `cluster-keys.json` để đăng nhập vào vault.

3. Tạo secret path

   ```bash
   $ kubectl -n vault exec vault-0 -- vault secrets enable -path=secret kv-v2
   ```

   Vault sẽ tạo ra một secret path có tên là `secret` để lưu trữ các secret.

4. Tạo Kubernetes secret để lưu root token:

   ```bash
   $ kubectl -n vault create secret generic vault-token \
      --from-literal=token=<ROOT-TOKEN>
   ```

   Người triển khai sẽ cập nhật `<ROOT-TOKEN>` bằng `root_token` trong file
   `cluster-keys.json`.

5. Import secret vào vault:

   ```bash
   $ cd scripts/vault && make import-prod token="<ROOT-TOKEN>"
   ```

   Người triển khai sẽ cập nhật `<ROOT-TOKEN>` bằng `root_token` trong file
   `cluster-keys.json`.

   Vault sẽ được import các secret từ file
   `scripts/vault/import-secret-prod.yaml` vào secret path `secret`, với công cụ
   [medusa](https://github.com/jonasvinther/medusa) CLI.

   > **Note**: Target `make import-prod` sẽ yêu cầu người triển khai đã cài đặt
   > Docker.

### Cài đặt và cấu hình ArgoCD

1. Cài đặt ArgoCD với Kustomize:

   ```bash
   $ kubectl apply -k ./registry/ethi/components/argocd
   ```

2. Cài đặt các ứng dụng của ArgoCD:

   ```bash
   $ kubectl apply -f ./registry/ethi
   ```

### Cài đặt hệ thống tự động

Người triển khai có thể dùng file script của nhóm để cài đặt hệ thống tự động
các bước:

```bash
2. Cài đặt helm chart bằng helmfile.

3. Cài đặt và cấu hình vault.

4. Cài đặt và cấu hình argocd.
```

Người triển khai có thể chạy file script `bootstrap-prod.sh` để cài đặt hệ
thống:

```bash
$ ./bootstrap-prod.sh
```
