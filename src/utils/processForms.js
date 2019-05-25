const { isObject } = require('./helpers')
const { fixType } = require('./fixType')

/**
 * Take raw Gravity Forms data and turn into usable
 * Gatsby consumable objects.
 * @param  function     createContentDigest Gatsby helper function to make digest
 * @param  function     createNodeID        Gatsby helper function to make ID
 * @param  object       formObj             Raw Gravity Forms form info
 * @param  array        ignoreFields        Array of top level fields to ignore
 * @return object                           Processed form data
 */

const processForms = (
    createContentDigest,
    createNodeID,
    formObj,
    ignoreFields
) => {
    // Add the Gatsby internal information.
    // contentDigest tracks any changes and lets Gatsby know if
    // the data needs to be rerendered, or is everything is
    // the same.

    let newFormObj = {
        id: createNodeID(`gravity-form-${formObj.id.toString()}`),
        internal: {
            contentDigest: createContentDigest(formObj),
            type: 'GF__Form',
        },
    }

    // Delete the original raw object id, as in the loop below
    // all keys are pulled into the new object. No need to
    // process it.

    delete formObj.id

    // Ignore fields sets fields to skip. This could be due to
    // sensitive info or not needed on the frontend

    // TODO: Use an object instead of an array. But array was
    // easier for now.

    ignoreFields = Array.isArray(ignoreFields) ? ignoreFields : null

    // Loop through the form fields. Check we want to show all
    // fields, ensure fields are formatted correctly,
    // updated fields that are called protected names (e.g. fields)

    for (const [key, value] of Object.entries(formObj)) {
        if (!ignoreFields.includes(key)) {
            // Gatsby has saved 'fields' for its own use
            // so we cannot use this key.
            if (key == 'fields') {
                // Loop through all fields
                formObj[key].forEach(function(arr, i) {
                    formObj[key][i] = fixType(arr)
                })
                newFormObj['formFields'] = formObj[key]
            } else {
                newFormObj[key] = formObj[key]
            }
        }
    }

    return newFormObj
}

module.exports = {
    processForms,
}
