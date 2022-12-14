FROM node:18-alpine

RUN npm install -g pnpm

WORKDIR /

COPY . .

RUN pnpm install
RUN pnpm build

EXPOSE 8080
ENTRYPOINT ["npm", "run", "start"]
