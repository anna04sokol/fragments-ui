# Fragments UI

A small web app for signing in and testing the [Fragments](https://github.com/anna04sokol/fragments) API.

It uses Amazon Cognito (hosted UI) so I can log in, list my fragments, and create a new one without using curl.

## What it does

- Sign in through a Cognito user pool
- Call the authenticated Fragments API
- Create a fragment from the browser
- Show the current user's fragment list

## How to run

```bash
npm install
npm start
```

Parcel serves `src/index.html`. Point the app at a running Fragments API and a Cognito user pool (local or AWS).
