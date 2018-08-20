#!/bin/bas
MOCK_HOST=https://mock-server-yznxmkzmvo.now.sh
ROOT_DIR=preact-examples
DIR=001-simple

rm -rf dist/*
HOST=${MOCK_HOST} npm run build
rm -rf ../../../examples-pages/frontend-example/${ROOT_DIR}/${DIR}
mkdir -p ../../../examples-pages/frontend-example/${ROOT_DIR}/${DIR}
cp -R build/* ../../../examples-pages/frontend-example/${ROOT_DIR}/${DIR}
sed -i -e "s/src=\"/\src=\"\./g" ../../../examples-pages/frontend-example/${ROOT_DIR}/${DIR}/index.html
sed -i -e "s/href=\"/\href=\"\./g" ../../../examples-pages/frontend-example/${ROOT_DIR}/${DIR}/index.html
open ../../../examples-pages/frontend-example/${ROOT_DIR}/${DIR}/index.html