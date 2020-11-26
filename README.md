# Greenlight
### <i>Automated Git Management for Web Servers</i>

## How Greenlight Works
Greenlight polls the git commit that the web server is currently running and the one that is most recent on the same branch. If it sees that the web server is outdated, it will automatically store
the current data and pull the newest commit from that branch.
<br>
If the end user defines a propper `greenlight.json`, you can use a cron interval to automatically
restart the web server with the new updates applies to it by defining your update commands.

## How To Use Greenlight
- Ensure you are in your webserver directory
- Clone this repository: `git clone https://github.com/ryanrocket/greenlight.git`
- This should create a `greenlight` directory within your webserver directory
- Without changing directories, create a new Greenlight config file called `greenlight.json`
- 1. This file is used to restart your server with the new updates from git on a cron interval
- 2. It should be an Object with a key `cron` with your specified cron and an array `updated` with the shell commands you want to run upon the server restart, in order.
- 3. This step is optional. If there is no file, the web server won't automatically restart
- To start Greenlight, change directories into greenlight and run `sh run.sh`
- To stop Greenlight, make sure your'e in the greenlight directory and run `sh kill.sh`
- This creates a new nohup process and stores its process ID to be killed later on

<br><br>
<sub><sup>COPYRIGHT (C) 2020 RYAN WANS DEVELOPMENT</sup></sub>
