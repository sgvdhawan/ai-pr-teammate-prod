# 🚀 AWS Bedrock Setup Guide - Claude Sonnet 4

This guide shows you how to use your **AWS Bedrock** deployment with Claude Sonnet 4 for AI PR Teammate.

## Your AWS Bedrock Configuration

Based on your deployment email, here are your specific settings:

```yaml
Model ID: anthropic.claude-sonnet-4-5-20250929-v1:0
Inference Profile ID: us.anthropic.claude-sonnet-4-5-20250929-v1:0
Region: us-west-2
AWS Account: 561107861478
API Key Secret: bedrock/AWS3988/Sandbox/api-key
Endpoint URL: https://bedrock-runtime.us-west-2.amazonaws.com/
```

⏰ **Important**: This is a sandbox environment that expires on **January 07, 2026**.

---

## Prerequisites

1. AWS CLI installed (optional but helpful)
2. Access to your AWS account (561107861478)
3. IAM credentials with Bedrock access

---

## Step 1: Create IAM User with Bedrock Access

### Option A: Using AWS Console (Recommended)

1. **Go to IAM Console:**
   - Visit https://console.aws.amazon.com/iam/
   - Sign in with your AWS account (561107861478)

2. **Create a New User:**
   - Click **Users** → **Create user**
   - User name: `github-actions-bedrock` (or any name you prefer)
   - Click **Next**

3. **Attach Permissions:**
   - Select **Attach policies directly**
   - Search for and select:
     - `AmazonBedrockFullAccess` (or create a custom policy - see below)
     - `SecretsManagerReadWrite` (to read the API key from Secrets Manager)
   - Click **Next** → **Create user**

4. **Create Access Keys:**
   - Click on the newly created user
   - Go to **Security credentials** tab
   - Click **Create access key**
   - Select **Application running outside AWS**
   - Click **Next** → **Create access key**
   - **⚠️ IMPORTANT**: Save both:
     - Access key ID (starts with `AKIA...`)
     - Secret access key (only shown once!)

### Option B: Custom IAM Policy (More Secure)

Create a custom policy with minimal permissions:

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
      "Resource": [
        "arn:aws:bedrock:us-west-2::foundation-model/anthropic.claude-sonnet-4-5-20250929-v1:0",
        "arn:aws:bedrock:us-west-2:561107861478:inference-profile/*"
      ]
    },
    {
      "Effect": "Allow",
      "Action": [
        "secretsmanager:GetSecretValue"
      ],
      "Resource": "arn:aws:secretsmanager:us-west-2:561107861478:secret:bedrock/AWS3988/Sandbox/api-key-*"
    }
  ]
}
```

---

## Step 2: Retrieve API Key from Secrets Manager (Optional)

The API key is stored in AWS Secrets Manager. You can retrieve it if needed:

### Using AWS Console:

1. Go to **AWS Secrets Manager**: https://console.aws.amazon.com/secretsmanager/
2. Region: **us-west-2**
3. Find secret: `bedrock/AWS3988/Sandbox/api-key`
4. Click **Retrieve secret value**
5. Copy the value

### Using AWS CLI:

```bash
aws secretsmanager get-secret-value \
  --secret-id bedrock/AWS3988/Sandbox/api-key \
  --region us-west-2 \
  --query SecretString \
  --output text
```

**Note**: You might not need this key for GitHub Actions. The IAM access keys are sufficient for Bedrock access.

---

## Step 3: Add Credentials to GitHub Secrets

1. **Go to your GitHub repository**
2. Navigate to **Settings** → **Secrets and variables** → **Actions**
3. Click **New repository secret** and add each of these:

| Secret Name | Value | Example |
|------------|-------|---------|
| `AWS_ACCESS_KEY_ID` | Your IAM access key ID | `AKIAIOSFODNN7EXAMPLE` |
| `AWS_SECRET_ACCESS_KEY` | Your IAM secret access key | `wJalrXUtnFEMI/K7MDENG/bPxRfiCYEXAMPLEKEY` |
| `AWS_REGION` | `us-west-2` | `us-west-2` |
| `BEDROCK_MODEL_ID` | `anthropic.claude-sonnet-4-5-20250929-v1:0` | (exact model ID) |

**⚠️ Security Note**: Never commit these values to your repository!

---

## Step 4: Update GitHub Actions Workflow

Create or update `.github/workflows/ai-pr-teammate.yml`:

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
          GITHUB_TOKEN: ${{ secrets.GITHUB_TOKEN }}
          AI_PROVIDER: 'bedrock'
          AWS_REGION: ${{ secrets.AWS_REGION }}
          AWS_ACCESS_KEY_ID: ${{ secrets.AWS_ACCESS_KEY_ID }}
          AWS_SECRET_ACCESS_KEY: ${{ secrets.AWS_SECRET_ACCESS_KEY }}
          BEDROCK_MODEL_ID: ${{ secrets.BEDROCK_MODEL_ID }}
        run: node src/index.js
```

---

## Step 5: Install AWS SDK Dependencies

Run this in your project directory:

```bash
npm install
```

This will install the required AWS SDK packages:
- `@aws-sdk/client-bedrock-runtime`
- `@aws-sdk/client-secrets-manager`

---

## Step 6: Test Your Setup

1. **Create a test PR** in your repository

2. **Add a comment** on the PR:
   ```
   @ai-teammate please add error handling to this function
   ```

3. **Check GitHub Actions**:
   - Go to **Actions** tab in your repository
   - Watch the workflow run
   - Look for logs like:
     ```
     🧠 AI Provider: bedrock (Model: anthropic.claude-sonnet-4-5-20250929-v1:0)
     📡 Calling AWS Bedrock in region us-west-2...
     ```

