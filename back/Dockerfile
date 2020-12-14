FROM node:alpine

EXPOSE 1337
RUN mkdir -p /usr/src/app
WORKDIR /usr/src/app
COPY package.json yarn.lock ./
RUN yarn install &&  npm install sails -g
ENV NODE_ENV=production
COPY . .
CMD ["node","./app.js"]