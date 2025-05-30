FROM node:20-alpine

RUN echo 'http://dl-cdn.alpinelinux.org/alpine/v3.19/main' > /etc/apk/repositories && \
    echo 'http://dl-cdn.alpinelinux.org/alpine/v3.19/community' >> /etc/apk/repositories && \
    apk add --no-cache --upgrade ca-certificates openssl && \
    update-ca-certificates

RUN { \
      echo 'strict-ssl=false'; \
      echo 'registry=https://registry.npmjs.org/'; \
      echo 'fetch-retry-mintimeout=30000'; \
      echo 'fetch-retry-maxtimeout=180000'; \
    } > /root/.npmrc

WORKDIR /app

COPY package.json package-lock.json ./

RUN npm ci --verbose || \
    { \
      echo "Trying Yarnpkg registry..."; \
      npm config set registry https://registry.yarnpkg.com; \
      npm ci --verbose; \
    } || \
    { \
      echo "Trying npmmirror registry..."; \
      npm config set registry http://registry.npmmirror.com; \
      npm ci --verbose; \
    }

COPY . .

RUN npm run build

EXPOSE 4173
CMD ["npm", "run", "preview"]