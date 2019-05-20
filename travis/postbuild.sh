#!/bin/bash
echo "Running post build script"

if [[ "$TRAVIS_PULL_REQUEST" == "false" && "$TRAVIS_BRANCH" = "master" ]]; then
  echo "Running integration tests on master (non pull request)"
  npm test
fi