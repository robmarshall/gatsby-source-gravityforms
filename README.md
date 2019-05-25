# gatsby-source-gravityforms

This plugin connects to a WordPress Gravity Forms install. It finds all active forms and settings and adds them to the Gatsby nodes.

It uses 0Auth 1.0a Authentication for a higher level of security.

## Installation

```js
# Install the plugin
yarn add gatsby-source-gravityforms
```

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

## Gravity Forms REST API Settings

### Step by step - How to connect

To use the Gravity Forms REST API, it needs to be enabled within the Gravity Forms Settings. This is found under "General Settings".

Once "Enable access to the API" has been checked, Gravity Forms will give you the ability to create API keys. These two keys (consumer & secret) are the keys required in the gatsby-config.js file as key & secret.

It is recommended to create one API key for use with this Source Plugin, set to Read access only. Then if Write access is required to submit the forms, create a separate one.

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

This will return each form set up in Gravity Forms. It will include:

-   Slug of the form title
-   The backend form REST API URL
-   All form fields
-   Button info
-   Confirmation info (your confirmation field is likely to be different)

Currently "choices" in formFields is stringified and will need to be parsed when extracted. This is due to Gatsby seemingly not seeing this many level deep. I am currently working on a solution for this.
