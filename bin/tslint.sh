#!/usr/bin/env bash

./node_modules/.bin/tslint --type-check  --project "./tsconfig.json"  -c "./tslint.json" "./src/**/*.ts"