FROM node:10-alpine

# Create app directory
WORKDIR /usr/cv

# Install app dependencies
# A wildcard is used to ensure both package.json AND package-lock.json are copied
# where available (npm@5+)
COPY package*.json ./

ENV PORT 80
ENV NODE_ENV production

# If you are building your code for production
# RUN npm install --only=production
RUN npm install --only=production --unsafe-perm=false --allow-root

# Bundle app source
COPY . .

EXPOSE ${PORT}
CMD [ "npm", "start" ]
