FROM node:20-alpine

RUN echo 'http://dl-cdn.alpinelinux.org/alpine/v3.18/main' > /etc/apk/repositories && \
    echo 'http://dl-cdn.alpinelinux.org/alpine/v3.18/community' >> /etc/apk/repositories && \
    apk add --no-cache ca-certificates openssl && \
    update-ca-certificates

RUN npm config set strict-ssl false && \
    npm config set registry https://registry.npmjs.org/ && \
    npm config set fetch-retry-mintimeout 20000 && \
    npm config set fetch-retry-maxtimeout 120000

WORKDIR /app

COPY package*.json ./

RUN (npm install --verbose || \
     (npm config set registry https://registry.npmmirror.com && \
      npm install --verbose))

COPY . .

EXPOSE 5175
CMD ["npm", "run", "dev"]