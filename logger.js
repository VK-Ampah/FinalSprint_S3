const fs = require('fs');
const path = require('path');
const winston = require('winston');
const { v4: uuidv4 } = require('uuid');

// Create the log directory if it doesn't exist
const logDirectory = path.join(__dirname, '.log');
fs.existsSync(logDirectory) || fs.mkdirSync(logDirectory);

// Define the log file path
const logFilePath = path.join(logDirectory, 'logFile.log');

// Write the header to the log file
fs.writeFileSync(logFilePath, 'Level - Date - User - Method - Route - Url - Database - SearchCategory - SearchTerm - StatusCode - Message\n', { flag: 'a' });

const logger = winston.createLogger({
    level: 'info',
    format: winston.format.combine(
        winston.format.timestamp({
            format: 'YYYY-MM-DD HH:mm:ss'
        }),
        winston.format.printf(info => `${info.level} - ${info.timestamp} - ${info.message}`)
    ),
    transports: [
        new winston.transports.File({ filename: logFilePath })
    ]
});

const logMiddleware = (req, res, next) => {
    req.logId = uuidv4();
    // get information about the request
    const username = req.session.username || 'Anonymous';
    const database = req.session.database || 'None';
    const attribute = req.session.attribute || 'None';
    const position = req.session.position || 'None';
    const method = req.method;
    const route = req.path;
    const url = req.originalUrl;
    const statusCode = res.statusCode;
    let statusMessage;
    let logLevel;

    if (statusCode >= 200 && statusCode < 300) {
        statusMessage = 'Success';
        logLevel = 'info';
    } else if (statusCode >= 400 && statusCode < 500) {
        statusMessage = 'Client error';
        logLevel = 'warn';
    } else if (statusCode >= 500) {
        statusMessage = 'Server error';
        logLevel = 'error';
    }

    // Log the basic request details
    logger.log({
        level: logLevel,
        message: `${username}, ${method}, ${route}, ${url}, ${database}, ${position}, ${attribute}, ${statusCode}, ${statusMessage}`
    });

    next();
};

module.exports = logMiddleware;


const logMiddelwareSignIn = (req, res, next) => {

    const now = new Date();
    const formattedDate = `${now.getFullYear()}-${now.getMonth() + 1}-${now.getDate()} ${now.getHours()}:${now.getMinutes()}:${now.getSeconds()}`;
    const username = req.session.username || 'Anonymous';
    const method = req.method;
    const route = req.path;
    const url = req.originalUrl;
    const statusCode = res.statusCode;
    const statusMessage = statusCode >= 200 && statusCode < 300 ? 'Success' : 'Error';
    const ipAddress = req.ip;

    // Log the basic request details

    log.info(`${formattedDate} - User: ${username}, Method: ${method}, Route: ${route}, Url: ${url}, IP Address: ${ipAddress} Status Code: ${statusCode}, Message: ${statusMessage}`);

    next();
}

const logMiddelwareSignUp = (req, res, next) => {

    const now = new Date();
    const formattedDate = `${now.getFullYear()}-${now.getMonth() + 1}-${now.getDate()} ${now.getHours()}:${now.getMinutes()}:${now.getSeconds()}`;
    const username = req.session.username || 'Anonymous';
    const method = req.method;
    const route = req.path;
    const url = req.originalUrl;
    const statusCode = res.statusCode;
    const statusMessage = statusCode >= 200 && statusCode < 300 ? 'Success' : 'Error';
    const ipAddress = req.ip;

    // Log the basic request details

    log.info(`${formattedDate} - User: ${username}, Method: ${method}, Route: ${route}, Url: ${url}, IP Address: ${ipAddress} Status Code: ${statusCode}, Message: ${statusMessage}`);

    next();
}


module.exports = logMiddleware;