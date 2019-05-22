const { isArray, isObject } = require('./helpers')

const processForms = (createContentDigest, formObj) => {
    let newFormObj = {
        internal: {
            contentDigest: createContentDigest(formObj),
            type: 'GF__Form',
        },
    }

    // Set fields to skip. This could be due to sensitive info
    // or not needed on the frontend
    const ignoreFields = ['notifications']

    for (const [key, value] of Object.entries(formObj)) {
        if (!ignoreFields.includes(key)) {
            // Check if value is an array
            if (!isArray(formObj[key])) {
                newFormObj[key] = formObj[key]
            } else {
                let newContent = {}
                let arrayCount = 0

                formObj[key].forEach(arr => {
                    // Today arrays do not start at 0
                    // Because we are turning these to objects
                    arrayCount = arrayCount + 1
                    newContent[arrayCount] = arr
                })

                // Gatsby has saved 'fields' for its own use
                // We need to rename Gravity Form fields to something new
                if (key == 'fields') {
                    newFormObj['formFields'] = newContent

                    // @TODO
                    // Need to create processor that fixes
                    // type issues
                    // and opens up choices into objects
                } else {
                    newFormObj[key] = newContent
                }
            }
        }
    }

    newFormObj.id = `gravity-form-${newFormObj.id}`

    return newFormObj
}

module.exports = {
    processForms,
}
