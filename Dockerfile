FROM node:20-alpine

RUN echo "nameserver 8.8.8.8" > /etc/resolv.conf.tmp && \
    echo "nameserver 1.1.1.1" >> /etc/resolv.conf.tmp && \
    mount --bind /etc/resolv.conf.tmp /etc/resolv.conf || true

RUN npm config set registry https://registry.npmjs.org/ && \
    npm config set fetch-retry-mintimeout 20000 && \
    npm config set fetch-retry-maxtimeout 120000

WORKDIR /app

COPY package*.json ./

RUN (npm install --verbose || \
     (npm config set registry https://registry.npmmirror.com && npm install --verbose))

COPY . .

EXPOSE 5175
CMD ["npm", "run", "dev"]