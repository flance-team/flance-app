# based image yang akan digunakan
FROM node:lts-hydrogen

ARG NODE_ENV=production
ENV NODE_ENV=${NODE_ENV}

# path di container dimana berisi codingan kita (path bebas sesuai kesepakatan bersama)
WORKDIR /app

# copy deps yang ada di apps ke WORKDIR
COPY ["package*.json", "./"]

# Install npm & Mengapus cache
RUN npm install --production && npm cache clean --force

# copy semua file & folder ke WORKDIR
COPY . .

# execute apps: production
CMD ["npm", "start"]