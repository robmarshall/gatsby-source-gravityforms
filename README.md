# gatsby-source-gravityforms

In `gatsby-config.js`:

```js
module.exports = {
    plugins: [
        {
            resolve: 'gatsby-source-gravityforms',
            options: {
                baseUrl: 'SITE_BASE_URL', (including HTTP)
                wordpress:  {
                    user: 'USERNAME',
                    password: 'PASSWORD',
                },
                basicAuth: {
                    user: 'BASIC_AUTH_USER',
                    pass: 'BASIC_AUTH_PASS',
                },
            },
        },
    ],
}
```

This plugin has been built to work with [https://wordpress.org/plugins/jwt-authentication-for-wp-rest-api]. Install this on your WordPress site, and set up as per the instructions. This plugin allows JWT tokens to be used, and keeps things consistent.
