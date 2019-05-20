#!/bin/bash
echo "Running post build script"

if [ "$TRAVIS_BRANCH" = "master" ]; then
  echo "Running integration tests on master"
  npm test
fi