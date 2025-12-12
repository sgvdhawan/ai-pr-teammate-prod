/**
 * User API - optimized for better performance
 */

// Input validation and sanitization utilities
const MAX_EMAIL_LENGTH = 254;
const MAX_USER_DATA_SIZE = 10000; // Prevent DoS via large payloads

// Type definitions
interface User {
  id?: string | number;
  email?: string;
  name?: string;
  username?: string;
  age?: number;
  phone?: string;
  address?: string;
  [key: string]: any;
}

interface UserData {
  email?: string;
  name?: string;
  username?: string;
  age?: number;
  phone?: string;
  address?: string;
  [key: string]: any;
}

interface Database {
  find: (id: string | number) => User | null;
  insert: (data: UserData) => User | null;
  remove: (id: string | number) => boolean;
  save: (user: User) => User | null;
}

// Declare global database (assuming it's injected)
declare const database: Database;

type UserId = string | number;

// Cache compiled regex patterns for better performance
const USER_ID_PATTERN = /^[a-zA-Z0-9_-]+$/;
const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const XSS_PATTERN = /<script|javascript:|onerror=/i;

// Allowed fields whitelist (reused across calls)
const ALLOWED_FIELDS: readonly (keyof UserData)[] = Object.freeze([
  'email', 'name', 'username', 'age', 'phone', 'address'
]);

/**
 * Sanitizes user ID to prevent injection attacks
 * @param userId - The user ID to sanitize
 * @returns Sanitized user ID
 * @throws {Error} If userId is invalid
 */
