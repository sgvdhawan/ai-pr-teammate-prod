# 🔧 Fixed Setup Guide - AWS Bedrock

## ⚠️ Important Clarification

AWS Bedrock requires **AWS IAM credentials** (Access Key ID + Secret Access Key), not a simple API key. Here's the correct setup:

## 🚀 Corrected Setup Steps (5 Minutes)

### Step 1: Get Your AWS Credentials

You need **TWO** pieces of information:
1. **AWS Access Key ID** (starts with `AKIA...`)
2. **AWS Secret Access Key** (a long secret string)

#### Method A: Create New IAM Access Keys (Recommended)

1. **Go to AWS IAM Console**: https://console.aws.amazon.com/iam/
2. **Navigate to**: Users → Your username → Security credentials
3. **Click**: "Create access key"
4. **Select**: "Application running outside AWS"
5. **Click**: "Create access key"
6. **IMPORTANT**: Copy BOTH values:
   ```
   Access Key ID: AKIA...
   Secret Access Key: ...
   ```
   ⚠️ The secret key is shown only once!

#### Method B: Retrieve from Secrets Manager (If stored there)

The secret `bedrock/AWS3988/Sandbox/api-key` might contain your AWS credentials:

**Using AWS Console:**
1. Go to: https://console.aws.amazon.com/secretsmanager/
2. Find: `bedrock/AWS3988/Sandbox/api-key`
3. Click "Retrieve secret value"
4. If it's JSON, look for:
   ```json
   {
     "access_key": "AKIA...",
     "secret_key": "..."
   }
   ```
   Or similar field names like `AWS_ACCESS_KEY_ID` and `AWS_SECRET_ACCESS_KEY`

**Using AWS CLI:**
```bash
aws secretsmanager get-secret-value \
  --secret-id bedrock/AWS3988/Sandbox/api-key \
  --region us-west-2 \
  --query SecretString \
  --output text
```

### Step 2: Add to GitHub Secrets

1. **Go to your repository**: https://github.com/sgvdhawan/ai-pr-teammate-prod/settings/secrets/actions

2. **Add FIRST secret**:
   - Click "New repository secret"
   - Name: `AWS_ACCESS_KEY_ID`
   - Value: `AKIA...` (your access key ID)
   - Click "Add secret"

3. **Add SECOND secret**:
   - Click "New repository secret"
   - Name: `AWS_SECRET_ACCESS_KEY`
   - Value: (paste your secret access key)
   - Click "Add secret"

**That's it! You need these TWO secrets.**

### Step 3: Verify GitHub Secrets

Go to: https://github.com/sgvdhawan/ai-pr-teammate-prod/settings/secrets/actions

You should see:
```
Repository Secrets:
✅ GITHUB_TOKEN (automatically provided)
✅ AWS_ACCESS_KEY_ID
✅ AWS_SECRET_ACCESS_KEY
```

### Step 4: Test the Setup

The workflow is already configured correctly. Just test it:

1. **Go to your test PR** or create one:
   https://github.com/sgvdhawan/ai-pr-teammate-prod/pull/new/test/ai-teammate-demo

2. **Add a comment**:
   ```
   @ai-teammate please add error handling to test-api.js
   ```

3. **Watch Actions tab**: https://github.com/sgvdhawan/ai-pr-teammate-prod/actions

4. **Expected log output**:
   ```
   🤖 AI PR Teammate activated!
   🧠 AI Provider: bedrock (Model: anthropic.claude-sonnet-4-5-20250929-v1:0)
   🔐 Using AWS credentials for Bedrock
   📡 Calling AWS Bedrock in region us-west-2...
   ✅ Successfully generated code fix
   ```

## ✅ What You Need (Summary)

| Secret Name | Value | Where to Get It |
|-------------|-------|-----------------|
| `AWS_ACCESS_KEY_ID` | `AKIA...` | IAM Console → Create access key |
| `AWS_SECRET_ACCESS_KEY` | Long secret string | IAM Console (shown once) |

**No other secrets needed!**

## 🐛 Troubleshooting

### Error: "Could not resolve authentication method"

**Cause**: Missing AWS credentials

**Fix**: Make sure you've added BOTH secrets:
- `AWS_ACCESS_KEY_ID`
- `AWS_SECRET_ACCESS_KEY`

### Error: "Access Denied" / "UnauthorizedException"

**Cause**: Your IAM user doesn't have Bedrock permissions

**Fix**: Add this IAM policy to your user:

```json
{
  "Version": "2012-10-17",
  "Statement": [
    {
      "Effect": "Allow",
      "Action": [
        "bedrock:InvokeModel",
        "bedrock:InvokeModelWithResponseStream"
      ],
      "Resource": "*"
    }
  ]
}
```

**To add the policy:**
1. Go to IAM Console
2. Users → Your username
3. Add permissions → Attach policies directly
4. Search for "AmazonBedrockFullAccess" and attach it
5. Or create a custom policy with the JSON above

### Error: "Model not found"

**Cause**: Model ID incorrect or not enabled

**Fix**:
1. Go to AWS Bedrock Console: https://console.aws.amazon.com/bedrock/
2. Click "Model access" in sidebar
3. Make sure "Claude Sonnet" models are enabled
4. Verify the model ID matches: `anthropic.claude-sonnet-4-5-20250929-v1:0`

### Workflow not triggering

**Check**:
1. Workflow file committed: `.github/workflows/ai-pr-teammate-bedrock.yml`
2. Using exact trigger: `@ai-teammate` (with hyphen)
3. Commenting on a Pull Request (not an Issue)

## 📊 Cost Information

With your setup:
- **Budget**: $100/month
- **Cost per request**: ~$0.01-0.05
- **Available requests**: ~2,000-5,000/month
- **Typical hackathon**: $2-5 total

Monitor usage in AWS Cost Explorer:
https://console.aws.amazon.com/cost-management/

## ✅ Verification Checklist

Before testing, verify:
- [ ] Created IAM access keys (or retrieved from Secrets Manager)
- [ ] Added `AWS_ACCESS_KEY_ID` to GitHub Secrets
- [ ] Added `AWS_SECRET_ACCESS_KEY` to GitHub Secrets
- [ ] IAM user has Bedrock permissions
- [ ] Workflow file is committed to main branch
- [ ] Test PR is created

Once all checked, add `@ai-teammate` comment to test!

## 🎯 Quick Reference

**Get AWS Keys**: https://console.aws.amazon.com/iam/ → Users → Security credentials → Create access key

**Add GitHub Secrets**: https://github.com/sgvdhawan/ai-pr-teammate-prod/settings/secrets/actions

**Test PR**: https://github.com/sgvdhawan/ai-pr-teammate-prod/pull/new/test/ai-teammate-demo

**Check Actions**: https://github.com/sgvdhawan/ai-pr-teammate-prod/actions

---

**Need help?** Check the Actions logs or open an issue. The logs will show exactly what went wrong!

