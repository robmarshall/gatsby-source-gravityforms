// Destructure array and turn to string
function flattenArray(array) {
    return [].concat(...array)
}

// Make unix timestamp
function getCurrentTimestamp() {
    return Math.round(new Date().getTime() / 1000)
}

// Check if element is array
function isArray(element) {
    if (!element) return false
    return element.constructor === Array
}

// Check if element is an object
function isObject(element) {
    if (!element) return false
    if (typeof element !== 'object') return false
    if (element instanceof Array) return false
    return true
}

// Check object key to see if it has values
function isObjEmpty(obj) {
    for (var key in obj) {
        if (obj.hasOwnProperty(key)) return false
    }
    return true
}

module.exports = {
    flattenArray,
    getCurrentTimestamp,
    isArray,
    isObject,
    isObjEmpty,
}
