# 🤖 AI PR Teammate

An intelligent AI-powered GitHub PR assistant that automatically responds to code review comments, fixes issues, and resolves CI failures — like having an extra teammate on your development team!

![License](https://img.shields.io/badge/license-MIT-blue.svg)
![Node](https://img.shields.io/badge/node-%3E%3D20.0.0-brightgreen.svg)

> **🆓 NEW:** Now supports **FREE AI providers** with real AI models! Use Groq (14,400 requests/day), Google Gemini, or Hugging Face - no credit card required! See [Free AI Setup Guide](./FREE_AI_SETUP.md).

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
- An AI API key - **Choose one**:
  - **🆓 Groq** (Recommended) - FREE: 14,400 requests/day, no credit card! → [Setup Guide](./FREE_AI_SETUP.md)
  - **🆓 Google Gemini** - FREE: 1,500 requests/day → [Setup Guide](./FREE_AI_SETUP.md)
  - **🆓 Hugging Face** - FREE: Rate limited → [Setup Guide](./FREE_AI_SETUP.md)
  - 💳 Anthropic Claude - Paid (~$0.03/request)
  - 💳 OpenAI GPT - Paid (~$0.001-0.01/request)

### Installation

1. **Copy the action files to your repository:**

```bash
# Clone or copy these files to your repo:
- .github/workflows/ai-pr-teammate.yml
- src/
- package.json
```

2. **Get a FREE AI API key (Recommended: Groq):**

   **Option A: Groq (Best Free Option - Recommended)** 🆓
   - Visit [https://console.groq.com/](https://console.groq.com/)
   - Sign up (no credit card needed!)
   - Get API key (starts with `gsk_...`)
   - Free tier: 14,400 requests/day
   
   **Option B: Google Gemini** 🆓
   - Visit [https://makersuite.google.com/app/apikey](https://makersuite.google.com/app/apikey)
   - Get API key
   - Free tier: 1,500 requests/day
   
   **Option C: Paid providers** 💳
   - Anthropic: [https://console.anthropic.com/](https://console.anthropic.com/) (~$0.03/request)
   - OpenAI: [https://platform.openai.com/](https://platform.openai.com/) (~$0.001/request)

3. **Set up GitHub Secrets:**

Go to your repository **Settings** → **Secrets and variables** → **Actions** → **New repository secret**

Add your API key:

```
# For Groq (FREE - Recommended):
GROQ_API_KEY=gsk_your_key_here

# OR for Gemini (FREE):
GEMINI_API_KEY=your_gemini_key_here

# OR for paid providers:
ANTHROPIC_API_KEY=sk-ant-xxxxx
OPENAI_API_KEY=sk-xxxxx
```

4. **Create the GitHub Actions workflow:**

Create `.github/workflows/ai-pr-teammate.yml` with:

```yaml
name: AI PR Teammate

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
      - uses: actions/checkout@v4
        with:
          fetch-depth: 0
          token: ${{ secrets.GITHUB_TOKEN }}
      
      - uses: actions/setup-node@v4
        with:
          node-version: '20'
      
      - run: npm install
      
      - name: Run AI PR Teammate
        env:
          GITHUB_TOKEN: ${{ secrets.GITHUB_TOKEN }}
          # Choose your AI provider:
          AI_PROVIDER: 'groq'  # FREE! or 'gemini', 'anthropic', 'openai'
          GROQ_API_KEY: ${{ secrets.GROQ_API_KEY }}  # FREE
          # GEMINI_API_KEY: ${{ secrets.GEMINI_API_KEY }}  # FREE
          # ANTHROPIC_API_KEY: ${{ secrets.ANTHROPIC_API_KEY }}  # PAID
          # OPENAI_API_KEY: ${{ secrets.OPENAI_API_KEY }}  # PAID
        run: node src/index.js
```

5. **Commit and push:**

```bash
git add .github/workflows/ai-pr-teammate.yml
git commit -m "Add AI PR Teammate workflow with Groq (free)"
git push
```

That's it! 🎉 The AI PR Teammate is now active with **FREE, real AI**!

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
  # Choose AI provider:
  AI_PROVIDER: 'groq'  # FREE: 'groq', 'gemini', 'huggingface'
                       # PAID: 'anthropic', 'openai'
  
  # Add corresponding API key:
  GROQ_API_KEY: ${{ secrets.GROQ_API_KEY }}
```

### AI Provider Comparison

| Provider | Cost | Speed | Daily Limit | Setup |
|----------|------|-------|-------------|-------|
| **Groq** (Recommended) | 🆓 FREE | ⚡ Very Fast | 14,400 requests | [Guide](./FREE_AI_SETUP.md) |
| **Gemini** | 🆓 FREE | ⚡ Fast | 1,500 requests | [Guide](./FREE_AI_SETUP.md) |
| **Hugging Face** | 🆓 FREE | 🐌 Slower | Rate limited | [Guide](./FREE_AI_SETUP.md) |
| Anthropic Claude | 💳 ~$0.03/req | Fast | Unlimited* | [Docs](https://docs.anthropic.com) |
| OpenAI GPT-3.5 | 💳 ~$0.001/req | Fast | Unlimited* | [Docs](https://platform.openai.com/docs) |

\* Subject to account balance and rate limits

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

1. Check that secrets are set correctly
2. Verify the trigger pattern matches (`@ai-teammate`)
3. Check GitHub Actions logs
4. Ensure the PR is from a branch in the same repo (not a fork)

### CI auto-fix not working?

1. Check that `check_run` events are enabled
2. Verify the workflow has `checks: read` permission
3. Review the CI logs for error patterns

### API Rate Limits?

- Use Claude (higher rate limits than OpenAI for most tiers)
- Add rate limit handling
- Consider caching responses

## 📝 License

MIT License - see LICENSE file for details

## 🙌 Acknowledgments

Built with:
- [Groq](https://groq.com) - FREE AI inference (Recommended!)
- [Google Gemini](https://ai.google.dev/) - FREE AI provider
- [Hugging Face](https://huggingface.co) - FREE open-source AI models
- [Anthropic Claude](https://anthropic.com) - Premium AI provider
- [OpenAI](https://openai.com) - AI provider
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
