# LinkChecker

This project contains a simple TypeScript class `LinkChecker` for validating URLs.
It uses regular expressions to verify whether a given string is a well-formed URL.
The project also includes a test suite written with Jest to ensure the correctness of the `LinkChecker` class.

## How it works:

### Input:
A string representing a URL is passed to the `isValidUrl` method.

### Validation:
The method checks the string against a regular expression:
- The URL must start with `http://` or `https://`.
- It should have a valid domain name (e.g., `example.com`).
- Optional components include a port (e.g., `:8080`).

### Output:
The method returns `true` if the URL matches the pattern, otherwise it returns `false`.

## Use Cases

- **Valid URL**
    - Test: `should return true for valid URL`
    - URL: `https://www.example.com`
    - Expected Result: `true`

- **Invalid URL**
    - Test: `should return false for invalid URL`
    - URL: `www.example.com`
    - Expected Result: `false`

- **Invalid URL without protocol**
    - Test: `should return false for invalid URL without protocol`
    - URL: `www.example.com`
    - Expected Result: `false`

- **Valid URL with port**
    - Test: `should return true for valid URL with port`
    - URL: `https://www.example.com:8080`
    - Expected Result: `true`

- **Valid URL with path**
    - Test: `should return true for valid URL with path`
    - URL: `https://www.example.com/path`
    - Expected Result: `true`

## Running Tests

To run the tests, use the following command:

```sh
npx jest