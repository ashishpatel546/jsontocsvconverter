// Example usage of the @sologence/jsontocsvconverter package

import { parse, JsonToCsvError } from './dist/index.js';

// Basic usage example
console.log('=== Basic Usage ===');
const data = [
  { name: 'John Doe', age: 30, city: 'New York', active: true },
  { name: 'Jane Smith', age: 25, city: 'Los Angeles', active: false },
  { name: 'Bob Johnson', age: 35, city: 'Chicago', active: true },
];

try {
  const csv = parse(data);
  console.log(csv);
} catch (error) {
  console.error('Error:', error.message);
}

console.log('\n=== Custom Delimiter ===');
try {
  const csvWithSemicolon = parse(data, { delimiter: ';' });
  console.log(csvWithSemicolon);
} catch (error) {
  console.error('Error:', error.message);
}

console.log('\n=== Complex Data Types ===');
const complexData = [
  {
    id: 1,
    name: 'John "Johnny" Doe',
    metadata: { role: 'admin', permissions: ['read', 'write'] },
    notes: 'Contains, comma\nand newline',
    score: null,
    verified: undefined,
  },
  {
    id: 2,
    name: 'Jane Smith',
    metadata: { role: 'user' },
    description: 'Simple user',
  },
];

try {
  const complexCsv = parse(complexData);
  console.log(complexCsv);
} catch (error) {
  console.error('Error:', error.message);
}

console.log('\n=== Error Handling ===');
try {
  // This will throw an error
  parse([], { delimiter: '' });
} catch (error) {
  if (error instanceof JsonToCsvError) {
    console.log(`Caught error: ${error.message} (Code: ${error.code})`);
  }
}