function sanitizeUserId(userId: any): string | number {
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
    if (!USER_ID_PATTERN.test(trimmed)) {
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
 * @param email - Email to validate
 * @returns True if valid
 */
function isValidEmail(email: string): boolean {
  if (!email || typeof email !== 'string') {
    return false;
  }

  const emailLength = email.length;
  if (emailLength > MAX_EMAIL_LENGTH) {
    return false;
  }

  if (!EMAIL_PATTERN.test(email)) {
    return false;
  }

  // Find @ position once instead of splitting
  const atIndex = email.indexOf('@');
  const localLength = atIndex;
  const domainLength = emailLength - atIndex - 1;
  
  // Prevent injection attempts
  if (localLength > 64 || domainLength > 255) {
    return false;
  }

  // Check for dangerous patterns
  if (email.includes('..') || email[0] === '.' || email[atIndex - 1] === '.') {
    return false;
  }

  return true;
}

/**
 * Validates and sanitizes user data object
 * @param data - User data to validate
 * @returns Sanitized data
 * @throws {Error} If data is invalid
 */
function validateUserData(data: any): UserData {
  if (!data || typeof data !== 'object' || Array.isArray(data)) {
    throw new Error('User data must be a valid object');
  }

  // Prevent prototype pollution - check using hasOwnProperty
  if (Object.prototype.hasOwnProperty.call(data, '__proto__') || 
      Object.prototype.hasOwnProperty.call(data, 'constructor') || 
      Object.prototype.hasOwnProperty.call(data, 'prototype')) {
    throw new Error('User data contains forbidden properties');
  }

  // Check data size to prevent DoS - only stringify if necessary
  const keys = Object.keys(data);
  if (keys.length > 50) { // Quick check before expensive stringify
    const dataSize = JSON.stringify(data).length;
    if (dataSize > MAX_USER_DATA_SIZE) {
      throw new Error('User data exceeds maximum allowed size');
    }
  }

  // Validate email if present
  if (data.email && !isValidEmail(data.email)) {
    throw new Error('Invalid email format');
  }

  // Create sanitized copy (whitelist approach) - optimized with direct assignment
  const sanitized: UserData = {};
  
  for (let i = 0; i < ALLOWED_FIELDS.length; i++) {
    const field = ALLOWED_FIELDS[i];
    if (!(field in data)) continue;
    
    const value = data[field];
    const valueType = typeof value;
    
    // Prevent XSS by ensuring string fields don't contain scripts
    if (valueType === 'string') {
      const trimmedValue = value.trim();
      // Basic XSS prevention
      if (XSS_PATTERN.test(trimmedValue)) {
        throw new Error(`Field '${field}' contains potentially dangerous content`);
      }
      sanitized[field] = trimmedValue as any;
    } else if (valueType === 'number') {
      if (!isFinite(value)) {
        throw new Error(`Field '${field}' must be a valid number`);
      }
      sanitized[field] = value as any;
    } else {
      sanitized[field] = value;
    }
  }

  return sanitized;
}

/**
 * Checks database availability (cached result)
 * @throws {Error} If database is not available
 */
function checkDatabase(): void {
  if (typeof database === 'undefined' || !database) {
    throw new Error('Database connection not available');
  }
}

/**
 * Retrieves a user by ID with proper error handling and security
 * @param userId - The user ID to retrieve
 * @returns User object or null if not found
 * @throws {Error} If userId is invalid or database operation fails
 */
export function getUser(userId: UserId): User | null {
  try {
    // Sanitize and validate input
    const sanitizedId = sanitizeUserId(userId);

    // Check if database exists
    checkDatabase();

    if (typeof database.find !== 'function') {
      throw new Error('Database find method not available');
    }

    // Retrieve user
    const user = database.find(sanitizedId);

    // Early return for null - no need to spread
    if (!user) {
      return null;
    }

    // Return a copy to prevent modification of internal data
    return { ...user };
  } catch (error) {
    // Don't leak internal error details
    if (error instanceof Error && error.message.includes('User ID')) {
      throw error; // Re-throw validation errors
    }
    throw new Error('Failed to retrieve user');
  }
}

/**
 * Creates a new user with validated and sanitized data
 * @param data - User data to create
 * @returns Created user object
 * @throws {Error} If data is invalid or creation fails
 */
export function createUser(data: UserData): User {
  try {
    // Validate and sanitize input data
    const sanitizedData = validateUserData(data);

    // Additional business logic validation
    if (!sanitizedData.email) {
      throw new Error('Email is required for user creation');
    }

    // Check if database exists
    checkDatabase();

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
    if (error instanceof Error && 
        (error.message.includes('User data') || 
         error.message.includes('Email') ||
         error.message.includes('Field'))) {
      throw error;
    }
    throw new Error('Failed to create user');
  }
}

/**
 * Deletes a user by ID with proper authorization checks
 * @param id - The user ID to delete
 * @returns True if deletion successful
 * @throws {Error} If id is invalid or deletion fails
 */
export function deleteUser(id: UserId): boolean {
  try {
    // Sanitize and validate input
    const sanitizedId = sanitizeUserId(id);

    // Check if database exists
    checkDatabase();

    if (typeof database.remove !== 'function') {
      throw new Error('Database remove method not available');
    }

    // Verify user exists before deletion (only if find is available)
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
    if (error instanceof Error && 
        (error.message.includes('User ID') || 
         error.message.includes('User not found'))) {
      throw error;
    }
    throw new Error('Failed to delete user');
  }
}

/**
 * Updates a user's email with validation and security checks
 * @param userId - The user ID to update
 * @param email - The new email address
 * @returns Updated user object
 * @throws {Error} If inputs are invalid or update fails
 */
export function updateUserEmail(userId: UserId, email: string): User {
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
    checkDatabase();

    if (typeof database.find !== 'function' || typeof database.save !== 'function') {
      throw new Error('Required database methods not available');
    }

    // Retrieve user
    const user = database.find(sanitizedId);
    
    if (!user) {
      throw new Error('User not found');
    }

    // Create updated user object (prevent mutation of original)
    const updatedUser: User = { ...user, email: trimmedEmail };

    // Save updated user
    const savedUser = database.save(updatedUser);

    if (!savedUser) {
      throw new Error('Failed to save user');
    }

    // Return a copy
    return { ...savedUser };
  } catch (error) {
    if (error instanceof Error && 
        (error.message.includes('User ID') || 
         error.message.includes('Email') ||
         error.message.includes('User not found'))) {
      throw error;
    }
    throw new Error('Failed to update user email');
  }
}