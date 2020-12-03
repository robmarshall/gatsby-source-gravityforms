const { isObject } = require('./helpers')
const { fixType } = require('./fixType')
const { formSchema } = require('../schema/formSchema')
const { fieldSchema } = require('../schema/fieldSchema')

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
    // Take the default form schema, and overlay the user form data onto it.
    // This is only the main form data, not individual fields
    // This should help reduce the errors that occur on a query that does not exist.
    // Will force it to return null
    const mergedSchemaData = { ...formSchema, ...formObj }

    // Add the Gatsby internal information.
    // contentDigest tracks any changes and lets Gatsby know if
    // the data needs to be rerendered, or is everything is
    // the same.
    let newFormObj = {
        id: createNodeID(`gravity-form-${mergedSchemaData.id.toString()}`),
        formId: parseInt(mergedSchemaData.id),
        internal: {
            contentDigest: createContentDigest(mergedSchemaData),
            type: 'GF__Form',
        },
    }

    // Delete the original raw object id, as in the loop below
    // all keys are pulled into the new object. No need to
    // process it.
    delete mergedSchemaData.id

    // Ignore fields sets fields to skip. This could be due to
    // sensitive info or not needed on the frontend

    // TODO: Use an object instead of an array. But array was
    // easier for now.
    ignoreFields = Array.isArray(ignoreFields) ? ignoreFields : null

    // Loop through the form fields. Check we want to show all
    // fields, ensure fields are formatted correctly,
    // updated fields that are called protected names (e.g. fields)
    for (const [key, value] of Object.entries(mergedSchemaData)) {
        if (!ignoreFields.includes(key)) {
            if (key == 'fields') {
                // Gatsby has saved 'fields' for its own use
                // so we cannot use this key.

                // Loop through all fields
                mergedSchemaData[key].forEach(function(arr, i) {
                    // If the first form field, add the field schema
                    // After the first loop this is no longer needed

                    // Run through the fieldSchema, like we did with the main form data
                    // to reduce query errors

                    const currentField =
                        i < 1 ? { ...fieldSchema, ...arr } : arr

                    // Then fix the data types of certain fields, to make sure
                    // everything is consistant
                    mergedSchemaData[key][i] = fixType(currentField)
                })

                // Push to new object
                newFormObj['formFields'] = mergedSchemaData[key]
            } else if (key === 'confirmations') {
                // Gravity Forms saves confirmations in a strange object
                // layout. It would be better to clean this up

                let cleanConfirmations = []

                for (const [subKey, subValue] of Object.entries(
                    mergedSchemaData[key]
                )) {
                    cleanConfirmations.push(mergedSchemaData[key][subKey])
                }

                // Push to new object
                newFormObj['confirmations'] = cleanConfirmations
            } else {
                newFormObj[key] = mergedSchemaData[key]
            }
        }
    }

    return newFormObj
}

module.exports = {
    processForms,
}
