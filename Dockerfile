#
# ---- Base Node ----
FROM node:14-buster-slim AS deps
# set working directory
WORKDIR /todo
# copy dependencies list
COPY package.json yarn.lock ./
# install modules
RUN npm install

# Rebuild the source code only when needed
FROM node:14-buster-slim AS builder
WORKDIR /todo
COPY . .
COPY --from=deps /todo/node_modules ./node_modules
RUN npm build && npm install --production --ignore-scripts --prefer-offline

# Production image, copy all the files and run next
FROM node:14-buster-slim AS runner
WORKDIR /todo

ENV NODE_ENV production

# COPY --from=builder /todo/next.config.js ./
COPY --from=builder /todo/public ./public
COPY --from=builder --chown=nextjs:nodejs /todo/.next ./.next
COPY --from=builder /todo/node_modules ./node_modules
COPY --from=builder /todo/package.json ./package.json

USER nextjs

EXPOSE 3000

ENV PORT 3000

# Next.js collects completely anonymous telemetry data about general usage.
# Learn more here: https://nextjs.org/telemetry
# Uncomment the following line in case you want to disable telemetry.
# ENV NEXT_TELEMETRY_DISABLED 1

CMD ["node_modules/.bin/next", "start"]