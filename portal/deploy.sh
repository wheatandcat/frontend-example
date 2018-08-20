#!/bin/bas
MOCK_HOST=https://mock-server-yznxmkzmvo.now.sh
ROOT_DIR=portal

rm -rf build/*
npm run build
rm -rf ../../examples-pages/frontend-example/${ROOT_DIR}
mkdir -p ../../examples-pages/frontend-example/${ROOT_DIR}
cp -R build/* ../../examples-pages/frontend-example/${ROOT_DIR}
sed -i -e "s/src=\"/\src=\"\./g" ../../examples-pages/frontend-example/${ROOT_DIR}/index.html
sed -i -e "s/href=\"/\href=\"\./g" ../../examples-pages/frontend-example/${ROOT_DIR}/index.html
open ../../examples-pages/frontend-example/${ROOT_DIR}/index.html