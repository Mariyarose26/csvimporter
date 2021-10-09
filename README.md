# CSV file Importer for MongoDB using Node.js

## Project setup
npm install
To run the MongoDB use 'sudo service mongodb start' in the terminal

# Challenge
Write a simple batch job that retrieves a CSV file from a URL, which imports orders into a database. Assume there is an existing collection/table of customers and orders. Ensure that the customerId exists in the database before importing the order, otherwise skip the import for the order.

## Database:
MongoDB or Postgres

## Table/Collection schema:
Customers customerId (String) firstName (String) lastName (String) 

Orders orderId (String) customerId (String) item (String) quantity (Number)

#
CSV header with a sample input (1 order per line): 

orderId,customerId,item,quantity 

sample-123,customer-321,Flowers,2

## Used:
Node.js, Express, MongoDB, HTML
