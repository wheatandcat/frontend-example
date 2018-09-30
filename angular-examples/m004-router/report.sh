#!/bin/bas
MOCK_HOST=https://mock-server-yznxmkzmvo.now.sh
ROOT_DIR=angular-examples
DIR=m004-router

rm -rf dist/*
npm run report
rm -rf ../../../examples-pages/frontend-example/${ROOT_DIR}/${DIR}/report
mkdir -p ../../../examples-pages/frontend-example/${ROOT_DIR}/${DIR}/report
npm run build -- --prod --stats-json
webpack-bundle-analyzer dist/${DIR}/stats.json -m static -r report.html --no-open 
mv report.html ../../../examples-pages/frontend-example/${ROOT_DIR}/${DIR}/report/report.html

rm -rf dist/*
npm run build -- --prod
serve -s dist/${DIR} &
lighthouse http://localhost:5000 --output json --output-path ../../../examples-pages/frontend-example/${ROOT_DIR}/${DIR}/report/report.json
kill $(jobs -p)
mkdir -p ../../portal/src/data/${ROOT_DIR}/${DIR}
cp ../../../examples-pages/frontend-example/${ROOT_DIR}/${DIR}/report/report.json ../../portal/src/data/${ROOT_DIR}/${DIR}
open ../../../examples-pages/frontend-example/${ROOT_DIR}/${DIR}/report