const {app,BrowserWindow,Menu} = require('electron');
const url = require('url');
const path = require('path');
const isMac=process.platform==='darwin'; //checking system
// creating main window
function createMainWindow(){
    const mainWindow = new BrowserWindow({
        title :'Metalux Resizer',

        width: 1000,

        height: 600,

    });

    // loading the UI
    mainWindow.loadFile(path.join(__dirname,'./renderer/main.html'));

}

// calling mainwindow
app.whenReady().then(()=>{
   
    app.on('activate',()=>{
        if (BrowserWindow.getAllWindows().length===0){
            createMainWindow();
        }
    })
}
    );
app.on('window-all-closed',()=>{
    if(!isMac){
        app.quit();
    }
})
