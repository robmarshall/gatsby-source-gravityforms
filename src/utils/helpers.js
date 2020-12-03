const { nanoid } = require('nanoid')

/**
 * Destructure array and turn to string.
 * @param  {array} array Array to be converted to a string.
 * @return {string} Flattened array.
 */
function flattenArray(array) {
    return [].concat(...array)
}

/**
 * Make unix timestamp.
 * @return {int} Unix timestamp.
 */
function getCurrentTimestamp() {
    return Math.round(new Date().getTime() / 1000)
}

/**
 * Check if element is an object.
 * @param  {mixed} element Any value/array/object etc, to be checked.
 * @return {Boolean}
 */
function isObject(element) {
    if (typeof element !== 'object') return false
    return true
}

/**
 * Check object key to see if it has values
 * @param  {obj} obj Object to check.
 * @return {Boolean}
 */
function isObjEmpty(obj) {
    for (var key in obj) {
        if (obj.hasOwnProperty(key)) return false
    }
    return true
}

/**
 * Check if value is a boolean.
 * @param  {mixed} val Value to be checked.
 * @return {Boolean}
 */
function isBool(val) {
    if (typeof variable === 'boolean') return true
    return false
}

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

/**
 * Slugify a string.
 * @param  {string} text String to slugify.
 * @return {string} Slugified string.
 */
function slugify(text) {
    return text
        .toString()
        .toLowerCase()
        .replace(/\s+/g, '-') // Replace spaces with -
        .replace(/[^\w\-]+/g, '') // Remove all non-word chars
        .replace(/\-\-+/g, '-') // Replace multiple - with single -
        .replace(/^-+/, '') // Trim - from start of text
        .replace(/-+$/, '') // Trim - from end of text
}

module.exports = {
    flattenArray,
    getCurrentTimestamp,
    isBool,
    isObject,
    isObjEmpty,
    new0AuthParameters,
    slugify,
}
