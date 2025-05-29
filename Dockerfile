FROM node:20-alpine


RUN echo "nameserver 8.8.8.8" > /etc/resolv.conf && \
    echo "nameserver 1.1.1.1" >> /etc/resolv.conf

WORKDIR /app

COPY package.json package-lock.json ./

RUN npm install --verbose

COPY . .

EXPOSE 5175

CMD ["npm", "run", "dev"]