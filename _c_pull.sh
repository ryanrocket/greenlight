#!/bin/bash

# ================================== #
# PULL & REBASE LATEST GIT COMMIT
# WITHOUT STOPPING SERVER PROCESS
#                  RYAN WANS 2020
# ================================== #

echo "**************************************"
now="$(date)"
echo "*- -> running. tstamp:" "$now"
cd ..;
if [ -d .git ]; then
    if git diff-index --quiet HEAD --; then
        echo "*- -> This repo is already on the latest working commit."
        git pull --rebase
    else
        echo "*- -> Current version is outdated! Pushing changes..."
        git add -A 
        git commit -m "GREENLIGHT: Automated Push"
        echo "*- -> Stashed. Pulling latest version..."
        git pull --rebase 
        git push origin main
    fi
else 
    echo "*- -> This does not appear to be a git repo."
    git rev-parse --git-dir 2> /dev/null;
fi;
echo "*- -> script finished."