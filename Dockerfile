FROM node:20-alpine

RUN echo "nameserver 8.8.8.8" > /tmp/resolv.conf && \
    echo "nameserver 1.1.1.1" >> /tmp/resolv.conf && \
    cat /tmp/resolv.conf > /etc/resolv.conf || true && \
    npm config set registry https://registry.npmmirror.com

WORKDIR /app

COPY package.json package-lock.json ./

RUN npm install --verbose

COPY . .

EXPOSE 5175
CMD ["npm", "run", "dev"]