#!/bin/bash

# ================================== #
# PULL & REBASE LATEST GIT COMMIT
# WITHOUT STOPPING SERVER PROCESS
#                  RYAN WANS 2020
# ================================== #

cd ..;
if [ -d .git ]; then
    if git diff-index --quiet HEAD --; then
        echo "This repo is already on the latest working commit."
    else
        echo "Current version is outdated, rebasing..."
    fi
else 
    echo "This does not appear to be a git repo."
    git rev-parse --git-dir 2> /dev/null;
fi;