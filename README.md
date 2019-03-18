# Noter
[![Build Status](https://travis-ci.org/teevans/noter-api.svg?branch=master)](https://travis-ci.org/teevans/noter-api)

Noter is a simple application designed to showcase a basic CRUD application.

Currently a WIP. Will update with more information as features are implemented.

## Running
Currently the server is set to run on port 3001 by default.
You will need an instance of Mongo running on your machine. If no MONGODB_URI variable is provided, 
it will look for the local instance at the default mongo port. 

```
git clone https://github.com/teevans/noter-api.git
yarn 
yarn start
```

## Testing
This will run all tests set for the API. Again, make sure mongo is running. These are end to end.
```
git clone https://github.com/teevans/noter-api.git
yarn 
yarn test
```


## Tests Needed 
Certain endpoints are not tested.
 - Sharing with a user is not tested.

Not all error messages are tested.

## Next Steps
- Dockerize
- Complete testing including error messages.

