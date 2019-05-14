# gatsby-source-gravityforms

In `gatsby-config.js`:

```js
module.exports = {
    plugins: [
        {
            resolve: 'gatsby-source-gravityforms',
            options: {
                baseUrl: 'SITE_BASE_URL', (including HTTP)
                api: {
                  key: "CONSUMER_KEY",
                  secret: "CONSUMER_SECRET",
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
