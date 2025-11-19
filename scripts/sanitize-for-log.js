#!/usr/bin/env node
/**
 * Shared sanitization utility for logging
 * 
 * This module provides a sanitization function that CodeQL can recognize
 * to prevent log injection vulnerabilities.
 * 
 * Usage:
 *   const { sanitizeForLog } = require('./sanitize-for-log');
 *   console.log('Message:', sanitizeForLog(userInput));
 */

/**
 * Sanitize user input for safe logging
 * Removes control characters, newlines, and limits length to prevent log injection
 * 
 * @param {any} input - The input to sanitize (will be converted to string)
 * @param {number} maxLength - Maximum length (default: 200)
 * @returns {string} Sanitized string safe for logging
 */
function sanitizeForLog(input, maxLength = 200) {
  return String(input || '')
    .replace(/[\x00-\x1F\x7F-\x9F]/g, '') // Remove control characters
    .replace(/[\r\n]/g, ' ') // Replace newlines with spaces
    .substring(0, maxLength); // Limit length
}

module.exports = { sanitizeForLog };

