FROM node:18-alpine AS builder
WORKDIR /app
COPY package*.json ./
COPY prisma ./prisma/
COPY .env ./
RUN npm install --silent
RUN npx prisma generate
COPY . .
RUN npm run build

FROM node:18-alpine
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/package*.json ./
COPY --from=builder /app/dist ./dist
COPY --from=builder /app/prisma ./prisma
COPY --from=builder /app/.env ./
EXPOSE 3000
CMD ["npm", "run", "start"]
