const axios = require('axios')

exports.sourceNodes = async (
    { boundActionCreators: { createNode }, createNodeId },
    { plugins, baseUrl, api, basicAuth }
) => {
    const { createNode } = actions

    console.log(baseUrl)
    console.log(api)
    console.log(basicAuth)
}
