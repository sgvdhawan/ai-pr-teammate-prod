/**
 * Utility functions - with comprehensive error handling
 */

/**
 * Safely parses a JSON string
 * @param {string} jsonString - The JSON string to parse
 * @returns {*} The parsed JSON object
 * @throws {Error} If jsonString is invalid or parsing fails
 */
export function parseJSON(jsonString) {
  // Input validation
  if (jsonString === null || jsonString === undefined) {
    throw new Error('JSON string cannot be null or undefined');
  }

  if (typeof jsonString !== 'string') {
    throw new Error('Input must be a string');
  }

  if (jsonString.trim().length === 0) {
    throw new Error('JSON string cannot be empty');
  }

  try {
    const parsed = JSON.parse(jsonString);
    return parsed;
  } catch (error) {
    // Provide more context about the parsing error
    throw new Error(`Failed to parse JSON: ${error.message}`);
  }
}

/**
 * Fetches data from a URL and parses the JSON response
 * @param {string} url - The URL to fetch data from
 * @returns {Promise<*>} Promise resolving to the parsed JSON data
 * @throws {Error} If url is invalid or fetch fails
 */
export async function fetchData(url) {
  // Input validation
  if (!url || typeof url !== 'string') {
    throw new Error('URL must be a valid string');
  }

  if (url.trim().length === 0) {
    throw new Error('URL cannot be empty');
  }

  // Basic URL validation
  try {
    new URL(url);
  } catch (error) {
    throw new Error('Invalid URL format');
  }

  try {
    const response = await fetch(url);
    
    // Check if the response was successful
    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status} - ${response.statusText}`);
    }

    // Check if response has content
    const contentType = response.headers.get('content-type');
    if (!contentType || !contentType.includes('application/json')) {
      throw new Error('Response is not JSON format');
    }

    const data = await response.json();
    return data;
  } catch (error) {
    // Handle network errors
    if (error.name === 'TypeError' && error.message.includes('fetch')) {
      throw new Error('Network error: Failed to fetch data. Please check your connection.');
    }
    
    // Handle JSON parsing errors from response.json()
    if (error.name === 'SyntaxError') {
      throw new Error('Failed to parse response as JSON');
    }

    // Re-throw if it's already our custom error
    if (error.message.includes('HTTP error') || 
        error.message.includes('Network error') || 
        error.message.includes('Response is not JSON')) {
      throw error;
    }

    throw new Error(`Failed to fetch data: ${error.message}`);
  }
}

/**
 * Calculates the total price for an array of items
 * @param {Array<Object>} items - Array of items with price and quantity properties
 * @returns {number} The total calculated price
 * @throws {Error} If items is invalid or calculation fails
 */
export function calculateTotal(items) {
  // Input validation
  if (!items) {
    throw new Error('Items array is required');
  }

  if (!Array.isArray(items)) {
    throw new Error('Items must be an array');
  }

  if (items.length === 0) {
    return 0; // Return 0 for empty array (not an error condition)
  }

  try {
    let total = 0;

    for (let i = 0; i < items.length; i++) {
      const item = items[i];

      // Validate each item
      if (!item || typeof item !== 'object') {
        throw new Error(`Item at index ${i} is not a valid object`);
      }

      // Check for required properties
      if (!('price' in item)) {
        throw new Error(`Item at index ${i} is missing 'price' property`);
      }

      if (!('quantity' in item)) {
        throw new Error(`Item at index ${i} is missing 'quantity' property`);
      }

      // Validate price
      const price = Number(item.price);
      if (isNaN(price)) {
        throw new Error(`Item at index ${i} has invalid price: must be a number`);
      }

      if (price < 0) {
        throw new Error(`Item at index ${i} has negative price: ${price}`);
      }

      // Validate quantity
      const quantity = Number(item.quantity);
      if (isNaN(quantity)) {
        throw new Error(`Item at index ${i} has invalid quantity: must be a number`);
      }

      if (quantity < 0) {
        throw new Error(`Item at index ${i} has negative quantity: ${quantity}`);
      }

      // Calculate line total
      const lineTotal = price * quantity;

      // Check for potential overflow or infinity
      if (!isFinite(lineTotal)) {
        throw new Error(`Calculation overflow at item index ${i}`);
      }

      total += lineTotal;
    }

    // Final check for overflow
    if (!isFinite(total)) {
      throw new Error('Total calculation resulted in overflow');
    }

    // Round to 2 decimal places to avoid floating point precision issues
    return Math.round(total * 100) / 100;
  } catch (error) {
    // Re-throw with context if it's our custom error
    if (error.message.includes('Item') || 
        error.message.includes('price') || 
        error.message.includes('quantity') ||
        error.message.includes('overflow')) {
      throw error;
    }
    throw new Error(`Failed to calculate total: ${error.message}`);
  }
}

/**
 * Validates an email address using comprehensive checks
 * @param {string} email - The email address to validate
 * @returns {boolean} True if email is valid, false otherwise
 * @throws {Error} If email parameter is invalid type (null/undefined)
 */
export function validateEmail(email) {
  // Handle null/undefined as error case
  if (email === null || email === undefined) {
    throw new Error('Email cannot be null or undefined');
  }

  // Type validation
  if (typeof email !== 'string') {
    return false;
  }

  // Empty string check
  if (email.trim().length === 0) {
    return false;
  }

  // Length validation (RFC 5321)
  if (email.length > 254) {
    return false;
  }

  try {
    // Comprehensive email validation regex
    // Validates: local-part@domain with proper character restrictions
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    
    if (!emailRegex.test(email)) {
      return false;
    }

    // Additional validation checks
    const [localPart, domain] = email.split('@');

    // Validate local part (before @)
    if (!localPart || localPart.length === 0 || localPart.length > 64) {
      return false;
    }

    // Validate domain part (after @)
    if (!domain || domain.length === 0) {
      return false;
    }

    // Check for consecutive dots
    if (email.includes('..')) {
      return false;
    }

    // Check for leading/trailing dots
    if (localPart.startsWith('.') || localPart.endsWith('.')) {
      return false;
    }

    // Validate domain has at least one dot and valid TLD
    const domainParts = domain.split('.');
    if (domainParts.length < 2) {
      return false;
    }

    // Check TLD (last part) is valid
    const tld = domainParts[domainParts.length - 1];
    if (!tld || tld.length < 2) {
      return false;
    }

    return true;
  } catch (error) {
    // If any unexpected error occurs during validation, return false
    return false;
  }
}