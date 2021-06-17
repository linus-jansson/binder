FROM node:15-alpine3.10
# FROM node:10

# Setting workdir to /web
WORKDIR /

# Copy package.json & package-lock.json to workdir
COPY package*.json ./

RUN npm install -g copyfiles typescript
RUN npm install

# Copying everything into workdir
COPY . .

# DEBUG
RUN ls

# Building the typescript files
RUN npm run build

# Copy static files to build
COPY static ./static
COPY views ./views

# Exposing web port and database
EXPOSE 8080

# Starting script
CMD [ "npm", "run", "start" ]

# docker run -d -p 8000:8080 -v ~/images:D:/images fbb02185c2f4