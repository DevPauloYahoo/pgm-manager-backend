# image backend
# FROM node:18-alpine AS builder

# WORKDIR /app
# COPY package*.json ./
# RUN npm install --silent
# COPY . .
# RUN npx prisma generate
# RUN npm run build

# FROM node:18-alpine
# COPY --from=builder /app/node_modules ./node_modules
# COPY --from=builder /app/package*.json ./
# COPY --from=builder /app/dist ./dist
# COPY --from=builder /app/prisma ./prisma
# COPY --from=builder /app/.env ./
# EXPOSE 3000
# CMD ["npm", "run", "start"]

# image postgres with creating database pgm_manager_db
#FROM postgres:15.2
#COPY init.sql /docker-entrypoint-initdb.d/
