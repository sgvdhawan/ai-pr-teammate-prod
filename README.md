# 🤖 AI PR Teammate

An intelligent AI-powered GitHub PR assistant that automatically responds to code review comments, fixes issues, and resolves CI failures — like having an extra teammate on your development team!

![License](https://img.shields.io/badge/license-MIT-blue.svg)
![Node](https://img.shields.io/badge/node-%3E%3D20.0.0-brightgreen.svg)

> **💡 Note:** This tool uses paid AI APIs (Anthropic/OpenAI). Enable **Demo Mode** for free testing and demonstrations without API costs! See [API Costs & Demo Mode](#-api-costs--demo-mode) section.

## 🌟 Features

- **🗣️ Natural Language Review Processing**: Tag `@ai-teammate` in PR comments to request fixes
- **🔧 Automated Code Fixes**: AI understands review feedback and automatically updates code
- **❌ CI Failure Resolution**: Automatically detects and fixes CI/CD pipeline failures
- **📝 Smart Commit Messages**: Generates clear, descriptive commit messages
- **💬 Explanatory Comments**: Posts detailed explanations of what was changed and why
- **🔒 Security & Best Practices**: Applies error handling, validation, and security improvements
- **🎨 Frontend Optimizations**: Adds loading states, error boundaries, and UX improvements
- **🔄 Multi-file Support**: Can fix multiple files in a single commit
- **🤝 Multiple AI Providers**: Supports Claude (Anthropic) and GPT-4 (OpenAI)

## 🎯 Problem It Solves

Development teams waste countless hours on:
- Repetitive code review cycles
- Fixing simple CI failures
- Adding boilerplate error handling
- Implementing review feedback manually
- Waiting for reviewers who are busy

**AI PR Teammate** automates these tasks, allowing developers to focus on what matters: building features and solving complex problems.

## 🚀 Quick Start

### Prerequisites

- Node.js 20+
- A GitHub repository
- An API key from Anthropic (Claude) or OpenAI (GPT-4) **⚠️ Paid service required**

### Installation

1. **Copy the action files to your repository:**

```bash
# Clone or copy these files to your repo:
- .github/workflows/ai-pr-teammate.yml
- src/
- package.json
```

2. **Set up GitHub Secrets:**

Go to your repository **Settings** → **Secrets and variables** → **Actions** → **New repository secret**

Add the following secrets:

```
ANTHROPIC_API_KEY=sk-ant-xxxxx
# OR
OPENAI_API_KEY=sk-xxxxx
```

3. **Configure AI Provider (Optional):**

Go to **Settings** → **Secrets and variables** → **Variables** → **New repository variable**

```
AI_PROVIDER=anthropic  # or 'openai'
```

4. **Commit and push the workflow:**

```bash
git add .github/workflows/ai-pr-teammate.yml
git commit -m "Add AI PR Teammate workflow"
git push
```

That's it! 🎉 The AI PR Teammate is now active in your repository.

## 💰 API Costs & Demo Mode

### ⚠️ Important: API Costs

This tool uses paid AI APIs. Each code fix or CI analysis request makes an API call:

**Anthropic Claude (Recommended):**
- Model: `claude-3-5-sonnet-20241022`
- Cost: ~$3 per million input tokens, ~$15 per million output tokens
- Typical request: $0.01-0.05 per code fix (depending on file size)
- [Anthropic Pricing](https://www.anthropic.com/pricing)

**OpenAI GPT-3.5:**
- Model: `gpt-3.5-turbo`
- Cost: ~$0.50 per million input tokens, ~$1.50 per million output tokens
- Typical request: $0.001-0.01 per code fix
- [OpenAI Pricing](https://openai.com/pricing)

**Cost Estimates:**
- Small team (10-20 fixes/day): $5-20/month
- Medium team (50-100 fixes/day): $20-100/month
- Large team (200+ fixes/day): $100-500/month

### 🎭 Demo Mode (FREE - No API Costs!)

For demonstrations, testing, or to avoid API costs, enable **Demo Mode**:

```yaml
# In .github/workflows/ai-pr-teammate.yml
env:
  DEMO_MODE: 'true'  # Uses mock AI responses - NO API CALLS!
  AI_PROVIDER: 'anthropic'
```

**Demo Mode Features:**
- ✅ No API calls or costs
- ✅ Instant responses (no network latency)
- ✅ Realistic mock code fixes with error handling
- ✅ Perfect for demos, testing, and development
- ✅ Shows how the tool works without spending credits
- ⚠️ Generated fixes are template-based, not contextually perfect

**When to Use Demo Mode:**
- Hackathon presentations and demos
- Testing the workflow setup
- Development and debugging
- When you want to see the tool in action without costs
- Training team members on how to use the tool

**When to Use Production Mode:**
- Real code reviews that need intelligent fixes
- CI failures that require contextual understanding
- Production repositories with paying customers
- When code quality and accuracy matter most

**📚 Detailed Guides:**
- 🎭 [Demo Mode Setup Guide](./DEMO_MODE_SETUP.md) - Free setup without API costs
- 💰 [Cost Management Guide](./COST_MANAGEMENT.md) - Complete pricing and optimization strategies

## 📖 Usage

### Responding to Review Comments

When a reviewer leaves feedback on your PR, simply tag the AI:

```
@ai-teammate please add error handling to this function
```

```
@ai-teammate fix the TypeScript errors mentioned above
```

```
@ai-teammate add loading states to this component
```

The AI will:
1. ✅ Acknowledge the request
2. 🔍 Analyze the code and context
3. 🧠 Generate the fix using AI
4. 💾 Commit the changes
5. 💬 Post an explanation

### Automatic CI Fixes

When a CI check fails, the AI automatically:
1. Detects the failure
2. Fetches and analyzes error logs
3. Determines the root cause
4. Generates and commits fixes
5. Triggers CI to rerun

**No human intervention needed!**

### Inline Review Comments

The AI works best with inline comments directly on code:

```typescript
// Reviewer comments on line 45:
// @ai-teammate this needs input validation

function processUser(name: string) {
  // AI will add validation here
}
```

## 🎬 Demo Scenario

Here's a typical workflow:

1. **Developer creates a PR** with a new API endpoint
2. **Reviewer comments:** "@ai-teammate please add error handling and input validation"
3. **AI PR Teammate responds:**
   - Adds try-catch blocks
   - Implements input validation
   - Adds appropriate error responses
   - Commits with message: "🤖 AI PR Teammate: Add error handling and validation"
4. **CI fails** due to a linting error
5. **AI PR Teammate automatically:**
   - Detects the failure
   - Fixes the linting issue
   - Commits: "🤖 AI PR Teammate: Fix linting errors"
6. **CI passes** ✅
7. **Reviewer approves** and merges 🎉

## 🛠️ How It Works

### Architecture

```
┌─────────────────┐
│  GitHub PR      │
│  (Comment/CI)   │
└────────┬────────┘
         │
         ▼
┌─────────────────┐
│ GitHub Actions  │
│   Workflow      │
└────────┬────────┘
         │
         ▼
┌─────────────────┐
│  AI PR Teammate │
│   Main Process  │
└────────┬────────┘
         │
    ┌────┴────┐
    │         │
    ▼         ▼
┌────────┐ ┌────────┐
│GitHub  │ │   AI   │
│Service │ │Service │
└───┬────┘ └────┬───┘
    │           │
    │    ┌──────┴───────┐
    │    │              │
    ▼    ▼              ▼
┌────────────┐    ┌──────────┐
│Code Fixer  │    │CI Analyzer│
└─────┬──────┘    └────┬─────┘
      │                │
      └────────┬───────┘
               │
               ▼
         ┌──────────┐
         │  Commit  │
         │ & Comment│
         └──────────┘
```

### Key Components

- **`src/index.js`**: Main orchestrator and entry point
- **`src/services/github-service.js`**: GitHub API interactions
- **`src/services/ai-service.js`**: AI provider integration (Claude/GPT-4)
- **`src/services/code-fixer.js`**: Code fix generation and application
- **`src/services/ci-analyzer.js`**: CI failure detection and resolution

## ⚙️ Configuration

### Workflow Triggers

The GitHub Action triggers on:
- ✅ PR comments (issue comments)
- ✅ Review comments (inline code comments)
- ✅ Check run failures

### Customization

Edit `.github/workflows/ai-pr-teammate.yml` to customize:

```yaml
env:
  AI_PROVIDER: 'anthropic'  # or 'openai'
  # Add custom environment variables
```

### AI Trigger Patterns

The AI responds to these patterns:
- `@ai-teammate`
- `@ai-bot`
- `@ai-pr-assistant`

Add more in `src/index.js`:

```javascript
const AI_TRIGGER_PATTERNS = [
  /@ai-teammate/i,
  /@ai-bot/i,
  /@your-custom-trigger/i
];
```

## 🔐 Security & Permissions

### Required Permissions

The workflow needs:
- ✅ `contents: write` - To commit changes
- ✅ `pull-requests: write` - To comment on PRs
- ✅ `checks: read` - To read CI status

### Security Best Practices

1. **API Keys**: Store in GitHub Secrets, never commit
2. **Code Review**: The AI generates code, but human review is still important
3. **Branch Protection**: Consider requiring human approval for AI commits
4. **Rate Limiting**: Be mindful of API rate limits

### Token Security

The `GITHUB_TOKEN` is automatically provided by GitHub Actions and is scoped to the repository.

## 🎓 Advanced Usage

### Custom Prompts

Modify AI prompts in `src/services/ai-service.js`:

```javascript
buildCodeFixPrompt(reviewComment, fileContent, filePath, prDiff, relevantCode) {
  return `Your custom prompt template...`;
}
```

### Multiple Files

Fix multiple files at once:

```
@ai-teammate update error handling in api/users.js and api/posts.js
```

### Specific Instructions

Be specific for better results:

```
@ai-teammate add try-catch blocks with proper error logging and return 500 status codes on errors
```

## 🧪 Testing Locally

Test the AI service without GitHub Actions:

```javascript
// test.js
import { AIService } from './src/services/ai-service.js';

const ai = new AIService();
const result = await ai.generateCodeFix({
  reviewComment: 'Add error handling',
  fileContent: '...',
  filePath: 'test.js'
});

console.log(result);
```

```bash
node test.js
```

## 📊 Metrics & Analytics

Track AI PR Teammate usage:
- Number of automated fixes
- CI failures resolved
- Time saved on review cycles

Add to your workflow:

```yaml
- name: Log metrics
  run: echo "AI fixes applied" >> metrics.log
```

## 🤝 Contributing

Contributions are welcome! Here are some ideas:

- 🌐 Support for more languages (Go, Rust, Ruby)
- 🧪 Automatic test generation
- 📚 Documentation updates
- 🎨 UI/UX improvements for comments
- 🔍 Better error pattern matching

## 🐛 Troubleshooting

### AI not responding?

1. Check that secrets are set correctly (or enable `DEMO_MODE: 'true'` for testing)
2. Verify the trigger pattern matches (`@ai-teammate`)
3. Check GitHub Actions logs
4. Ensure the PR is from a branch in the same repo (not a fork)

### CI auto-fix not working?

1. Check that `check_run` events are enabled
2. Verify the workflow has `checks: read` permission
3. Review the CI logs for error patterns

### Getting API errors?

1. Verify your API key is valid
2. Check you haven't exceeded rate limits
3. Ensure you have credits/balance in your API account
4. **Or switch to Demo Mode**: Set `DEMO_MODE: 'true'` to bypass API calls entirely

### API Rate Limits?

- Use Claude (higher rate limits than OpenAI for most tiers)
- Add rate limit handling
- Consider caching responses

### Managing API Costs?

**Enable Demo Mode for testing:**
```yaml
env:
  DEMO_MODE: 'true'
```

**Cost Optimization Tips:**
1. Use Demo Mode for demonstrations and testing
2. Set up branch protection to limit which PRs trigger the bot
3. Use specific trigger patterns (only respond when tagged with `@ai-teammate`)
4. Monitor your API usage in Anthropic/OpenAI dashboard
5. Set spending limits in your API provider account
6. Consider GPT-3.5-turbo for lower costs (vs GPT-4 or Claude)
7. Review and approve AI changes before merging to learn patterns
8. Use for high-value fixes, not trivial formatting changes

## 📝 License

MIT License - see LICENSE file for details

## 🙌 Acknowledgments

Built with:
- [Anthropic Claude](https://anthropic.com) - AI provider
- [OpenAI GPT-4](https://openai.com) - AI provider
- [GitHub Actions](https://github.com/features/actions) - Automation platform
- [@actions/github](https://github.com/actions/toolkit) - GitHub API toolkit

## 🎉 Demo Video Script

For your hackathon demo:

1. **Show a PR** with missing error handling
2. **Add comment**: "@ai-teammate please add comprehensive error handling"
3. **Show workflow** triggered in Actions tab
4. **Watch AI commit** the fix automatically
5. **Show explanation** comment posted by AI
6. **Trigger CI failure** (intentional syntax error)
7. **Watch AI fix it** automatically
8. **Show passing CI** ✅
9. **Highlight time saved** (seconds vs hours)

## 🚀 Future Enhancements

- [ ] Code quality scoring
- [ ] Automated refactoring suggestions
- [ ] Security vulnerability detection
- [ ] Performance optimization hints
- [ ] Multi-language support expansion
- [ ] Integration with Slack/Discord
- [ ] Custom rule engines
- [ ] Learning from team preferences

---

**Made with ❤️ for developers who want to ship faster**

*Questions? Open an issue or contact the team!*
