# Menggunakan image Node.js
FROM node:20-alpine

# Menentukan direktori kerja
WORKDIR /app

# Menyalin package.json dan package-lock.json (jika ada) ke dalam kontainer
COPY package*.json ./

# Menginstall dependensi
RUN npm install

# Menyalin kode aplikasi ke dalam kontainer
COPY . .

# Menjalankan aplikasi saat kontainer dimulai
CMD ["node", "app.js"]
