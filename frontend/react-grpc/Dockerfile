FROM node:10.15.3-alpine
RUN mkdir -p /src
WORKDIR /src
ADD ./build /src

RUN npm install -g -s --no-progress http-server

EXPOSE 4000
CMD [ "npx", "http-server", "/src/", "-p", "4000" ]
