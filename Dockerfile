#Stage 1
FROM node as builder

#Set the workdir
WORKDIR /usr/src/app

#Copy only package.json
COPY package*.json ./

#Install all dependencies
RUN npm ci

#Copy everything else
COPY . .

#Build
RUN npm run build

#Stage 2
FROM node:slim

#Set the workdir
WORKDIR /usr/src/app

#Copy only package.json
COPY package*.json ./

#Install only producion dependencies
RUN npm ci --production

#Copy the build and the assets from the previous stage
COPY --from=builder /usr/src/app/dist ./dist
COPY --from=builder /usr/src/app/src/assets ./dist/assets

#!No need for expose declaration here becuase the port will be determined by the .env

CMD [ "node", "dist/index.js" ]