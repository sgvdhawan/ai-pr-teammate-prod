# 🆓 Free AI Provider Setup - Zero Cost with Real AI!

This guide shows you how to use **real AI models** with AI PR Teammate completely **FREE** - no credit card required, no mock responses!

## 🎯 Recommended: Groq (Best Free Option)

**Groq** offers the best free tier with extremely fast inference using real Llama models.

### Why Groq?
- ✅ **14,400 free requests per day** (enough for ~200 code fixes)
- ✅ **Lightning fast** responses (3-5 seconds vs 10-30 seconds for others)
- ✅ **Real Llama 3.1 70B model** - state-of-the-art open source AI
- ✅ **No credit card required**
- ✅ **OpenAI-compatible API** - easy to integrate
- ✅ **Best code generation quality** among free options

### Setup Steps

#### 1. Get Groq API Key

1. Visit [https://console.groq.com/](https://console.groq.com/)
2. Sign up with your email (no credit card needed!)
3. Go to **API Keys** section
4. Click **Create API Key**
5. Copy your key (starts with `gsk_...`)

#### 2. Add to GitHub Secrets

1. Go to your GitHub repository
2. Navigate to **Settings** → **Secrets and variables** → **Actions**
3. Click **New repository secret**
4. Name: `GROQ_API_KEY`
5. Value: Paste your Groq API key
6. Click **Add secret**

#### 3. Configure Workflow

Update your `.github/workflows/ai-pr-teammate.yml`:

```yaml
name: AI PR Teammate (Groq - FREE)

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

      - name: Run AI PR Teammate with Groq (FREE!)
        env:
          GITHUB_TOKEN: ${{ secrets.GITHUB_TOKEN }}
          AI_PROVIDER: 'groq'
          GROQ_API_KEY: ${{ secrets.GROQ_API_KEY }}
        run: node src/index.js
```

#### 4. Test It!

```bash
# Create a PR and add a comment:
@ai-teammate please add error handling to this function
```

**That's it!** You're now using real AI with zero cost! 🎉

---

## Alternative Free Options

### Option 2: Google Gemini

**Google's Gemini** offers a generous free tier with their latest models.

**Free Tier Limits:**
- 15 requests per minute
- 1,500 requests per day
- No credit card required

**Setup:**

1. **Get API Key:**
   - Visit [https://makersuite.google.com/app/apikey](https://makersuite.google.com/app/apikey)
   - Sign in with your Google account
   - Click **Create API Key**
   - Copy your key

2. **Add to GitHub Secrets:**
   - Secret name: `GEMINI_API_KEY`
   - Value: Your Gemini API key

3. **Update Workflow:**
```yaml
env:
  GITHUB_TOKEN: ${{ secrets.GITHUB_TOKEN }}
  AI_PROVIDER: 'gemini'
  GEMINI_API_KEY: ${{ secrets.GEMINI_API_KEY }}
```

**Pros:**
- Very generous free tier
- Fast responses
- Good code quality
- Google's latest AI technology

**Cons:**
- Slightly lower rate limit than Groq
- May have occasional rate limiting during peak usage

---

### Option 3: Hugging Face

**Hugging Face** provides free access to open-source AI models.

**Free Tier:**
- Rate limited but generous
- No hard daily limit
- Access to Llama, Mistral, and other models

**Setup:**

1. **Get API Token:**
   - Visit [https://huggingface.co/settings/tokens](https://huggingface.co/settings/tokens)
   - Sign up/login
   - Click **New token**
   - Name it "AI PR Teammate"
   - Copy your token (starts with `hf_...`)

2. **Add to GitHub Secrets:**
   - Secret name: `HUGGINGFACE_API_KEY`
   - Value: Your HF token

3. **Update Workflow:**
```yaml
env:
  GITHUB_TOKEN: ${{ secrets.GITHUB_TOKEN }}
  AI_PROVIDER: 'huggingface'
  HUGGINGFACE_API_KEY: ${{ secrets.HUGGINGFACE_API_KEY }}
```

**Pros:**
- Completely free
- Access to many models
- Active open-source community

**Cons:**
- Slower inference (20-60 seconds per request)
- Rate limiting during peak times
- May have "model loading" delays

---

## Free vs Paid Comparison

| Provider | Cost | Requests/Day | Speed | Quality | Setup Time |
|----------|------|--------------|-------|---------|------------|
| **Groq** | FREE | 14,400 | ⚡ Very Fast | Excellent | 5 min |
| **Gemini** | FREE | 1,500 | ⚡ Fast | Very Good | 5 min |
| **Hugging Face** | FREE | ~1,000* | 🐌 Slow | Good | 5 min |
| Anthropic Claude | $$ | Unlimited | Fast | Excellent | 10 min |
| OpenAI GPT-3.5 | $ | Unlimited | Fast | Very Good | 10 min |

\* Rate limited, no hard cap

---

## Recommended Setup by Use Case

### For Most Users: Groq
```yaml
AI_PROVIDER: 'groq'
GROQ_API_KEY: ${{ secrets.GROQ_API_KEY }}
```
**Best balance of speed, quality, and generous limits.**

### For High Volume: Gemini
```yaml
AI_PROVIDER: 'gemini'
GEMINI_API_KEY: ${{ secrets.GEMINI_API_KEY }}
```
**If you need more requests or want Google's tech.**

### For Experimentation: Hugging Face
```yaml
AI_PROVIDER: 'huggingface'
HUGGINGFACE_API_KEY: ${{ secrets.HUGGINGFACE_API_KEY }}
```
**Try different open-source models, slower but free.**

### For Best Quality (Paid): Claude
```yaml
AI_PROVIDER: 'anthropic'
ANTHROPIC_API_KEY: ${{ secrets.ANTHROPIC_API_KEY }}
```
**When quality matters more than cost (~$20-100/month).**

---

## Rate Limits & Best Practices

### Groq (14,400/day)
- ~10 requests/minute average
- Perfect for teams of 5-10 developers
- Resets daily

**Tips:**
- Use sparingly during development
- Reserve for actual PR reviews
- ~600 requests/hour if needed for demos

### Gemini (1,500/day)
- 15 requests/minute
- Good for small teams (1-5 devs)
- Resets daily

**Tips:**
- Spread usage throughout the day
- ~60 requests/hour sustained
- Save for important fixes

### Hugging Face (Rate Limited)
- No hard daily limit
- ~10-20 requests/hour recommended
- Slower but reliable

**Tips:**
- Expect 30-60 second response times
- Use during off-peak hours for faster responses
- Be patient during model loading

---

## Troubleshooting

### "Rate limit exceeded"

**Groq:**
- You've used 14,400 requests today
- Wait until midnight PST for reset
- Or switch to another free provider temporarily

**Gemini:**
- You've exceeded 15 requests/minute
- Wait 1 minute and retry
- Or you've hit 1,500/day limit - wait until reset

**Solution:** Add fallback provider:
```javascript
// In ai-service.js, you could add logic to try multiple providers
```

### "API key invalid"

1. Check the secret is added correctly in GitHub
2. Verify the API key format:
   - Groq: starts with `gsk_`
   - Gemini: long alphanumeric string
   - Hugging Face: starts with `hf_`
3. Regenerate the key if needed

### "Model loading" errors (Hugging Face)

- The model is "cold starting"
- Wait 30-60 seconds and retry
- Happens on first request after inactivity
- Subsequent requests will be faster

### Slow responses

**Expected times:**
- Groq: 3-10 seconds (fast!)
- Gemini: 5-15 seconds
- Hugging Face: 20-90 seconds (slower but free!)

If slower than this:
- Check API provider status page
- Try during off-peak hours
- Consider switching providers

---

## Upgrading to Paid (When Needed)

Signs you might need a paid tier:
1. Hitting rate limits frequently
2. Need faster responses
3. Team size > 10 developers
4. Need guaranteed SLA

**Recommendation:**
- Start with Groq (free)
- Monitor usage for 1-2 weeks
- Upgrade only if you consistently hit limits
- OpenAI GPT-3.5 is cheapest paid option (~$10/month)

---

## Cost Savings Calculator

### Groq (Free) vs Paid Options

**Team of 5 developers:**
- 50 code fixes/day
- 1,000 fixes/month

| Provider | Monthly Cost | Annual Cost |
|----------|-------------|-------------|
| **Groq** | **$0** | **$0** |
| Gemini (Free) | $0 | $0 |
| GPT-3.5 | $10-30 | $120-360 |
| Claude | $50-100 | $600-1,200 |

**Savings with Groq: $120-1,200/year per team!**

---

## FAQ

### Q: Is Groq really free forever?
**A:** Groq offers a generous free tier for developers. They may introduce paid tiers with higher limits in the future, but the free tier is expected to remain available.

### Q: How does free compare to paid quality?
**A:** Groq's Llama 3.1 70B model is comparable to GPT-3.5 and often better for code. Claude is slightly better for complex tasks, but Groq is excellent for 90% of use cases.

### Q: Can I use multiple providers?
**A:** Yes! Set up multiple API keys and switch by changing `AI_PROVIDER` in your workflow.

### Q: What if I exceed free limits?
**A:** Groq: Wait until daily reset. Gemini: Wait 1 minute for per-minute limit or until daily reset. Or switch providers temporarily.

### Q: Which provider is fastest?
**A:** Groq is fastest (3-10 seconds), followed by Gemini (5-15 seconds), then Hugging Face (20-90 seconds).

### Q: Can I use this for my company?
**A:** Check each provider's terms of service. Groq and Gemini free tiers are generally fine for commercial use, but review their terms. For enterprise use with guarantees, consider paid tiers.

---

## Get Started Now!

**Quickest path to zero-cost real AI:**

1. Get Groq API key: [https://console.groq.com/](https://console.groq.com/) (2 minutes)
2. Add to GitHub Secrets as `GROQ_API_KEY` (1 minute)
3. Set `AI_PROVIDER: 'groq'` in workflow (30 seconds)
4. Test with `@ai-teammate` comment (30 seconds)

**Total setup time: ~5 minutes for real, free AI! 🚀**

---

## Support

- 📖 Main README: [README.md](./README.md)
- 🐛 Issues: [GitHub Issues](../../issues)
- 💬 Questions: [GitHub Discussions](../../discussions)

---

**Enjoy real AI without the cost! 🎉**

