#Stage 1
# Use the slim version of the node 14 image as our base
# FROM node:14-slim
FROM node:lts-alpine as builder

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
EXPOSE 80

CMD nginx -g 'daemon off;'