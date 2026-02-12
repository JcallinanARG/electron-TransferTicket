//handle setupevents as quickly as possible
const setupEvents = require('./installers/setupEvents')
const { main } = require('electron-dialogs');


if (setupEvents.handleSquirrelEvent()) {
  // squirrel event handled and app will exit in 1000ms, so don't do anything else
  return;
}

const electron = require('electron')


// Module to control application life.
const app = electron.app
const {ipcMain,session} = require('electron')
var path = require('path')
require('./dialog/dialog')

// Module to create native browser window.
const BrowserWindow = electron.BrowserWindow
//Adds the main Menu to our app

// Keep a global reference of the window object, if you don't, the window will
// be closed automatically when the JavaScript object is garbage collected.
let mainWindow
let secondWindow

function createWindow () {
  // Create the browser window.
  mainWindow = new BrowserWindow({titleBarStyle: 'default',


    width: 1500,
    height: 900,
    minWidth: 800,
    minHeight: 600,
    backgroundColor: '#312450',
    show: false,
    icon: path.join(__dirname, 'assets/icons/png/64x64.png'),
    webPreferences: {
      preload: path.join(__dirname,'preload.js'),
      nodeIntegration: true,
      enableRemoteModule: true,
      contextIsolation: false
      
    }

   

  }

  )

  // and load the index.html of the app.
  //mainWindow.loadURL(`file://${__dirname}/index.html`)
  mainWindow.loadURL(`file://${__dirname}/index.html`)

  const { session } = require('electron')
//Toggle for DevTools 


 mainWindow.webContents.openDevTools()
  
  const contextMenu = require('electron-context-menu');

  contextMenu({
    prepend: (defaultActions, parameters, browserWindow) => [
      {
        label: 'Rainbow',
        // Only show it when right-clicking images
        visible: parameters.mediaType === 'image'
      },
      {
        label: 'Search Google for “{selection}”',
        // Only show it when right-clicking text
        visible: parameters.selectionText.trim().length > 0,
        click: () => {
          shell.openExternal(`https://google.com/search?q=${encodeURIComponent(parameters.selectionText)}`);
        }
      }
    ]

  });

  

  // Show the mainwindow when it is loaded and ready to show
  mainWindow.once('ready-to-show', () => {
    mainWindow.show()
  })

  // Emitted when the window is closed.
  mainWindow.on('closed', function () {
    // Dereference the window object, usually you would store windows
    // in an array if your app supports multi windows, this is the time
    // when you should delete the corresponding element.
    mainWindow = null
  })


  secondWindow = new BrowserWindow({frame: false,
    width: 800,
    height: 600,
    minWidth: 800,
    minHeight: 600,
    backgroundColor: '#312450',
    show: false,
    icon: path.join(__dirname, 'assets/icons/png/64x64.png'),
    parent: mainWindow,
    webPreferences: {
      nodeIntegration: true
    }
  })

  secondWindow.loadURL(`file://${__dirname}/windows/ipcwindow.html`)

  require('./menu/mainmenu')

}

ipcMain.on('open-second-window', (event, arg)=> {
    secondWindow.show()
})

ipcMain.on('close-second-window', (event, arg)=> {
    secondWindow.hide()
})

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.on('ready', createWindow)

// Quit when all windows are closed.
app.on('window-all-closed', function () {
  // On OS X it is common for applications and their menu bar
  // to stay active until the user quits explicitly with Cmd + Q
  if (process.platform !== 'darwin') {
    app.quit()
  }
})

app.on('activate', function () {
  // On OS X it's common to re-create a window in the app when the
  // dock icon is clicked and there are no other windows open.
  if (mainWindow === null) {
    createWindow()
    //importJavascriptForSections()
  }
  
})

// async function loadJS(url, location){
//   //url is URL of external file, implementationCode is the code
//   //to be called from the file, location is the location to
//   //insert the <script> element
//  var scriptTag = document.createElement('script');
//   scriptTag.src = url;
//   document.getElementById('#wrapper') .appendChild(scriptTag);

// }


//  async function importJavascriptForSections(){
//   // this.loadJS('require.js',$("#wrapper") );

//  //  <script src="assets/js/jquery.min.js"></script>
//  //  <script defer src="assets/js/jquery.scrollex.min.js"></script>
//  //  <script  defer src="assets/js/jquery.scrolly.min.js"></script>
//  //  <script defer src="assets/js/skel.min.js"></script>
//  await loadJS('assets/js/jquery.min.js', document.getElementById("#wrapper") );
//  await loadJS('assets/js/jquery.scrollex.min.js',document.getElementById("#wrapper") );
//  await loadJS('assets/js/jquery.scrolly.min.js',document.getElementById("#wrapper") );
//  await loadJS('ssets/js/skel.min.js',document.getElementById("#wrapper") );

//    this.loadJS('scripts/carrier.js',$("#wrapper") );
//    this.loadJS('scripts/customer.js',$("#wrapper") );
//    this.loadJS('scripts/login.js',$("#wrapper") );
//    this.loadJS('scripts/product.js',$("#wrapper") );
//    this.loadJS('scripts/scale.js',$("#wrapper") );
//    this.loadJS('scripts/ticket.js',$("#wrapper") );
//    this.loadJS('scripts/trailer.js',$("#wrapper") );
//    this.loadJS('scripts/truck.js',$("#wrapper") );
//    this.loadJS('scripts/weightMaster.js',$("#wrapper") );

  
//  }




// In this file you can include the rest of your app's specific main process
// code. You can also put them in separate files and require them here.
function Login() {
  //const { session } = require('electron')
  const cookie = {name: 'UserName', value: 'Hello' }
  session.defaultSession.cookies.set(cookie)
    .then(() => {
      // success
    }, (error) => {
      console.error(error)
    })
 // document.cookie = "UserName=" + $("#employeeName").val();
 // document.cookie = "WorkOrderNumber=" + "";
 // document.location = "index.html";

}
