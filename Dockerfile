FROM shyamkp/nodejsmongo
WORKDIR /app
COPY . /app
RUN npm install && `(npm bin)`/ng build --prod
WORKDIR /app/backend
RUN npm install
ENV MONGO_ATLAS_PW Dj7rakHfyDxPZmVX
ENV JWT_KEY=secret-TODO-gen
CMD ["npm", "start"]

