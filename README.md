# PM2 telegram notify

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
时,向你的Bot发送任意消息会得到你的chatId,然后
`pm2 set pm2-telegram-notify:chatId {1234}`

![示例](./res/1.png)

### TODO

1. 应用频繁重启是控制只发送一条数据

### lint

`sh ./bin/tslint.sh` or  `gulp tslint`

### test

`sh ./bin/test.sh` or  `npm test`


### build

`sh ./bin/build.sh` or  `gulp build` or  `gulp watch-build`