FROM node:18-alpine
WORKDIR /usr/app
COPY package.json /usr/app
RUN npm install --silent
COPY . .
EXPOSE 3000
RUN npm run build
CMD npm run start

# RUN npm run prisma:generate
