# GitHub Token Setup for Actions Monitoring

**Purpose:** Guide for creating a GitHub token to check Actions status  
**Created:** November 2025

---

## Token Types

GitHub offers two types of tokens. Either will work:

### Option 1: Classic Token (Easier)

1. Go to: https://github.com/settings/tokens
2. Click **"Generate new token"** → **"Generate new token (classic)"**
3. Fill in:
   - **Note:** "Actions Checker - Eco Balance"
   - **Expiration:** Choose your preference (90 days recommended)
   - **Scopes:** Check ✅ **"repo"** (this includes Actions access for private repos)
4. Click **"Generate token"**
5. **Copy the token immediately** (you won't see it again!)

### Option 2: Fine-Grained Token

1. Go to: https://github.com/settings/tokens
2. Click **"Generate new token"** → **"Generate new token (fine-grained)"**
3. Fill in:
   - **Token name:** "Actions Checker - Eco Balance"
   - **Expiration:** Choose your preference
   - **Repository access:** Select "Only select repositories" → Choose `eco-balance-documentation`
   - **Repository permissions:**
     - ✅ **Actions:** Read-only
     - ✅ **Contents:** Read-only
     - ✅ **Metadata:** Read-only (automatically included)
4. Click **"Generate token"**
5. **Copy the token immediately**

---

## Using the Token

### With the Check Script

```bash
GITHUB_TOKEN=your_token_here node scripts/check-github-actions.js
```

### Security Note

⚠️ **Never commit tokens to git!** Always use environment variables.

---

## What the Token Needs

For checking Actions status, the token needs:

**Classic Token:**
- ✅ `repo` scope (includes Actions access)

**Fine-Grained Token:**
- ✅ `Actions: Read-only` permission
- ✅ `Contents: Read-only` permission

---

## Troubleshooting

### "401 Unauthorized"
- Token is invalid or expired
- Generate a new token

### "403 Forbidden"
- Token doesn't have required permissions
- For classic token: Ensure "repo" is checked
- For fine-grained token: Ensure "Actions: Read-only" is enabled

### "404 Not Found"
- Repository name might be wrong
- Token might not have access to the repository
- For fine-grained token: Ensure repository is selected

---

## Alternative: Share Error Manually

If you prefer not to create a token, you can:

1. Go to: https://github.com/presiannedyalkov/eco-balance-documentation/actions
2. Click on the failed workflow run
3. Expand the failed step
4. Copy the error message
5. Share it here and I'll help fix it

---

**Last Updated:** November 2025

