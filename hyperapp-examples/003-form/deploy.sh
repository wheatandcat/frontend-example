#!/bin/bas
MOCK_HOST=https://mock-server-yznxmkzmvo.now.sh
ROOT_DIR=hyperapp-examples
DIR=003-form

rm -rf dist/*
HOST=${MOCK_HOST} npm run build
rm -rf ../../../examples-pages/frontend-example/${ROOT_DIR}/${DIR}
mkdir -p ../../../examples-pages/frontend-example/${ROOT_DIR}/${DIR}
cp dist/*.js ../../../examples-pages/frontend-example/${ROOT_DIR}/${DIR}
cp dist/*.html ../../../examples-pages/frontend-example/${ROOT_DIR}/${DIR}
sed -i -e "s/src=\"/\src=\"\./g" ../../../examples-pages/frontend-example/${ROOT_DIR}/${DIR}/index.html
open ../../../examples-pages/frontend-example/${ROOT_DIR}/${DIR}/index.html