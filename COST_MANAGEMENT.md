# 💰 API Cost Management Guide

## Overview

AI PR Teammate uses paid AI APIs (Anthropic Claude or OpenAI GPT) to generate code fixes. This guide helps you understand and manage these costs.

## Cost Breakdown

### Anthropic Claude (Recommended)
- **Model**: `claude-3-5-sonnet-20241022`
- **Input**: $3 per million tokens (~750,000 words)
- **Output**: $15 per million tokens (~750,000 words)
- **Typical code fix**: $0.01-0.05
- **200 fixes/month**: ~$5-20

### OpenAI GPT-3.5 (Budget Option)
- **Model**: `gpt-3.5-turbo`
- **Input**: $0.50 per million tokens
- **Output**: $1.50 per million tokens
- **Typical code fix**: $0.001-0.01
- **200 fixes/month**: ~$1-5

## Cost Estimation by Team Size

| Team Size | Fixes/Day | Monthly Cost (Claude) | Monthly Cost (GPT-3.5) |
|-----------|-----------|----------------------|----------------------|
| Small (1-3 devs) | 5-10 | $2-5 | $0.50-$2 |
| Medium (4-10 devs) | 20-50 | $10-30 | $2-$10 |
| Large (10+ devs) | 50-200 | $30-150 | $10-$50 |
| Enterprise (50+ devs) | 200+ | $150-500 | $50-$200 |

## 🎭 Demo Mode: Zero Cost Option

Enable Demo Mode to avoid ALL API costs:

```yaml
# .github/workflows/ai-pr-teammate.yml
env:
  DEMO_MODE: 'true'
```

### When to Use Demo Mode
✅ **Perfect for:**
- Hackathon demonstrations
- Testing workflow setup
- Training new team members
- CI/CD pipeline testing
- Proof of concept presentations
- Development and debugging

❌ **Not suitable for:**
- Production code reviews
- Critical bug fixes
- Complex refactoring
- Security-sensitive code

### Demo Mode vs Production

| Feature | Demo Mode | Production Mode |
|---------|-----------|-----------------|
| Cost | **FREE** | Paid per request |
| Speed | Instant | 2-10 seconds |
| Quality | Template-based | AI-powered, contextual |
| Accuracy | Good for simple cases | Excellent for complex cases |
| Customization | Limited | Full AI reasoning |

## Cost Optimization Strategies

### 1. Use Demo Mode Strategically
```yaml
# Enable for non-critical branches
on:
  pull_request:
    branches:
      - develop  # Demo mode
      - feature/* # Demo mode
      - main  # Production mode (DEMO_MODE: false)
```

### 2. Limit Triggers
```yaml
# Only trigger on specific labels
on:
  pull_request:
    types: [labeled]
    
jobs:
  ai-review:
    if: github.event.label.name == 'needs-ai-review'
```

### 3. Use Cheaper Models
```yaml
env:
  AI_PROVIDER: 'openai'  # GPT-3.5 is 10x cheaper than Claude
```

### 4. Set Spending Limits

**Anthropic Console:**
1. Visit https://console.anthropic.com/settings/limits
2. Set monthly spending limit (e.g., $50)
3. Get email alerts at 50%, 80%, 100%

**OpenAI Platform:**
1. Visit https://platform.openai.com/account/billing/limits
2. Set hard spending limits
3. Enable usage notifications

### 5. Monitor Usage

Track your API usage:
- **Anthropic**: https://console.anthropic.com/settings/usage
- **OpenAI**: https://platform.openai.com/usage

### 6. Batch Reviews

Instead of fixing every comment immediately, batch multiple review comments:
```
@ai-teammate fix all the issues mentioned in this PR:
1. Add error handling to api.js
2. Fix validation in utils.js
3. Update types in models.ts
```

### 7. Use for High-Value Tasks Only

**Good use cases (worth the cost):**
- Security vulnerabilities
- Performance bottlenecks
- Complex refactoring
- CI/CD failures
- Critical bug fixes

**Poor use cases (not worth the cost):**
- Code formatting
- Adding simple comments
- Renaming variables
- Trivial typo fixes

## Real-World Cost Examples

### Example 1: Small Startup (5 devs)
- **Activity**: 15 PR fixes per day, mostly small
- **Provider**: OpenAI GPT-3.5
- **Monthly cost**: ~$8-15
- **Value**: Saved ~20 hours of developer time ($2,000+ value)
- **ROI**: 100:1

### Example 2: Medium Company (20 devs)
- **Activity**: 50 PR fixes per day, mixed complexity
- **Provider**: Claude Sonnet
- **Monthly cost**: ~$50-80
- **Value**: Saved ~100 hours of developer time ($10,000+ value)
- **ROI**: 125:1

### Example 3: Enterprise (100 devs)
- **Activity**: 200+ fixes per day
- **Provider**: Claude Sonnet
- **Monthly cost**: ~$300-500
- **Value**: Saved ~500 hours ($50,000+ value)
- **ROI**: 100:1

## Budget-Friendly Configurations

### Configuration 1: Demo Mode Only
```yaml
env:
  DEMO_MODE: 'true'
```
**Cost**: $0/month
**Best for**: Testing, demos, learning

### Configuration 2: Hybrid Mode
```yaml
env:
  # Production for main branch
  DEMO_MODE: ${{ github.base_ref != 'main' }}
```
**Cost**: ~$10-30/month
**Best for**: Small teams, startups

### Configuration 3: GPT-3.5 Budget Mode
```yaml
env:
  AI_PROVIDER: 'openai'
  DEMO_MODE: 'false'
```
**Cost**: ~$10-50/month
**Best for**: Cost-conscious teams

### Configuration 4: Full Production
```yaml
env:
  AI_PROVIDER: 'anthropic'
  DEMO_MODE: 'false'
```
**Cost**: ~$50-500/month
**Best for**: Teams that value quality over cost

## FAQ

### Q: Can I run out of credits unexpectedly?
**A**: Yes, but you can prevent this:
- Set spending limits in your AI provider dashboard
- Enable usage alerts
- Start with Demo Mode to test
- Monitor usage weekly

### Q: What happens if I hit my spending limit?
**A**: The API will reject requests. The bot will post an error comment on the PR. Your repository remains functional.

### Q: Is there a free tier?
**A**: 
- **Anthropic**: $5 free credit for new accounts
- **OpenAI**: $5-18 free credit for new accounts (varies)
- **Demo Mode**: Completely free, no limits!

### Q: Can I use my own AI model?
**A**: Currently only Anthropic and OpenAI are supported. You could modify `src/services/ai-service.js` to add other providers.

### Q: How do I track costs per team member?
**A**: Use separate API keys per team with separate billing, or use GitHub Action logs to track who triggered each fix.

## Getting Started Without Costs

1. **Enable Demo Mode**:
   ```yaml
   DEMO_MODE: 'true'
   ```

2. **Test the workflow** with demo mode for 1-2 weeks

3. **Estimate usage** from logs (count number of fixes)

4. **Calculate expected costs**:
   - Fixes per day × $0.01 (GPT-3.5) or $0.03 (Claude)
   - Multiply by 30 for monthly estimate

5. **Set spending limits** before enabling production mode

6. **Switch to production** when ready:
   ```yaml
   DEMO_MODE: 'false'
   ```

## Support

For cost-related questions:
- Check [Anthropic Pricing](https://www.anthropic.com/pricing)
- Check [OpenAI Pricing](https://openai.com/pricing)
- Open an issue in this repository
- Contact your AI provider's support team

---

**Remember**: The time saved by automated code reviews typically provides 100:1+ ROI, making the API costs negligible compared to developer time costs.

