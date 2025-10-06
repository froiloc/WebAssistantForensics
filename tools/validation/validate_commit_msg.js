#!/usr/bin/env node
// validate_commit_msg.js

const fs = require('fs');
const commitMsgFile = process.argv[2];
const message = fs.readFileSync(commitMsgFile, 'utf8').trim();

// A simple example: enforce that the commit message is not empty and has a minimum length.
if (message.length < 5) {
    console.error('Commit message is too short. Please provide a meaningful message.');
    process.exit(1);
}

// You can add more complex validation here, like checking for Conventional Commits format.
process.exit(0);
