# version of node being used
FROM node:14

# directory inside the container where the app is stored
WORKDIR /usr/src/app

COPY package*.json ./

# this command is here so that the container runs "npm install". The --only=prod command 
# ensures that devDependencies are not installed
RUN npm install --only=production

COPY . .
CMD ["node", "server.js"]