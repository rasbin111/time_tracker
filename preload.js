const { contextBridge, ipcRenderer } = require('electron')
const users = require("./models/users")
const db = require("./db_mgr")

contextBridge.exposeInMainWorld('electronAPI', {
    getNames: () => ipcRenderer.invoke('get-names'),
    db: db,

})