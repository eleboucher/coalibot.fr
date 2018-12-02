FROM keymetrics/pm2:latest-alpine

# Bundle APP files
COPY ./back /back

WORKDIR /back

# Install app dependencies
ENV NPM_CONFIG_LOGLEVEL warn
RUN npm install --production

# Expose the listening port of your app
EXPOSE 3000

CMD [ "pm2-runtime", "start", "ecosystem.config.js" ]