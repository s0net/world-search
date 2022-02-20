const {
    app,
    BrowserWindow,
    ipcMain
} = require('electron');
const path = require('path');

const makewin = () => {
    const win = new BrowserWindow({
        width: 1200,
        height: 900,
        autoHideMenuBar: true,
        icon: path.join(__dirname, './public/image/icon.png'),
        center: true,
        webPreferences: {
            nodeIntegration: true,
            contextIsolation: false,
            preload: path.join(__dirname, './js/preload.js')
        }
    });
    win.loadFile(path.join(__dirname, "./public/index.html"))
}
app.on('window-all-closed', () => {
    if (process.platform !== 'darwin') {
        app.quit()
    }
})

app.on('activate', () => {
    if (BrowserWindow.getAllWindows().length === 0) {
        makewin();
    }
});

if (process.platform == 'win32') {
    const gotTheLock = app.requestSingleInstanceLock()

    if (!gotTheLock) {
        app.quit()
    } else {
        app.on('second-instance', (event, commandLine, workingDirectory) => {
            if (global.mainWindow) {
                if (global.mainWindow.isMinimized()) global.mainWindow.restore()
                global.mainWindow.focus()
            }
        })

        app.whenReady().then(() => {
            makewin()
        })
    }
} else {
    app.whenReady().then(() => {
        makewin()
    })

}

if (process.defaultApp) {
    if (process.argv.length >= 2) {
        app.setAsDefaultProtocolClient('snet', process.execPath, [path.resolve(process.argv[1])])
    }
} else {
    app.setAsDefaultProtocolClient('snet')
}

app.on('window-all-closed', () => {
    if (process.platform !== 'darwin') {
        app.quit();
    }
});

ipcMain.on('shell:open', () => {
    const pagePath = path.join(__dirname, "./index.html");
    shell.openExternal(pagePath)
})

ipcMain.on('shell:pacman', () => {
    const pagePath = path.join(__dirname, "./pacman.html")
    shell.openExternal(pagePath)
})