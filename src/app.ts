const pmx = require('pmx')
const pm2 = require('pm2')
const TelegramBot = require('node-telegram-bot-api')
let probe = pmx.probe()
let conf = pmx.initModule({
  widget : {
    type             : 'generic',
    logo             : 'http://www.creativetechs.com/iq/tip_images/TerminalApp-Icon.png',
    theme            : ['#111111', '#1B2228', '#807C7C', '#807C7C'],
    el : {
      probes  : false,
      actions : false
    },
    block : {
      actions : false,
      issues  : false,
      meta    : false,
      cpu: false,
      mem: false,
      main_probes : ['chatId', 'token']
    }
  }
})

probe.metric({
  name: 'chatId',
  value: function () {
    return conf.chatId
  }
})

probe.metric({
  name: 'token',
  value: function () {
    return conf.token
  }
})
const bot = new TelegramBot(conf.token, {polling: true})
pm2.launchBus(function (err: Error, bus: any) {
  if (err) {
    throw err
  }
  bus.on('process:event', function (e: any) {
    if (e.manually === true) {
      return
    }
    let resuly: any =
      `
      当前进程: ${ e.process.pm_id} <br />
      当前状态: ${ e.process.status} <br />
      主机名称: ${ e.process.HOSTNAME} <br />
      当前用户: ${ e.process.USER} <br />
      当前路径: ${ e.process.PWD} <br />
      执行路径: ${ e.process.pm_cwd} <br />
      文件路径: ${ e.process.pm_exec_path} <br />
      环境参数: ${ e.process.node_args} <br />
      应用名称: ${ e.process.name} <br />
      应用状态: watch ${ e.process.watch} <br />
      当前事件: ${ e.event}
      `
    bot.sendMessage(conf.chatId, JSON.stringify(resuly))
  })
  bus.on('pm2:kill', function () {
    console.error('PM2 is beeing killed')
  })
})
bot.on('message', (msg: any) => {
  const chatId = msg.chat.id
  bot.sendMessage(chatId,'You chatId is ' + chatId )
})
