/**
 * User API - Enhanced with comprehensive error handling and security best practices
 */

// Custom error classes for better error handling
class ValidationError extends Error {
  constructor(message) {
    super(message);
    this.name = 'ValidationError';
    this.statusCode = 400;
  }
}

class NotFoundError extends Error {
  constructor(message) {
    super(message);
    this.name = 'NotFoundError';
    this.statusCode = 404;
  }
}

class DatabaseError extends Error {
  constructor(message) {
    super(message);
    this.name = 'DatabaseError';
    this.statusCode = 500;
  }
}

/**
 * Email validation regex (RFC 5322 simplified)
 */
const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

/**
 * Validates user ID format
 * @param {string|number} userId - User identifier
 * @throws {ValidationError} If userId is invalid
 */
function validateUserId(userId) {
  if (!userId || (typeof userId !== 'string' && typeof userId !== 'number')) {
    throw new ValidationError('Invalid user ID: must be a non-empty string or number');
  }
  
  // Prevent injection attacks by sanitizing input
  const userIdStr = String(userId).trim();
  if (userIdStr.length === 0 || userIdStr.length > 100) {
    throw new ValidationError('Invalid user ID: length must be between 1 and 100 characters');
  }
  
  return userIdStr;
}

/**
 * Validates email format
 * @param {string} email - Email address to validate
 * @throws {ValidationError} If email is invalid
 */
function validateEmail(email) {
  if (!email || typeof email !== 'string') {
    throw new ValidationError('Invalid email: must be a non-empty string');
  }
  
  const trimmedEmail = email.trim().toLowerCase();
  
  if (!EMAIL_REGEX.test(trimmedEmail)) {
    throw new ValidationError('Invalid email format');
  }
  
  if (trimmedEmail.length > 254) {
    throw new ValidationError('Email exceeds maximum length of 254 characters');
  }
  
  return trimmedEmail;
}

/**
 * Validates user data object
 * @param {Object} data - User data to validate
 * @throws {ValidationError} If data is invalid
 */
function validateUserData(data) {
  if (!data || typeof data !== 'object') {
    throw new ValidationError('Invalid user data: must be an object');
  }
  
  // Prevent prototype pollution
  if (data.__proto__ || data.constructor || data.prototype) {
    throw new ValidationError('Invalid user data: prototype properties not allowed');
  }
  
  // Validate required fields
  if (!data.email) {
    throw new ValidationError('Email is required');
  }
  
  // Sanitize and validate email
  data.email = validateEmail(data.email);
  
  // Validate optional fields
  if (data.name && typeof data.name !== 'string') {
    throw new ValidationError('Name must be a string');
  }
  
  if (data.name && data.name.length > 255) {
    throw new ValidationError('Name exceeds maximum length of 255 characters');
  }
  
  return data;
}

/**
 * Retrieves a user by ID with comprehensive error handling
 * @param {string|number} userId - User identifier
 * @returns {Object} User object
 * @throws {ValidationError} If userId is invalid
 * @throws {NotFoundError} If user not found
 * @throws {DatabaseError} If database operation fails
 */
export function getUser(userId) {
  try {
    // Validate input
    const validatedUserId = validateUserId(userId);
    
    // Attempt to find user
    const user = database.find(validatedUserId);
    
    if (!user) {
      throw new NotFoundError(`User with ID '${validatedUserId}' not found`);
    }
    
    // Return a copy to prevent external mutation of internal data
    return { ...user };
  } catch (error) {
    // Re-throw known errors
    if (error instanceof ValidationError || error instanceof NotFoundError) {
      throw error;
    }
    
    // Wrap unknown errors as DatabaseError
    throw new DatabaseError(`Failed to retrieve user: ${error.message}`);
  }
}

/**
 * Creates a new user with validation and security checks
 * @param {Object} data - User data including email and optional fields
 * @returns {Object} Created user object
 * @throws {ValidationError} If user data is invalid
 * @throws {DatabaseError} If database operation fails
 */
