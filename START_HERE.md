# 🎯 START HERE - Get Running in 5 Minutes

Your AI PR Teammate is **ready to use** with AWS Bedrock Claude Sonnet 4!

## ⚡ Quick Setup (Choose Your Path)

### Path A: AWS Bedrock (You Have This!) ✨ RECOMMENDED

**Your Setup:**
- ✅ Claude Sonnet 4 (latest, most powerful model)
- ✅ AWS Account ready (561107861478)
- ✅ $100/month budget
- ✅ Valid until Jan 2026
- ✅ Code already integrated!

**What You Need to Do:**

1. **Get AWS Access Keys** (2 minutes):
   - Go to [AWS IAM Console](https://console.aws.amazon.com/iam/)
   - Your User → Security credentials → Create access key
   - Save: `AWS_ACCESS_KEY_ID` and `AWS_SECRET_ACCESS_KEY`

2. **Add to GitHub Secrets** (1 minute):
   - Repo Settings → Secrets and variables → Actions
   - Add 3 secrets:
     - `AWS_ACCESS_KEY_ID`
     - `AWS_SECRET_ACCESS_KEY`
     - `AWS_REGION` = `us-west-2`

3. **Push the workflow** (30 seconds):
   ```bash
   # Already created! Just push it:
   git push
   ```

4. **Test it** (1 minute):
   - Create a PR
   - Comment: `@ai-teammate add error handling`
   - Watch the magic! 🎉

**📖 Full Guide:** [QUICKSTART_AWS_BEDROCK.md](./QUICKSTART_AWS_BEDROCK.md)

---

### Path B: Free Alternative (No AWS Needed)

If you prefer a completely free option:

1. Get Groq API key: [console.groq.com](https://console.groq.com/) (free, no credit card)
2. Add as GitHub secret: `GROQ_API_KEY`
3. Change workflow to use: `AI_PROVIDER: 'groq'`

**Trade-off:** Groq is free but Claude Sonnet 4 (AWS Bedrock) is more powerful.

---

## 📁 Files Overview

| File | Purpose |
|------|---------|
| **QUICKSTART_AWS_BEDROCK.md** | 👈 **START HERE** - 5-minute setup guide |
| **AWS_BEDROCK_SETUP.md** | Detailed AWS Bedrock documentation |
| **.github/workflows/ai-pr-teammate-bedrock.yml** | Pre-configured workflow (ready to use!) |
| **env.example** | Environment variables reference |
| **src/services/ai-service.js** | AI integration code (already done!) |

## ✅ What's Already Done

You don't need to code anything! I've already:
- ✅ Integrated AWS Bedrock SDK
- ✅ Added Claude Sonnet 4 support
- ✅ Created the workflow file
- ✅ Configured your model ID
- ✅ Set the correct region (us-west-2)
- ✅ Added error handling
- ✅ Included cost tracking examples

## 🚀 Next Steps

### 1. Set up AWS Credentials (5 minutes)
Follow: [QUICKSTART_AWS_BEDROCK.md](./QUICKSTART_AWS_BEDROCK.md)

### 2. Test on a PR
```bash
# Create test branch
git checkout -b test/ai-bot

# Add some bad code
echo 'function bad(x) { return data[x]; }' > test.js
git add test.js
git commit -m "test"
git push origin test/ai-bot

# Create PR, then comment:
# @ai-teammate add comprehensive error handling
```

### 3. Use for Real Work
The AI can:
- ✅ Add error handling
- ✅ Implement input validation
- ✅ Fix security issues
- ✅ Add TypeScript types
- ✅ Fix CI/CD failures
- ✅ Improve code quality
- ✅ Add documentation

## 💡 Example Usage

**Comment this on any PR:**
```
@ai-teammate please review this code and add:
- Comprehensive error handling with try-catch
- Input validation for all parameters
- Proper HTTP status codes (200, 400, 404, 500)
- Security measures (prevent injection)
- Logging for debugging
- JSDoc comments
```

**The AI will:**
1. ✅ Analyze your code
2. ✅ Apply all improvements
3. ✅ Commit the changes
4. ✅ Explain what it did

## 🎯 Why AWS Bedrock?

| Feature | Your AWS Bedrock | Free Groq |
|---------|------------------|-----------|
| Model | Claude Sonnet 4 (latest!) | Llama 3.1 70B |
| Quality | ⭐⭐⭐⭐⭐ Best | ⭐⭐⭐⭐ Very Good |
| Speed | Fast (10-15s) | Very Fast (5-10s) |
| Cost | $0* (paid by Adobe) | Free forever |
| Limit | High (based on budget) | 14,400/day |
| Setup | 5 minutes | 3 minutes |

\* Your account has $100/month = ~5,000 code fixes

**Recommendation:** Use AWS Bedrock for best quality!

## 📊 Cost Tracking

Your $100/month budget is more than enough:

```
Typical hackathon project:
- 20-50 PR reviews = $1-3
- 5-10 CI fixes = $0.50-1
- Total: ~$2-5 for entire project

Remaining budget: $95+ for future projects!
```

Monitor usage:
- AWS Billing Console
- CloudWatch metrics
- Cost Explorer

## 🆘 Common Issues

### Issue: "Access Denied"
**Fix:** Add IAM policy: `AmazonBedrockFullAccess`

### Issue: "Model Not Found"  
**Fix:** Check model ID is exactly: `anthropic.claude-sonnet-4-5-20250929-v1:0`

### Issue: Workflow not triggering
**Fix:** Use exact trigger: `@ai-teammate` (with hyphen)

### Issue: Need help
**Fix:** 
- AWS: #camp-help on Slack
- Bot: Check GitHub Actions logs
- Questions: Open an issue

## 🎉 You're Ready!

Everything is set up. Just add your AWS credentials to GitHub Secrets and you're good to go!

**Quickest path:**
1. [QUICKSTART_AWS_BEDROCK.md](./QUICKSTART_AWS_BEDROCK.md) ← Read this
2. Add 3 GitHub secrets
3. Create a PR and test
4. Win the hackathon! 🏆

---

## 🔗 Important Links

- **Quick Setup**: [QUICKSTART_AWS_BEDROCK.md](./QUICKSTART_AWS_BEDROCK.md)
- **Full Documentation**: [AWS_BEDROCK_SETUP.md](./AWS_BEDROCK_SETUP.md)
- **Workflow File**: [.github/workflows/ai-pr-teammate-bedrock.yml](./.github/workflows/ai-pr-teammate-bedrock.yml)
- **AWS IAM Console**: https://console.aws.amazon.com/iam/
- **GitHub Repo Settings**: https://github.com/sgvdhawan/ai-pr-teammate-prod/settings/secrets/actions

---

**⏰ Takes only 5 minutes to set up. Let's do this!**

```bash
# Your command to get started:
open https://console.aws.amazon.com/iam/
# Get your access keys, add to GitHub Secrets, done!
```

