#!/bin/bas
MOCK_HOST=https://mock-server-yznxmkzmvo.now.sh
ROOT_DIR=angular-examples
DIR=m004-router
APP=angular-m004-router

heroku create ${APP}
heroku buildpacks:add -a ${APP} https://github.com/lstoll/heroku-buildpack-monorepo
heroku config:add APP_BASE=${ROOT_DIR}/${DIR} -a ${APP}
heroku buildpacks:add heroku/nodejs
heroku buildpacks:add heroku/nodejs
heroku git:remote -a ${APP}
git push heroku master
open https://${APP}.herokuapp.com 
