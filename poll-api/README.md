# POLL api

A simple web API built using NodeJS, ExpressJS and MongoDB to serve poll data

Below are the requests that are applicable

## Routes - api/polls/

- GET - Get all the polls
- GET/:id - Returns the poll that matches the ID or error message
- POST - Adding a new poll
- PATCH/:id/:elemID - The id is the poll that needs to be updated and the elemID that needs to be incremented
- DELETE /:id:/email - The id of the poll and the email of the user that created the poll
