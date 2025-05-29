FROM node:20-alpine


RUN apk add --no-cache ca-certificates openssl && \
    update-ca-certificates

RUN { \
      echo 'strict-ssl=false'; \
      echo 'registry=https://registry.npmjs.org/'; \
      echo 'fetch-retry-mintimeout=20000'; \
      echo 'fetch-retry-maxtimeout=120000'; \
      echo 'proxy=null'; \
      echo 'https-proxy=null'; \
    } > /root/.npmrc

WORKDIR /app

COPY package*.json ./

RUN (npm install --verbose || \
     { \
       echo "Trying npmmirror registry..."; \
       npm config set registry https://registry.npmmirror.com; \
       npm install --verbose; \
     })

COPY . .

EXPOSE 5175
CMD ["npm", "run", "dev"]