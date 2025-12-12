# 🔑 Using AWS Bedrock with API Key (Simplest Method!)

This guide shows you how to use the API key method exactly as described in your AWS deployment email.

## ✅ What Your Email Says

From your AWS Bedrock deployment email:
- **API Key Location**: AWS Secrets Manager → `bedrock/AWS3988/Sandbox/api-key`
- **Endpoint URL**: `https://bedrock-runtime.us-west-2.amazonaws.com/`
- **Model ID**: `anthropic.claude-sonnet-4-5-20250929-v1:0`

This is the **simplest method** - just one API key, no IAM complexity!

## 🚀 Quick Setup (3 Minutes)

### Step 1: Get Your API Key from AWS Secrets Manager

#### Option A: Using AWS Console (Easiest)

1. **Log into AWS Console**: https://console.aws.amazon.com/
2. **Go to Secrets Manager**: 
   - Search for "Secrets Manager" in the top search bar
   - Or go directly to: https://console.aws.amazon.com/secretsmanager/
3. **Find your secret**:
   - Look for: `bedrock/AWS3988/Sandbox/api-key`
   - Click on it
4. **Retrieve the secret value**:
   - Click "Retrieve secret value" button
   - Copy the entire secret value
   - This is your Bedrock API key!

#### Option B: Using AWS CLI (Faster if you have CLI configured)

```bash
# Install AWS CLI if you don't have it:
# brew install awscli  # macOS
# or download from: https://aws.amazon.com/cli/

# Get the API key:
aws secretsmanager get-secret-value \
  --secret-id bedrock/AWS3988/Sandbox/api-key \
  --region us-west-2 \
  --query SecretString \
  --output text

# Copy the output - that's your API key!
```

### Step 2: Add to GitHub Secrets

1. **Go to your repository on GitHub**
2. **Navigate to**: Settings → Secrets and variables → Actions
3. **Click**: "New repository secret"
4. **Add the secret**:
   - **Name**: `BEDROCK_API_KEY`
   - **Value**: (paste the API key from Step 1)
5. **Click**: "Add secret"

**That's it! Only ONE secret needed!** ✅

### Step 3: Verify the Workflow is Configured

The workflow file `.github/workflows/ai-pr-teammate-bedrock.yml` is already configured to use the API key if provided:

```yaml
env:
  BEDROCK_API_KEY: ${{ secrets.BEDROCK_API_KEY }}  # ← This will use your key!
  BEDROCK_ENDPOINT_URL: 'https://bedrock-runtime.us-west-2.amazonaws.com/'
```

You're done! Just push to GitHub if you haven't already:

```bash
git push
```

## 🧪 Test It!

1. **Create a test PR**:
```bash
git checkout -b test/api-key-method

echo 'function test(x) { return data[x]; }' > test.js

git add test.js
git commit -m "Test function"
git push origin test/api-key-method
```

2. **Open the PR on GitHub**

3. **Add a comment**:
```
@ai-teammate add error handling and input validation
```

4. **Watch the logs** (Actions tab):
```
🤖 AI PR Teammate activated!
🔑 Using Bedrock API key from Secrets Manager
📡 Calling AWS Bedrock with API key at https://bedrock-runtime.us-west-2.amazonaws.com/...
✅ Successfully generated code fix
```

## ✅ Verification

If everything is working, you'll see in the GitHub Actions logs:

```
🧠 AI Provider: bedrock (Model: anthropic.claude-sonnet-4-5-20250929-v1:0)
🔑 Using Bedrock API key from Secrets Manager
📡 Calling AWS Bedrock with API key at https://bedrock-runtime.us-west-2.amazonaws.com/...
```

And the bot will commit improved code to your PR!

## 🆚 API Key vs IAM Credentials

| Aspect | API Key Method (This Guide) | IAM Credentials Method |
|--------|----------------------------|----------------------|
| **Secrets Needed** | 1 (BEDROCK_API_KEY) | 3 (AWS_ACCESS_KEY_ID, AWS_SECRET_ACCESS_KEY, AWS_REGION) |
| **Setup Time** | 3 minutes | 5 minutes |
| **Matches Email** | ✅ Yes | No |
| **Simplicity** | ⭐⭐⭐⭐⭐ Simplest | ⭐⭐⭐ More complex |
| **IAM Permissions** | Not needed | Need to configure |

**Recommendation**: Use the API Key method (this guide)! It's simpler and matches what your email describes.

## 🐛 Troubleshooting

### Error: "Cannot read secret"

**Problem**: You don't have permission to read from Secrets Manager.

**Solution**:
1. Make sure you're logged into the correct AWS account (561107861478)
2. Your user needs `secretsmanager:GetSecretValue` permission
3. Or ask your admin to retrieve the key for you

### Error: "Invalid API key"

**Problem**: The key might have been regenerated or is incorrect.

**Solution**:
1. Re-retrieve the key from AWS Secrets Manager
2. Make sure you copied the entire value (no extra spaces)
3. Update the GitHub secret with the new value

### Error: "Endpoint not found"

**Problem**: Endpoint URL might be wrong.

**Solution**: The endpoint should be exactly:
```
https://bedrock-runtime.us-west-2.amazonaws.com/
```

### Bot not responding

**Problem**: Secret might not be configured correctly.

**Check**:
1. Go to your repo Settings → Secrets → Actions
2. Verify `BEDROCK_API_KEY` is listed
3. The value should NOT be empty
4. Try removing and re-adding the secret

## 📊 What You're Using

When using the API key method with your setup:

- **Authentication**: API Key from Secrets Manager ✅
- **Endpoint**: `https://bedrock-runtime.us-west-2.amazonaws.com/` ✅
- **Model**: Claude Sonnet 4 (`anthropic.claude-sonnet-4-5-20250929-v1:0`) ✅
- **Region**: us-west-2 ✅
- **Cost**: Charged to your $100/month budget ✅

## 💡 How It Works

```
1. PR comment: "@ai-teammate fix this"
   ↓
2. GitHub Actions workflow triggers
   ↓
3. Reads BEDROCK_API_KEY from secrets
   ↓
4. Makes HTTP POST to:
   https://bedrock-runtime.us-west-2.amazonaws.com/model/{model-id}/invoke
   ↓
5. Includes API key in Authorization header
   ↓
6. AWS Bedrock validates key and calls Claude Sonnet 4
   ↓
7. Returns AI-generated code fix
   ↓
8. Bot commits the fix to your PR
```

## 🎉 You're Done!

You're now using the **simplest method** to access AWS Bedrock with Claude Sonnet 4!

**Advantages of this method:**
- ✅ Only 1 secret to manage
- ✅ Matches your deployment email exactly
- ✅ No IAM policy configuration needed
- ✅ Uses the endpoint URL as described
- ✅ Faster setup

**Next Steps:**
1. Test it on a real PR
2. Share with your team
3. Win the hackathon! 🏆

## 📚 Related Documentation

- **Quick Start**: [QUICKSTART_AWS_BEDROCK.md](./QUICKSTART_AWS_BEDROCK.md) - Now includes both methods!
- **Full Guide**: [AWS_BEDROCK_SETUP.md](./AWS_BEDROCK_SETUP.md)
- **Overview**: [START_HERE.md](./START_HERE.md)

---

**Questions?** Open an issue or check the GitHub Actions logs for detailed error messages.

