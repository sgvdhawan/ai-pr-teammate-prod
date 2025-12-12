# 🎭 Demo Mode Setup Guide

## Quick Start: Zero-Cost Demo Mode

Want to try AI PR Teammate without spending any money? Follow this guide to set up **Demo Mode** - a completely free version that uses mock AI responses instead of paid API calls.

## What is Demo Mode?

Demo Mode allows you to:
- ✅ Test the entire workflow **for FREE**
- ✅ See how the bot responds to PR comments
- ✅ Demonstrate the tool without API costs
- ✅ Perfect for hackathons, presentations, and testing
- ✅ No API keys required!

**Trade-off**: Demo mode uses template-based fixes instead of real AI analysis. Good for demonstrations, but not suitable for production code reviews.

## Setup Steps

### 1. Copy Files to Your Repository

```bash
# Clone this repository or copy these files:
- src/
- package.json
- .github/workflows/ai-pr-teammate.yml (you'll create this)
```

### 2. Create GitHub Actions Workflow

Create `.github/workflows/ai-pr-teammate.yml`:

```yaml
name: AI PR Teammate (Demo Mode)

on:
  issue_comment:
    types: [created]
  pull_request_review_comment:
    types: [created]

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

      - name: Run AI PR Teammate (Demo Mode)
        env:
          GITHUB_TOKEN: ${{ secrets.GITHUB_TOKEN }}
          AI_PROVIDER: 'anthropic'
          DEMO_MODE: 'true'  # 🎭 FREE MODE - No API costs!
        run: node src/index.js
```

### 3. Commit and Push

```bash
git add .github/workflows/ai-pr-teammate.yml
git commit -m "Add AI PR Teammate workflow (Demo Mode)"
git push
```

### 4. Test It!

1. **Create a test PR** with some code
2. **Add a comment** on the PR:
   ```
   @ai-teammate please add error handling to this function
   ```
3. **Watch the magic** happen - the bot will respond and commit a fix!

## Demo Mode Features

### What Works in Demo Mode

✅ **Full workflow automation**
- Bot responds to `@ai-teammate` mentions
- Creates commits with fixed code
- Posts explanatory comments
- Handles CI failures

✅ **Realistic code fixes**
- Adds try-catch blocks
- Implements input validation
- Adds proper error messages
- Follows best practices

✅ **Fast responses**
- No network latency
- Instant "AI" processing
- No rate limits

### What's Different from Production

⚠️ **Template-based fixes**
- Uses predefined patterns instead of real AI
- May not understand complex context
- Works best for common scenarios (error handling, validation)

⚠️ **Limited customization**
- Can't adapt to unique coding styles
- Less accurate for complex refactoring
- Not suitable for security-critical fixes

## Upgrading to Production Mode

When you're ready for real AI-powered fixes:

### 1. Get an API Key

**Option A: Anthropic Claude (Recommended)**
1. Visit https://console.anthropic.com/
2. Create an account
3. Get $5 free credit
4. Generate an API key

**Option B: OpenAI GPT-3.5 (Budget Option)**
1. Visit https://platform.openai.com/
2. Create an account
3. Get free trial credits
4. Generate an API key

### 2. Add API Key to GitHub Secrets

1. Go to your repository **Settings**
2. Navigate to **Secrets and variables** → **Actions**
3. Click **New repository secret**
4. Add your key:
   - Name: `ANTHROPIC_API_KEY` or `OPENAI_API_KEY`
   - Value: Your API key

### 3. Update Workflow

Change `DEMO_MODE` to `false`:

```yaml
env:
  GITHUB_TOKEN: ${{ secrets.GITHUB_TOKEN }}
  AI_PROVIDER: 'anthropic'  # or 'openai'
  DEMO_MODE: 'false'  # 🚀 Production mode with real AI
  ANTHROPIC_API_KEY: ${{ secrets.ANTHROPIC_API_KEY }}
  # OR
  # OPENAI_API_KEY: ${{ secrets.OPENAI_API_KEY }}
```

### 4. Set Spending Limits

**Before enabling production mode**, set spending limits:

