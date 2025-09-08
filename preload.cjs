const { contextBridge, ipcRenderer } = require('electron')

contextBridge.exposeInMainWorld('electronAPI', {
    getNames: () => ipcRenderer.invoke('get-names'),
    getTimeTracker: () => ipcRenderer.invoke('get-tracker'),
    postTimeTracker: () => ipcRenderer.invoke('post-tracker'),
    login: (name, password) => ipcRenderer.invoke('login', { name, password }),
    openDashboardWindow: () => ipcRenderer.send('open-dashboard-window')

})