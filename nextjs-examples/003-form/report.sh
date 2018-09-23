#!/bin/bas
MOCK_HOST=https://mock-server-yznxmkzmvo.now.sh
ROOT_DIR=nextjs-examples
DIR=003-form

rm -rf ../../../examples-pages/frontend-example/${ROOT_DIR}/${DIR}/report
mkdir -p ../../../examples-pages/frontend-example/${ROOT_DIR}/${DIR}/report
ANALYZE=1 HOST=${MOCK_HOST} yarn build
cp .next/stats.json ../../../examples-pages/frontend-example/${ROOT_DIR}/${DIR}/report

HOST=${MOCK_HOST} yarn build
HOST=${MOCK_HOST} PORT=5000 yarn start &
lighthouse http://localhost:5000 --output json --output-path ../../../examples-pages/frontend-example/${ROOT_DIR}/${DIR}/report/report.json
kill $(jobs -p)
mkdir -p ../../portal/src/data/${ROOT_DIR}/${DIR}
cp ../../../examples-pages/frontend-example/${ROOT_DIR}/${DIR}/report/report.json ../../portal/src/data/${ROOT_DIR}/${DIR}
open ../../../examples-pages/frontend-example/${ROOT_DIR}/${DIR}/report