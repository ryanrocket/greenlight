// Greenlight (c) Ryan Wans 2020

-(function() {
    var fs = require('fs'),
        { exec } = require('child_process'),
        cron = require('node-cron'),
        DELAY = 600000,
        that = {hasOpts: false};

    // Ensure pull file is executable
    var EXEC_CHMOD = exec('chmod +x _c_pull.sh',
        (error, stdout, stderr) => {
            console.log(stdout);
            console.log(stderr);
            if (error !== null) {
                console.log("GRNLT Err [DEBUG] - The following error is most likely because of permission errors when attempting to execute a needed shell script. Please try again with sudo");
                console.log(`GRNLT Err: ${error}`);
            }
        });
    
    // Check for server update file
    try {
        var fileBuffer = fs.readFileSync('../greenlight.json', {root: __dirname});
        that.opts = JSON.parse(fileBuffer);
        that.hasOpts = true;
    } catch(e) {
        try {
            var fileBuffer = fs.readFileSync('./greenlight.json', {root: __dirname});
            that.opts = JSON.parse(fileBuffer);
            that.hasOpts = true;
        } catch(e) {
            that.hasOpts = false;
            console.log("GRNLT Err [DEBUG] - Could not locate a 'greenlight.json' config file, meaning your server won't restart. Persisting execution.");
        }
    }

    // If they setup a server config, create the new cron job
    if(Object.keys(that.opts).includes("cron")) {
        if("object" != typeof that.opts.update) {
            console.log("GRNLT Err [DEBUG] - In the config json, key 'update' should be an array of strings containing commands to execute in order.");
        } else {
            console.log("GRNLT DEBUG - Successfully located cron, scheduled update!");
            cron.schedule(that.opts.cron, () => {
                for(let i=0; i<that.opts.update.length; i++) {
                    var cmd = that.opts.update[i];
                    try {
                        var _tmp_execution = exec(cmd, (e,o,se) => {
                            if(e !== null) {`GRNLT Err: ${error}`}
                        })
                    } catch(e) {
                        throw new Error("GRNLT - Error upon executing an update command at index: "+i);
                    }
                }
            })
        }
    } else {
        console.log("GRNLT Err [DEBUG] - Could not location the cron code inside of the config json file. Use key 'cron'.");
    }
    
    // Start polling the pull file
    setInterval(() => {
        var now = new Date();
        try {
            var EXEC_PULL = exec('sh _c_pull.sh',
                (error, stdout, stderr) => {
                    console.log(stdout);
                    console.log(stderr);
                    if (error !== null) {
                        console.log(`GRNLT Err: ${error}`);
                    }
                });
        } catch (e) {
            try {
                exec.execFile('_c_pull.sh');
                console.log("GRNLT Err [DEBUG] - Error running normal script. Running backup version");
            } catch(e) {
                throw new Error(e);
            }
        }
    }, DELAY);
})();