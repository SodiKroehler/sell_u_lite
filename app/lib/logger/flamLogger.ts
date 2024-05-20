const logger = require('pino')()
//https://getpino.io/#/docs/api


export const error = (msg) => {
    logger.err(msg)
}

export const info = (msg) => {
    logger.info(msg)
}

export const debug = (msg) => {
    logger.error(msg)
}

export const debugm = (msg, val) => {
    logger.error(msg + ": %O", val)
}

