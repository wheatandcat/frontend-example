#!/bin/bas
MOCK_HOST=https://mock-server-yznxmkzmvo.now.sh
ROOT_DIR=elm-examples
DIR=001-simple

rm -rf build/*
ELM_APP_API_URL=${MOCK_HOST} elm-app build
rm -rf ../../../examples-pages/frontend-example/${ROOT_DIR}/${DIR}/report
mkdir -p ../../../examples-pages/frontend-example/${ROOT_DIR}/${DIR}/report

serve -s build &
lighthouse http://localhost:5000 --output json --output-path ../../../examples-pages/frontend-example/${ROOT_DIR}/${DIR}/report/report.json
kill $(jobs -p)
mkdir -p ../../portal/src/data/${ROOT_DIR}/${DIR}
cp ../../../examples-pages/frontend-example/${ROOT_DIR}/${DIR}/report/report.json ../../portal/src/data/${ROOT_DIR}/${DIR}
open ../../../examples-pages/frontend-example/${ROOT_DIR}/${DIR}/report