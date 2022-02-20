const { contextBridge, ipcRenderer } = require('electron')

contextBridge.exposeInMainWorld(
  'shell',
  {
    open: () => ipcRenderer.send('shell:open'),
    pacman: () => ipcRenderer.send('shell:pacman'),
  }
)