<div align="center">
  <h1>🚀 json-data-to-csv</h1>
  
  <p><strong>A powerful, lightweight TypeScript library for converting JSON arrays to CSV format</strong></p>
  
  [![npm version](https://img.shields.io/npm/v/json-data-to-csv.svg)](https://www.npmjs.com/package/json-data-to-csv)
  [![TypeScript](https://img.shields.io/badge/TypeScript-007ACC?logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
  [![MIT License](https://img.shields.io/badge/License-MIT-green.svg)](https://choosealicense.com/licenses/mit/)
  [![Zero Dependencies](https://img.shields.io/badge/dependencies-0-brightgreen.svg)](https://www.npmjs.com/package/json-data-to-csv)
  
  <p>Transform your JSON data into properly formatted CSV with ease! 📊</p>
</div>

---

## ✨ Features

- 🔄 **JSON to CSV Conversion** - Seamlessly convert arrays of objects to CSV format
- ⚙️ **Customizable Delimiter** - Use comma, semicolon, or any custom delimiter
- 🎯 **Smart Header Generation** - Automatically detects and creates headers from object keys
- 🛡️ **CSV Escaping** - Properly handles special characters, quotes, and newlines
- ⚡ **TypeScript First** - Full type safety with comprehensive type definitions
- 🔍 **Error Handling** - Detailed error messages with specific error codes
- 📦 **Zero Dependencies** - Lightweight with no external dependencies
- 🎨 **Data Type Support** - Handles strings, numbers, booleans, objects, null, undefined

## 📦 Installation

```bash
# Using npm
npm install json-data-to-csv

# Using yarn
yarn add json-data-to-csv

# Using pnpm
pnpm add json-data-to-csv
```

## 🚀 Quick Start

```typescript
import { parse } from 'json-data-to-csv';

// Simple conversion
const data = [
  { name: 'Alice', age: 30, role: 'Developer' },
  { name: 'Bob', age: 25, role: 'Designer' },
];

const csv = parse(data);
console.log(csv);
// Output:
// name,age,role
// Alice,30,Developer
// Bob,25,Designer
```

## 📖 Usage Examples

### 🎯 Basic Usage

Convert a simple array of objects to CSV format:

```typescript
import { parse } from 'json-data-to-csv';

const employees = [
  { name: 'John Doe', age: 30, city: 'New York', salary: 75000 },
  { name: 'Jane Smith', age: 25, city: 'Los Angeles', salary: 80000 },
  { name: 'Mike Johnson', age: 35, city: 'Chicago', salary: 90000 },
];

const csv = parse(employees);
console.log(csv);
```

**Output:**

```csv
name,age,city,salary
John Doe,30,New York,75000
Jane Smith,25,Los Angeles,80000
Mike Johnson,35,Chicago,90000
```

### 🔧 Custom Delimiter

Use different delimiters for various regional formats:

```typescript
import { parse } from 'json-data-to-csv';

const data = [
  { product: 'Laptop', price: 999.99, stock: 50 },
  { product: 'Mouse', price: 29.99, stock: 100 },
];

// European format with semicolon
const csvSemicolon = parse(data, { delimiter: ';' });
console.log(csvSemicolon);

// Tab-separated values
const tsvFormat = parse(data, { delimiter: '\t' });
console.log(tsvFormat);

// Pipe-separated values
const psvFormat = parse(data, { delimiter: '|' });
console.log(psvFormat);
```

**Output (semicolon):**

```csv
product;price;stock
Laptop;999.99;50
Mouse;29.99;100
```

### 🎨 Mixed Data Types

Handle various data types seamlessly:

```typescript
import { parse } from 'json-data-to-csv';

const mixedData = [
  {
    id: 1,
    name: 'John Doe',
    active: true,
    score: 95.5,
    metadata: { role: 'admin', permissions: ['read', 'write'] },
    lastLogin: new Date('2025-01-15'),
    description: null,
    notes: undefined,
    tags: ['developer', 'senior'],
  },
  {
    id: 2,
    name: 'Jane Smith',
    active: false,
    score: 87.2,
    metadata: { role: 'user' },
    lastLogin: new Date('2025-01-10'),
    bio: 'Software engineer with 5 years of experience',
  },
];

const csv = parse(mixedData);
console.log(csv);
```

**Output:**

```csv
id,name,active,score,metadata,lastLogin,description,notes,tags,bio
1,John Doe,true,95.5,"{""role"":""admin"",""permissions"":[""read"",""write""]}",2025-01-15T00:00:00.000Z,,,"[""developer"",""senior""]",
2,Jane Smith,false,87.2,"{""role"":""user""}",2025-01-10T00:00:00.000Z,,,,"Software engineer with 5 years of experience"
```

### 🔀 Dynamic Properties

Handle objects with different property sets:

```typescript
import { parse } from 'json-data-to-csv';

const dynamicData = [
  { name: 'Alice', age: 30, department: 'Engineering' },
  { name: 'Bob', city: 'Seattle', country: 'USA', zipCode: '98101' },
  { age: 40, email: 'charlie@example.com', phone: '+1-555-0123' },
  {
    name: 'Diana',
    department: 'Marketing',
    email: 'diana@example.com',
    manager: 'Alice',
  },
];

const csv = parse(dynamicData);
console.log(csv);
```

**Output:**

```csv
name,age,department,city,country,zipCode,email,phone,manager
Alice,30,Engineering,,,,,,
Bob,,,"Seattle",USA,98101,,,
,40,,,,,charlie@example.com,+1-555-0123,
Diana,,Marketing,,,,"diana@example.com",,Alice
```

### 🛡️ Special Character Handling

Properly escape CSV special characters:

```typescript
import { parse } from 'json-data-to-csv';

const specialData = [
  {
    name: 'John "Johnny" Doe',
    bio: 'Software engineer,\nspecializing in web development',
    quote: 'He said, "Hello, world!"',
    note: 'Contains\r\nWindows line endings',
  },
  {
    name: "Jane O'Connor",
    bio: 'Data scientist; loves statistics',
    quote: 'Data tells a story',
    note: 'Simple description',
  },
];

const csv = parse(specialData);
console.log(csv);
```

**Output:**

```csv
name,bio,quote,note
"John ""Johnny"" Doe","Software engineer,
specializing in web development","He said, ""Hello, world!""","Contains

Windows line endings"
Jane O'Connor,"Data scientist; loves statistics",Data tells a story,Simple description
```

## 📚 API Reference

### `parse(data, options?)`

Converts an array of objects to CSV format with intelligent header detection.

```typescript
function parse(data: JsonData, options?: ParseOptions): string;
```

#### Parameters

| Parameter | Type           | Required | Description                        |
| --------- | -------------- | -------- | ---------------------------------- |
| `data`    | `JsonData`     | ✅       | Array of objects to convert to CSV |
| `options` | `ParseOptions` | ❌       | Configuration options for parsing  |

#### ParseOptions

| Property    | Type     | Default | Description                           |
| ----------- | -------- | ------- | ------------------------------------- |
| `delimiter` | `string` | `','`   | Character used to separate CSV fields |

#### Returns

| Type     | Description                                        |
| -------- | -------------------------------------------------- |
| `string` | CSV formatted string with header row and data rows |

#### Throws

| Exception        | Description                                            |
| ---------------- | ------------------------------------------------------ |
| `JsonToCsvError` | When input validation fails or processing errors occur |

### 🎯 Type Definitions

```typescript
// Main data type - array of objects
type JsonData = Record<string, any>[];

// Configuration options
interface ParseOptions {
  delimiter?: string;
}

// Custom error class with error codes
class JsonToCsvError extends Error {
  constructor(message: string, public code?: string);
  name: 'JsonToCsvError';
  code?: string;
}
```

### 🎛️ Supported Data Types

| JavaScript Type | CSV Output            | Example                         |
| --------------- | --------------------- | ------------------------------- |
| `string`        | Direct value          | `"Hello"` → `Hello`             |
| `number`        | String representation | `42` → `42`                     |
| `boolean`       | String representation | `true` → `true`                 |
| `null`          | Empty field           | `null` → ``                     |
| `undefined`     | Empty field           | `undefined` → ``                |
| `object`        | JSON string           | `{a:1}` → `"{""a"":1}"`         |
| `array`         | JSON string           | `[1,2]` → `"[1,2]"`             |
| `Date`          | ISO string            | `new Date()` → `2025-01-15T...` |

## 🚨 Error Handling

The library provides comprehensive error handling with specific error codes for easy debugging:

```typescript
import { parse, JsonToCsvError } from 'json-data-to-csv';

try {
  const csv = parse([]);
} catch (error) {
  if (error instanceof JsonToCsvError) {
    console.error(`❌ Error: ${error.message}`);
    console.error(`🔍 Code: ${error.code}`);

    // Handle specific error types
    switch (error.code) {
      case 'EMPTY_INPUT':
        console.log('💡 Tip: Provide a non-empty array of objects');
        break;
      case 'INVALID_DELIMITER':
        console.log('💡 Tip: Use a non-empty string as delimiter');
        break;
      default:
        console.log('💡 Check the documentation for more details');
    }
  }
}
```

### 📋 Error Codes Reference

| Error Code             | Description                   | Example Cause                    |
| ---------------------- | ----------------------------- | -------------------------------- |
| `INVALID_INPUT`        | Input is not an array         | `parse("string")`                |
| `EMPTY_INPUT`          | Array is empty                | `parse([])`                      |
| `INVALID_DELIMITER`    | Invalid delimiter             | `parse(data, { delimiter: "" })` |
| `INVALID_DATA_TYPE`    | Non-object in array           | `parse([null, "string"])`        |
| `NO_PROPERTIES`        | Objects have no properties    | `parse([{}, {}])`                |
| `SERIALIZATION_ERROR`  | Failed to serialize object    | Circular reference in object     |
| `ROW_PROCESSING_ERROR` | Error processing specific row | Malformed data in row            |
| `UNEXPECTED_ERROR`     | Unexpected internal error     | System/memory issues             |

### 🛠️ Error Handling Examples

```typescript
import { parse, JsonToCsvError } from 'json-data-to-csv';

// Example 1: Empty array
try {
  parse([]);
} catch (error) {
  console.log(error.message); // "Input data cannot be empty"
  console.log(error.code); // "EMPTY_INPUT"
}

// Example 2: Invalid data type
try {
  parse(['string', 123, null] as any);
} catch (error) {
  console.log(error.message); // "All data items must be objects"
  console.log(error.code); // "INVALID_DATA_TYPE"
}

// Example 3: Invalid delimiter
try {
  parse([{ name: 'John' }], { delimiter: null as any });
} catch (error) {
  console.log(error.message); // "Delimiter must be a non-empty string"
  console.log(error.code); // "INVALID_DELIMITER"
}
```

## 🔐 CSV Escaping & Special Characters

The library follows RFC 4180 standards and properly handles all CSV special characters:

### 🎯 Automatic Escaping Rules

| Scenario               | Handling           | Example               |
| ---------------------- | ------------------ | --------------------- |
| **Delimiter in field** | Wrap in quotes     | `"Contains, comma"`   |
| **Double quotes**      | Double the quotes  | `"He said ""Hello"""` |
| **Newlines**           | Preserve in quotes | `"Line 1\nLine 2"`    |
| **Carriage returns**   | Preserve in quotes | `"Windows\r\nending"` |

### 🧪 Real-world Examples

```typescript
import { parse } from 'json-data-to-csv';

// Example with various special characters
const problematicData = [
  {
    name: 'John "The Coder" Smith',
    address: '123 Main St,\nApt 4B\nNew York, NY',
    bio: 'Software engineer, loves "clean code" principles',
    note: 'Contact via email; phone available Mon-Fri',
    tags: 'javascript,typescript,react',
  },
];

const csv = parse(problematicData);
console.log(csv);
```

**Output:**

```csv
name,address,bio,note,tags
"John ""The Coder"" Smith","123 Main St,
Apt 4B
New York, NY","Software engineer, loves ""clean code"" principles","Contact via email; phone available Mon-Fri","javascript,typescript,react"
```

### 🌍 International Support

```typescript
// Works with international characters and various delimiters
const internationalData = [
  { name: 'José María', city: 'São Paulo', note: 'Español, Português' },
  { name: '田中太郎', city: '東京', note: '日本語サポート' },
  { name: 'François', city: 'Paris', note: 'Caractères accentués' },
];

// European format (semicolon delimiter)
const europeanCsv = parse(internationalData, { delimiter: ';' });
console.log(europeanCsv);
```

## 🏗️ Real-world Use Cases

### 📊 Data Export Dashboard

```typescript
import { parse } from 'json-data-to-csv';

// Export user analytics data
const analyticsData = [
  {
    userId: 'user_001',
    name: 'Alice Johnson',
    email: 'alice@company.com',
    lastLogin: '2025-06-04T10:30:00Z',
    pageViews: 245,
    sessionDuration: 1800, // seconds
    conversions: 3,
    revenue: 299.97,
  },
  // ... more user data
];

const csv = parse(analyticsData);

// Save to file or send as download
console.log('📈 Analytics Export Ready!');
```

### 🛒 E-commerce Product Catalog

```typescript
// Export product inventory
const products = [
  {
    sku: 'LAPTOP-001',
    name: 'MacBook Pro 14"',
    category: 'Electronics',
    price: 1999.99,
    stock: 50,
    description: 'High-performance laptop for professionals',
    specs: { ram: '16GB', storage: '512GB SSD', chip: 'M3 Pro' },
    tags: ['laptop', 'apple', 'professional'],
    inStock: true,
  },
];

const productCsv = parse(products, { delimiter: '|' });
```

### 📋 HR Employee Reports

```typescript
// Export employee data for payroll
const employees = [
  {
    employeeId: 'EMP001',
    fullName: 'John Smith',
    department: 'Engineering',
    position: 'Senior Developer',
    hireDate: '2023-01-15',
    salary: 95000,
    benefits: { health: true, dental: true, vision: false },
    skills: ['JavaScript', 'Python', 'React'],
    manager: 'Jane Doe',
  },
];

const hrCsv = parse(employees);
```

### 🏦 Financial Transaction Reports

```typescript
// Export financial transactions
const transactions = [
  {
    transactionId: 'TXN_20250604_001',
    date: '2025-06-04',
    amount: -89.5,
    description: 'Online Purchase - Amazon',
    category: 'Shopping',
    account: 'Checking ***1234',
    merchant: { name: 'Amazon.com', location: 'Online' },
    status: 'Completed',
  },
];

const financialCsv = parse(transactions, { delimiter: ';' });
```

## 🚀 Performance & Best Practices

### ⚡ Performance Tips

- **Large datasets**: The library handles thousands of records efficiently
- **Memory usage**: Streaming not required for typical web application datasets
- **Complex objects**: Nested objects are serialized as JSON strings automatically

```typescript
// ✅ Good: Efficient for typical use cases
const largeDataset = Array.from({ length: 10000 }, (_, i) => ({
  id: i,
  name: `User ${i}`,
  email: `user${i}@example.com`,
  active: i % 2 === 0,
}));

const csv = parse(largeDataset); // Handles efficiently
```

### 🎯 Best Practices

```typescript
// ✅ Use consistent property names across objects
const goodData = [
  { id: 1, name: 'John', email: 'john@example.com' },
  { id: 2, name: 'Jane', email: 'jane@example.com' },
];

// ⚠️ Inconsistent properties create sparse CSV
const sparseData = [
  { id: 1, name: 'John' },
  { email: 'jane@example.com', phone: '555-0123' },
];

// ✅ Handle errors appropriately
try {
  const csv = parse(userData);
  return csv;
} catch (error) {
  if (error instanceof JsonToCsvError) {
    logger.error(`CSV conversion failed: ${error.message}`, {
      code: error.code,
    });
    return null;
  }
  throw error;
}
```

## 🛠️ Development

### 🏗️ Building the Project

```bash
# Install dependencies
npm install

# Build TypeScript to JavaScript
npm run build

# Build in watch mode for development
npm run dev
```

### 🧪 Testing

```bash
# Run all tests
npm test

# Run tests in watch mode
npm run test:watch

# Run tests with coverage
npm test -- --coverage
```

### 🔍 Project Structure

```
json-data-to-csv/
├── 📁 src/
│   ├── 📄 index.ts              # Main library code
│   └── 📁 __tests__/
│       └── 📄 index.test.ts     # Comprehensive test suite
├── 📁 dist/                     # Compiled output
│   ├── 📄 index.js              # ES modules output
│   └── 📄 index.d.ts            # TypeScript definitions
├── 📄 package.json              # Package configuration
├── 📄 tsconfig.json             # TypeScript configuration
├── 📄 jest.config.js            # Test configuration
└── 📄 README.md                 # Documentation
```

### 🔧 Local Development

```bash
# Clone and setup
git clone <repository-url>
cd jsontocsv
npm install

# Run tests while developing
npm run test:watch

# Test your changes
node test.js
```

## 📄 License

This project is licensed under the **MIT License** - see the [LICENSE](LICENSE) file for details.

```
MIT License - feel free to use this library in your projects! 🎉
```

## 🤝 Contributing

We welcome contributions! Here's how you can help improve this library:

### 🐛 Reporting Bugs

1. **Check existing issues** first to avoid duplicates
2. **Create a detailed issue** with:
   - Clear description of the problem
   - Steps to reproduce
   - Expected vs actual behavior
   - Sample data that causes the issue

### 🚀 Submitting Changes

1. **Fork** the repository
2. **Create** your feature branch:
   ```bash
   git checkout -b feature/amazing-feature
   ```
3. **Make** your changes with tests
4. **Test** thoroughly:
   ```bash
   npm test
   npm run build
   ```
5. **Commit** your changes:
   ```bash
   git commit -m 'Add some amazing feature'
   ```
6. **Push** to the branch:
   ```bash
   git push origin feature/amazing-feature
   ```
7. **Open** a Pull Request with:
   - Clear description of changes
   - Link to any related issues
   - Screenshots/examples if applicable

### 🎯 Development Guidelines

- **Write tests** for new features
- **Follow TypeScript** best practices
- **Update documentation** for API changes
- **Maintain backward compatibility** when possible
- **Keep dependencies minimal** (currently zero dependencies!)

## 🗺️ Roadmap

### 🔮 Future Features

- [ ] **Streaming support** for very large datasets
- [ ] **Custom formatters** for specific data types
- [ ] **Schema validation** options
- [ ] **Performance benchmarks** and optimizations
- [ ] **Browser compatibility** testing
- [ ] **Additional output formats** (TSV, PSV, etc.)

### 📈 Version History

| Version   | Date       | Changes                                    |
| --------- | ---------- | ------------------------------------------ |
| **1.0.0** | 2025-06-04 | 🎉 Initial release with core functionality |
|           |            | ✅ JSON to CSV conversion                  |
|           |            | ✅ Customizable delimiters                 |
|           |            | ✅ Comprehensive error handling            |
|           |            | ✅ Full TypeScript support                 |
|           |            | ✅ Zero dependencies                       |

---

<div align="center">
  <p><strong>Made with ❤️ by Ashish Patel</strong></p>
  
  <p>
    <a href="https://www.npmjs.com/package/json-data-to-csv">📦 npm</a> •
    <a href="https://github.com/ashishpatel546/json-data-to-csv">🐙 GitHub</a> •
    <a href="https://github.com/ashishpatel546/json-data-to-csv/issues">🐛 Issues</a> •
    <a href="https://github.com/ashishpatel546/json-data-to-csv/blob/main/CHANGELOG.md">📋 Changelog</a>
  </p>
  
  <p>
    <em>⭐ Star this repo if you find it helpful!</em>
  </p>
</div>
