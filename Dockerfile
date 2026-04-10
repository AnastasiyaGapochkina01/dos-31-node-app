FROM node:22-alpine AS base
WORKDIR /app
COPY package.json .
RUN npm install
RUN mkdir /.npm && \
    chown -R $UID:$GID /.npm && \
    npm ci

FROM base AS build
WORKDIR /app
COPY . .
RUN npm run build

# serve
FROM build AS dev
WORKDIR /app
COPY ./src ./src
CMD ["node", "src/server.js"]

# static
FROM nginx:alpine AS prod
COPY --from=build /app/dist /usr/share/nginx/html
