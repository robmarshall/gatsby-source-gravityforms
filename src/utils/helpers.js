// Destructure array and turn to string
function flattenArray(array) {
    return [].concat(...array)
}

// Make unix timestamp
function getCurrentTimestamp() {
    return Math.round(new Date().getTime() / 1000)
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

function isBool(val) {
    if (typeof variable === 'boolean') return true
    return false
}

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
    slugify,
}
