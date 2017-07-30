# PM2 telegram notify

线上程序出现 `restart overlimit` 的Telegram快速通知

## Use

```bash
npm install pm2 -g
pm2 install ipv4sec/pm2-telegram-notify
pm2 set pm2-telegram-notify:token {token}
pm2 set pm2-telegram-notify:chatId {1234}
```

`token`是在创建`telegramBot`时的`token`

在执行完
`pm2 set pm2-telegram-notify:token {token}`

向你的Bot发送任意消息会得到你的chatId,然后执行
`pm2 set pm2-telegram-notify:chatId {1234}`

### lint

`sh ./bin/tslint.sh` or  `gulp tslint`

### test

`sh ./bin/test.sh` or  `npm test`


### build

`sh ./bin/build.sh` or  `gulp build` or  `gulp watch-build`