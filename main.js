import { app, BrowserWindow, Menu, ipcMain } from "electron"
import path from "path"
import { fileURLToPath } from "url";
import { getNames } from "./models/users.js"
import { getTimeTracker, postTimeTracker } from "./models/time_tracker.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const isDev = process.env.NODE_ENV !== "production"
const isMac = process.platform === "darwin"

ipcMain.handle('get-names', getNames);
ipcMain.handle('post-tracker', postTimeTracker)
ipcMain.handle('get-tracker', getTimeTracker)

const createMainWindow = () => {
    const mainWindow = new BrowserWindow({
        width: isDev ? 1000 : 800,
        height: 600,
        title: "Time Tracker",
        webPreferences: {
            preload: path.join(__dirname, 'preload.cjs')
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
            preload: path.join(__dirname, 'preload.js'),
            contextIsolation: true,
            nodeIntegration: false
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
