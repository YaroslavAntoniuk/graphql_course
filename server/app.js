require('dotenv').config()
const express = require('express');
const { graphqlHTTP } = require('express-graphql');
const schema = require('../schemas/schema');
const mongoose = require('mongoose');
const cors = require('cors');

const app = express();
const PORT = 3005;

mongoose.connect(`mongodb+srv://${process.env.DB_USERNAME}:${process.env.DB_PASSWORD}@cluster0.jfhherq.mongodb.net/graphql?retryWrites=true&w=majority`, { useNewUrlParser: true, useUnifiedTopology: true });

app.use(cors());

app.use('/graphql', graphqlHTTP({
  schema,
  graphiql: true
}));

const dbConnection = mongoose.connection;

dbConnection.on('error', err => console.log(`MongoDB Connection Error: ${err}`));
dbConnection.once('open', () => console.log('MongoDB Successfully Connected!'));

app.listen(PORT, err => {
  err ? console.error(err) : console.log('Server started successfully!');
});
