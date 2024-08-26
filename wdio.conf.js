import fs from 'fs';
import { join } from 'path';
import { dirname } from 'path';
import { fileURLToPath } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));

const environment = process.env.ENV || 'development';
const browserName = process.env.BROWSER || 'chrome';
const isGrid = process.env.GRID || false;

console.log(`Running with ENV: ${environment}`);
console.log(`Running on BROWSER: ${browserName}`);
console.log(`Running on GRID: ${isGrid}`);

export const config = {
    runner: 'local',
    
    // Adjust runner settings to connect to the correct port based on the browser
    hostname: isGrid ? 'localhost' : undefined,
    port: isGrid
        ? browserName === 'chrome' ? 4444
        : browserName === 'firefox' ? 4445
        : browserName === 'MicrosoftEdge' ? 4446
        : 4444 // Fallback to Chrome port if no match
        : undefined,
    path: isGrid ? '/wd/hub' : undefined,

    specs: [
        './test/specs/**/*.js'
    ],
    maxInstances: 5,

    capabilities: [
        {
            browserName: browserName,
            "wdio:enforceWebDriverClassic": true,
            'goog:chromeOptions': {
                args: environment === 'production' ? ['--headless', '--disable-gpu'] : ['--disable-infobars', '--window-size=1920,1080']
            },
            'moz:firefoxOptions': {
                args: environment === 'production' ? ['-headless', '--width=1920', '--height=1080'] : ['--width=1920', '--height=1080']
            },
            'ms:edgeOptions': {
                args: environment === 'production' ? ['--headless', '--disable-gpu'] : ['--disable-infobars', '--window-size=1920,1080']
            }
        }
    ],

    logLevel: 'info',
    waitforTimeout: 30000,
    connectionRetryTimeout: 180000,
    connectionRetryCount: 5,

    framework: 'mocha',
    reporters: [
        'spec',
        ['allure', { outputDir: 'allure-results' }],
        ['video', { saveAllVideos: false, videoSlowdownMultiplier: 1.5 }]
    ],

    onPrepare: () => {
        const allureResultsDir = join(__dirname, 'allure-results');
        if (!fs.existsSync(allureResultsDir)) {
            fs.mkdirSync(allureResultsDir);
        }
    }
};
