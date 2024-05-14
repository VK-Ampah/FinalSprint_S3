const fs = require('fs');
const path = require('path');
const winston = require('winston');
const { v4: uuidv4 } = require('uuid');



// Create the log directory if it doesn't exist
const logDirectory = path.join(__dirname, '.log');
// Create the log directory if it doesn't exist
if (!fs.existsSync(logDirectory)) {
        fs.mkdirSync(logDirectory);
 }
 // dates processing
 const date = new Date();
 const dateString = `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}-${String(date.getDate()).padStart(2, '0')}`;
 const dateYear = `${date.getFullYear()}`;
 const dateMonth = date.toLocaleString('default', { month: 'long' }).slice(0, 3); // Get the first three letters of the month name

 const pathSubfolder = path.join(logDirectory);
 if (!fs.existsSync(pathSubfolder)) {
    fs.mkdirSync(pathSubfolder);}

  // Create a log subfolder path with current YEAR value of current data as folder name in the log directory
  const logYearSubfolderPath = path.join(pathSubfolder, dateYear);
 
  if (!fs.existsSync(logYearSubfolderPath)) {
      fs.mkdirSync(logYearSubfolderPath);
  }
  const logMonthSubfolderPath = path.join(logYearSubfolderPath, dateMonth);
 
  if (!fs.existsSync(logMonthSubfolderPath)) {
      fs.mkdirSync(logMonthSubfolderPath);
  }

// Create a log file path using the current date as file name the month subfolder as its root
const logFilePath = path.join(logMonthSubfolderPath, `${dateString}.log`);

const logger = winston.createLogger({
    level: 'info',
    format: winston.format.combine(
        winston.format.timestamp({
            format: 'YYYY-MM-DD HH:mm:ss'
        }),
        winston.format.printf(info => `${info.level},${info.timestamp},${info.message}`)
    ),
    transports: [
        new winston.transports.File({ filename: logFilePath })
    ]
});

const logMiddleware = (req, res, next) => {
    // get information about the request
    req.logId = uuidv4();
    const user_id = req.session.user_id || 'Anonymous';
    const database = req.session.database || 'None';
    const attribute = req.session.attribute || 'None';
    const position = req.session.position || 'None';
    const method = req.method;
    const route = req.url;
    const url = req.originalUrl;
    const statusCode = res.statusCode;
    const logId = req.logId;
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
    if(req.url !== '/favicon.ico') {
    logger.log({
        level: logLevel,
        message: `${user_id},${method},${route},${url},${database},${position},${attribute},${statusCode},${statusMessage},${logId}`
    });
}

    next();
};

const logMiddelwareSignIn = (req, res, next) => {
    // get information about the request
    req.logId = uuidv4();   
    const user_id = req.session.user_id || 'Anonymous';
    const method = req.method;
    const route = req.url;
    const url = req.originalUrl;
    const statusCode = res.statusCode;
    const ipAddress = req.ip;
    const logId = req.logId;
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
    if(req.url !== '/favicon.ico') {
    logger.log({
        level: 'info',
        message: `${user_id},${method},${route},${url},${ipAddress},${statusCode},${statusMessage},${logId}`
    });
}

    next();
}

const logMiddelwareSignUp = (req, res, next) => {
    // get information about the request
    req.logId = uuidv4();
    const logId = req.logId;
    const user_id = req.session.user_id || 'Anonymous';
    const method = req.method;
    const route = req.url;
    const url = req.originalUrl;
    const statusCode = res.statusCode;
    const ipAddress = req.ip;
    let statusMessage;
    let logLevel;

    // Determine the status message and log level based on the status code
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

    if(req.url !== '/favicon.ico') {
    logger.log({
        level: logLevel,
        message: `${user_id},${method},${route},${url},${ipAddress},${statusCode},${statusMessage},${logId}`
    });
}

    next();
}

const logMiddelwareHome = (req, res, next) => {
        // get information about the request
        req.logId = uuidv4();
        const logId = req.logId;
        const user_id = req.session.user_id || 'Anonymous';
        const method = req.method;
        const route = req.baseUrl ? req.baseUrl : '/';
        const url = req.originalUrl;
        const statusCode = res.statusCode;
        const ipAddress = req.ip;
        let statusMessage;
        let logLevel;
    
        // Determine the status message and log level based on the status code
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
        if(req.url !== '/favicon.ico') {
        logger.log({
            level: logLevel,
            message: `${user_id},${method},${route},${url},${ipAddress},${statusCode},${statusMessage},${logId}`
        });
    }
    
        next();
    }


module.exports = { logMiddleware, logMiddelwareSignIn, logMiddelwareSignUp, logMiddelwareHome};
