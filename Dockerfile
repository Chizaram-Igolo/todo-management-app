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

RUN addgroup -g 1001 -S nodejs
RUN adduser -S nextjs -u 1001

COPY --from=builder /todo/next.config.js ./  
COPY --from=builder /todo/public ./public
COPY --from=builder --chown=nextjs:nodejs /todo/.next ./.next 
COPY --from=builder /todo/node_modules ./node_modules
COPY --from=builder /todo/package.json ./package.json


USER nextjs

EXPOSE 3000

ENV PORT 3000

CMD ["node_modules/.bin/next", "start"]
