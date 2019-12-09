FROM shyamkp/nodejsmongo
WORKDIR /app
COPY . /app
RUN npm install && `(npm bin)`/ng build --prod
WORKDIR /app/backend
RUN npm install
CMD ["npm", "start"]

