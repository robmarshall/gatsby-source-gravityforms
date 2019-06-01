# gatsby-source-gravityforms

This plugin connects to a WordPress Gravity Forms install. It finds all active forms and settings and adds them to the Gatsby nodes.

It uses 0Auth 1.0a Authentication for a higher level of security.

## Installation

```js
# Install the plugin
yarn add gatsby-source-gravityforms

# Or with NPM
npm i gatsby-source-gravityforms
```

Add to `gatsby-config.js`:

### Default Setup

```js
module.exports = {
    plugins: [
        {
            resolve: 'gatsby-source-gravityforms',
            options: {
                // Base URL needs to include protocol (http/https)
                baseUrl: 'SITE_BASE_URL',
                // Gravity Forms API
                api: {
                    key: 'CONSUMER_KEY',
                    secret: 'CONSUMER_SECRET',
                },
            },
        },
    ],
}
```

### All Options

```js
module.exports = {
    plugins: [
        {
            resolve: 'gatsby-source-gravityforms',
            options: {
                // Base URL needs to include protocol (http/https)
                baseUrl: 'SITE_BASE_URL',
                // Gravity Forms API
                api: {
                    key: 'CONSUMER_KEY',
                    secret: 'CONSUMER_SECRET',
                },
                // Basic Auth
                basicAuth: {
                    username: 'USERNAME',
                    password: 'PASSWORD',
                },
                ignoreFields: [
                    // Top level fields within the Gravity Forms return
                    // to ignore.
                    // Default ignore is 'notifications'. To keep this
                    // as set, remove the ignoreFields setting from here.
                    // If adding more fields, you will need to include
                    // notifications to ensure it is ignored.
                ],
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

### Basic Auth

Your backend API may be set up with Basic Auth in place. This is added to the begining of the URL so 0auth1 can also run in tandem. Setup is shown above in Installation.

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
          id
          message
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
-   Confirmation info

Currently "choices" in formFields is stringified and will need to be parsed when extracted. This is due to Gatsby seemingly not seeing this many level deep.
