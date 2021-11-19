FROM node:14-buster-slim as deps
WORKDIR /todo
COPY package.json yarn.lock ./
RUN yarn install --frozen-lockfile

# Linux + Node + Source + Project dependencies + build assets
FROM node:14-buster-slim AS builder
WORKDIR /todo
COPY . .
COPY --from=deps /todo/node_modules ./node_modules
RUN yarn build && yarn install --production --ignore-scripts --prefer-offline

# We keep some artifacts from build
FROM node:14-buster-slim AS runner
WORKDIR /todo 

ENV NODE_ENV production 

COPY --from=builder /todo/next.config.js ./  
COPY --from=builder /todo/public ./public
COPY --from=builder /todo/node_modules ./node_modules
COPY --from=builder /todo/package.json ./package.json

EXPOSE 3000

CMD npm run start

