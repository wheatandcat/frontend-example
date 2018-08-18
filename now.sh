#!/bin/bash

cp -f package.json $1/package.json
cd $1
npm i
ls -al
now --public
