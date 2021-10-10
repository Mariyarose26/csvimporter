const mongoose = require("mongoose");
const { Model, Schema } = mongoose;
const csvtojson = require("csvtojson");
const request = require("request");

// Variables to Declare 
const dbName = "shopDB";
const fileToImport = "https://docs.google.com/spreadsheets/d/1JVqK-Nfa4jety-HE_KjrwwAwhGH6u1jsUVsSVbrxPxg/export?format=csv&gid=837598930";
// const fileToImport = "Customers.csv";
const collectionName = "orders";
const url = "mongodb://localhost:27017/shopDB";

// Declare the models
const Customer = require('./models/customer.js');
const Order = require('./models/order.js');

mongoose.Promise = global.Promise;
mongoose.set('debug', true);
//.fromStream(request.get(fileToImport))
//.fromFile(fileToImport)

const csvImporter = async (fileToImport) => {
  await mongoose.connect(url, { useNewUrlParser: true, useUnifiedTopology: true }, (err, client) => {
    console.log("MongoDB connected ...");
  });

  const csv = await csvtojson()
    .fromStream(request.get(fileToImport))
    .then(csvData => {
      console.log("CSV has "+ csvData.length + " Documents");
      return csvData;
    });
       
  await Order.insertMany(csv, { ordered: false }, (err, res) => {
    if (err) console.log(err);
    console.log("CSV has been imported..."+ res.length+" files");
  });
}

csvImporter(fileToImport);
