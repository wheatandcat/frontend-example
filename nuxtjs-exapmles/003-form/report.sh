#!/bin/bas
MOCK_HOST=https://mock-server-yznxmkzmvo.now.sh
ROOT_DIR=nuxtjs-exapmles
DIR=003-form

rm -rf ../../../examples-pages/frontend-example/${ROOT_DIR}/${DIR}/report
mkdir -p ../../../examples-pages/frontend-example/${ROOT_DIR}/${DIR}/report
npm run build
npm run start &
lighthouse http://localhost:3000 --output json --output-path ../../../examples-pages/frontend-example/${ROOT_DIR}/${DIR}/report/report.json
kill $(jobs -p)
mkdir -p ../../portal/src/data/${ROOT_DIR}/${DIR}
cp ../../../examples-pages/frontend-example/${ROOT_DIR}/${DIR}/report/report.json ../../portal/src/data/${ROOT_DIR}/${DIR}
open ../../../examples-pages/frontend-example/${ROOT_DIR}/${DIR}/report