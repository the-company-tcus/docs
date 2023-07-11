# Hướng dẫn cài đặt công cụ và biên dịch mã nguồn Backend

## Tổng quan

Hệ thống Backend của nhóm được lập trình bằng ngôn ngữ Go. Để biên dịch mã nguồn
thành các file thực thi, người lập trình viên cần cài đặt Go và các công cụ liên quan.

Yêu cầu hệ thống:

- Hệ điều hành: Ubuntu 22.10.
- Terminal: zsh 5.9 (x86_64-ubuntu-linux-gnu).

## Cài đặt công cụ

### Cài đặt [`asdf`](https://asdf-vm.com/):

Version: `v0.10.2`.

```bash
git clone https://github.com/asdf-vm/asdf.git ~/.asdf --branch v0.10.2

echo ". \$HOME/.asdf/asdf.sh" >> ~/.zshrc
echo ". \$HOME/.asdf/completions/asdf.bash" >> ~/.zshrc
```

### Cài đặt công cụ hỗ trợ

- Cài đặt các công cụ hỗ trợ:

  ```bash
  sudo apt-get install -y git build-essential
  ```

- Cài đặt Docker và Docker Compose:

  ```bash
  #!/usr/bin/env bash

  # Uninstall old versions
  sudo apt-get remove docker docker-engine docker.io containerd runc

  # Set up the repository

  # Update the apt package index and install packages to allow apt to use a
  # repository over HTTPS
  sudo apt-get update

  sudo apt-get install \
      ca-certificates \
      curl \
      gnupg \
      lsb-release

  # Add Docker’s official GPG key
  sudo mkdir -m 0755 -p /etc/apt/keyrings
  curl -fsSL https://download.docker.com/linux/ubuntu/gpg | sudo gpg --dearmor -o /etc/apt/keyrings/docker.gpg

  # Use the following command to set up the repository
  echo \
  "deb [arch=$(dpkg --print-architecture) signed-by=/etc/apt/keyrings/docker.gpg] https://download.docker.com/linux/ubuntu \
  $(lsb_release -cs) stable" | sudo tee /etc/apt/sources.list.d/docker.list > /dev/null

  # Install Docker Engine

  # Update the apt package index
  sudo apt-get update

  # Install Docker Engine, containerd, and Docker Compose.
  sudo apt-get install docker-ce docker-ce-cli containerd.io docker-buildx-plugin docker-compose-plugin

  # Post installation steps

  # Add your user to the docker group
  sudo usermod -aG docker $USER
  ```

### Cài đặt Go và các công cụ liên quan

- Cài đặt [Go](https://go.dev/):

  Version: `1.20.4`.

  ```bash
  asdf plugin add golang https://github.com/kennyp/asdf-golang.git

  asdf install golang 1.20.4

  asdf global golang 1.20.4
  ```

- Cài đặt [`go-migrate`](https://github.com/golang-migrate/migrate):

  Version: `4.16.0`.

  ```bash
  asdf plugin add gomigrate https://github.com/joschi/asdf-gomigrate

  asdf install gomigrate 4.16.0

  asdf global gomigrate 4.16.0
  ```

- Cài đặt [Buf CLI](https://buf.build/product/cli/):

  Version: `1.19.0`.

  ```bash
  asdf plugin add buf https://github.com/truepay/asdf-buf

  asdf install buf 1.19.0

  asdf global buf 1.19.0
  ```

### Tải mã nguồn

Tải mã nguồn từ GitHub:

```bash
git clone https://github.com/the-company-tcus/backend.git
```

Người dùng sẽ đăng nhập bằng tài khoản GitHub với `username` và với `password`
là Personal Access Token (PAT) của người dùng.

> **Note**: Lưu ý Personal Access Token của người dùng cần được cấp quyền
> `repo`. Ngoài ra, người dùng cần phải được nhóm cấp quyền truy cập vào GitHub
> Organization của nhóm.

### Sử dụng mã nguồn

> **Note**: Các lệnh make phải được chạy ở root directory của mã nguồn (nơi có
> file `Makefile`).

#### Khởi động hệ thống thủ công

Để chạy hệ thống, người lập trình viên sẽ chạy lệnh sau:

1. Chạy CSDL:

   Chạy PostgreSQL database container và chạy go-migrate để tạo các bảng trong database:

   ```bash
   make up
   ```

2. Chạy các service:

- `api-gateway` service:

  ```bash
  go run cmd/server/main.go api-gateway
  ```

- `auth` service:

  ```bash
  go run cmd/server/main.go auth
  ```

- `user` service:

  ```bash
  go run cmd/server/main.go user
  ```

- `eureka` service:

  ```bash
  go run cmd/server/main.go eureka
  ```

- `notification` service:

  ```bash
  go run cmd/server/main.go notification
  ```

#### Dừng hệ thống thủ công

1. Xóa PostgreSQL database container:

```bash
make down
```

2. Sau đó, người lập trình viên có thể dừng các service bằng cách nhấn `Ctrl + C`.

#### Khởi động hệ thống tự động

> **Note**: Cách này được khuyến khích cho các lập trình viên Frontend (Mobile).

Để chạy hệ thống, người lập trình viên sẽ chạy lệnh sau:

```bash
make compose-up
```

Hoặc:

Khởi động hệ thống "sạch" (Rebuild lại Docker images):

```bash
make compose-fresh
```

> **Note**: Lệnh này nên được các lập trình viên sử dụng khi có thay đổi về
> source code.

#### Dừng hệ thống tự động

Để dừng hệ thống, người lập trình viên sẽ chạy lệnh sau:

```bash
make compose-down
```

Hoặc:

Dừng hệ thống, nhưng không xóa Keycloak container:

```bash
make compose-quickdown
```

> **Note**: Việc khởi động lại Keycloak container sẽ mất nhiều thời gian hơn so
> với việc khởi động lại các service khác. Nên việc sử dụng lệnh này sẽ giúp cho
> việc phát triển nhanh hơn.

#### Các lệnh hỗ trợ khác

- Generate protobuf với Buf CLI:

  ```bash
  make gen-proto-go
  ```

### Biên dịch mã nguồn

Để biên dịch mã nguồn, người lập trình viên sẽ chạy lệnh sau:

```bash
go build -o main ./cmd/server/main.go
```

File `main` sẽ được tạo ra trong thư mục hiện tại. Người lập trình viên có thể
chạy file `main` để khởi động service.

Ví dụ:

```bash
./main [service]
```
