#!/bin/bas
MOCK_HOST=https://mock-server-yznxmkzmvo.now.sh
ROOT_DIR=angular-examples
DIR=m002-fetch

rm -rf dist/*
npm run report
rm -rf ../../../examples-pages/frontend-example/${ROOT_DIR}/${DIR}/report
mkdir -p ../../../examples-pages/frontend-example/${ROOT_DIR}/${DIR}/report
cp dist/${DIR}/stats.json ../../../examples-pages/frontend-example/${ROOT_DIR}/${DIR}/report

rm -rf dist/*
npm run build -- --prod
serve -s dist/${DIR} &
lighthouse http://localhost:5000 --output json --output-path ../../../examples-pages/frontend-example/${ROOT_DIR}/${DIR}/report/report.json
kill $(jobs -p)
mkdir -p ../../portal/src/data/${ROOT_DIR}/${DIR}
cp ../../../examples-pages/frontend-example/${ROOT_DIR}/${DIR}/report/report.json ../../portal/src/data/${ROOT_DIR}/${DIR}
open ../../../examples-pages/frontend-example/${ROOT_DIR}/${DIR}/report