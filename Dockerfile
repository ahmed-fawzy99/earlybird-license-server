FROM node:20
WORKDIR /app
COPY package.json /app
RUN npm install
COPY . /app
EXPOSE 2604
CMD ["sh", "-c", "npm run set-api-key && npm start"]
