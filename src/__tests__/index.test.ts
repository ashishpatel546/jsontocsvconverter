import { parse, JsonToCsvError } from '../index';

describe('JSON to CSV Parser', () => {
  describe('Basic functionality', () => {
    test('should convert simple array of objects to CSV', () => {
      const data = [
        { name: 'John', age: 30, city: 'New York' },
        { name: 'Jane', age: 25, city: 'Los Angeles' },
      ];

      const result = parse(data);
      const expected = 'name,age,city\nJohn,30,New York\nJane,25,Los Angeles';

      expect(result).toBe(expected);
    });

    test('should use custom delimiter', () => {
      const data = [
        { name: 'John', age: 30 },
        { name: 'Jane', age: 25 },
      ];

      const result = parse(data, { delimiter: ';' });
      const expected = 'name;age\nJohn;30\nJane;25';

      expect(result).toBe(expected);
    });

    test('should handle objects with different properties', () => {
      const data = [
        { name: 'John', age: 30 },
        { name: 'Jane', city: 'LA', country: 'USA' },
        { age: 40, email: 'test@example.com' },
      ];

      const result = parse(data);
      const lines = result.split('\n');

      // Header should contain all unique keys
      expect(lines[0]).toContain('name');
      expect(lines[0]).toContain('age');
      expect(lines[0]).toContain('city');
      expect(lines[0]).toContain('country');
      expect(lines[0]).toContain('email');

      // Should have correct number of rows (header + data)
      expect(lines).toHaveLength(4);
    });
  });

  describe('Edge cases and data types', () => {
    test('should handle null and undefined values', () => {
      const data = [
        { name: 'John', age: null, city: undefined },
        { name: null, age: 25, city: 'LA' },
      ];

      const result = parse(data);
      const lines = result.split('\n');

      expect(lines[1]).toBe('John,,');
      expect(lines[2]).toBe(',25,LA');
    });

    test('should handle boolean values', () => {
      const data = [{ name: 'John', active: true, verified: false }];

      const result = parse(data);
      const expected = 'name,active,verified\nJohn,true,false';

      expect(result).toBe(expected);
    });

    test('should handle numeric values', () => {
      const data = [{ id: 1, price: 19.99, count: 0 }];

      const result = parse(data);
      const expected = 'id,price,count\n1,19.99,0';

      expect(result).toBe(expected);
    });

    test('should serialize object values as JSON', () => {
      const data = [
        {
          name: 'John',
          metadata: { role: 'admin', permissions: ['read', 'write'] },
        },
      ];

      const result = parse(data);
      const lines = result.split('\n');

      expect(lines[0]).toBe('name,metadata');
      expect(lines[1]).toContain('John');
      expect(lines[1]).toContain(
        '"{""role"":""admin"",""permissions"":[""read"",""write""]}"'
      );
    });
  });

  describe('CSV escaping', () => {
    test('should escape fields containing delimiter', () => {
      const data = [{ name: 'John, Jr.', title: 'Senior Developer' }];

      const result = parse(data);
      const expected = 'name,title\n"John, Jr.",Senior Developer';

      expect(result).toBe(expected);
    });

    test('should escape fields containing newlines', () => {
      const data = [{ name: 'John', description: 'Line 1\nLine 2' }];

      const result = parse(data);
      const expected = 'name,description\nJohn,"Line 1\nLine 2"';

      expect(result).toBe(expected);
    });

    test('should escape fields containing double quotes', () => {
      const data = [{ name: 'John "Johnny" Doe', quote: 'He said "Hello"' }];

      const result = parse(data);
      const expected = 'name,quote\n"John ""Johnny"" Doe","He said ""Hello"""';

      expect(result).toBe(expected);
    });

    test('should handle custom delimiter escaping', () => {
      const data = [{ name: 'John;Smith', age: 30 }];

      const result = parse(data, { delimiter: ';' });
      const expected = 'name;age\n"John;Smith";30';

      expect(result).toBe(expected);
    });
  });

  describe('Error handling', () => {
    test('should throw error for non-array input', () => {
      expect(() => {
        parse('not an array' as any);
      }).toThrow(JsonToCsvError);

      expect(() => {
        parse('not an array' as any);
      }).toThrow('Input data must be an array');
    });

    test('should throw error for empty array', () => {
      expect(() => {
        parse([]);
      }).toThrow(JsonToCsvError);

      expect(() => {
        parse([]);
      }).toThrow('Input data cannot be empty');
    });

    test('should throw error for invalid data types', () => {
      expect(() => {
        parse([null] as any);
      }).toThrow(JsonToCsvError);

      expect(() => {
        parse(['string'] as any);
      }).toThrow(JsonToCsvError);

      expect(() => {
        parse([123] as any);
      }).toThrow(JsonToCsvError);
    });

    test('should throw error for invalid delimiter', () => {
      const data = [{ name: 'John' }];

      expect(() => {
        parse(data, { delimiter: '' });
      }).toThrow(JsonToCsvError);

      expect(() => {
        parse(data, { delimiter: null as any });
      }).toThrow(JsonToCsvError);
    });

    test('should handle objects with no enumerable properties', () => {
      const data = [{}];

      expect(() => {
        parse(data);
      }).toThrow(JsonToCsvError);

      expect(() => {
        parse(data);
      }).toThrow('No valid properties found in data objects');
    });

    test('should include error codes', () => {
      try {
        parse('invalid' as any);
      } catch (error) {
        expect(error).toBeInstanceOf(JsonToCsvError);
        expect((error as JsonToCsvError).code).toBe('INVALID_INPUT');
      }
    });
  });

  describe('Performance and large datasets', () => {
    test('should handle reasonably large datasets', () => {
      const data = Array.from({ length: 1000 }, (_, i) => ({
        id: i,
        name: `User ${i}`,
        email: `user${i}@example.com`,
        active: i % 2 === 0,
      }));

      const result = parse(data);
      const lines = result.split('\n');

      expect(lines).toHaveLength(1001); // header + 1000 data rows
      expect(lines[0]).toBe('id,name,email,active');
      expect(lines[1]).toBe('0,User 0,user0@example.com,true');
      expect(lines[1000]).toBe('999,User 999,user999@example.com,false');
    });
  });
});
