# 🚀 AWS Bedrock Setup Guide - Claude Sonnet 4

This guide will help you set up AI PR Teammate with your AWS Bedrock deployment of Claude Sonnet 4.

## ✅ What You Have

Based on your AWS account setup email, you have:

- **Model**: Claude Sonnet 4 (`anthropic.claude-sonnet-4-5-20250929-v1:0`)
- **Region**: `us-west-2`
- **Account**: 561107861478
- **Endpoint**: `https://bedrock-runtime.us-west-2.amazonaws.com/`
- **API Key Location**: AWS Secrets Manager (`bedrock/AWS3988/Sandbox/api-key`)
- **Budget**: $100/month allocated
- **Valid Until**: January 07, 2026

## 📋 Step-by-Step Setup

### Step 1: Get Your AWS Credentials

You'll need AWS access keys to authenticate with Bedrock. There are two ways to get them:

#### Option A: Create IAM Access Keys (Recommended)

1. **Log into AWS Console**:
   - Visit [AWS Console](https://console.aws.amazon.com/)
   - Use your Adobe credentials or the account credentials provided

2. **Navigate to IAM**:
   - Go to IAM (Identity and Access Management)
   - Click on "Users" in the left sidebar
   - Click on your username

3. **Create Access Key**:
   - Go to "Security credentials" tab
   - Scroll to "Access keys" section
   - Click "Create access key"
   - Choose "Application running outside AWS"
   - Click "Create access key"
   - **IMPORTANT**: Copy both:
     - Access Key ID (starts with `AKIA...`)
     - Secret Access Key (shows only once!)

4. **Save Credentials Securely**:
   ```
   AWS_ACCESS_KEY_ID=AKIA...your_key_here
   AWS_SECRET_ACCESS_KEY=your_secret_key_here
   ```

#### Option B: Use Existing Credentials

If you already have AWS CLI configured locally:

```bash
# Check if you have credentials
cat ~/.aws/credentials

# You'll see something like:
[default]
aws_access_key_id = AKIA...
aws_secret_access_key = your_secret_key
```

### Step 2: Set Up GitHub Secrets

1. **Go to your GitHub repository**
2. Navigate to **Settings** → **Secrets and variables** → **Actions**
3. Click **New repository secret** and add each of these:

| Secret Name | Value | Example |
|-------------|-------|---------|
| `AWS_ACCESS_KEY_ID` | Your AWS access key | `AKIA...` |
| `AWS_SECRET_ACCESS_KEY` | Your AWS secret key | `...` |
| `AWS_REGION` | `us-west-2` | `us-west-2` |
| `BEDROCK_MODEL_ID` | `anthropic.claude-sonnet-4-5-20250929-v1:0` | (from email) |

**Screenshot of what it should look like:**
```
Repository Secrets:
✅ GITHUB_TOKEN (automatically provided)
✅ AWS_ACCESS_KEY_ID
✅ AWS_SECRET_ACCESS_KEY  
✅ AWS_REGION
✅ BEDROCK_MODEL_ID
```

### Step 3: Create GitHub Actions Workflow

Create `.github/workflows/ai-pr-teammate.yml`:

```yaml
name: AI PR Teammate (AWS Bedrock)

on:
  issue_comment:
    types: [created]
  pull_request_review_comment:
    types: [created]
  check_run:
    types: [completed]

permissions:
  contents: write
  pull-requests: write
  checks: read

jobs:
  ai-pr-teammate:
    runs-on: ubuntu-latest
    
    steps:
      - name: Checkout code
        uses: actions/checkout@v4
        with:
          fetch-depth: 0
          token: ${{ secrets.GITHUB_TOKEN }}

      - name: Setup Node.js
        uses: actions/setup-node@v4
        with:
          node-version: '20'

      - name: Install dependencies
        run: npm install

      - name: Run AI PR Teammate with AWS Bedrock
        env:
          # GitHub
          GITHUB_TOKEN: ${{ secrets.GITHUB_TOKEN }}
          
          # AI Provider
          AI_PROVIDER: 'bedrock'
          
          # AWS Bedrock Configuration
          AWS_REGION: ${{ secrets.AWS_REGION }}
          AWS_ACCESS_KEY_ID: ${{ secrets.AWS_ACCESS_KEY_ID }}
          AWS_SECRET_ACCESS_KEY: ${{ secrets.AWS_SECRET_ACCESS_KEY }}
          BEDROCK_MODEL_ID: ${{ secrets.BEDROCK_MODEL_ID }}
          
        run: node src/index.js
```

### Step 4: Test the Setup

1. **Commit and push the workflow**:
```bash
git add .github/workflows/ai-pr-teammate.yml
git commit -m "Add AI PR Teammate with AWS Bedrock"
git push
```

2. **Create a test PR**:
```bash
# Create a new branch
git checkout -b test/bedrock-ai

# Add some code that needs improvement
echo 'export function getUser(id) { return database.find(id); }' > test.js
git add test.js
git commit -m "Add test function"
git push origin test/bedrock-ai
```

3. **Create a Pull Request** on GitHub

4. **Add a comment** to test the AI:
```
@ai-teammate please add error handling and input validation
```

5. **Watch the magic happen**! 🎉
   - Go to the "Actions" tab to see the workflow running
   - The bot will commit a fix with proper error handling
   - Check the PR for the bot's explanation comment

### Step 5: Verify It's Working

**Expected behavior:**
1. ✅ Workflow triggers when you comment `@ai-teammate`
2. ✅ You see "Using bedrock AI API call" in the logs
3. ✅ The bot commits improved code
4. ✅ The bot posts an explanation comment

**Check the logs:**
```
Go to Actions tab → Click on the workflow run → Expand "Run AI PR Teammate"

You should see:
🤖 AI PR Teammate activated!
Event: issue_comment
🧠 AI Provider: bedrock (Model: anthropic.claude-sonnet-4-5-20250929-v1:0)
📡 Calling AWS Bedrock in region us-west-2...
✅ Successfully generated code fix
```

## 🔍 Troubleshooting

### Error: "Access denied to Bedrock"

**Problem**: Your IAM user doesn't have permission to use Bedrock.

**Solution**:
1. Go to AWS IAM Console
2. Find your user
3. Attach the policy: `AmazonBedrockFullAccess` or create a custom policy:

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
      "Resource": "arn:aws:bedrock:us-west-2:561107861478:inference-profile/*"
    }
  ]
}
```

### Error: "Bedrock model not found"

**Problem**: Model ID is incorrect or not available in your region.

**Solution**:
1. Verify your model ID matches exactly: `anthropic.claude-sonnet-4-5-20250929-v1:0`
2. Confirm region is `us-west-2`
3. Check if the model is enabled in your AWS Bedrock console:
   - Go to AWS Bedrock Console
   - Click "Model access" in left sidebar
   - Ensure "Claude Sonnet 4" is enabled

### Error: "Invalid AWS credentials"

**Problem**: Access keys are incorrect or expired.

**Solution**:
1. Regenerate access keys in IAM Console
2. Update GitHub secrets with new keys
3. Make sure there are no extra spaces or quotes

### Slow Response Times

**Expected**: AWS Bedrock typically responds in 5-15 seconds.

If slower:
- Check AWS Bedrock service health
- Verify you're using the correct region (`us-west-2`)
- Look for throttling errors in logs

### Cost Monitoring

Your account has a **$100/month budget**. To monitor usage:

1. **Set up billing alerts**:
   - Go to AWS Billing Console
   - Create a budget alert for $80 (80% of $100)
   - Get notified before hitting limit

2. **Check current usage**:
   - Go to AWS Cost Explorer
   - Filter by service: "Bedrock"
   - View daily costs

3. **Estimate usage**:
   ```
   Claude Sonnet 4 pricing (typical):
   - Input: ~$3 per million tokens
   - Output: ~$15 per million tokens
   
   Typical code fix:
   - Input: ~2,000 tokens ($0.006)
   - Output: ~1,000 tokens ($0.015)
   - Total: ~$0.02 per fix
   
   Your $100 budget = ~5,000 code fixes/month
   ```

## 💡 Best Practices

### 1. Use for Important PRs

Since you have a budget, use the AI for:
- ✅ Production code reviews
- ✅ Security-critical fixes
- ✅ Complex refactoring
- ✅ CI/CD failures

Avoid for:
- ❌ Simple typos
- ❌ Formatting changes
- ❌ Trivial updates

### 2. Monitor Your Usage

```bash
# Check AWS costs weekly
aws ce get-cost-and-usage \
  --time-period Start=2024-12-01,End=2024-12-31 \
  --granularity DAILY \
  --metrics "UnblendedCost" \
  --filter file://filter.json
