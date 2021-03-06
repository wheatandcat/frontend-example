#!/bin/bas
MOCK_HOST=https://mock-server-yznxmkzmvo.now.sh
ROOT_DIR=preact-examples
DIR=004-router

rm -rf build/*
npm run build -- --json
rm -rf ../../../examples-pages/frontend-example/${ROOT_DIR}/${DIR}/report
mkdir -p ../../../examples-pages/frontend-example/${ROOT_DIR}/${DIR}/report
webpack-bundle-analyzer stats.json -m static -r report.html --no-open 
mv report.html ../../../examples-pages/frontend-example/${ROOT_DIR}/${DIR}/report/report.html

rm -rf build/*
PREACT_APP_HOST=${MOCK_HOST} npm run build
serve -s ./build &
lighthouse http://localhost:5000 --output json --output-path ../../../examples-pages/frontend-example/${ROOT_DIR}/${DIR}/report/report.json
kill $(jobs -p)
mkdir -p ../../portal/src/data/${ROOT_DIR}/${DIR}
cp ../../../examples-pages/frontend-example/${ROOT_DIR}/${DIR}/report/report.json ../../portal/src/data/${ROOT_DIR}/${DIR}
open ../../../examples-pages/frontend-example/${ROOT_DIR}/${DIR}/report