const { isBool, isObject } = require('./helpers')

// If Gatsby keeps returning type errors, even thought you
// have added the field here, remeber to clear the cache

const fixType = field => {
    // Loop through fields details as array

    Object.keys(field).forEach(function(key) {
        switch (key) {
            case 'inputMaskIsCustom':
                field[key] = isBool(field[key]) ? field[key] : false
                break

            case 'choices':
                field[key] = JSON.stringify(field[key])
                break

            case 'enableCalculation':
                field[key] = isBool(field[key]) ? field[key] : false
                break

            case 'displayOnly':
                field[key] = isBool(field[key]) ? field[key] : false
                break
        }
    })

    return field
}

module.exports = {
    fixType,
}
