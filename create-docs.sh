#!/bin/bash
if [[ "$TRAVIS_BRANCH" == "release" && "$TRAVIS_PULL_REQUEST" == "false" ]]; then
  echo "Creating docs for release branch"
  if [ -n "$GITHUB_API_TOKEN" ]; then
    cd "$TRAVIS_BUILD_DIR"
    # This generates a `web` directory containing the website.
    echo "Starting docs compilation"
    npm run compile-docs
    git init
    git checkout -b gh-pages
    git add .
    git -c user.name='smcelhinney' -c user.email='stephen@appstruct.io' commit -m init
    # Make sure to make the output quiet, or else the API token will leak!
    # This works because the API key can replace your password.
    git push -f -q https://smcelhinney:$GITHUB_API_TOKEN@github.com/HubSpotWebTeam/hs-node-api gh-pages:gh-pages &>/dev/null
    cd "$TRAVIS_BUILD_DIR"
  fi
fi