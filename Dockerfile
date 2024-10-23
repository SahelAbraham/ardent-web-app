#Stage 1
# Use the slim version of the node 14 image as our base
# FROM node:14-slim
FROM node:lts-alpine as builder

ARG REACT_APP_ARDENT_WEB_APP_URL
ENV REACT_APP_ARDENT_WEB_APP_URL=$REACT_APP_ARDENT_WEB_APP_URL
ARG REACT_APP_USE_MOCK_DATA
ENV REACT_APP_USE_MOCK_DATA=$REACT_APP_USE_MOCK_DATA

ARG REACT_APP_API_KEY
ENV REACT_APP_API_KEY=$REACT_APP_API_KEY
ARG REACT_APP_AUTH_DOMAIN
ENV REACT_APP_AUTH_DOMAIN=$REACT_APP_AUTH_DOMAIN
ARG REACT_APP_PROJECT_ID
ENV REACT_APP_PROJECT_ID=$REACT_APP_PROJECT_ID
ARG REACT_APP_STORAGE_BUCKET
ENV REACT_APP_STORAGE_BUCKET=$REACT_APP_STORAGE_BUCKET
ARG REACT_APP_MESSAGING_SENDER_ID
ENV REACT_APP_MESSAGING_SENDER_ID=$REACT_APP_MESSAGING_SENDER_ID
ARG REACT_APP_APP_ID
ENV REACT_APP_APP_ID=$REACT_APP_APP_ID
ARG REACT_APP_MEASUREMENT_ID
ENV REACT_APP_MEASUREMENT_ID=$REACT_APP_MEASUREMENT_ID

# Create a directory for our application in the container 
RUN mkdir /app-ui

# Set this new directory as our working directory for subsequent instructions
WORKDIR /app-ui

# Copy all files in the current directory into the container
COPY . .

# Install 'serve', a static file serving package globally in the container
RUN npm install -g serve

# Install all the node modules required by the React app
RUN npm install
# Build the React app
RUN npm run build

#Stage 2
FROM nginx:alpine

# copy the .conf template
COPY ./nginx/nginx.conf /etc/nginx/nginx.conf

## Remove default nginx index page and replace it with the static files we created in the first step
RUN rm -rf /usr/share/nginx/html/*
COPY --from=builder /app-ui/build /usr/share/nginx/html
EXPOSE 80 443

CMD nginx -g 'daemon off;'