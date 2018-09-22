#!/bin/bas
VUE_DIR=vue-examples

rm -rf src/data/${VUE_DIR}
mkdir -p src/data/${VUE_DIR}/001-simple
cp ../../examples-pages/frontend-example/${VUE_DIR}/001-simple/report/report.json src/data/${VUE_DIR}/001-simple/report.json
mkdir -p src/data/${VUE_DIR}/002-fetch
cp ../../examples-pages/frontend-example/${VUE_DIR}/002-fetch/report/report.json src/data/${VUE_DIR}/002-fetch/report.json
mkdir -p src/data/${VUE_DIR}/003-form
cp ../../examples-pages/frontend-example/${VUE_DIR}/003-form/report/report.json src/data/${VUE_DIR}/003-form/report.json
mkdir -p src/data/${VUE_DIR}/004-router
cp ../../examples-pages/frontend-example/${VUE_DIR}/004-router/report/report.json src/data/${VUE_DIR}/004-router/report.json

HEPAERAPP_DIR=hyperapp-examples

rm -rf src/data/${HEPAERAPP_DIR}
mkdir -p src/data/${HEPAERAPP_DIR}/001-simple
cp ../../examples-pages/frontend-example/${HEPAERAPP_DIR}/001-simple/report/report.json src/data/${HEPAERAPP_DIR}/001-simple/report.json
mkdir -p src/data/${HEPAERAPP_DIR}/002-fetch
cp ../../examples-pages/frontend-example/${HEPAERAPP_DIR}/002-fetch/report/report.json src/data/${HEPAERAPP_DIR}/002-fetch/report.json
mkdir -p src/data/${HEPAERAPP_DIR}/003-form
cp ../../examples-pages/frontend-example/${HEPAERAPP_DIR}/003-form/report/report.json src/data/${HEPAERAPP_DIR}/003-form/report.json
mkdir -p src/data/${HEPAERAPP_DIR}/004-router
cp ../../examples-pages/frontend-example/${HEPAERAPP_DIR}/004-router/report/report.json src/data/${HEPAERAPP_DIR}/004-router/report.json

NUXT_DIR=nuxtjs-exapmles

rm -rf src/data/${NUXT_DIR}
mkdir -p src/data/${NUXT_DIR}/001-simple
cp ../../examples-pages/frontend-example/${NUXT_DIR}/001-simple/report/report.json src/data/${NUXT_DIR}/001-simple/report.json
mkdir -p src/data/${NUXT_DIR}/002-fetch
cp ../../examples-pages/frontend-example/${NUXT_DIR}/002-fetch/report/report.json src/data/${NUXT_DIR}/002-fetch/report.json
mkdir -p src/data/${NUXT_DIR}/003-form
cp ../../examples-pages/frontend-example/${NUXT_DIR}/003-form/report/report.json src/data/${NUXT_DIR}/003-form/report.json
mkdir -p src/data/${NUXT_DIR}/004-router
cp ../../examples-pages/frontend-example/${NUXT_DIR}/004-router/report/report.json src/data/${NUXT_DIR}/004-router/report.json