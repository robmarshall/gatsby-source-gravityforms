# gatsby-source-gravityforms

This plugin connects to a WordPress Gravity Forms install. It finds all active forms and settings and adds them to the Gatsby nodes.

It uses 0Auth 1.0a Authentication for a higher level of security.

## Set The Config

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

## How To Query

## Gravity Forms REST API Settings

Step by step - How to connect

Recommendations on only setting to read? If you are going to use the API to add data, use a separate API key.