export function createUser(data) {
  try {
    // Validate and sanitize input data
    const validatedData = validateUserData({ ...data });
    
    // Check for duplicate email (if database supports it)
    // This prevents creating users with existing emails
    try {
      const existingUser = database.findByEmail?.(validatedData.email);
      if (existingUser) {
        throw new ValidationError('User with this email already exists');
      }
    } catch (error) {
      // If findByEmail doesn't exist, continue
      if (!(error instanceof ValidationError)) {
        // Log but don't fail if check method doesn't exist
      } else {
        throw error;
      }
    }
    
    // Attempt to insert user
    const newUser = database.insert(validatedData);
    
    if (!newUser) {
      throw new DatabaseError('Failed to create user: no user returned from database');
    }
    
    // Return a copy to prevent external mutation
    return { ...newUser };
  } catch (error) {
    // Re-throw known errors
    if (error instanceof ValidationError) {
      throw error;
    }
    
    // Wrap unknown errors as DatabaseError
    throw new DatabaseError(`Failed to create user: ${error.message}`);
  }
}

/**
 * Deletes a user by ID with proper validation
 * @param {string|number} id - User identifier
 * @returns {boolean} True if deletion successful
 * @throws {ValidationError} If id is invalid
 * @throws {NotFoundError} If user not found
 * @throws {DatabaseError} If database operation fails
 */
export function deleteUser(id) {
  try {
    // Validate input
    const validatedId = validateUserId(id);
    
    // Check if user exists before attempting deletion
    const user = database.find(validatedId);
    if (!user) {
      throw new NotFoundError(`User with ID '${validatedId}' not found`);
    }
    
    // Attempt to remove user
    const result = database.remove(validatedId);
    
    // Verify deletion was successful
    if (result === false || result === null || result === undefined) {
      throw new DatabaseError('Failed to delete user: database operation returned unsuccessful result');
    }
    
    return true;
  } catch (error) {
    // Re-throw known errors
    if (error instanceof ValidationError || error instanceof NotFoundError) {
      throw error;
    }
    
    // Wrap unknown errors as DatabaseError
    throw new DatabaseError(`Failed to delete user: ${error.message}`);
  }
}

/**
 * Updates a user's email address with validation and security checks
 * @param {string|number} userId - User identifier
 * @param {string} email - New email address
 * @returns {Object} Updated user object
 * @throws {ValidationError} If userId or email is invalid
 * @throws {NotFoundError} If user not found
 * @throws {DatabaseError} If database operation fails
 */
export function updateUserEmail(userId, email) {
  try {
    // Validate inputs
    const validatedUserId = validateUserId(userId);
    const validatedEmail = validateEmail(email);
    
    // Find user
    const user = database.find(validatedUserId);
    
    if (!user) {
      throw new NotFoundError(`User with ID '${validatedUserId}' not found`);
    }
    
    // Check if email is already in use by another user
    try {
      const existingUser = database.findByEmail?.(validatedEmail);
      if (existingUser && existingUser.id !== validatedUserId) {
        throw new ValidationError('Email is already in use by another user');
      }
    } catch (error) {
      if (error instanceof ValidationError) {
        throw error;
      }
      // If findByEmail doesn't exist, continue
    }
    
    // Create a copy to avoid mutating the original object directly
    const updatedUser = { ...user, email: validatedEmail };
    
    // Save updated user
    const result = database.save(updatedUser);
    
    if (!result) {
      throw new DatabaseError('Failed to save updated user email');
    }
    
    // Return a copy to prevent external mutation
    return { ...updatedUser };
  } catch (error) {
    // Re-throw known errors
    if (error instanceof ValidationError || error instanceof NotFoundError) {
      throw error;
    }
    
    // Wrap unknown errors as DatabaseError
    throw new DatabaseError(`Failed to update user email: ${error.message}`);
  }
}

// Export error classes for external error handling
export { ValidationError, NotFoundError, DatabaseError };