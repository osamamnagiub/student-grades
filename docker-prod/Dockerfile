FROM node:14.16.0-alpine3.13

WORKDIR /app

COPY package*.json ./
RUN npm install
RUN npm install -g nodemon

COPY . . 


CMD ["npm", "start"]