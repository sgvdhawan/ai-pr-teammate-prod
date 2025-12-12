# ⚡ Quick Start with AWS Bedrock

Get your AI PR Teammate running with AWS Bedrock in **10 minutes**!

## Your Configuration (From Email)

```
✅ AWS Account: 561107861478
✅ Region: us-west-2
✅ Model: anthropic.claude-sonnet-4-5-20250929-v1:0
✅ Expires: January 07, 2026
```

---

## 3 Simple Steps

### Step 1: Create IAM User (3 minutes)

1. Go to https://console.aws.amazon.com/iam/
2. Click **Users** → **Create user**
3. Name: `github-actions-bedrock`
4. Attach policy: `AmazonBedrockFullAccess`
5. Click **Security credentials** → **Create access key**
6. Save both:
   - Access key ID: `AKIA...`
   - Secret access key: (shown only once!)

### Step 2: Add to GitHub Secrets (2 minutes)

Go to your repo **Settings** → **Secrets and variables** → **Actions**

Add these 4 secrets:

| Name | Value |
|------|-------|
| `AWS_ACCESS_KEY_ID` | Your access key (from Step 1) |
| `AWS_SECRET_ACCESS_KEY` | Your secret key (from Step 1) |
| `AWS_REGION` | `us-west-2` |
| `BEDROCK_MODEL_ID` | `anthropic.claude-sonnet-4-5-20250929-v1:0` |

### Step 3: Install Dependencies & Push (5 minutes)

```bash
# Install AWS SDK packages
npm install

# Commit if you haven't already
git add package.json package-lock.json
git commit -m "Add AWS SDK for Bedrock"
git push
```

---

## Test It! 🚀

1. Create a test PR
2. Add comment: `@ai-teammate please add error handling`
3. Watch the magic happen! ✨

---

## Troubleshooting

**Error: Access Denied**
- Go to IAM → Your user → Add `AmazonBedrockFullAccess` policy

**Error: Model not found**
- Verify `BEDROCK_MODEL_ID` secret is exactly: `anthropic.claude-sonnet-4-5-20250929-v1:0`
- Verify `AWS_REGION` is `us-west-2`

**Still stuck?**
- Check [AWS_BEDROCK_SETUP.md](./AWS_BEDROCK_SETUP.md) for detailed guide
- Contact CAMP Support: #camp-help or GRP-ITC-CAMP-SUPPORT

---

**That's it! You're using Claude Sonnet 4 via AWS Bedrock! 🎉**

