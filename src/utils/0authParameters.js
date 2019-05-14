const getCurrentTimestamp = require('./currentTimestamp.js')
const nanoid = require('nanoid')

/**
 * A function to create 0Auth parameters. Ensuring timestamp and
 * nonce are aways as new as possible.
 * @param  {string} consumerKey Consumer key for 0Auth
 * @return {object}             The final output for 0Auth to used
 */

function new0AuthParameters(consumerKey) {
    return {
        oauth_consumer_key: consumerKey,
        oauth_timestamp: getCurrentTimestamp(),
        oauth_signature_method: 'HMAC-SHA1',
        oauth_version: '1.0',
        oauth_nonce: nanoid(11),
    }
}

module.exports = new0AuthParameters
