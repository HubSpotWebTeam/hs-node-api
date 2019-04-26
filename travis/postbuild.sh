#!/bin/bash
echo "Running post build script"

if [ "$TRAVIS_PULL_REQUEST" == "false" ]; then
  echo "Running integration tests on non pull request branch"
  npm test
fi