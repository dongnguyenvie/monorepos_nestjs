###################
# BUILD FOR LOCAL DEVELOPMENT
###################

FROM node:18-alpine As development

# Create app directory
WORKDIR /usr/src/app

# Copy application dependency manifests to the container image.
# A wildcard is used to ensure copying both package.json AND package-lock.json (when available).
# Copying this first prevents re-running npm install on every code change.
COPY --chown=node:node package*.json ./
COPY --chown=node:node yarn.lock ./
COPY --chown=node:node package.json ./

# Install app dependencies using the `npm ci` command instead of `npm install`
RUN yarn install --check-files
RUN yarn global add turbo
RUN pwd

# Bundle app source
COPY --chown=node:node . .

# Use the node user from the image (instead of the root user)
USER node

###################
# BUILD FOR PRODUCTION
###################

FROM node:18-alpine As build

WORKDIR /usr/src/app

COPY --chown=node:node package*.json ./

# In order to run `npm run build` we need access to the Nest CLI.
# The Nest CLI is a dev dependency,
# In the previous development stage we ran `npm ci` which installed all dependencies.
# So we can copy over the node_modules directory from the development image into this build image.
COPY --chown=node:node --from=development /usr/src/app/node_modules ./node_modules

COPY --chown=node:node . .

# Run the build command which creates the production bundle
RUN yarn run build

# Set NODE_ENV environment variable
ENV NODE_ENV production

# Running `npm ci` removes the existing node_modules directory.
# Passing in --only=production ensures that only the production dependencies are installed.
# This ensures that the node_modules directory is as optimized as possible.
# RUN yarn install --frozen-lockfile --only=production && yarn cache clean --force
RUN yarn install --frozen-lockfile --only=production

USER node

###################
# PRODUCTION
###################

FROM node:18-alpine As production

WORKDIR /usr/myapp
# apps/api/dist
# Copy the bundled code from the build stage to the production image
COPY --chown=node:node --from=build /usr/src/app/apps/api/node_modules /usr/myapp/node_modules
COPY --chown=node:node --from=build /usr/src/ap/apps/api/dist /usr/myapp/dist
COPY --chown=node:node --from=build /usr/src/app/apps/api/.env /usr/myapp/.env
COPY --chown=node:node --from=build /usr/src/app/apps/api/package*.json /usr/myapp/

# Start the server using the production build
CMD [ "npm", "run", "start:prod" ]