- **Anthropic**: https://console.anthropic.com/settings/limits
- **OpenAI**: https://platform.openai.com/account/billing/limits

Recommended limit for testing: $10/month

## Hybrid Setup: Best of Both Worlds

Use Demo Mode for testing, Production for main branch:

```yaml
env:
  GITHUB_TOKEN: ${{ secrets.GITHUB_TOKEN }}
  AI_PROVIDER: 'anthropic'
  # Demo mode for feature branches, Production for main
  DEMO_MODE: ${{ github.base_ref != 'main' }}
  ANTHROPIC_API_KEY: ${{ secrets.ANTHROPIC_API_KEY }}
```

## Example Demo Scenarios

### Scenario 1: Error Handling Demo

**PR Code** (`api.js`):
```javascript
export function getUser(id) {
  const user = database.find(id);
  return user;
}
```

**Comment**:
```
@ai-teammate add error handling and validation
```

**Bot Response**:
```javascript
export async function getUser(id) {
  try {
    // Input validation
    if (!id || typeof id !== 'string') {
      return {
        status: 400,
        error: 'Invalid user ID'
      };
    }
    
    const user = await database.find(id);
    
    if (!user) {
      return {
        status: 404,
        error: 'User not found'
      };
    }
    
    return {
      status: 200,
      data: user
    };
  } catch (error) {
    console.error('Error fetching user:', error);
    return {
      status: 500,
      error: 'Internal server error'
    };
  }
}
```

### Scenario 2: CI Failure Demo

When CI fails, the bot automatically:
1. Detects the failure
2. Analyzes error logs
3. Commits a fix
4. Posts an explanation

Perfect for demonstrating automatic CI remediation!

## Troubleshooting

### Bot not responding?

1. ✅ Check workflow file is committed to `.github/workflows/`
2. ✅ Verify you're commenting on a PR (not an issue)
3. ✅ Make sure you use `@ai-teammate` (exact match)
4. ✅ Check GitHub Actions logs for errors

### Want to see the workflow logs?

1. Go to your repository
2. Click **Actions** tab
3. Click on the latest workflow run
4. Expand the **Run AI PR Teammate** step

## Demo Tips

### For Hackathon Presentations

1. **Pre-create a PR** with intentionally bad code
2. **During demo**: Add `@ai-teammate` comment live
3. **Show**: Actions tab to watch workflow execute
4. **Highlight**: Instant fix commit and explanation
5. **Emphasize**: Zero cost with Demo Mode!

### For Team Demos

1. **Show both modes**: Demo mode first, then explain production
2. **Discuss costs**: Show the `COST_MANAGEMENT.md` guide
3. **Live test**: Let team members try commenting
4. **Q&A**: Address concerns about AI-generated code

### Impressive Demo Flow

```
1. Show messy code in PR
   ↓
2. Comment: "@ai-teammate add comprehensive error handling"
   ↓
3. Switch to Actions tab (show workflow running)
   ↓
4. Refresh PR (show new commit)
   ↓
5. Show fixed code (with try-catch, validation, etc.)
   ↓
6. Show bot's explanation comment
   ↓
7. Reveal it's FREE with Demo Mode! 🎉
```

## Cost Comparison

| Mode | Setup Time | Cost/Month | Best For |
|------|-----------|-----------|----------|
| **Demo Mode** | 5 minutes | **$0** | Testing, demos, learning |
| **Production (GPT-3.5)** | 10 minutes | $5-50 | Small teams, budget-conscious |
| **Production (Claude)** | 10 minutes | $20-200 | Teams that value quality |

## Next Steps

✅ Set up Demo Mode (you're here!)
✅ Test with your team
✅ Present in your hackathon
✅ Review [COST_MANAGEMENT.md](./COST_MANAGEMENT.md) for production
✅ When ready, upgrade to production mode

## Support

- 📖 Full README: [README.md](./README.md)
- 💰 Cost guide: [COST_MANAGEMENT.md](./COST_MANAGEMENT.md)
- 🐛 Issues: Open a GitHub issue
- 💬 Questions: Start a discussion

---

**Have fun demoing! 🎉 Remember: Demo Mode = Zero costs, full features!**

