FROM node:alpine
WORKDIR /usr/src/app
COPY package*.json .
RUN npm ci
COPY . .
# CMD [ "npm", "start" ] //below is for development if you want to use nodemon for server refreshing
CMD [ "npm", "run", "server" ]  