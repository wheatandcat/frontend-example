#!/bin/bas
ROOT_DIR=angular-examples
DIR=m001-simple
APP=report-angular-m001-simple

heroku create ${APP}
heroku buildpacks:add -a ${APP} https://github.com/lstoll/heroku-buildpack-monorepo
heroku config:add APP_BASE=report/${ROOT_DIR}/${DIR} -a ${APP}
heroku buildpacks:add heroku/nodejs
heroku buildpacks:add heroku/nodejs
heroku git:remote -a ${APP}
git push heroku master
open https://${APP}.herokuapp.com 
