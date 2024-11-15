FROM node:20
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
EXPOSE 2604
CMD ["sh", "-c", "npm run set-api-key && npm start"]