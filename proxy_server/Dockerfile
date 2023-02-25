FROM node:18.14.2-alpine3.17
RUN apk update && apk add git
RUN git clone https://github.com/naddi96/cors-anywhere
WORKDIR /cors-anywhere
RUN npm install .
COPY "./server.js" "/cors-anywhere"
EXPOSE 8080
CMD ["node", "server.js"]