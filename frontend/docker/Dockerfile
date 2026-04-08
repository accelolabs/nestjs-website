FROM node:20 AS build

WORKDIR /app

COPY package*.json ./
RUN npm install

COPY . .

ARG VITE_GRAPHQL_URL=http://localhost:12000/graphql
ARG VITE_BASE_PATH=/
ENV VITE_GRAPHQL_URL=$VITE_GRAPHQL_URL
ENV VITE_BASE_PATH=$VITE_BASE_PATH

RUN npm run build

EXPOSE 4173
CMD ["npm", "run", "preview", "--", "--host", "0.0.0.0", "--port", "4173"]
