# JSON Routes

For this lab, you will create a simple server that will provide data from an API.

You will be downloading JSON files from the following GitHub Gists:

- [people.json](https://gist.github.com/example-people.json)
- [companies.json](https://gist.github.com/example-companies.json)

For this lab, you must use the `async/await` keywords (not Promises). You will also be using axios, which is a HTTP client for Node.js; you can install it with `npm i axios`.

## General Notes

Lecture videos and demos tend to show JSON as "pretty", but your browser may not natively do that -- that's fine!

There are extensions for most major browsers that add that functionality, such as:

- [JSONView for Firefox](https://addons.mozilla.org/en-US/firefox/addon/jsonview/)
- [JSONView for Chrome](https://chrome.google.com/webstore/detail/jsonview/gmegofmjomhknnokphhckolhcffdaihd)

## Folder Structure

You will use the folder structure in the stub for the data & routes module, and other project files. There is an extra file in the stub called `helpers.js`. You can add all your helper/validation functions in that file to use in your other modules.

**YOU MUST** use the directory and file structure in the code stub, or points will be deducted. You can download the starter template [here](https://example-lab5-stub.zip). **PLEASE NOTE**: THE STUB DOES NOT INCLUDE THE `PACKAGE.JSON` FILE. YOU WILL NEED TO CREATE IT! DO NOT ADD ANY OTHER FILE OR FOLDER APART FROM `PACKAGE.JSON` FILE. Do not forget to add the start command the the `type module` property!

## Your routes

### /people

When making a GET request to `http://localhost:3000/people`, this route will return all the JSON data that is returned from the axios call to `people.json`. It will respond with all 1000 people. In your route, you will use the `res.json()` method. Notice that your server will respond with the JSON data, meaning your browser will display it with quotes around the key names. You do not have to do anything special for this, `res.json` stringifies the object before it sends it to the browser automatically.

#### Example Output:

```json
[
    {
        "id": "fa36544d-bf92-4ed6-aa84-7085c6cb0440",
        "first_name": "Archambault",
        "last_name": "Forestall",
        "email": "aforestall0@usnews.com",
        "phone_number": "702-503-4409",
        "address": "07322 Sugar Avenue",
        "city": "Las Vegas",
        "state": "Nevada",
        "postal_code": "89140",
        "company_id": "ed37ae87-f461-42d2-bf24-8631aad856de",
        "department": "Services",
        "job_title": "Social Worker"
    },
    // More results...
]
```

### /companies

When making a GET request to `http://localhost:3000/companies`, this route will return all the JSON data that is returned from the axios call to `companies.json`. It will respond with all companies from `companies.json`. In your route, you will use the `res.json()` method. Notice that your server will respond with the JSON data, meaning your browser will display it with quotes around the key names. You do not have to do anything special for this, `res.json` stringifies the object before it sends it to the browser automatically.

#### Example Output:

```json
[
    {
        "id": "fb90892a-f7b9-4687-b497-d3b4606faddf",
        "name": "Yost, Harris and Cormier",
        "street_address": "71055 Sunbrook Circle",
        "city": "Austin",
        "state": "TX",
        "postal_code": "78715",
        "industry": "Apparel"
    },
    // More results...
]
```