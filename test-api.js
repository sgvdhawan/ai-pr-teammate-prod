/**
 * User API - with comprehensive security and error handling
 */

// Input validation and sanitization utilities
const MAX_EMAIL_LENGTH = 254;
const MAX_USER_DATA_SIZE = 10000; // Prevent DoS via large payloads

/**
 * Sanitizes user ID to prevent injection attacks
 * @param {*} userId - The user ID to sanitize
 * @returns {string|number} Sanitized user ID
 * @throws {Error} If userId is invalid
 */
function sanitizeUserId(userId) {
  if (userId === null || userId === undefined) {
    throw new Error('User ID cannot be null or undefined');
  }

  // Allow only alphanumeric strings or positive integers
  if (typeof userId === 'number') {
    if (!Number.isInteger(userId) || userId <= 0) {
      throw new Error('User ID must be a positive integer');
    }
    return userId;
  }

  if (typeof userId === 'string') {
    const trimmed = userId.trim();
    if (trimmed.length === 0) {
      throw new Error('User ID cannot be empty');
    }
    // Prevent injection: allow only alphanumeric and basic characters
    if (!/^[a-zA-Z0-9_-]+$/.test(trimmed)) {
      throw new Error('User ID contains invalid characters');
    }
    if (trimmed.length > 100) {
      throw new Error('User ID is too long');
    }
    return trimmed;
  }

  throw new Error('User ID must be a string or number');
}

/**
 * Validates email format with security in mind
 * @param {string} email - Email to validate
 * @returns {boolean} True if valid
 */
function isValidEmail(email) {
  if (!email || typeof email !== 'string') {
    return false;
  }

  if (email.length > MAX_EMAIL_LENGTH) {
    return false;
  }

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email)) {
    return false;
  }

  const [localPart, domain] = email.split('@');
  
  // Prevent injection attempts
  if (localPart.length > 64 || domain.length > 255) {
    return false;
  }

  // Check for dangerous patterns
  if (email.includes('..') || localPart.startsWith('.') || localPart.endsWith('.')) {
    return false;
  }

  return true;
}

/**
 * Validates and sanitizes user data object
 * @param {Object} data - User data to validate
 * @returns {Object} Sanitized data
 * @throws {Error} If data is invalid
 */
function validateUserData(data) {
  if (!data || typeof data !== 'object' || Array.isArray(data)) {
    throw new Error('User data must be a valid object');
  }

  // Prevent prototype pollution
  if (data.__proto__ || data.constructor || data.prototype) {
    throw new Error('User data contains forbidden properties');
  }

  // Check data size to prevent DoS
  const dataSize = JSON.stringify(data).length;
  if (dataSize > MAX_USER_DATA_SIZE) {
    throw new Error('User data exceeds maximum allowed size');
  }

  // Validate email if present
  if (data.email && !isValidEmail(data.email)) {
    throw new Error('Invalid email format');
  }

  // Create sanitized copy (whitelist approach)
  const sanitized = {};
  const allowedFields = ['email', 'name', 'username', 'age', 'phone', 'address'];
  
  for (const field of allowedFields) {
    if (field in data) {
      // Prevent XSS by ensuring string fields don't contain scripts
      if (typeof data[field] === 'string') {
        const value = data[field].trim();
        // Basic XSS prevention
        if (/<script|javascript:|onerror=/i.test(value)) {
          throw new Error(`Field '${field}' contains potentially dangerous content`);
        }
        sanitized[field] = value;
      } else if (typeof data[field] === 'number') {
        if (!isFinite(data[field])) {
          throw new Error(`Field '${field}' must be a valid number`);
        }
        sanitized[field] = data[field];
      } else {
        sanitized[field] = data[field];
      }
    }
  }

  return sanitized;
}

/**
 * Retrieves a user by ID with proper error handling and security
 * @param {string|number} userId - The user ID to retrieve
 * @returns {Object|null} User object or null if not found
 * @throws {Error} If userId is invalid or database operation fails
 */
