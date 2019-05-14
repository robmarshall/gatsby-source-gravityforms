const axios = require("axios")

exports.sourceNodes = async (
  { boundActionCreators: { createNode }, createNodeId },
  { plugins, baseUrl, api, basicAuth }
) => {
  const { createNode } = actions

  const wpStandardUrl = "/wp-json/gf/v2"

  // Create URL to get all form data
  const allFormsURL = baseUrl + wpStandardUrl + "/forms"

  // Get all active forms
  axios.get()
}
