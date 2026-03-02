FROM node:20-alpine AS base

# Build the rello-ui library
FROM base AS lib-build
WORKDIR /app
COPY package.json package-lock.json ./
RUN npm ci
COPY src/ src/
COPY tsconfig.json tsup.config.ts ./
RUN npm run build

# Build the configurator
FROM base AS app-build
WORKDIR /app/configurator
COPY configurator/package.json configurator/package-lock.json ./
RUN npm ci
COPY --from=lib-build /app/dist /app/dist
COPY --from=lib-build /app/src /app/src
COPY --from=lib-build /app/package.json /app/package.json
COPY --from=lib-build /app/node_modules /app/node_modules
COPY configurator/ ./
RUN npx vite build
RUN npx tsc -p tsconfig.server.json

# Production
FROM base AS production
WORKDIR /app/configurator
COPY --from=app-build /app/configurator/dist ./dist
COPY --from=app-build /app/configurator/dist-server ./dist-server
COPY --from=app-build /app/configurator/node_modules ./node_modules
COPY --from=app-build /app/configurator/package.json ./
ENV NODE_ENV=production
EXPOSE 3000
CMD ["node", "dist-server/server/index.js"]
