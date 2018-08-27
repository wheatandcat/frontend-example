#!/bin/bas
MOCK_HOST=https://mock-server-yznxmkzmvo.now.sh
ROOT_DIR=elm-examples
DIR=004-router
APP=elm-router

heroku create ${APP}
heroku buildpacks:add -a ${APP} https://github.com/lstoll/heroku-buildpack-monorepo
heroku config:add APP_BASE=${ROOT_DIR}/${DIR} -a ${APP}
heroku buildpacks:add heroku/nodejs
heroku buildpacks:add heroku/nodejs
heroku buildpacks:add https://github.com/srid/heroku-buildpack-elm
heroku buildpacks:add https://github.com/srid/heroku-buildpack-elm
heroku buildpacks:add https://github.com/hone/heroku-buildpack-static
heroku buildpacks:add https://github.com/hone/heroku-buildpack-static
heroku git:remote -a ${APP}
git push heroku master
open https://${APP}.herokuapp.com 