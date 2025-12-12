# 🎯 Adobe CAMP Bedrock Setup - Simple Guide

Your Bedrock deployment uses Adobe's CAMP automation with a pre-configured API key. This is **simpler** than standard AWS setup!

## ✅ What You Have

From AWS Secrets Manager (`bedrock/AWS3988/Sandbox/api-key`), you have a JSON secret:

```json
{
  "api_key": "your-api-key-here",
  "username": "bedrock-api-user-AWS3988-Sandbox",
  "service_name": "bedrock.amazonaws.com",
  "deployment_id": "69393d5f59c5c036963b30c1",
  "created_by": "CAMP-Bedrock-Automation",
  "expiration_days": 365
}
```

## 🚀 Setup (3 Minutes)

### Step 1: Get the Secret from AWS Secrets Manager

#### Option A: AWS Console (Easiest)

1. Go to AWS Secrets Manager: https://console.aws.amazon.com/secretsmanager/
2. Find secret: `bedrock/AWS3988/Sandbox/api-key`
3. Click on it
4. Click "Retrieve secret value"
5. **Copy the ENTIRE JSON** (including the curly braces `{}`)

#### Option B: AWS CLI

```bash
aws secretsmanager get-secret-value \
  --secret-id bedrock/AWS3988/Sandbox/api-key \
  --region us-west-2 \
  --query SecretString \
  --output text
```

Copy the entire output.

### Step 2: Add to GitHub Secrets

1. **Go to your repository**:
   https://github.com/sgvdhawan/ai-pr-teammate-prod/settings/secrets/actions

2. **Click**: "New repository secret"

3. **Fill in**:
   - **Name**: `BEDROCK_API_KEY`
   - **Value**: Copy **ONLY** the `api_key` value from the JSON
     
     From this JSON:
     ```json
     {
       "api_key": "abc123xyz...",
       "username": "bedrock-api-user-AWS3988-Sandbox",
       ...
     }
     ```
     
     Copy only: `abc123xyz...` (just the api_key value, no quotes or brackets)
   
4. **Click**: "Add secret"

**That's it! Only ONE secret needed!** ✅

### Step 3: Test It!

1. **Create or open your test PR**:
   https://github.com/sgvdhawan/ai-pr-teammate-prod/pulls

2. **Add a comment**:
   ```
   @ai-teammate please add comprehensive error handling to test-api.js
   ```

3. **Watch the Actions tab**:
   https://github.com/sgvdhawan/ai-pr-teammate-prod/actions

4. **Expected log output**:
   ```
   🤖 AI PR Teammate activated!
   🧠 AI Provider: bedrock (Model: anthropic.claude-sonnet-4-5-20250929-v1:0)
   🔑 Using Adobe CAMP Bedrock API key
      Username: bedrock-api-user-AWS3988-Sandbox
      Service: bedrock.amazonaws.com
   📡 Calling AWS Bedrock with CAMP API key...
   ✅ Successfully generated code fix
   ```

## ✅ Verification

### Check GitHub Secrets

Go to: https://github.com/sgvdhawan/ai-pr-teammate-prod/settings/secrets/actions

You should see:
```
Repository Secrets:
✅ GITHUB_TOKEN (automatically provided)
✅ BEDROCK_API_KEY
```

### Check the Secret Value

The secret should be valid JSON. You can verify by trying to parse it:

```bash
# Paste your secret value into a file
echo 'YOUR_SECRET_HERE' > test.json

# Verify it's valid JSON
python3 -m json.tool test.json

# Should output formatted JSON
# If you get an error, the JSON is malformed

# Clean up
rm test.json
```

## 🎯 Summary

**What you need**:
- ✅ 1 GitHub Secret: `BEDROCK_API_KEY` (the full JSON from Secrets Manager)

**What you DON'T need**:
- ❌ AWS_ACCESS_KEY_ID
- ❌ AWS_SECRET_ACCESS_KEY  
- ❌ IAM policies or permissions

Your CAMP deployment handles all the AWS authentication automatically!

## 🐛 Troubleshooting

### Error: "Could not resolve authentication method"

**Cause**: The `BEDROCK_API_KEY` secret is not set or is empty.

**Fix**:
1. Check GitHub Secrets - is `BEDROCK_API_KEY` there?
2. Click on it and verify it contains the JSON
3. If empty, re-add it from AWS Secrets Manager

### Error: "Invalid API key" or "Unauthorized"

**Cause**: The API key is incorrect or expired.

**Fix**:
1. Make sure you copied ONLY the api_key VALUE (not the full JSON)
2. No quotes, no brackets - just the raw API key string
3. Re-retrieve from AWS Secrets Manager if needed

**Example of CORRECT format** (what to paste in GitHub secret):
```
abc123xyz789longrandomstring
```

**Example of WRONG format**:
```
"abc123..."                  ❌ Has quotes
{"api_key":"abc123..."}      ❌ Full JSON
abc123 ...                   ❌ Has spaces or line breaks
```

### Error: "Access Denied" / "Invalid API key"

**Cause**: The API key has expired or is invalid.

**Fix**:
1. Check `expiration_days` in the JSON - is it still valid?
2. Re-retrieve the secret from AWS Secrets Manager (it might have been rotated)
3. Contact Adobe CAMP support (#camp-help on Slack)

### Workflow not running

**Check**:
1. Are you commenting `@ai-teammate` (exact spelling with hyphen)?
2. Is this a Pull Request (not an Issue)?
3. Is the workflow file committed to main branch?
4. Check Actions tab for any errors

## 📊 What This Setup Gives You

- **Model**: Claude Sonnet 4 (latest and most powerful)
- **Budget**: $100/month (Adobe-provided)
- **Requests**: ~2,000-5,000 per month
- **Speed**: 10-20 seconds per request
- **Quality**: Best-in-class AI code generation
- **Support**: Adobe CAMP team (#camp-help)

## 🎉 You're Done!

Your setup is simpler than standard AWS because Adobe CAMP handles:
- ✅ AWS authentication
- ✅ IAM permissions
- ✅ Bedrock model access
- ✅ Rate limiting
- ✅ Cost tracking

You just need to:
1. Get the secret JSON from AWS Secrets Manager
2. Add it as `BEDROCK_API_KEY` in GitHub
3. Test with `@ai-teammate`!

## 🔗 Quick Links

- **Get Secret**: https://console.aws.amazon.com/secretsmanager/ (search: `bedrock/AWS3988/Sandbox/api-key`)
- **Add to GitHub**: https://github.com/sgvdhawan/ai-pr-teammate-prod/settings/secrets/actions
- **Test PR**: https://github.com/sgvdhawan/ai-pr-teammate-prod/pull/new/test/ai-teammate-demo
- **Check Actions**: https://github.com/sgvdhawan/ai-pr-teammate-prod/actions
- **CAMP Support**: #camp-help on Slack or email GRP-ITC-CAMP-SUPPORT

---

**Ready to test? Just add the secret and try `@ai-teammate`!** 🚀

