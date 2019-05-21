const { isArray, isObject } = require('./helpers')

const processForms = (createContentDigest, formObj) => {
    let formFields = {
        internal: {
            contentDigest: createContentDigest(formObj),
            type: 'GF__Form',
        },
    }

    for (const [key, value] of Object.entries(formObj)) {
        // Check if value is an array
        if (!isArray(formObj[key])) {
            formFields[key] = formObj[key]

            // Check if value is an object
            if (!isObject(formObj[key])) {
                //console.log('Key: ' + key)
                //console.log('Value: ' + formObj[key])
            } else {
                //console.log(key + ' is an object!')
                // Objects do not need to be ordered in the node
            }
        } else {
            //console.log(key + ' is an array!')
            // Array elements need to be ordered, or given an order key in the node
        }
    }

    formFields.id = `gravity-form-${formFields.id}`

    return formFields
}

module.exports = {
    processForms,
}
