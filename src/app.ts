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
      pm_id: ${ e.process.pm_id}\n
      status: ${ e.process.status}\n
      HOSTNAME: ${ e.process.HOSTNAME}\n
      USER: ${ e.process.USER}\n
      PWD: ${ e.process.PWD}\n
      pm_cwd: ${ e.process.pm_cwd}\n
      pm_exec_path: ${ e.process.pm_exec_path}\n
      node_args: ${ e.process.node_args}\n
      name: ${ e.process.name}\n
      watch: ${ e.process.watch}\n
      event: ${ e.event}\n
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
