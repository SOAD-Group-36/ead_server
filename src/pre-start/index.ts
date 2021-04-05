/**
 * Pre-start is where we want to place things that must run BEFORE the express server is started.
 * This is useful for environment variables, command-line arguments, and cron-jobs.
 */

import path from 'path';
import dotenv from 'dotenv';
import commandLineArgs from 'command-line-args';

const mongoose = require("mongoose");
const url = 'mongodb://127.0.0.1:27017/test';
const options = {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false
};

mongoose.connect(url, options);
var db = mongoose.connection;
//handle mongo error
db.once('open', (_: any) => {
    console.log('Database connected:', url)
});
db.on('error', (err: any) => {
    console.error('connection error:', err)
});

    (() => {
        // Setup command line options
        const options = commandLineArgs([
            {
                name: 'env',
                alias: 'e',
                defaultValue: 'development',
                type: String,
            },
        ]);
        // Set the env file
        const result2 = dotenv.config({
            path: path.join(__dirname, `env/${options.env}.env`),
        });
        if (result2.error) {
            throw result2.error;
        }
    })();
