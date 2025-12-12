# 🧪 Test PR Guide - Try Your AI Teammate!

Your test branch is ready! Let's test the AI PR Teammate with real code.

## ✅ Test Branch Created

**Branch**: `test/ai-teammate-demo`  
**Files Added**:
- `test-api.js` - User API functions (missing error handling, validation)
- `test-utils.js` - Utility functions (no async/await, poor validation)

These files intentionally have common issues that the AI can fix!

## 🚀 Quick Test Steps

### Step 1: Create the Pull Request

1. **Go to GitHub**: https://github.com/sgvdhawan/ai-pr-teammate-prod

2. **You'll see a yellow banner** saying:
   ```
   test/ai-teammate-demo had recent pushes
   [Compare & pull request]
   ```
   Click the **"Compare & pull request"** button

   **OR manually create PR**:
   - Go to: https://github.com/sgvdhawan/ai-pr-teammate-prod/pull/new/test/ai-teammate-demo
   
3. **Fill in PR details**:
   - Title: `Test AI PR Teammate - Demo`
   - Description: 
   ```markdown
   Testing the AI PR Teammate bot with code that needs improvements.
   
   Files added:
   - test-api.js - User API (needs error handling)
   - test-utils.js - Utilities (needs validation)
   ```

4. **Click**: "Create pull request"

### Step 2: Add Your AWS Bedrock API Key (If You Haven't Already)

Before testing, make sure you've added the Bedrock API key:

1. Go to AWS Secrets Manager and get your key:
   - Console: https://console.aws.amazon.com/secretsmanager/
   - Secret: `bedrock/AWS3988/Sandbox/api-key`
   - Click "Retrieve secret value" and copy it

2. Add to GitHub:
   - Go to: https://github.com/sgvdhawan/ai-pr-teammate-prod/settings/secrets/actions
   - Click "New repository secret"
   - Name: `BEDROCK_API_KEY`
   - Value: (paste the key)
   - Click "Add secret"

### Step 3: Test the AI with Comments

Now the fun part! Add comments to test different AI capabilities:

#### Test 1: Fix the User API
**Comment on the PR**:
```
@ai-teammate please review test-api.js and add:
- Comprehensive error handling with try-catch blocks
- Input validation for all parameters  
- Proper HTTP status codes (200, 400, 404, 500)
- Security measures to prevent injection attacks
- Async/await where needed
- JSDoc documentation
```

**Expected Result**: 
- AI will analyze the code
- Commit improved version with all requested features
- Post explanation of changes

#### Test 2: Fix the Utils
**Comment on the PR**:
```
@ai-teammate review test-utils.js and add proper error handling, async/await, and robust input validation
```

**Expected Result**:
- AI fixes async issues
- Adds error handling
- Improves validation

#### Test 3: Inline Comment (Optional)
**Add a review comment** on a specific line in `test-api.js`:
- Click "Files changed" tab
- Hover over line 6 (the `getUser` function)
- Click the "+" button
- Comment:
```
@ai-teammate this function needs error handling for when user is not found
```

## 📊 What to Watch For

### In GitHub Actions (Actions Tab)
You should see:
```
🤖 AI PR Teammate activated!
Event: issue_comment
🧠 AI Provider: bedrock (Model: anthropic.claude-sonnet-4-5-20250929-v1:0)
🔑 Using Bedrock API key from Secrets Manager
📡 Calling AWS Bedrock with API key at https://bedrock-runtime.us-west-2.amazonaws.com/...
✅ Successfully generated code fix
💾 Committed changes: 🤖 AI PR Teammate: [description]
💬 Posted explanation comment
```

### In the PR
You should see:
1. **New commit** from the bot with improved code
2. **Comment from bot** explaining what was changed
3. **Changed files** with improvements:
   - Try-catch blocks
   - Input validation
   - Proper async/await
   - Error messages
   - Type checking

## 🎯 Example: What the AI Will Do

**Your original code** (`test-api.js`):
```javascript
export function getUser(userId) {
  const user = database.find(userId);
  return user;
}
```

