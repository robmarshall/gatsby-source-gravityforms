function isObject(element) {
    if (!element) return false
    if (typeof element !== 'object') return false
    if (element instanceof Array) return false
    return true
}

function isObjEmpty(obj) {
    for (var key in obj) {
        if (obj.hasOwnProperty(key)) return false
    }
    return true
}

function flattenArray(array) {
    return [].concat(...array)
}

function isArray(prop) {
    if (!prop) return false
    return prop.constructor === Array
}

module.exports = {
    isObject,
    isObjEmpty,
    flattenArray,
    isArray,
}
