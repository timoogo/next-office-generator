#!bin/bash

set -e

if [ -z "$1" ]; then
  echo "\e[31mError: You need to provide the name of the project that is right next to this one\e[0m"
  exit 1
fi

# Cleanup
rm -Rf dist

# Build
npm run build

# Extract current npm version of the library
npm_version_output=$(npm version)
version=$(ls -d next-office-generator* | grep -v /)

# Replace the library with the new draft version for further testing
if [ -d "../$1/node_modules/next-office-generator/" ]; then
  rm -Rf ../$1/node_modules/.bin/setup-next-office-generator
  rm -Rf ../$1/node_modules/next-office-generator/
  mkdir ../$1/node_modules/next-office-generator/
  # Generate the package and copy it the project
  npm pack
  cd ../$1 && npm install ../next-office-generator/$version
  ## tar -xzf next-office-generator-*.tgz
  ## cp bin/setup-next-office-generator.js ../$1/node_modules/.bin/setup-next-office-generator
  ## cp -R package/* ../$1/node_modules/next-office-generator/
  ## rm -Rf package
  # Clean up: remove the .tgz file
  rm -f next-office-generator-*.tgz
else
  mkdir ../$1/node_modules/next-office-generator/
fi

