'use strict';
const mongoose = require("mongoose");
const csvtojson = require("csvtojson");
const request = require("request");

// Variables to Declare 
const fileToImport = "https://docs.google.com/spreadsheets/d/1JVqK-Nfa4jety-HE_KjrwwAwhGH6u1jsUVsSVbrxPxg/export?format=csv&gid=837598930";
const dbUrl = "mongodb://localhost:27017/shopDB";

// Declare the Order model
const Order = require('./models/order.js');

mongoose.Promise = global.Promise;
mongoose.set('debug', true);

const csvImporter = async (fileToImport) => {
  await mongoose.connect(dbUrl, { useNewUrlParser: true, useUnifiedTopology: true }, (err, client) => {
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
    mongoose.disconnect();
  });
}

csvImporter(fileToImport);