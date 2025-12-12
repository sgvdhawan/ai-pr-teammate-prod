/**
 * User API - with comprehensive error handling
 */

/**
 * Retrieves a user by ID
 * @param {string|number} userId - The user ID to find
 * @returns {Object} The user object
 * @throws {Error} If userId is invalid or user not found
 */
export function getUser(userId) {
  // Input validation
  if (!userId) {
    throw new Error('User ID is required');
  }

  if (typeof userId !== 'string' && typeof userId !== 'number') {
    throw new Error('User ID must be a string or number');
  }

  try {
    const user = database.find(userId);
    
    if (!user) {
      throw new Error(`User with ID ${userId} not found`);
    }
    
    return user;
  } catch (error) {
    // Re-throw with context if it's our custom error
    if (error.message.includes('User')) {
      throw error;
    }
    // Wrap database errors with more context
    throw new Error(`Failed to retrieve user: ${error.message}`);
  }
}

/**
 * Creates a new user
 * @param {Object} data - User data object
 * @returns {Object} The created user object
 * @throws {Error} If data is invalid or creation fails
 */
export function createUser(data) {
  // Input validation
  if (!data || typeof data !== 'object') {
    throw new Error('User data must be a valid object');
  }

  if (Array.isArray(data)) {
    throw new Error('User data cannot be an array');
  }

  // Validate required fields
  const requiredFields = ['email', 'name'];
  const missingFields = requiredFields.filter(field => !data[field]);
  
  if (missingFields.length > 0) {
    throw new Error(`Missing required fields: ${missingFields.join(', ')}`);
  }

  // Basic email validation
  if (!data.email.includes('@') || data.email.length < 3) {
    throw new Error('Invalid email format');
  }

  // Sanitize data to prevent injection attacks
  const sanitizedData = {
    ...data,
    name: String(data.name).trim(),
    email: String(data.email).trim().toLowerCase()
  };

  try {
    const newUser = database.insert(sanitizedData);
    
    if (!newUser) {
      throw new Error('Database insert returned null or undefined');
    }
    
    return newUser;
  } catch (error) {
    // Handle duplicate key errors
    if (error.message.includes('duplicate') || error.message.includes('unique')) {
      throw new Error('A user with this email already exists');
    }
    throw new Error(`Failed to create user: ${error.message}`);
  }
}

/**
 * Deletes a user by ID
 * @param {string|number} id - The user ID to delete
 * @returns {boolean} True if deletion was successful
 * @throws {Error} If id is invalid or deletion fails
 */
export function deleteUser(id) {
  // Input validation
  if (!id) {
    throw new Error('User ID is required for deletion');
  }

  if (typeof id !== 'string' && typeof id !== 'number') {
    throw new Error('User ID must be a string or number');
  }

  try {
    // Check if user exists before attempting deletion
    const user = database.find(id);
    
    if (!user) {
      throw new Error(`Cannot delete: User with ID ${id} not found`);
    }

    const result = database.remove(id);
    
    // Verify deletion was successful
    if (result === false) {
      throw new Error('Database deletion operation failed');
    }
    
    return true;
  } catch (error) {
    // Re-throw with context if it's our custom error
    if (error.message.includes('User') || error.message.includes('delete')) {
      throw error;
    }
    throw new Error(`Failed to delete user: ${error.message}`);
  }
}

/**
 * Updates a user's email address
 * @param {string|number} userId - The user ID to update
 * @param {string} email - The new email address
 * @returns {Object} The updated user object
 * @throws {Error} If parameters are invalid or update fails
 */
export function updateUserEmail(userId, email) {
  // Input validation
  if (!userId) {
    throw new Error('User ID is required');
  }

  if (typeof userId !== 'string' && typeof userId !== 'number') {
    throw new Error('User ID must be a string or number');
  }

  if (!email || typeof email !== 'string') {
    throw new Error('Email must be a valid string');
  }

  // Validate email format
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email)) {
    throw new Error('Invalid email format');
  }

  // Sanitize email
  const sanitizedEmail = email.trim().toLowerCase();

  if (sanitizedEmail.length < 3 || sanitizedEmail.length > 254) {
    throw new Error('Email length must be between 3 and 254 characters');
  }

  try {
    const user = database.find(userId);
    
    if (!user) {
      throw new Error(`User with ID ${userId} not found`);
    }

    // Prevent unnecessary updates
    if (user.email === sanitizedEmail) {
      return user;
    }

    // Create a copy to avoid mutating the original before save succeeds
    const updatedUser = { ...user, email: sanitizedEmail };
    
    const savedUser = database.save(updatedUser);
    
    if (!savedUser) {
      throw new Error('Database save operation failed');
    }
    
    return savedUser;
  } catch (error) {
    // Handle duplicate email errors
    if (error.message.includes('duplicate') || error.message.includes('unique')) {
      throw new Error('This email is already in use by another user');
    }
    // Re-throw with context if it's our custom error
    if (error.message.includes('User') || error.message.includes('email')) {
      throw error;
    }
    throw new Error(`Failed to update user email: ${error.message}`);
  }
}