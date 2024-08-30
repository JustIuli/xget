const arg = require("arg");

module.exports = arg({
    '--post': Boolean,
    '--get': Boolean,
    '--addr': String,  // Address argument
    '-f': String,      // File argument for JSON input
    '--help': Boolean, // Help argument
});