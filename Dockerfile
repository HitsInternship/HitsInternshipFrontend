FROM node:latest as build-stage
WORKDIR /src
COPY package*.json ./
RUN npm install
COPY . .
ENV NODE_ENV=production
ENV VITE_API_URL='http://176.124.212.184:8080'
RUN npm run build

FROM nginx:latest
COPY --from=build-stage /src/dist /usr/share/nginx/html
COPY nginx.conf /etc/nginx/nginx.conf
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]