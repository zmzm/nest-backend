FROM node:14-alpine3.11 AS build

COPY package*.json ./
RUN npm ci
COPY . .
RUN npm run build

FROM node:14-alpine3.11 AS production

COPY --from=build package*.json ./
COPY --from=build node_modules ./node_modules
COPY --from=build dist ./dist

RUN npm prune --production

EXPOSE 5555

ENTRYPOINT ["node", "dist/main.js"]