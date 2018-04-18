# travisexplorer

[![Build Status](https://travis-ci.org/vimemo/travisexplorer.svg?branch=master)](https://travis-ci.org/vimemo/travisexplorer)
[![Coverage Status](https://coveralls.io/repos/github/vimemo/travisexplorer/badge.svg?branch=master)](https://coveralls.io/github/vimemo/travisexplorer?branch=master)
[![Maintainability](https://api.codeclimate.com/v1/badges/248eff6f527443854ec7/maintainability)](https://codeclimate.com/github/vimemo/travisexplorer/maintainability)

# Running tests

docker-compose run tests yarn test

# Running test with coverage

docker-compose run tests yarn test --coverage

# Running test watcher

docker-compose run tests yarn test --watchAll

# Running against local databases

```

export TEST_PG_URL=your-pg-url
export TEST_COUCH_URL=your-couch-url
yarn test --coverage --projects jest-*.config.js

```

# Known Issues
The following jest issue prevents running multiple
runners(projects) before the databases are available.
Once the db/containers are available, linting and testing (runners) are available; jest --projects jest-*.config.js
```
https://github.com/facebook/jest/issues/5441
```
