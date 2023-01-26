const {app,BrowserWindow} = require('electron');
const url = require('url');
const path = require('path');
const isMac=process.platform==='darwin'; //checking system
function createMainWindow(){
    const mainWindow = new BrowserWindow({
        title :'Metalux Resizer',

        width: 1000,

        height: 600,

    });

    const startUrl = url.format({
        pathname: path.join(__dirname,'index.html'),
        protoco: 'file',

    });


    mainWindow.loadFile(path.join(__dirname,'./renderer/main.html'));
    

}


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
