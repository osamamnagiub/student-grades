#!/bin/sh

echo "Waiting for MongoDB to start..."
./wait-for db:27017 

echo "Waiting for redis to start..."
./wait-for redis:6379

echo "Starting the server..."
npm start 