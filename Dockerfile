FROM node:14-buster-slim as base
WORKDIR /todo
COPY package.json ./
RUN yarn
COPY . .

# Linux + Node + Source + Project dependencies + build assets
FROM base AS build
ENV NODE_ENV production
WORKDIR /build
COPY --from=base /todo ./
RUN npm run build

# We keep some artifacts from build
FROM node:14-buster-slim AS production
ENV NODE_ENV production
WORKDIR /todo 
COPY --from=build /app/next.config.js ./
COPY --from=build /build/package*.json ./
COPY --from=build /build/.next ./.next
COPY --from=build /build/public ./public
RUN yarn add next

EXPOSE 3000
CMD npm run start
