#!/bin/bash
docker-compose build
docker-compose up -d
node ./insert_dummy_data.js
sleep 1
npm run test
