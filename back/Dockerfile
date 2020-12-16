FROM node:alpine

EXPOSE 3000
RUN mkdir -p /usr/src/app
WORKDIR /usr/src/app
COPY package.json yarn.lock ./
RUN yarn install
ENV NODE_ENV=production
COPY . .
CMD ["yarn","start"]