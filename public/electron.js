
const { app, BrowserWindow } = require('electron');
const main = require('../build/main/Main').default;

main(app, BrowserWindow);
