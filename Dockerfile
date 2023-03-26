FROM node

WORKDIR /app

COPY . .

RUN npm install

EXPOSE 3000

CMD ["node", "05/server.js"]