4. **Verify the fix**:
   - Check that a new commit was created
   - Review the AI-generated code fix
   - See the explanation comment from the bot

---

## Troubleshooting

### Error: "Access Denied"

**Problem**: IAM user doesn't have Bedrock permissions

**Solution**:
1. Go to IAM Console
2. Find your user
3. Attach `AmazonBedrockFullAccess` policy
4. Or attach the custom policy from Step 1

### Error: "Model not found"

**Problem**: Model ID is incorrect or not available in your region

**Solution**:
1. Verify model ID: `anthropic.claude-sonnet-4-5-20250929-v1:0`
2. Verify region: `us-west-2`
3. Check that the model is enabled in your Bedrock console:
   - Go to https://console.aws.amazon.com/bedrock/
   - Region: us-west-2
   - **Model access** → Verify Claude Sonnet 4 is enabled

### Error: "Invalid AWS credentials"

**Problem**: Access keys are incorrect or expired

**Solution**:
1. Regenerate access keys in IAM Console
2. Update GitHub Secrets with new keys
3. Verify keys don't have extra spaces or newlines

### Slow Responses

**Problem**: Bedrock might have cold starts

**Solution**:
- First request may take 10-30 seconds
- Subsequent requests should be faster (5-15 seconds)
- This is normal for Bedrock

---

## Cost Management

### Bedrock Pricing

Your deployment has an **estimated monthly cost of $100** (from your email).

**Claude Sonnet 4 Pricing (Bedrock):**
- Input: ~$3 per million tokens
- Output: ~$15 per million tokens

**Typical Usage:**
- Code fix (small): ~$0.01-0.03
- Code fix (large): ~$0.05-0.10
- CI analysis: ~$0.03-0.08

**Monthly Estimates:**
- 50 fixes/day: ~$50-80/month
- 100 fixes/day: ~$100-150/month

### Monitor Usage

1. **CloudWatch Metrics:**
   - Go to CloudWatch console
   - Region: us-west-2
   - Look for Bedrock metrics

2. **Cost Explorer:**
   - Go to AWS Cost Explorer
   - Filter by service: Bedrock
   - Set date range

3. **Set Up Billing Alerts:**
   ```bash
   # Create a billing alarm (requires AWS CLI)
   aws cloudwatch put-metric-alarm \
     --alarm-name bedrock-cost-alert \
     --alarm-description "Alert when Bedrock costs exceed $80" \
     --metric-name EstimatedCharges \
     --namespace AWS/Billing \
     --statistic Maximum \
     --period 86400 \
     --evaluation-periods 1 \
     --threshold 80 \
     --comparison-operator GreaterThanThreshold
   ```

---

## Important Reminders

### Sandbox Expiration

⏰ **Your sandbox expires on January 07, 2026**

Before expiration:
1. Export important data
2. Request a Dev/Stage account if continuing
3. Update credentials in GitHub Secrets
4. Test new account before sandbox expires

### Security Best Practices

1. ✅ **Rotate credentials** every 90 days
2. ✅ **Use least-privilege IAM policies** (see custom policy above)
3. ✅ **Monitor CloudTrail** for API calls
4. ✅ **Enable MFA** on IAM users (for console access)
5. ✅ **Review access logs** regularly

---

## Advanced Configuration

### Using Inference Profiles

If you want to use the inference profile instead of direct model ID:

```yaml
env:
  BEDROCK_MODEL_ID: 'us.anthropic.claude-sonnet-4-5-20250929-v1:0'
```

Inference profiles provide:
- Cross-region failover
- Load balancing
- Better availability

### Streaming Responses (Future Enhancement)

For faster perceived performance, you could implement streaming:

```javascript
// In ai-service.js - future enhancement
const command = new InvokeModelWithResponseStreamCommand({
  modelId: this.model,
  contentType: "application/json",
  accept: "application/json",
  body: JSON.stringify(payload)
});

// Process stream chunks as they arrive
```

---

## Comparison: Bedrock vs Direct Anthropic

| Feature | AWS Bedrock | Direct Anthropic |
|---------|-------------|------------------|
| **Cost** | ~$3-15/M tokens | ~$3-15/M tokens |
| **Model** | Claude Sonnet 4 | Claude Sonnet 3.5 |
| **Setup** | More complex | Simple |
| **Integration** | AWS ecosystem | Standalone |
| **Security** | AWS IAM | API key |
| **Monitoring** | CloudWatch | Anthropic Console |
| **Best for** | Enterprise/AWS users | Individuals/startups |

**Your use case**: Since you have AWS Bedrock already set up through Adobe, use Bedrock! It's perfect for enterprise environments.

---

## Support Resources

- **AWS Bedrock Documentation**: https://docs.aws.amazon.com/bedrock/
- **Bedrock API Reference**: https://docs.aws.amazon.com/bedrock/latest/APIReference/
- **Claude on Bedrock Guide**: https://docs.anthropic.com/claude/docs/claude-on-amazon-bedrock
- **CAMP Support**: 
  - Slack: #camp-help
  - Email: GRP-ITC-CAMP-SUPPORT

---

## Quick Reference

**Your Configuration:**
```bash
AWS_REGION=us-west-2
BEDROCK_MODEL_ID=anthropic.claude-sonnet-4-5-20250929-v1:0
AWS Account: 561107861478
Expiration: January 07, 2026
```

**Test Command:**
```bash
@ai-teammate please add error handling to this function
```

**Monitor Costs:**
```
https://console.aws.amazon.com/cost-management/home?region=us-west-2#/dashboard
```

---

**You're all set! Enjoy Claude Sonnet 4 through AWS Bedrock! 🚀**

