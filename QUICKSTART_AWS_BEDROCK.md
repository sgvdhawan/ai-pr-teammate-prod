# ⚡ Quick Start - AWS Bedrock (5 Minutes)

Get AI PR Teammate running with your AWS Bedrock Claude Sonnet 4 deployment in just 5 minutes!

## 🎯 Prerequisites Checklist

From your AWS account email, you should have:
- ✅ AWS Account: 561107861478
- ✅ Region: us-west-2
- ✅ Model: Claude Sonnet 4 (`anthropic.claude-sonnet-4-5-20250929-v1:0`)
- ✅ Budget: $100/month
- ✅ Valid until: January 07, 2026

## 🚀 5-Minute Setup

### Step 1: Get AWS Access Keys (2 minutes)

1. Go to [AWS IAM Console](https://console.aws.amazon.com/iam/)
2. Click "Users" → Your username → "Security credentials"
3. Click "Create access key" → "Application running outside AWS"
4. **Save these** (you'll only see the secret once!):
   ```
   AWS_ACCESS_KEY_ID=AKIA...
   AWS_SECRET_ACCESS_KEY=...
   ```

### Step 2: Add GitHub Secrets (1 minute)

1. Go to your repo: `Settings` → `Secrets and variables` → `Actions`
2. Click `New repository secret` for each:
   - `AWS_ACCESS_KEY_ID` = (from Step 1)
   - `AWS_SECRET_ACCESS_KEY` = (from Step 1)
   - `AWS_REGION` = `us-west-2`

### Step 3: Use Pre-Made Workflow (1 minute)

The workflow file is already created! Just commit it:

```bash
cd /Users/dhawan/Work/ai-pr-teammate-prod

# The file is already there:
# .github/workflows/ai-pr-teammate-bedrock.yml

# Just commit and push:
git add .github/workflows/ai-pr-teammate-bedrock.yml
git commit -m "Add AWS Bedrock workflow"
git push
```

### Step 4: Test It! (1 minute)

1. Create a test file:
```bash
git checkout -b test/ai-teammate

cat > test-api.js << 'EOF'
export function getUserData(userId) {
  const data = database.query(userId);
  return data;
}
EOF

git add test-api.js
git commit -m "Add test API function"
git push origin test/ai-teammate
```

2. Create a Pull Request on GitHub

3. Add a comment:
```
@ai-teammate please add comprehensive error handling, input validation, and security best practices
```

4. Watch the magic! 🎉
   - Go to "Actions" tab
   - See the workflow running
   - Check the PR for the AI's commit and explanation

## ✅ Verification

You should see in the Actions log:
```
🤖 AI PR Teammate activated!
🧠 AI Provider: bedrock (Model: anthropic.claude-sonnet-4-5-20250929-v1:0)
📡 Calling AWS Bedrock in region us-west-2...
✅ Successfully generated code fix
💾 Committed changes
💬 Posted explanation comment
```

## 🎯 What the AI Will Do

Input code:
```javascript
export function getUserData(userId) {
  const data = database.query(userId);
  return data;
}
```

AI's improved code:
```javascript
/**
 * Fetch user data with comprehensive error handling and validation
 * @param {string} userId - The user ID to fetch data for
 * @returns {Promise<Object>} User data object or error response
 */
export async function getUserData(userId) {
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

    // Sanitize input to prevent injection
    const sanitizedId = userId.trim();
    
    if (sanitizedId.length === 0) {
      return {
        status: 400,
        error: 'User ID cannot be empty'
      };
    }

    // Query database with error handling
    const data = await database.query(sanitizedId);

    // Handle not found
    if (!data) {
      return {
        status: 404,
        error: 'User not found'
      };
    }

    // Success response
    return {
      status: 200,
      data: data
    };

  } catch (error) {
    // Log error for debugging
    console.error('Error fetching user data:', error);
    
    // Return generic error to client
    return {
      status: 500,
      error: 'Internal server error'
    };
  }
}
```

Plus an explanation comment describing all the improvements!

## 🎬 Real-World Usage

### For Your Hackathon Project

Use the AI to:
1. **Add error handling** to all API endpoints
2. **Implement input validation** across the codebase
3. **Fix CI/CD failures** automatically
4. **Add security best practices** (SQL injection prevention, XSS protection)
5. **Improve code quality** (proper async/await, error boundaries)
6. **Generate documentation** and comments

### Example Scenarios

**Scenario 1: API Endpoint Review**
```
@ai-teammate review this API endpoint and add:
- Input validation for all parameters
- Proper HTTP status codes
- Error logging
- Security measures against injection attacks
```

**Scenario 2: CI Failure**
```
# When CI fails, the bot automatically:
1. Detects the failure
2. Analyzes error logs
3. Commits a fix
4. Explains what went wrong
# No manual intervention needed!
```

**Scenario 3: Security Review**
```
@ai-teammate check this code for security vulnerabilities and fix them
```

## 💰 Cost Tracking

With your $100/month budget:

```
Estimated costs per fix:
- Simple fix (add validation): ~$0.01
- Medium fix (error handling): ~$0.02
- Complex fix (refactoring): ~$0.05

Your budget allows:
- ~2,000 simple fixes, OR
- ~5,000 total fixes mixed complexity

For a hackathon project:
- 10-50 fixes needed = $0.50-$2.50 total
- Plenty of budget remaining!
```

Monitor usage:
```bash
# Check AWS Bedrock costs
aws ce get-cost-and-usage \
  --time-period Start=$(date -d '30 days ago' +%Y-%m-%d),End=$(date +%Y-%m-%d) \
  --granularity DAILY \
  --metrics "UnblendedCost" \
  --filter file://bedrock-filter.json
```

## 🐛 Troubleshooting

### "Access Denied" Error

**Fix**: Add Bedrock permissions to your IAM user:

```bash
# Go to AWS IAM Console
# Your User → Add permissions → Attach policies → AmazonBedrockFullAccess
```

Or use this minimal policy:
```json
{
  "Version": "2012-10-17",
  "Statement": [{
    "Effect": "Allow",
    "Action": ["bedrock:InvokeModel"],
    "Resource": "*"
  }]
}
```

### "Model Not Found" Error

**Fix**: Verify the model ID is exactly:
```
anthropic.claude-sonnet-4-5-20250929-v1:0
```

Check in AWS Bedrock Console → Model access → Ensure Claude Sonnet 4 is enabled.

### Workflow Not Triggering

**Fix**: Make sure you're using the exact trigger phrase:
```
@ai-teammate (with exact spelling, including hyphen)
```

### Slow Responses

**Expected**: 10-20 seconds for Bedrock to respond.

If slower, check:
- AWS service health
- Your network connection
- GitHub Actions status

## 🎉 You're Done!

Your AI PR Teammate is now powered by **Claude Sonnet 4** - Anthropic's most powerful AI model!

### What You Have Now

- ✅ State-of-the-art AI (Claude Sonnet 4 from Sep 2024)
- ✅ Enterprise-grade infrastructure (AWS Bedrock)
- ✅ Generous budget ($100/month = thousands of fixes)
- ✅ Valid until January 2026
- ✅ Production-ready setup

### Next Steps

1. **Test on a real PR** from your hackathon project
2. **Show your team** how to use `@ai-teammate`
3. **Set up cost alerts** (optional)
4. **Build something amazing** for the hackathon! 🏆

## 📚 Additional Resources

- **Full Setup Guide**: [AWS_BEDROCK_SETUP.md](./AWS_BEDROCK_SETUP.md)
- **Main README**: [README.md](./README.md)
- **Troubleshooting**: Check GitHub Actions logs

## 🆘 Need Help?

- **AWS Issues**: #camp-help on Slack or GRP-ITC-CAMP-SUPPORT
- **Bot Issues**: Check `.github/workflows/ai-pr-teammate-bedrock.yml` logs
- **Questions**: Open an issue in this repository

---

**🚀 Ready to revolutionize your code reviews with AI!**

Try it now:
```
@ai-teammate help me win this hackathon!
```

