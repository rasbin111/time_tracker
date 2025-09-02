const { contextBridge, ipcRenderer } = require('electron')
const users = require("./models/users")

contextBridge.exposeInMainWorld('users', {
    getNames: () => users.getNames()
})