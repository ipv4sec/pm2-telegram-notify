#!/usr/bin/env bash

echo "-----------------------------"
curl ip.cn
echo "-----------------------------"
ifconfig
echo "-----------------------------"

export ANIVIA_MYSQL_USERNAME=root
export ANIVIA_MYSQL_PASSWORD=passwd
export ANIVIA_MYSQL_HOST=localhost
export ANIVIA_MYSQL_DATABASE_NAME=anivia
export ANIVIA_MYSQL_PORT=3306
export ANIVIA_PORT=3002

cd /home/www

if [ ! -d "/home/www/anivia" ]; then
  git clone -b release http://loli:QWer1234b@git.azure.gagogroup.cn/loli/anivia.git
fi

cd /home/www/anivia
pwd

git reset --hard
git pull origin release


cat doc/v1/header.md \
doc/v1/base.md \
doc/v1/crop.md \
doc/v1/farm.md \
doc/v1/land.md \
doc/v1/policy.md \
doc/v1/map.md \
doc/v1/search.md \
  > doc/v1.md

aglio --theme-full-width -t peperoncino -i doc/v1.md -o doc/v1.html

npm install

gulp build

npm test

pm2 delete anivia
pm2 start 'dist/index.js'  --name anivia
