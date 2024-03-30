#!bin/bash
set -e

if [ -z "$1" ]; then
  echo "\e[31mError: You need to provide the version you want to increase (patch, minor or major)\e[0m"
  exit 1
fi

bash scripts/release/before.sh
standard-version --release-as $1
# git push
bash scripts/release/after.sh
