var remote = require('remote')
var Menu = remote.require('menu')
var ipc = require('ipc')

var menu = Menu.buildFromTemplate([
  {
    label: 'Electron',
    submenu: [
      {
        label: 'Prefs',
        click: function(){
          ipc.send('show-prefs')
        },
      }
    ]
  }
])
Menu.setApplicationMenu(menu)
