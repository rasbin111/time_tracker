const { app, BrowserWindow, Menu, ipcMain } = require("electron")
const path = require("path")
const { getNames } = require("./models/users")
const isDev = process.env.NODE_ENV !== "production"
const isMac = process.platform === "darwin"

const createMainWindow = () => {
    const mainWindow = new BrowserWindow({
        width: isDev ? 1000 : 800,
        height: 600,
        title: "Time Tracker",
        webPreferences: {
            contextIsolation: true,
            nodeIntegration: true,
            preload: path.join(__dirname, 'preload.js')
        }
    })

    const mainMenu = Menu.buildFromTemplate(menu)
    Menu.setApplicationMenu(mainMenu)
    // open dev tools 
    if (isDev) {
        mainWindow.webContents.openDevTools();
    }

    mainWindow.loadFile(path.join(__dirname, "./renderer/index.html"))
}

const createAboutWindow = () => {
    const mainWindow = new BrowserWindow({
        width: 300,
        height: 300,
        title: "About Time Tracker",
        webPreferences: {
            preload: path.join(__dirname, 'preload.js')
        }

    })

    const mainMenu = Menu.buildFromTemplate(menu)
    Menu.setApplicationMenu(mainMenu)

    mainWindow.loadFile(path.join(__dirname, "./renderer/about.html"))
}

// menu template 
const menu = [
    ...isMac ? [{
        label: app.name,
        submenu: [
            {
                label: "About",
                click: createAboutWindow
            }
        ]
    }] : [],
    {
        label: "File",
        submenu: [
            {
                label: "quit",
                click: () => app.quit(),
                accelerator: "CmdOrCtrl+W"
            }
        ]
    },
    ...!isMac ? [{
        label: "Help",
        submenu: [
            {
                label: "About",
                click: createAboutWindow
            }
        ]
    }] : []
]

app.whenReady().then(() => {
    createMainWindow()
    ipcMain.handle('get-names', getNames)
    app.on("activate", () => {
        if (BrowserWindow.getAllWindows().length == 0) createMainWindow()
    })
})



app.on('window-all-closed', () => {
    if (!isMac) app.quit()
})