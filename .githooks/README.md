# Git Hooks

This directory contains git hooks to enforce repository rules.

## Pre-Push Hook

The `pre-push` hook prevents pushing directly to the `main` branch.

### Installation

To enable the hooks, run:

```bash
git config core.hooksPath .githooks
```

Or globally for all repositories:

```bash
git config --global core.hooksPath .githooks
```

### What It Does

- Checks if you're trying to push to `main`
- Blocks the push if you are
- Shows helpful error message with instructions

### Testing

Try pushing to main (it should fail):

```bash
git checkout main
# Make a change
git add .
git commit -m "test"
git push origin main  # This will be blocked!
```

### Bypassing (Not Recommended)

If you absolutely need to bypass (emergency only):

```bash
git push origin main --no-verify
```

**⚠️ Warning:** This bypasses the hook. Only use in emergencies, and still create a PR afterward.

---

## Manual Installation

If the hooks aren't working, you can manually install:

```bash
# Make hook executable
chmod +x .githooks/pre-push

# Install
git config core.hooksPath .githooks
```

---

## For AI Assistants

**This hook will prevent you from pushing to main!**

If you're an AI assistant:
1. Always check current branch: `git branch`
2. If on `main`, create a branch first
3. The hook will remind you if you forget

