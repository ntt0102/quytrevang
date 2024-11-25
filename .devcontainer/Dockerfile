FROM mcr.microsoft.com/devcontainers/php:8.2-bullseye

# Cài đặt thêm Node.js, npm và các tiện ích khác
RUN apt-get update && apt-get install -y \
    curl \
    git \
    unzip \
    libpng-dev \
    libonig-dev \
    libxml2-dev \
    && docker-php-ext-install pdo_mysql mbstring exif pcntl bcmath gd

# Cài đặt Composer
RUN curl -sS https://getcomposer.org/installer | php -- --install-dir=/usr/local/bin --filename=composer

# Cài đặt Laravel Envoy (tuỳ chọn)
RUN composer global require laravel/envoy

# Cài đặt Node.js (nếu chưa có từ feature)
RUN curl -fsSL https://deb.nodesource.com/setup_20.x | bash - && \
    apt-get install -y nodejs && \
    npm install -g npm@latest

# Cài đặt Vite và các công cụ frontend
RUN npm install -g vite

# Thiết lập quyền cho thư mục làm việc
RUN chown -R vscode:vscode /workspace

WORKDIR /workspace
