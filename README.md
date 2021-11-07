# Sprint Challenge Instructions

**Read these instructions carefully. Understand exactly what is expected _before_ starting this Sprint Challenge.**

This challenge allows you to practice the concepts and techniques learned over the past sprint and apply them in a concrete project. This sprint explored **how to build web services based on the REST (REpresentational State Transfer) architectural style**. During this sprint, you studied **Node.js and Express, server side routing, how to write Express middleware and how to deploy an API to Heroku**.

In your challenge this week, you will demonstrate your mastery of these skills by designing and creating a web API to manage the following resources: `Projects` and `Actions`.

This is an individual assessment. All work must be your own. All projects will be submitted to Codegrade for automated review. You will also be given feedback by code reviewers the Monday after challenge submissions. For more information on the review process [click here](https://www.notion.so/lambdaschool/How-to-View-Feedback-in-CodeGrade-c5147cee220c4044a25de28bcb6bb54a).

You are not allowed to collaborate during the sprint challenge.

## Introduction

In meeting the minimum viable product (MVP) specifications listed below, your project should provide an API that has Create, Read, Update and Delete (CRUD) functionality for both `projects` and `actions`.

## Instructions

### Task 1: Project Set Up

- [ ] Run `npm install` to install your dependencies.
- [ ] Run tests locally executing `npm test`.
- [ ] Reset the database to its original state executing `npm run resetdb`.

### Task 2: Project Requirements (MVP)

Your finished project must include all of the following requirements:

#### NPM Scripts

A _"test"_ script already exists you can use to run tests against your code.
A _"resetdb"_ script exists that allows you to reset the database to its original state.

- [ ] Write an _npm script_ named _"start"_ that uses `node` to run the API server.
- [ ] Write an _npm script_ named _"server"_ that uses `nodemon` to run the API server.
- [ ] Install _nodemon_ as a development dependency that would not be used in production.

#### Environment Variables

- [ ] Bring the port number from the `process.env` variable, falling back to `9000` if `process.env.PORT` is undefined **!!!**

#### Endpoints

Inside `api/projects/projects-router.js` build the following endpoints:

- [ ] `[GET] /api/projects`
  - Returns an array of projects as the body of the response.
  - If there are no projects it responds with an empty array.
- [ ] `[GET] /api/projects/:id`
  - Returns a project with the given `id` as the body of the response.
  - If there is no project with the given `id` it responds with a status code 404.
- [ ] `[POST] /api/projects`
  - Returns the newly created project as the body of the response.
  - If the request body is missing any of the required fields it responds with a status code 400.
- [ ] `[PUT] /api/projects/:id`
  - Returns the updated project as the body of the response.
  - If there is no project with the given `id` it responds with a status code 404.
  - If the request body is missing any of the required fields it responds with a status code 400.
- [ ] `[DELETE] /api/projects/:id`
  - Returns no response body.
  - If there is no project with the given `id` it responds with a status code 404.
- [ ] `[GET] /api/projects/:id/actions`
  - Returns an array of actions (could be empty) belonging to a project with the given `id`.
  - If there is no project with the given `id` it responds with a status code 404.

Inside `api/actions/actions-router.js` build endpoints for performing CRUD operations on _actions_:

- [ ] `[GET] /api/actions`
  - Returns an array of actions (or an empty array) as the body of the response.
- [ ] `[GET] /api/actions/:id`
  - Returns an action with the given `id` as the body of the response.
  - If there is no action with the given `id` it responds with a status code 404.
- [ ] `[POST] /api/actions`
  - Returns the newly created action as the body of the response.
  - If the request body is missing any of the required fields it responds with a status code 400.
  - When adding an action make sure the `project_id` provided belongs to an existing `project`.
- [ ] `[PUT] /api/actions/:id`
  - Returns the updated action as the body of the response.
  - If there is no action with the given `id` it responds with a status code 404.
  - If the request body is missing any of the required fields it responds with a status code 400.
- [ ] `[DELETE] /api/actions/:id`
  - Returns no response body.
  - If there is no action with the given `id` it responds with a status code 404.

#### Middleware functions

- [ ] Write at least two middleware functions for this API, and consume them in the proper places of your code.

### Database Schemas

The description of the structure and extra information about each _resource_ stored in the included database (`./data/database.db3`) is listed below.

#### Projects

| Field       | Data Type | Metadata                                                                    |
| ----------- | --------- | --------------------------------------------------------------------------- |
| id          | number    | do not provide it when creating projects, the database will generate it     |
| name        | string    | required                                                                    |
| description | string    | required                                                                    |
| completed   | boolean   | not required, defaults to false when creating projects                      |

#### Actions

| Field       | Data Type | Metadata                                                                                         |
| ----------- | --------- | ------------------------------------------------------------------------------------------------ |
| id          | number    | do not provide it when creating actions, the database will generate it                           |
| project_id  | number    | required, must be the id of an existing project                                                  |
| description | string    | required, up to 128 characters long                                                              |
| notes       | string    | required, no size limit. Used to record additional notes or requirements to complete the action  |
| completed   | boolean   | not required, defaults to false when creating actions                                            |

### Database Persistence Helpers

The project includes models you can use to manage the persistence of _project_ and _action_ data. These files are `api/projects/projects-model.js` and `api/actions/actions-model.js`. Both files publish the following api, which you can use to store, modify and retrieve each resource:

**All these helper methods return a promise. Remember to use .then().catch() or async/await.**

- `get()`: resolves to an array of all the resources contained in the database. If you pass an `id` to this method it will return the resource with that id if one is found.
- `insert()`: calling insert passing it a resource object will add it to the database and return the newly created resource.
- `update()`: accepts two arguments, the first is the `id` of the resource to update, and the second is an object with the `changes` to apply. It returns the updated resource. If a resource with the provided `id` is not found, the method returns `null`.
- `remove()`: the remove method accepts an `id` as its first parameter and, upon successfully deleting the resource from the database, returns the number of records deleted.

The `projects-model.js` includes an extra method called `getProjectActions()` that takes a _project id_ as its only argument and returns a list of all the _actions_ for the _project_.

We have provided test data for all the resources.

**Important Notes:**

- Do not make changes to your `package.json` except to add **additional** dependencies and scripts. Do not update existing packages.
- Your app must be able to run in Node v.12. Do not use newer features of Node (e.g.: optional chaining and nullish coalescing NOT supported).
- Use an HTTP client like `HTTPie`, `Postman` or `Insomnia` to manually test the API's endpoints.
- Use Express Routers to organize your endpoints.
- Even though you are only required to write two middleware functions, it is advised that you leverage middlewares as much as possible.
- You are welcome to create additional files, but **do not move or rename existing files** or folders.
- In your solution, it is essential that you follow best practices and produce clean and professional results.
- Schedule time to review, refine, and assess your work and perform basic professional polishing including spell-checking and grammar-checking on your work.

## Submission format

- [ ] Submit via Codegrade by pushing commits to your `main` branch.
- [ ] Check Codegrade before the deadline to compare its results against your local tests.
- [ ] Check Codegrade on the days following the Sprint Challenge for reviewer feedback.
- [ ] New commits will be evaluated by Codegrade if pushed _before_ the sprint challenge deadline.

## Interview Questions

Be prepared to demonstrate your understanding of this week's concepts by answering questions on the following topics. You might prepare by writing down your own answers before hand.

1. The core features of Node.js and Express and why they are useful.


The core features of Node.js and Express and why they are useful.
Node.js gave developers the chance to use JavaScript to write software that, up to that point, could only be written using C, C++, Java, Python, Ruby, C#, and the like.

Some of the advantages of using Node.js for writing server-side code are:

- Node.js uses the same programming language (JavaScript) and paradigm for both client and server. Therefore we can minimize context switching and share code between the client and the server.
- JavaScript is single-threaded, which removes the complexity involved in handling multiple threads.
- JavaScript is asynchronous, which allows us to take full advantage of the processor it's running on.
- Using JavaScript gives us access to the npm repository. This repository is the largest ecosystem of valuable libraries (most free to use) in npm modules.

Some of the disadvantages of using Node.js for writing server-side code are:

- By strictly using JavaScript on the server, we cannot use the right tool (a particular language) for the job.
-  JavaScript is single-threaded, we can't take advantage of servers with multiple cores/processors.
- JavaScript is asynchronous, it is harder to learn.

Node's built-in HTTP module provides a powerful way to build web applications and services. However, it requires a lot of code for everyday tasks like sending an HTML page to the browser.

Express is just a Node.js module like any other module. Introducing Express is a light and unopinionated framework that sits on top of Node.js, which it easier to create web applications and services. 

Some of the drawbacks of Express are:

It's not a one-stop solution. Because of its simplicity, it does very little out of the box—especially when compared to frameworks like Ruby on Rails and Django.
We are forced to make more decisions due to the flexibility and control it provides.

1. Understand and explain the use of Middleware.
A middleware is a function that will the receive the Request and Response objects, just like route handlers do. There are different types of middleware; for our purposes, we'll group them into three different categories:

* Built-in middleware : It is included with Express but not added to the application automatically. Like the other types, we need to opt-in to using it in our application.

* Third-party middleware: They are npm modules that we can install and then import into our applications using require()

* Custom middleware: They are functions we write to perform specific tasks


1. The basic principles of the REST architectural style.

REST is a generally agreed-upon set of principles and constraints. They are recommendations, not a standard.

When designing a RESTful Web API, keep the following principles in mind:

* Everything is a resource.
* Each resource is accessible via a unique URI.
* Resources can have multiple representations.
* Communication happens over a stateless protocol (HTTP).
* Resource management happens via HTTP methods.
* Applying the REST architecture to our APIs can make them scalable and simpler to maintain and extend.

REST is a client-server architecture. The client and the server both have a different set of concerns. The server stores and/or manipulates information and makes it available to the user in an efficient manner. The client takes that information and displays it to the user and/or uses it to perform subsequent requests for information. This separation of concerns allows both the client and the server to evolve independently as it only requires that the interface stays the same.

REST is stateless. That means the communication between the client and the server always contains all the information needed to perform the request.

REST is cacheable. The client, the server and any intermediary components can all cache resources in order to improve performance.

REST provides a uniform interface between components. This simplifies the architecture, as all components follow the same rules to speak to one another. It also makes it easier to understand the interactions between the different components of the system.

REST is a layered system. Individual components cannot see beyond the immediate layer with which they are interacting. 

1. Understand and explain the use of Express Routers.

The express.Router() function is used to create a new router object. This function is used when you want to handle requests in your program .

1. Describe tooling used to manually test the correctness of an API.

Testing APIs is different from testing websites or web applications. A web browser is sufficient to test the latter, but we need to make POST/PUT/PATCH/DELETE requests for APIs and even modify the request headers.

For testing, we will use a tool called Postman. Postman and other similar tools allow full control when making requests. For example, we can easily change the HTTP Method used, add JSON data to the body, add form data, add headers, examine the response, and more.