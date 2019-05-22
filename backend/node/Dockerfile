FROM node:10.15.3-alpine
RUN mkdir -p /src
WORKDIR /src
ADD . /src

RUN npm install -g -s --no-progress yarn && \
    yarn && \
    # yarn run build && \
    # yarn run prune && \
    yarn cache clean

EXPOSE 8080
CMD [ "yarn", "start" ]
