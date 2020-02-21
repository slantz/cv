FROM node:10-alpine

# Create app directory
WORKDIR /usr/cv

# Install app dependencies
# A wildcard is used to ensure both package.json AND package-lock.json are copied
# where available (npm@5+)
COPY package*.json ./

ENV PORT 80

# If you are building your code for production
# RUN npm install --only=production
RUN npm install --unsafe-perm=false --allow-root

# Bundle app source
COPY . .

RUN npm i cross-env \
          webpack@3.4.1 \
          assets-webpack-plugin@3.5.1 \
          webpack-parallel-uglify-plugin@0.4.2 \
          autoprefixer@7.1.2 \
          precss@2.0.0

ENV NODE_ENV production

RUN npm run dist

EXPOSE ${PORT}
CMD [ "npm", "start" ]
