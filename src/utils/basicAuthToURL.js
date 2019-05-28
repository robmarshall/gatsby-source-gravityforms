function addBasicAuthToURL(basicAuth, url) {
    let protocol = url.split('//')[0]

    // Check basic auth
    if (!basicAuth.username || !basicAuth.password) {
        console.log('Basic auth details not included')
    }

    // Check protocol exists
    if (protocol.includes('http')) {
        // Re-add // back to string. This is needed later for replacement
        protocol = protocol + '//'

        // Add basic auth after protocol
        const authString =
            protocol + basicAuth.username + ':' + basicAuth.password + '@'

        // Replace current protocol with new string
        const newUrl = url.replace(protocol, authString)
        return newUrl
    } else {
        console.log('Protocol not included.')
    }
    return url
}

module.exports = {
    addBasicAuthToURL,
}
