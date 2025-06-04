import { parse, JsonToCsvError } from './dist/index.js';

const data = [
  { name: 'John', age: 30, city: 'New York' },
  { name: 'Jane', age: 25, city: 'Los Angeles' },
];

console.log('=== Default Comma Delimiter ===');
const csv = parse(data); // Uses default comma delimiter
console.log(csv);

console.log('\n=== Custom Semicolon Delimiter ===');
const csvWithSemicolon = parse(data, { delimiter: ';' });
console.log(csvWithSemicolon);

console.log('\n=== Testing Error Handling ===');
try {
  parse([]); // This should throw an error
} catch (error) {
  if (error instanceof JsonToCsvError) {
    console.log(`Caught error: ${error.message} (Code: ${error.code})`);
  }
}
