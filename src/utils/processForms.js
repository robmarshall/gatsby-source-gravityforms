const { isObject } = require('./helpers')
const formSchema = require('../schema/formSchema')
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
    // Take the default form schema, and overlay the user data onto it.
    // This should help reduce the errors that occur on a query that does not exist.
    // Will force it to return null
    const mergedSchemaData = { ...formObj, ...formSchema }

    // Add the Gatsby internal information.
    // contentDigest tracks any changes and lets Gatsby know if
    // the data needs to be rerendered, or is everything is
    // the same.
    let newFormObj = {
        id: createNodeID(`gravity-form-${formObj.id.toString()}`),
        formId: parseInt(formObj.id),
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
            if (key == 'fields') {
                // Gatsby has saved 'fields' for its own use
                // so we cannot use this key.

                // Loop through all fields
                formObj[key].forEach(function(arr, i) {
                    formObj[key][i] = fixType(arr)
                })

                // Push to new object
                newFormObj['formFields'] = formObj[key]
            } else if (key === 'confirmations') {
                // Gravity Forms saves confirmations in a strange object
                // layout. It would be better to clean this up

                let cleanConfirmations = []

                for (const [subKey, subValue] of Object.entries(formObj[key])) {
                    cleanConfirmations.push(formObj[key][subKey])
                }

                // Push to new object
                newFormObj['confirmations'] = cleanConfirmations
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
