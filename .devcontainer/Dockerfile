# Base image
FROM mcr.microsoft.com/devcontainers/php:8.2-bullseye

# Cài đặt các tiện ích cần thiết
RUN apt-get update && apt-get install -y \
    curl \
    git \
    unzip \
    libpng-dev \
    libonig-dev \
    libxml2-dev \
    libzip-dev \
    default-mysql-client \
    && docker-php-ext-install pdo_mysql mbstring exif pcntl bcmath gd zip \
    && apt-get clean

# Cài Composer
RUN curl -sS https://getcomposer.org/installer | php -- --install-dir=/usr/local/bin --filename=composer

# Cài Node.js (nếu không dùng feature)
RUN curl -fsSL https://deb.nodesource.com/setup_20.x | bash - && apt-get install -y nodejs

# Cài đặt Vite và các công cụ frontend
RUN npm install -g vite

# Đặt quyền làm việc
WORKDIR /workspace
