FROM node:22.2-alpine3.19
WORKDIR /app
COPY . .
RUN npm install
CMD ["npx", "ts-node", "./src/app.ts"]
EXPOSE 3084
