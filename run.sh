#!/bin/bash

# START GREENLIGHT PROCESS

# if you're reading this...
# note: this creates a 'nohup' or no-hicup process
# and disowns it, meaning it can only be killed by
# addressing it process ID.

# the process ID is stores in "greenlight.pid"
# to kill it manually, run "kill *pid*" where *pid* is the ID

chmod +x _c_pull.sh
nohup node index.js & disown > /dev/null 2>&1 & echo $! > greenlight.pid
echo "Greenlight is running"