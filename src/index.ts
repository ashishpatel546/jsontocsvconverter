/**
 * Custom error class for JSON to CSV conversion errors
 */
export class JsonToCsvError extends Error {
  constructor(message: string, public code?: string) {
    super(message);
    this.name = 'JsonToCsvError';
  }
}

/**
 * Options for the parse method
 */
export interface ParseOptions {
  delimiter?: string;
}

/**
 * Type for the input data - array of objects with string keys
 */
export type JsonData = Record<string, any>[];

/**
 * Escapes CSV field values that contain special characters
 * @param value - The value to escape
 * @param delimiter - The delimiter being used
 * @returns Escaped value
 */
function escapeCSVField(value: string, delimiter: string): string {
  // If the value contains delimiter, newline, or double quote, wrap in quotes
  if (
    value.includes(delimiter) ||
    value.includes('\n') ||
    value.includes('\r') ||
    value.includes('"')
  ) {
    // Escape any existing double quotes by doubling them
    const escapedValue = value.replace(/"/g, '""');
    return `"${escapedValue}"`;
  }
  return value;
}

/**
 * Converts a value to a string representation suitable for CSV
 * @param value - The value to convert
 * @returns String representation of the value
 */
function valueToString(value: any): string {
  if (value === null || value === undefined) {
    return '';
  }

  if (typeof value === 'object') {
    try {
      return JSON.stringify(value);
    } catch (error) {
      throw new JsonToCsvError(
        'Failed to serialize object value',
        'SERIALIZATION_ERROR'
      );
    }
  }

  return String(value);
}

/**
 * Parses an array of objects into CSV format
 * @param data - Array of objects to convert to CSV
 * @param options - Options for parsing (delimiter)
 * @returns CSV string with header row and data rows
 */
export function parse(data: JsonData, options: ParseOptions = {}): string {
  // Validate input
  if (!Array.isArray(data)) {
    throw new JsonToCsvError('Input data must be an array', 'INVALID_INPUT');
  }

  if (data.length === 0) {
    throw new JsonToCsvError('Input data cannot be empty', 'EMPTY_INPUT');
  }

  // Validate delimiter before applying default
  if (
    options.delimiter !== undefined &&
    (typeof options.delimiter !== 'string' || options.delimiter.length === 0)
  ) {
    throw new JsonToCsvError(
      'Delimiter must be a non-empty string',
      'INVALID_DELIMITER'
    );
  }

  const delimiter = options.delimiter ?? ',';

  try {
    // Extract all unique keys from all objects to create comprehensive headers
    const allKeys = new Set<string>();

    for (const row of data) {
      if (typeof row !== 'object' || row === null || Array.isArray(row)) {
        throw new JsonToCsvError(
          'All data items must be objects',
          'INVALID_DATA_TYPE'
        );
      }

      Object.keys(row).forEach((key) => allKeys.add(key));
    }

    if (allKeys.size === 0) {
      throw new JsonToCsvError(
        'No valid properties found in data objects',
        'NO_PROPERTIES'
      );
    }

    const headers = Array.from(allKeys);

    // Create CSV header row
    const headerRow = headers
      .map((header) => escapeCSVField(header, delimiter))
      .join(delimiter);

    // Create CSV data rows
    const dataRows = data.map((row, index) => {
      try {
        return headers
          .map((header) => {
            const value = valueToString(row[header]);
            return escapeCSVField(value, delimiter);
          })
          .join(delimiter);
      } catch (error) {
        throw new JsonToCsvError(
          `Error processing row ${index + 1}: ${
            error instanceof Error ? error.message : 'Unknown error'
          }`,
          'ROW_PROCESSING_ERROR'
        );
      }
    });

    // Combine header and data rows
    return [headerRow, ...dataRows].join('\n');
  } catch (error) {
    if (error instanceof JsonToCsvError) {
      throw error;
    }

    throw new JsonToCsvError(
      `Unexpected error during parsing: ${
        error instanceof Error ? error.message : 'Unknown error'
      }`,
      'UNEXPECTED_ERROR'
    );
  }
}
