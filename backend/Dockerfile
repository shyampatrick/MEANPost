FROM node:12
COPY . /app
WORKDIR /app
RUN npm install
ENV MONGO_ATLAS_PW Dj7rakHfyDxPZmVX
ENV JWT_KEY=secret-TODO-gen
CMD ["npm", "start"]
