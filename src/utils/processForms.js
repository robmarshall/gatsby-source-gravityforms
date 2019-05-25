const { isArray, isObject } = require('./helpers')

/**
 * Take raw Gravity Forms data and turn into usable
 * Gatsby consumable objects.
 * @param  function     createContentDigest Gatsby helper function
 * @param  object       formObj             Raw Gravity Forms form info
 * @param  array        ignoreFields        Array of top level fields to ignore
 * @return object                           Processed form data
 */

const processForms = (createContentDigest, formObj, ignoreFields) => {
    // Add the Gatsby internal information.
    // contentDigest tracks any changes and lets Gatsby know if
    // the data needs to be rerendered, or is everything is
    // the same.

    let newFormObj = {
        internal: {
            contentDigest: createContentDigest(formObj),
            type: 'GF__Form',
        },
    }

    // Ignore fields sets fields to skip. This could be due to
    // sensitive info or not needed on the frontend
    // We need to ensure the ignore fields are only an array.
    // If it is anything else, it will break the loop. If it
    // is not an array, empty!

    // TODO: Use an object instead of an array. But array was
    // easier for now.

    ignoreFields = isArray(ignoreFields) ? ignoreFields : null

    // Loop through the form fields. Check we want to show all
    // fields, ensure fields are formatted correctly,
    // updated fields that are called protected names (e.g. fields)
    // Finally, add a Gatsby ID

    for (const [key, value] of Object.entries(formObj)) {
        if (!ignoreFields.includes(key)) {
            // If the value is an object, add it right away.
            // No changes are needed (yet).
            //
            // TODO: Check if there are arrays within the object

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
