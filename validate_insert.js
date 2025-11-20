#!/usr/bin/env node
// Question INSERT Validator - checks SQL before running
// Usage: node validate_insert.js your_file.sql

const fs = require('fs');

const RULES = {
    minAnswerLength: 5,
    minExplanation: 20,
    forbidden: [/Option [A-D]/i, /\{"text":/, /isCorrect/]
};

function validate(filename) {
    const sql = fs.readFileSync(filename, 'utf-8');
    const inserts = sql.match(/INSERT\s+INTO.*?;/gis) || [];
    
    let errors = 0, warnings = 0;
    
    inserts.forEach((stmt, i) => {
        const num = i + 1;
        
        // Extract correct_answer (between quotes before 'explanation')
        const ansMatch = stmt.match(/',\s*'([^']+?)'\s*,.*?explanation/i);
        if (!ansMatch) {
            console.log(`❌ #${num}: Can't parse correct_answer`);
            errors++;
            return;
        }
        
        const answer = ansMatch[1];
        
        // Check length
        if (answer.length < RULES.minAnswerLength) {
            console.log(`❌ #${num}: Answer too short (${answer.length} chars): "${answer}"`);
            errors++;
        }
        
        // Check forbidden patterns
        for (const pattern of RULES.forbidden) {
            if (pattern.test(answer)) {
                console.log(`❌ #${num}: Forbidden pattern in: "${answer.substring(0, 50)}"`);
                errors++;
                break;
            }
        }
        
        // Check if options contains answer
        if (!stmt.includes(answer)) {
            console.log(`⚠️  #${num}: Answer might not be in options: "${answer.substring(0, 40)}"`);
            warnings++;
        }
    });
    
    console.log(`\n📊 Results: ${inserts.length} statements, ${errors} errors, ${warnings} warnings`);
    
    if (errors > 0) {
        console.log('❌ FAILED - Fix errors before running');
        process.exit(1);
    }
    console.log('✅ PASSED');
}

const file = process.argv[2];
if (!file) {
    console.log('Usage: node validate_insert.js <file.sql>');
    process.exit(1);
}

validate(file);
