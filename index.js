var app = require('app')
var ipc = require('ipc');
var BrowserWindow = require('browser-window')
app.on('ready', function(){
  var mainWindow = new BrowserWindow({
    width: 800,
    height: 600
  })
  console.log("Hello World")
  mainWindow.loadURL('file://' + __dirname + '/index.html')
  mainWindow.openDevTools();

  var prefsWindow = new BrowserWindow({
    width: 400,
    height: 400,
    show: false
  })
  prefsWindow.loadURL('file://' + __dirname + '/prefs.html')
  ipc.on('show-prefs', function(){
    prefsWindow.show()
  })
})
