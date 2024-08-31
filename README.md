# wdio-test
https://sharksystems.github.io/wdio-test/#

## Summary

This repository contains automated tests for the Conduit website (https://conduit.realworld.how/) using WebdriverIO. Tests are written in JavaScript following Page Object pattern. 
It also features a cross-enviroment system for testing in different browsers on a local runner, or on a Docker Container
## Note
The website has recently been updated and is experiencing some perfomance issues, such as:

-The server not responding: Posts are not loading, Login/Registration forms are not submitting. If the tests are stuck on the Login/Registration Page, check manually if those issues are no longer present and try again.

-The user is transferred to the main page when trying to view a Full Post or Post edit page on a newly created post

-Recently liked posts may not update and not be displayed in the Favorited Posts tab, and vice versa when removing a post from Favorites

## Requirements

- Node.js (v20 or later)
- Java (or Allure reports)
- Docker (for running locally on a Selenium Standalone image)

## Steps to Install

1. Clone the repository or go to Code > Download ZIP
2. Install dependencies: npm install

## Steps to Launch Tests

Running tests locally

npm run test:local:chrome

npm run test:local-old:chrome

npm run test:local:firefox

npm run test:local:edge

## Running tests on a Docker container

Note: Make sure you have at least 10 gb of free space available and Docker Desktop is running

docker-compose up -d - Pull images / Start Docker Containers

docker-compose down - Stop Docker Containers

npm run test:docker:chrome

npm run test:docker:firefox

npm run test:docker:edge

## Generating a report
npm run generate-report

npm run open-report

or

Navigate to allure-report folder and open index.html
