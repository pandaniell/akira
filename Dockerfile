FROM node:15.0.0 AS base
WORKDIR /usr/src/app

FROM base as builder
COPY ./@types ./@types
COPY ./locales ./locales
COPY ./prisma ./prisma
COPY ./src ./src
COPY ./entrypoint.sh .
COPY ./package*.json ./
COPY ./tsconfig.json .
RUN npm ci --ignore-scripts
RUN npx --no-install prisma generate
RUN npm run build

FROM base AS app
COPY --from=builder /usr/src/app/dist ./dist
COPY --from=builder /usr/src/app/locales ./locales
COPY --from=builder /usr/src/app/prisma ./prisma
COPY --from=builder /usr/src/app/entrypoint.sh .
COPY --from=builder /usr/src/app/package*.json ./
RUN chmod +x ./entrypoint.sh
RUN npm i --only=prod --ignore-scripts
RUN npx --no-install prisma generate
USER node
ENV NODE_ENV=production
ENTRYPOINT ["./entrypoint.sh"]
