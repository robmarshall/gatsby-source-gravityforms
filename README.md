# gatsby-source-gravityforms

In `gatsby-config.js`:

```js
module.exports = {
    plugins: [
        {
            resolve: 'gatsby-source-gravityforms',
            options: {
                baseUrl: 'SITE_BASE_URL',
                api:  {
                    consumerKey: 'GF_CONSUMER_KEY',
                    consumerSecret: 'GF_CONSUMER_SECRET',
                }
                basicAuth: {
                    user: 'BASIC_AUTH_USER',
                    pass: 'BASIC_AUTH_PASS',
                },
            },
        },
    ],
}
```
