#!/bin/bash
HOST=localhost
PORT=5433
USER=kanefer
DBNAME=to_do

cd ..
sudo docker compose up -d

#until wait-for-it postgres:5433 -t 2
output=$(netsat -na | grep  $PORT)

echo "docker is now running"
sudo docker compose down