```

### 3. Set Up Notifications

Configure CloudWatch alarms for:
- Bedrock API errors
- High request rates
- Cost threshold exceeded

### 4. Prepare for Sandbox Expiration

**IMPORTANT**: Your sandbox expires **January 07, 2026**.

**Before expiration**:
1. Export any important configurations
2. Request a production AWS account if needed
3. Consider migrating to a free provider (Groq) after hackathon
4. Document your setup for future reference

## 🎯 Cost Optimization Tips

### Tip 1: Batch Requests

Instead of:
```
@ai-teammate fix this
@ai-teammate fix that  
@ai-teammate fix another
```

Do:
```
@ai-teammate please fix all these issues:
1. Add error handling to api.js
2. Validate inputs in utils.js
3. Add types to models.ts
```

**Savings**: 3 API calls → 1 API call

### Tip 2: Use for Final Reviews

- Let human reviewers provide feedback first
- Use AI for implementing the feedback
- One AI call vs multiple iterations

### Tip 3: Monitor and Adjust

```bash
# Weekly cost check
echo "Week 1: $12.50 → On track"
echo "Week 2: $45.00 → Reduce usage!"
```

## 📊 What You Get with Claude Sonnet 4

AWS Bedrock gives you access to **Claude Sonnet 4** - Anthropic's latest and most powerful model:

**Advantages over free options:**
- 🧠 **Best code quality**: Superior to Llama, GPT-3.5, Gemini
- 🎯 **Context awareness**: Understands complex codebases
- 🔒 **Security**: Better at identifying vulnerabilities
- ⚡ **Consistency**: More reliable than free tiers
- 📈 **Latest model**: Cutting-edge AI capabilities

**Your setup:**
- Model: Claude Sonnet 4 (released Sep 2024)
- Region: US West 2 (low latency)
- Budget: $100/month
- Validity: Until Jan 2026

## ✅ Setup Complete!

You should now have:
- ✅ AWS credentials configured in GitHub Secrets
- ✅ Workflow file created and pushed
- ✅ AI PR Teammate responding to comments
- ✅ Claude Sonnet 4 providing intelligent code fixes

## 🚀 Next Steps

1. **Test on a real PR** - Try it with actual code from your hackathon project
2. **Set budget alerts** - Don't exceed your $100/month
3. **Monitor usage** - Check AWS billing daily
4. **Share with team** - Show them how to use `@ai-teammate`
5. **Win the hackathon!** 🏆

## 🆘 Need Help?

- **AWS Bedrock Issues**: Contact GRP-ITC-CAMP-SUPPORT or #camp-help on Slack
- **AI PR Teammate Issues**: Check GitHub Actions logs
- **General Questions**: Open an issue in this repository

## 🎉 You're Ready!

Your AI PR Teammate is now powered by Claude Sonnet 4 through AWS Bedrock - one of the most powerful AI models available. Use it wisely for your hackathon project!

**Test it now:**
```
@ai-teammate show me what you can do!
```

---

**Happy hacking! 🚀**
