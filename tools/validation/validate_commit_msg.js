#!/usr/bin/env node
// validate_commit_msg.js

const fs = require('fs');
const path = require('path');

// Get the commit message file path from command line arguments
const commitMsgFile = process.argv[2];

// Debug: log what we received
console.log('Commit message validation script started');
console.log('Arguments received:', process.argv);

// Check if we received a valid file path
if (!commitMsgFile) {
    console.error('❌ Error: No commit message file path provided.');
    console.error('Usage: validate_commit_msg.js <commit-message-file>');
    process.exit(1);
}

// Check if the file exists
if (!fs.existsSync(commitMsgFile)) {
    console.error(`❌ Error: Commit message file not found: ${commitMsgFile}`);
    process.exit(1);
}

try {
    // Read and validate the commit message
    const message = fs.readFileSync(commitMsgFile, 'utf8').trim();
    
    console.log(`Validating commit message: "${message}"`);
    
    // Basic validation: message should not be empty and have minimum length
    if (!message || message.length < 5) {
        console.error('❌ Commit message is too short. Please provide a meaningful message (at least 5 characters).');
        process.exit(1);
    }
    
    // Optional: Check for Conventional Commits format
    const conventionalCommitPattern = /^(feat|fix|docs|style|refactor|test|chore|perf|build|ci)(\([^)]+\))?: .+/;
    if (!conventionalCommitPattern.test(message)) {
        console.warn('⚠️  Consider using Conventional Commits format: <type>(<scope>): <description>');
        console.warn('   Example: "feat(validation): add commit message validation"');
        // Don't exit with error for this, just warn
    }
    
    console.log('✅ Commit message validation passed!');
    process.exit(0);
    
} catch (error) {
    console.error('❌ Error reading commit message file:', error.message);
    process.exit(1);
}
