import { app, BrowserWindow } from 'electron';
import * as path from 'path';
import installExtension, { REACT_DEVELOPER_TOOLS } from "electron-devtools-installer";
import { ChildProcess, spawn } from 'child_process';

let jsonServerProcess: ChildProcess | null;

const INITIAL_WINDOW_SIZE = {
  WIDTH: 1200,
  HEIGHT: 900,
}

function createWindow() {
  const win = new BrowserWindow({
    width: INITIAL_WINDOW_SIZE.WIDTH,
    height: INITIAL_WINDOW_SIZE.HEIGHT,
    minWidth: INITIAL_WINDOW_SIZE.WIDTH,  // Minimum width
    minHeight: INITIAL_WINDOW_SIZE.HEIGHT, // Minimum height
    webPreferences: {
      // contextIsolation: false,
      preload: path.join(__dirname, 'preload.js')
    },
  })

  win.removeMenu();

  if (app.isPackaged) {
    // 'build/index.html'
    win.loadURL(`file://${__dirname}/../index.html`);
  } else {
    win.loadURL('http://localhost:3000/index.html');

    win.webContents.openDevTools();

    // Hot Reloading on 'node_modules/.bin/electronPath'
    require('electron-reload')(__dirname, {
      electron: path.join(__dirname,
        '..',
        '..',
        'node_modules',
        '.bin',
        'electron' + (process.platform === "win32" ? ".cmd" : "")),
      forceHardReset: true,
      hardResetMethod: 'exit'
    });
  }
}

function startJsonServer() {
  // Start JSON Server in a child process
  jsonServerProcess = spawn('npx', ['json-server', '--watch', 'db.json', '--port', '3001'], {
    stdio: 'ignore',
    shell: true,
    windowsHide: true,
  });

  jsonServerProcess.on('error', (error) => {
    console.error('Failed to start JSON Server:', error);
  });
}

app.whenReady().then(() => {
  // DevTools
  installExtension(REACT_DEVELOPER_TOOLS)
    .then((name) => console.log(`Added Extension:  ${name}`))
    .catch((err) => console.log('An error occurred: ', err));

  startJsonServer();
  createWindow();

  app.on('activate', () => {
    if (BrowserWindow.getAllWindows().length === 0) {
      createWindow();
    }
  });

  app.on('window-all-closed', () => {
    if (jsonServerProcess) jsonServerProcess.kill();
    if (process.platform !== 'darwin') {
      app.quit();
    }
  });
});
