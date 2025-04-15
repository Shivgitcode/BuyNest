FROM node:23-alpine3.19 AS build

WORKDIR /app

COPY package.json .
RUN npm install 
RUN npm install -D tsx

COPY . . 


FROM node:23-alpine3.19 AS runner
WORKDIR /dist

COPY --from=Build /app /dist/

CMD [ "npm","run","dev" ]