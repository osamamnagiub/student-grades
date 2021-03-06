# Course Grade system

A prototype for a grade system used to upload course grades and allow students to view their grades using their id, it uses worker queues to handle large data efficiently

## Diagram
![img.png](img.png)
## Technology 

- Nodejs
- Redis
- MongoDb
- Docker

## Build a dev environment using docker

Run 
```
docker compose -f .\docker-compose.dev.yml up
```

To delete the dev the environment

```
docker compose -f .\docker-compose.dev.yml down
```

if you made any changes to the project it will reload automatically,
the project is shared with the docker instance

## Build a dev environment manually

- Install nodejs
- Install redis 
- Install MongoDb

Make sure environment variable NODE_ENV is set to "development"

if in windows, run this using powershell ```$env:NODE_ENV="development"```
if in linux run ```export NODE_ENV=development```

Run
```
node index.js
```

## Running tests
Before running tests make sure that redis and mongoDb are running, because integration tests are included

Run
```
npm test
```

For test coverage report 
see coverage/lcov-report/index.html

## Swagger docs
```
http://localhost:3000
```