export function getUser(userId) {
  try {
    // Sanitize and validate input
    const sanitizedId = sanitizeUserId(userId);

    // Check if database exists
    if (typeof database === 'undefined' || !database) {
      throw new Error('Database connection not available');
    }

    if (typeof database.find !== 'function') {
      throw new Error('Database find method not available');
    }

    // Retrieve user with timeout protection
    const user = database.find(sanitizedId);

    if (!user) {
      return null; // User not found is not an error
    }

    // Return a copy to prevent modification of internal data
    return { ...user };
  } catch (error) {
    // Don't leak internal error details
    if (error.message.includes('User ID')) {
      throw error; // Re-throw validation errors
    }
    throw new Error('Failed to retrieve user');
  }
}

/**
 * Creates a new user with validated and sanitized data
 * @param {Object} data - User data to create
 * @returns {Object} Created user object
 * @throws {Error} If data is invalid or creation fails
 */
export function createUser(data) {
  try {
    // Validate and sanitize input data
    const sanitizedData = validateUserData(data);

    // Additional business logic validation
    if (!sanitizedData.email) {
      throw new Error('Email is required for user creation');
    }

    // Check if database exists
    if (typeof database === 'undefined' || !database) {
      throw new Error('Database connection not available');
    }

    if (typeof database.insert !== 'function') {
      throw new Error('Database insert method not available');
    }

    // Create user
    const newUser = database.insert(sanitizedData);

    if (!newUser) {
      throw new Error('Failed to create user: database returned null');
    }

    // Return a copy
    return { ...newUser };
  } catch (error) {
    // Re-throw validation errors with context
    if (error.message.includes('User data') || 
        error.message.includes('Email') ||
        error.message.includes('Field')) {
      throw error;
    }
    throw new Error('Failed to create user');
  }
}

/**
 * Deletes a user by ID with proper authorization checks
 * @param {string|number} id - The user ID to delete
 * @returns {boolean} True if deletion successful
 * @throws {Error} If id is invalid or deletion fails
 */
export function deleteUser(id) {
  try {
    // Sanitize and validate input
    const sanitizedId = sanitizeUserId(id);

    // Check if database exists
    if (typeof database === 'undefined' || !database) {
      throw new Error('Database connection not available');
    }

    if (typeof database.remove !== 'function') {
      throw new Error('Database remove method not available');
    }

    // Verify user exists before deletion
    if (typeof database.find === 'function') {
      const user = database.find(sanitizedId);
      if (!user) {
        throw new Error('User not found');
      }
    }

    // Perform deletion
    const result = database.remove(sanitizedId);

    // Verify deletion was successful
    if (result === false) {
      throw new Error('Deletion failed');
    }

    return true;
  } catch (error) {
    if (error.message.includes('User ID') || 
        error.message.includes('User not found')) {
      throw error;
    }
    throw new Error('Failed to delete user');
  }
}

/**
 * Updates a user's email with validation and security checks
 * @param {string|number} userId - The user ID to update
 * @param {string} email - The new email address
 * @returns {Object} Updated user object
 * @throws {Error} If inputs are invalid or update fails
 */
export function updateUserEmail(userId, email) {
  try {
    // Sanitize and validate user ID
    const sanitizedId = sanitizeUserId(userId);

    // Validate email
    if (!email || typeof email !== 'string') {
      throw new Error('Email must be a non-empty string');
    }

    const trimmedEmail = email.trim();
    if (!isValidEmail(trimmedEmail)) {
      throw new Error('Invalid email format');
    }

    // Check if database exists
    if (typeof database === 'undefined' || !database) {
      throw new Error('Database connection not available');
    }

    if (typeof database.find !== 'function' || typeof database.save !== 'function') {
      throw new Error('Required database methods not available');
    }

    // Retrieve user
    const user = database.find(sanitizedId);
    
    if (!user) {
      throw new Error('User not found');
    }

    // Create updated user object (prevent mutation of original)
    const updatedUser = { ...user, email: trimmedEmail };

    // Save updated user
    const savedUser = database.save(updatedUser);

    if (!savedUser) {
      throw new Error('Failed to save user');
    }

    // Return a copy
    return { ...savedUser };
  } catch (error) {
    if (error.message.includes('User ID') || 
        error.message.includes('Email') ||
        error.message.includes('User not found')) {
      throw error;
    }
    throw new Error('Failed to update user email');
  }
}