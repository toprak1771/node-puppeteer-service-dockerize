# Node.js temel imajını alıyoruz
FROM node:slim AS deps

# Çalışma dizini oluşturuyoruz
WORKDIR /usr/src/app

# package.json ve package-lock.json dosyalarını kopyalıyoruz
COPY package*.json ./

# Bağımlılıkları yüklüyoruz
RUN npm install

RUN apt-get update && apt-get install -y gnupg wget && \
  wget --quiet --output-document=- https://dl-ssl.google.com/linux/linux_signing_key.pub | gpg --dearmor > /etc/apt/trusted.gpg.d/google-archive.gpg && \
  echo "deb [arch=amd64] http://dl.google.com/linux/chrome/deb/ stable main" > /etc/apt/sources.list.d/google-chrome.list && \
  apt-get update && \
  apt-get install -y google-chrome-stable --no-install-recommends && \
  rm -rf /var/lib/apt/lists/*

# Tüm dosyaları kopyalıyoruz
COPY . .

# Uygulamayı 3000 portunda çalıştırıyoruz
EXPOSE 3000

# Geliştirme modunda çalıştırmak için dev komutunu kullanıyoruz
CMD ["npm", "run", "dev"]