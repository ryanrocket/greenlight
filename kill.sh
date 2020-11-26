#!/bin/bash

# KILL GREENLIGHT PROCESS

pid_file="./greenlight.pid"
kill -9 $(<"$pid_file")
echo "Greenlight has been killed."