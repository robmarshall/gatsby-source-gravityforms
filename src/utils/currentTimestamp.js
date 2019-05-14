// Make unix timestamp
function getCurrentTimestamp() {
    return Math.round(new Date().getTime() / 1000)
}

module.exports = getCurrentTimestamp
