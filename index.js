// Greenlight (C) 2020 by Ryan Wans

const { createHmac } = require('crypto');

-(function() {
    var fs = require('fs'),
        { exec } = require('child_process'),
        DELAY = 600000;

    var EXEC_CHMOD = exec('chmod +x _c_pull.sh',
        (error, stdout, stderr) => {
            console.log(stdout);
            console.log(stderr);
            if (error !== null) {
                console.log("GRNLT Err [DEBUG] - The following error is most likely because of permission errors when attempting to execute a needed shell script. Please try again with sudo");
                console.log(`GRNLT Err: ${error}`);
            }
        });

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