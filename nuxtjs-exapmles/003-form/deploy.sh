#!/bin/bas
MOCK_HOST=https://mock-server-yznxmkzmvo.now.sh
ROOT_DIR=nuxtjs-exapmles
DIR=003-form
APP=nuxtjs-form

heroku create ${APP}
heroku buildpacks:add -a ${APP} https://github.com/lstoll/heroku-buildpack-monorepo
heroku config:add APP_BASE=${ROOT_DIR}/${DIR} -a ${APP}
heroku buildpacks:add heroku/nodejs
heroku buildpacks:add heroku/nodejs
heroku config:set NPM_CONFIG_PRODUCTION=false
heroku config:set HOST=0.0.0.0
heroku config:set NODE_ENV=production
heroku git:remote -a ${APP}
git push heroku master
open https://${APP}.herokuapp.com 