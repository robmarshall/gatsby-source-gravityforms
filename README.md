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
                baseUrl: 'SITE_BASE_URL', (including HTTPS)
                api: {
                  key: "CONSUMER_KEY",
                  secret: "CONSUMER_SECRET",
                },
                basicAuth: {
                    user: 'BASIC_AUTH_USER',
                    pass: 'BASIC_AUTH_PASS',
                },
                ignoreFields :[
                    // Top level fields within the Gravity Forms return
                    // to ignore.
                    // Default ignore is 'notifications'. To keep this as set,
                    // remove the ignoreFields setting from here.
                    // If adding more fields, you will need to include notifications
                    // to ensure it is ignored.
                ]
            },
        },
    ],
}
```

## How To Query

A very simple data set can be extracted from GraphQL using the following query:

```js
{
  allGfForm {
    edges {
      node {
        slug
        apiURL
        formFields {
          type
          choices
        }
        button {
          type
          text
        }
        confirmations {
          _5cda6a4b2e31d {
            id
            message
          }
        }
      }
    }
  }
}
```

This will return each form set up in Gravity Forms. Tt will include:

-   Slug of the form title
-   The backend form REST API URL
-   All form fields
-   Button info
-   Confirmation info

## Gravity Forms REST API Settings

Step by step - How to connect

Recommendations on only setting to read? If you are going to use the API to add data, use a separate API key.
