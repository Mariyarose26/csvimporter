const mongoose = require("mongoose");
const { Model, Schema } = mongoose;
const csvtojson = require("csvtojson");
const request = require("request");

// Variables to Declare 
const dbName = "shopDB";
// const fileToImport = "Orders.csv";
const fileToImport = "https://docs.google.com/spreadsheets/d/1JVqK-Nfa4jety-HE_KjrwwAwhGH6u1jsUVsSVbrxPxg/export?format=csv&gid=837598930";
const collectionName = "orders";
const url = "mongodb://localhost:27017/shopDB";

mongoose.Promise = global.Promise;
mongoose.set('debug', true);

const customerSchema = new Schema({
  customerId: String,
  firstName: String,
  lastName: String
});
const customer = mongoose.model('Customer', customerSchema);

const orderSchema = new Schema({
  orderId: String,
  item: String,
  quantity: Number,
  customerId: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Customer'
  }]
});

const order = mongoose.model('Order', orderSchema);

const csvImporter = (fileToImport) => {
  csvtojson()
    .fromStream(request.get(fileToImport))
    .then(csvData => {
      console.log("CSV has "+ csvData.length + " Documents");
      mongoose.connect(url, { 
        useNewUrlParser: true, 
        useUnifiedTopology: true,
      }, (err, client) => {
        if (err) throw err;
        console.log("MongoDB connected ...");
        order.insertMany(csvData,{ lean: false }, {rawResult: false}, { ordered: false }, (err, res) => {
          if (err) throw err;
          console.log(`Inserted: ${res.insertedCount} rows`);
          client.close();
        });
      });
  });
}
csvImporter(fileToImport);