**After AI fixes it**:
```javascript
/**
 * Get user by ID with comprehensive error handling
 * @param {string} userId - The user ID to fetch
 * @returns {Promise<Object>} User object or error response
 */
export async function getUser(userId) {
  try {
    // Input validation
    if (!userId) {
      return {
        status: 400,
        error: 'User ID is required'
      };
    }

    if (typeof userId !== 'string') {
      return {
        status: 400,
        error: 'User ID must be a string'
      };
    }

    // Sanitize to prevent injection
    const sanitizedId = userId.trim();

    if (sanitizedId.length === 0) {
      return {
        status: 400,
        error: 'User ID cannot be empty'
      };
    }

    // Query database
    const user = await database.find(sanitizedId);

    if (!user) {
      return {
        status: 404,
        error: 'User not found'
      };
    }

    return {
      status: 200,
      data: user
    };

  } catch (error) {
    console.error('Error fetching user:', error);
    return {
      status: 500,
      error: 'Internal server error'
    };
  }
}
```

Plus a detailed explanation comment!

## 🐛 Troubleshooting

### Workflow Not Triggering

**Check**:
1. Did you use exact trigger: `@ai-teammate` (with hyphen)?
2. Is the workflow file committed?
3. Check Actions tab for any errors

**Fix**: Look at workflow run logs in Actions tab

### "Secret not found" Error

**Check**:
1. Go to Settings → Secrets → Actions
2. Verify `BEDROCK_API_KEY` exists
3. Value should not be empty

**Fix**: Re-add the secret from AWS Secrets Manager

### "Access Denied" Error

**Problem**: Can't access AWS Bedrock

**Fix**: 
1. Verify API key is correct
2. Check it's from the right secret: `bedrock/AWS3988/Sandbox/api-key`
3. Try regenerating the key

### AI Response Taking Long

**Normal**: First request may take 15-30 seconds as the model loads

**Check**: Watch the Actions logs - you'll see progress

## ✅ Success Checklist

After testing, you should have:
- ✅ PR created with test files
- ✅ Bot responded to your comment
- ✅ New commit with improved code
- ✅ Explanation comment from bot
- ✅ Much better code quality!

## 🎉 What This Proves

This test demonstrates:
1. ✅ AWS Bedrock integration working
2. ✅ Claude Sonnet 4 generating intelligent fixes
3. ✅ Bot can commit changes automatically
4. ✅ Bot provides clear explanations
5. ✅ Real AI (not mock responses!)
6. ✅ Production-ready for your hackathon project

## 📸 Screenshot Ideas

For your hackathon presentation, take screenshots of:
1. **Before**: The original test-api.js code (simple, no error handling)
2. **Comment**: Your `@ai-teammate` comment
3. **Actions**: The workflow running
4. **After**: The improved code with error handling
5. **Explanation**: The bot's comment explaining changes

## 🚀 Next Steps

Once this test works:
1. **Use it on real code** in your hackathon project
2. **Share with your team** - show them how to use `@ai-teammate`
3. **Document savings** - track time saved on code reviews
4. **Present it** - this is a great hackathon demo!

## 💡 More Test Ideas

### Test 4: Security Review
```
@ai-teammate check all functions for security vulnerabilities including SQL injection, XSS, and input validation issues
```

### Test 5: Add TypeScript
```
@ai-teammate convert test-api.js to TypeScript with proper types and interfaces
```

### Test 6: Performance Optimization
```
@ai-teammate optimize test-utils.js for better performance and add caching where appropriate
```

## 🔗 Quick Links

- **Your PR**: https://github.com/sgvdhawan/ai-pr-teammate-prod/pulls
- **Actions**: https://github.com/sgvdhawan/ai-pr-teammate-prod/actions
- **Secrets**: https://github.com/sgvdhawan/ai-pr-teammate-prod/settings/secrets/actions
- **AWS Secrets Manager**: https://console.aws.amazon.com/secretsmanager/

---

**Ready to test? Create the PR and add your first `@ai-teammate` comment!** 🎉

Questions? Check the Actions logs or open an issue.

