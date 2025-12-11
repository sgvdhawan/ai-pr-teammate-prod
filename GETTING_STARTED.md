# Getting Started - AI PR Teammate Production

## 🎉 Your production repo is ready!

### What's Different from Demo Version?

| Feature | Demo Version | Production Version (This Repo) |
|---------|-------------|--------------------------------|
| AI Responses | Mock (hardcoded) | Real API calls |
| API Credits | Not needed | Required |
| Response Quality | Generic | Intelligent & context-aware |
| Setup | Simple | Requires API keys |
| Cost | Free | Pay per use |

### Key Changes Made:

✅ **Disabled Mock Responses**: `USE_MOCK_RESPONSE = false` in `ai-service.js`
✅ **Real API Integration**: Will call Claude/OpenAI APIs
✅ **Dependencies Installed**: All npm packages ready
✅ **Git Initialized**: Fresh git repository
✅ **Public npm Registry**: Uses registry.npmjs.org

---

## 📋 Next Steps

### 1. Create GitHub Repository

Go to https://github.com/new and create a new repository named `ai-pr-teammate-prod` (or any name you prefer).

Then run these commands:

```bash
cd /Users/dhawan/Work/ai-pr-teammate-prod

# Add GitHub remote (replace with your repo URL)
git remote add origin https://github.com/YOUR_USERNAME/ai-pr-teammate-prod.git

# Push to GitHub
git push -u origin main
```

### 2. Configure Environment Variables

Create a `.env` file:

```bash
cp env.example .env
```

Edit `.env` with your actual credentials:

```env
# GitHub Configuration
GITHUB_TOKEN=ghp_your_personal_access_token
GITHUB_OWNER=your_github_username
GITHUB_REPO=ai-pr-teammate-prod
WEBHOOK_SECRET=your_secret_key_here

# AI Provider
AI_PROVIDER=anthropic  # or 'openai'

# Anthropic API Key (Get from: https://console.anthropic.com)
ANTHROPIC_API_KEY=sk-ant-api03-your_key_here

# OR OpenAI API Key (Get from: https://platform.openai.com/api-keys)
OPENAI_API_KEY=sk-your_openai_key_here

# Server
PORT=3000

# IMPORTANT: Keep this false for real API calls
DEMO_MODE=false
```

### 3. Get API Keys

#### For Anthropic Claude (Recommended):
1. Visit https://console.anthropic.com
2. Sign up / Log in
3. Go to "API Keys" section
4. Create a new API key
5. Copy to `.env` as `ANTHROPIC_API_KEY`

**Cost**: ~$0.003 per code review (very affordable!)

#### For OpenAI:
1. Visit https://platform.openai.com/api-keys
2. Create API key
3. Copy to `.env` as `OPENAI_API_KEY`

**Cost**: GPT-3.5: ~$0.002 | GPT-4: ~$0.03 per review

### 4. Test Locally

```bash
# Start the server
npm start

# In another terminal, use ngrok to expose it
ngrok http 3000
```

### 5. Configure GitHub Webhook

1. Go to your GitHub repo → Settings → Webhooks → Add webhook
2. **Payload URL**: `https://your-ngrok-url.ngrok.io/webhook`
3. **Content type**: `application/json`
4. **Secret**: (same as in your `.env`)
5. **Events**: Select:
   - Pull request reviews
   - Pull request review comments
   - Check runs

### 6. Test with Real PR

```bash
# Create a test branch
git checkout -b feature/test-real-api

# Copy bad code example
cp examples/bad-code.js src/api.js

# Commit and push
git add src/api.js
git commit -m "Add code that needs improvement"
git push origin feature/test-real-api
```

Then:
1. Create a Pull Request on GitHub
2. Add a comment: `@ai-pr-teammate please review and add error handling`
3. Watch the real AI analyze and fix your code! 🚀

---

## 📂 Project Structure

```
ai-pr-teammate-prod/
├── src/
│   ├── index.js                 # Server & webhook handler
│   ├── services/
│   │   ├── ai-service.js        # ✨ Real API calls (no mocks!)
│   │   ├── github-service.js    # GitHub API
│   │   ├── code-fixer.js        # Fix orchestration
│   │   └── ci-analyzer.js       # CI analysis
│   └── api.js                   # Test file
├── examples/
│   ├── bad-code.js              # Code with issues
│   └── fixed-code.js            # Properly fixed code
├── .env.example                 # Template
├── .npmrc                       # Public npm registry
├── package.json
├── README-PROD.md               # Production guide
└── GETTING_STARTED.md           # This file!
```

---

## 🔍 Verification Checklist

Before testing, verify:

- [ ] `.env` file created with real API keys
- [ ] `DEMO_MODE=false` in `.env`
- [ ] GitHub webhook configured
- [ ] Server running (`npm start`)
- [ ] ngrok exposing server (or deployed)

---

## 🆚 Compare with Demo

**Demo Repo Location**: `/Users/dhawan/Work/ai-pr-teammate-demo`
- Kept untouched with mock responses
- Great for demos without API costs
- Instant responses for presentations

**Production Repo Location**: `/Users/dhawan/Work/ai-pr-teammate-prod` (current)
- Uses real AI intelligence
- Provides actual code analysis
- Ready for production use

---

## ❓ Troubleshooting

### "Mock response" still appearing?
Check: `src/services/ai-service.js` line 173 should be `false`

### API not responding?
- Verify API key in `.env`
- Check console for error messages
- Confirm API key has credits

### Webhook not triggering?
- Check webhook delivery in GitHub settings
- Verify ngrok URL is accessible
- Check server logs

---

## 🚀 Ready to Deploy?

For production deployment, see [SETUP.md](SETUP.md) for:
- Heroku deployment
- Railway deployment
- AWS/GCP deployment
- Environment configuration

---

**You now have TWO repos:**
1. `ai-pr-teammate-demo` - Mock responses (demo)
2. `ai-pr-teammate-prod` - Real AI (production) ✨

Happy coding! 🎉

