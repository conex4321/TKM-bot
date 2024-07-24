const fs = require('fs-extra');
const { Sequelize } = require('sequelize');
if (fs.existsSync('set.env'))
    require('dotenv').config({ path: __dirname + '/set.env' });
const path = require("path");
const databasePath = path.join(__dirname, './database.db');
const DATABASE_URL = process.env.DATABASE_URL === undefined
    ? databasePath
    : process.env.DATABASE_URL;
module.exports = { session: process.env.SESSION_ID || 'eyJub2lzZUtleSI6eyJwcml2YXRlIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoia0IwQVBRcFlWOXR2RC9lOHBGVWt0TkxaNVE0UzY0WjBOWnBRcElIbzQwaz0ifSwicHVibGljIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiK3VOYXJsQ2JIMHRVdHpEcGxPcXJuakxTcWM0bnRFSjdoejJZQVpXa0lpVT0ifX0sInBhaXJpbmdFcGhlbWVyYWxLZXlQYWlyIjp7InByaXZhdGUiOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiJVSTBoVk5hNit4MWlLalhpblJKTDJTbjF6ek12amN6UllCOU1CY09NbEg4PSJ9LCJwdWJsaWMiOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiJCYzduVTd3bUNMSVhYdGxDNThpKzNLeEUwM1kwQUNUN3VPMWQwMC9pbkFZPSJ9fSwic2lnbmVkSWRlbnRpdHlLZXkiOnsicHJpdmF0ZSI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6InFLOTBYSVIrZkJhbExXNnowaFByNlhmSW1rMEI3OVZET2tFVmkzT012WEU9In0sInB1YmxpYyI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6IlBKdlB4Z01SekR6UmVoYUxYck41akYwYW55UGFVZkJIVndWWjBtOGR1VjA9In19LCJzaWduZWRQcmVLZXkiOnsia2V5UGFpciI6eyJwcml2YXRlIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiQ0xLTjBleUpIQlZOVHA1R3ZLNUdEbTdiRmdndmcxN256VVNkUHVkUndIQT0ifSwicHVibGljIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiOHJ2SWN2bXRuUzZvTFE1bzNnS2lCRjNNQ2o1ZHkvRUlIeGxtQTd6d3NGWT0ifX0sInNpZ25hdHVyZSI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6IlUwNVo1TlFhRXZtb0pGSkl3Nmg4SGtzRlRnc25IUEdSYnFuY0JLblBER2w4a0E0eFUwWXBlTEJaWW1jak5yQkNoQXpIT2htQ2lSRmVHNXdIU3ZJVWpnPT0ifSwia2V5SWQiOjF9LCJyZWdpc3RyYXRpb25JZCI6MTA1LCJhZHZTZWNyZXRLZXkiOiJ2R3JXRGRmaHdEeFZrSCs2NFV5L2RGZGlWN3NSaVpsY0NyWnpXcFpvOHAwPSIsInByb2Nlc3NlZEhpc3RvcnlNZXNzYWdlcyI6W10sIm5leHRQcmVLZXlJZCI6MzEsImZpcnN0VW51cGxvYWRlZFByZUtleUlkIjozMSwiYWNjb3VudFN5bmNDb3VudGVyIjowLCJhY2NvdW50U2V0dGluZ3MiOnsidW5hcmNoaXZlQ2hhdHMiOmZhbHNlfSwiZGV2aWNlSWQiOiJlWkd3NHFwNFN3R0tQTXlnMFBWYnBBIiwicGhvbmVJZCI6IjAwNmMwYzQwLTQ1MTEtNDRiZS1iNTkxLTc1ZDZjMjk2ZWU2ZCIsImlkZW50aXR5SWQiOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiJNNUFDdUNnUjdUcVZPNlB2czE0dmtKVHB2S0U9In0sInJlZ2lzdGVyZWQiOmZhbHNlLCJiYWNrdXBUb2tlbiI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6InY0dEZaeFBjdjN1ZXNTQkZrZTVvOVA5SjZDQT0ifSwicmVnaXN0cmF0aW9uIjp7fSwiYWNjb3VudCI6eyJkZXRhaWxzIjoiQ0xlUXV1Z0dFTzJlaExVR0dBZ2dBQ2dBIiwiYWNjb3VudFNpZ25hdHVyZUtleSI6ImdBY1d0VWdNN0FEbjJnMTBJS0dsTnB2b04xUzlzM0lsNDhBbm9ZWGRGQjQ9IiwiYWNjb3VudFNpZ25hdHVyZSI6ImlqaTJPUlg2eEZJNStBc2xmWmh5VGtFVldEL2wyVU42ZTVzOTR0b0labngwamhNVHgwSlNXKzVvakRUYkNLazFNOG56TUJ0SmtSaWYzYlFCMytHTUR3PT0iLCJkZXZpY2VTaWduYXR1cmUiOiJONlBaN3liZTRqancyOGc0ZVNuSXN3OEtReklQU05QMkRiUkR2ZjRxdXFoREpyZlBSQzRBTTlMM3E2UGJVaVcwUlZ0Z2hQYjM3dUFaMUJLcU5XT0tqQT09In0sIm1lIjp7ImlkIjoiMjU0NzI4NDY3NjU2OjM2QHMud2hhdHNhcHAubmV0IiwibGlkIjoiMjQ4MDc3MzQ0NjI4OTM0OjM2QGxpZCJ9LCJzaWduYWxJZGVudGl0aWVzIjpbeyJpZGVudGlmaWVyIjp7Im5hbWUiOiIyNTQ3Mjg0Njc2NTY6MzZAcy53aGF0c2FwcC5uZXQiLCJkZXZpY2VJZCI6MH0sImlkZW50aWZpZXJLZXkiOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiJCWUFIRnJWSURPd0E1OW9OZENDaHBUYWI2RGRVdmJOeUplUEFKNkdGM1JRZSJ9fV0sInBsYXRmb3JtIjoiYW5kcm9pZCIsInJvdXRpbmdJbmZvIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiQ0F3SUJRPT0ifSwibGFzdEFjY291bnRTeW5jVGltZXN0YW1wIjoxNzIxODMxMjkwLCJsYXN0UHJvcEhhc2giOiIyUnV0TjAifQ==',
    PREFIXE: process.env.PREFIX || ".",
    OWNER_NAME: process.env.OWNER_NAME || "Conex",
    NUMERO_OWNER : process.env.OWNER_NUM || "254728467656",              
    AUTO_READ_STATUS: process.env.AUTO_READ_STATUS || "non",
    AUTO_DOWNLOAD_STATUS: process.env.AUTO_DOWNLOAD_STATUS || 'non',
    BOT : process.env.BOT_NAME || 'TKM bot',
    URL : process.env.BOT_MENU_LINKS || 'https://telegra.ph/file/e07a3d933fb4cad0b3791.jpg',
    MODE: process.env.PUBLIC_MODE || "yes",
    PM_PERMIT: process.env.PM_PERMIT || 'no',
    HEROKU_APP_NAME : process.env.HEROKU_APP_NAME,
    HEROKU_APY_KEY : process.env.HEROKU_APY_KEY ,
    WARN_COUNT : process.env.WARN_COUNT || '3' ,
    ETAT : process.env.PRESENCE || '',
    //GPT : process.env.OPENAI_API_KEY || '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',
    DP : process.env.STARTING_BOT_MESSAGE || "yes",
    TZ : process.env.TIME_ZONE || 'Etc/GMT',
    ADM : process.env.ANTI_DELETE_MESSAGE || 'no',
    BOOM_MESSAGE_LIMIT : process.env.BOOM_MESSAGE_LIMIT || 100,
    PORT : process.env.PORT || 8000,
    LINK : process.env.LINK || '',
    DATABASE_URL,
    DATABASE: DATABASE_URL === databasePath
        ? "postgresql://tkm:Aqi6tqwyv5IwDHncTtVi5XtMGZvfndDJ@dpg-cqahogtds78s739sl81g-a.oregon-postgres.render.com/takudzwa" : "postgresql://conex_user:mC1KYIsOzbT5r82KtLmMAJVRbBhrryzb@dpg-cqelgp9u0jms739etkpg-a.oregon-postgres.render.com/conex",
    /* new Sequelize({
     dialect: 'sqlite',
     storage: DATABASE_URL,
     logging: false,
})
: new Sequelize(DATABASE_URL, {
     dialect: 'postgres',
     ssl: true,
     protocol: 'postgres',
     dialectOptions: {
         native: true,
         ssl: { require: true, rejectUnauthorized: false },
     },
     logging: false,
}),*/
};
let fichier = require.resolve(__filename);
fs.watchFile(fichier, () => {
    fs.unwatchFile(fichier);
    console.log(`update ${__filename}`);
    delete require.cache[fichier];
    require(fichier);
});
