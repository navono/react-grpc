FROM node:10.15.3-alpine as builder
RUN mkdir -p /src
WORKDIR /src

ADD . /src

RUN npm install -g -s --no-progress yarn && \
    yarn && \
    yarn run build

FROM node:10.15.3-alpine

COPY --from=builder /src/build /src

RUN npm install -g -s --no-progress http-server

EXPOSE 4000
CMD [ "npx", "http-server", "/src/", "-p", "4000" ]


# FROM node:12.2.0-alpine as build
# WORKDIR /app
# ENV PATH /app/node_modules/.bin:$PATH
# COPY package.json /app/package.json
# RUN npm install --silent
# RUN npm install react-scripts@3.0.1 -g --silent
# COPY . /app
# RUN npm run build