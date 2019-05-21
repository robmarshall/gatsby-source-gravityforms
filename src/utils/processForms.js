const manageRawFormFields = formObj => {
    let formFields = {
        internal: {
            contentDigest: createContentDigest(formObj),
        },
    }

    Object.keys(formObj).forEach(function(key) {
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
    })

    return formFields
}
