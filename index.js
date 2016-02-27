var app = require('app')
var ipc = require('ipc');
var BrowserWindow = require('browser-window')
app.on('ready', function(){
  var mainWindow = new BrowserWindow({
    width: 800,
    height: 600
  });
  mainWindow.loadURL('file://' + __dirname + '/static/index.html')
  var prefsWindow = new BrowserWindow({
    width: 800,
    height: 800,
    show: false
  })
  prefsWindow.loadURL('file://' + __dirname + '/prefs.html')
  ipc.on('show-prefs', function(){
    prefsWindow.show()
  })
})
