# AI PR Teammate - Production Version

This is the **production version** of AI PR Teammate that uses **real API calls** to Claude/OpenAI instead of mock responses.

## Key Differences from Demo Version

### Demo Version (`ai-pr-teammate-demo`)
- ✅ Uses mock responses (no API credits needed)
- ✅ Great for demonstrations and testing
- ✅ Instant responses
- ✅ `USE_MOCK_RESPONSE = true`

### Production Version (`ai-pr-teammate-prod`) - THIS REPO
- ✅ Uses real AI API calls (requires API credits)
- ✅ Intelligent code analysis and fixes
- ✅ Real-world deployment ready
- ✅ `USE_MOCK_RESPONSE = false`

## Setup

### 1. Install Dependencies

```bash
npm install
```

### 2. Configure Environment Variables

Copy `env.example` to `.env`:

```bash
cp env.example .env
```

Update `.env` with your credentials:

```env
# GitHub Configuration
GITHUB_TOKEN=your_github_personal_access_token
GITHUB_OWNER=your_github_username
GITHUB_REPO=your_repo_name
WEBHOOK_SECRET=your_webhook_secret

# AI Provider (choose one)
AI_PROVIDER=anthropic  # or 'openai'

# Anthropic API Key (if using Claude)
ANTHROPIC_API_KEY=your_anthropic_api_key

# OpenAI API Key (if using GPT)
OPENAI_API_KEY=your_openai_api_key

# Server Configuration
PORT=3000

# IMPORTANT: Set to 'false' for real API calls
DEMO_MODE=false
```

### 3. Run the Application

```bash
npm start
```

### 4. Set Up GitHub Webhook

Configure your GitHub repository webhook to point to your server:

- **Payload URL**: `https://your-server.com/webhook`
- **Content type**: `application/json`
- **Secret**: (your webhook secret)
- **Events**: 
  - Pull request reviews
  - Pull request review comments
  - Check runs

## Testing with Real API

1. **Create a branch with problematic code**:
   ```bash
   git checkout -b feature/test-real-api
   # Edit src/api.js with code from examples/bad-code.js
   git add .
   git commit -m "Add code that needs review"
   git push origin feature/test-real-api
   ```

2. **Create a Pull Request** on GitHub

3. **Add a review comment**: `@ai-pr-teammate please add error handling`

4. **The AI will analyze and respond** with real Claude/GPT analysis

## API Costs

- **Anthropic Claude**: ~$0.003 per request for Sonnet
- **OpenAI GPT-3.5**: ~$0.002 per request
- **OpenAI GPT-4**: ~$0.03 per request

## Architecture

```
src/
├── index.js              # Express server & webhook handler
├── services/
│   ├── ai-service.js     # Real AI API calls (Claude/OpenAI)
│   ├── github-service.js # GitHub API interactions
│   ├── code-fixer.js     # Code fixing orchestration
│   └── ci-analyzer.js    # CI failure analysis
```

## Features

✅ **Real AI Code Review**: Uses Claude/GPT for intelligent analysis
✅ **Automatic Code Fixes**: Applies fixes via commits
✅ **CI Failure Analysis**: Diagnoses and fixes CI errors
✅ **Smart Detection**: Recognizes good vs bad code
✅ **Production Ready**: Error handling, logging, security

## Troubleshooting

### API Key Issues
```bash
# Verify your API key is set
echo $ANTHROPIC_API_KEY  # or $OPENAI_API_KEY
```

### Rate Limits
- Anthropic: 50 requests/min
- OpenAI: Varies by tier

### Webhook Not Working
- Check server logs: `npm start`
- Verify webhook secret matches
- Check ngrok/server URL is accessible

## Support

For issues, check:
- [Main README](README.md)
- [Setup Guide](SETUP.md)
- [Contributing Guide](CONTRIBUTING.md)

---

**Ready for real AI-powered PR reviews! 🚀**

