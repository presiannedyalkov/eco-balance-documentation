# How to Access the Repository (For Collaborators)

**Purpose:** Quick guide for new collaborators on how to access the repository  
**Last Updated:** November 2025

---

## 🔐 Step 1: Accept the Invitation

**If the repository is private:**
1. Check your email for an invitation from GitHub
2. Click the "View invitation" link
3. Or go to: https://github.com/presiannedyalkov/eco-balance-documentation/invitations
4. Click "Accept invitation"

**If the repository is public:**
- You can access it immediately without accepting (but you should still accept to get write access)

---

## 👀 Step 2: View on GitHub

**Once you have access, you can:**

1. **View the repository online:**
   - Go to: https://github.com/presiannedyalkov/eco-balance-documentation
   - You'll see all files, issues, pull requests, etc.

2. **View the live documentation site:**
   - Go to: https://docs.eco-balance.cc/
   - This is the public documentation website

---

## 💻 Step 3: Clone Locally (Optional)

**To work on the repository locally:**

1. **Clone the repository:**
   ```bash
   git clone https://github.com/presiannedyalkov/eco-balance-documentation.git
   cd eco-balance-documentation
   ```

2. **Or if you prefer SSH:**
   ```bash
   git clone git@github.com:presiannedyalkov/eco-balance-documentation.git
   cd eco-balance-documentation
   ```

3. **Install dependencies:**
   ```bash
   npm install
   ```

4. **Start development server (optional):**
   ```bash
   npm start
   ```
   - Documentation will be available at `http://localhost:3023`

---

## ✅ Quick Checklist

- [ ] Received invitation email (if private repo)
- [ ] Accepted invitation on GitHub
- [ ] Can see repository at: https://github.com/presiannedyalkov/eco-balance-documentation
- [ ] (Optional) Cloned repository locally
- [ ] (Optional) Installed dependencies with `npm install`

---

## 🚀 Next Steps

Once you have access:

1. **Read the documentation:**
   - Start with `README.md`
   - Check `docs/intro.md` for project overview
   - Review `_process/documentation/COLLABORATOR_GUIDE.md` for making PRs

2. **Make your first contribution:**
   - Create a branch: `git checkout -b feature/your-feature-name`
   - Make changes
   - Push: `git push origin feature/your-feature-name`
   - Open a Pull Request on GitHub

---

## ❓ Troubleshooting

**"I can't see the repository"**
- Check if you accepted the invitation
- Make sure you're logged into the correct GitHub account
- Try the direct link: https://github.com/presiannedyalkov/eco-balance-documentation

**"I can't clone the repository"**
- Make sure you accepted the invitation first
- Check your Git credentials
- Try using HTTPS instead of SSH (or vice versa)

**"Permission denied"**
- You need to accept the invitation first
- Make sure you're using the correct GitHub account
- Contact the repository owner if issues persist

---

## 📝 Notes

- **Public repositories:** Anyone can view, but only collaborators can push
- **Private repositories:** Only collaborators (and repository owner) can view
- **Write access:** Allows you to create branches and push changes
- **All changes should go through Pull Requests** (even with write access, it's best practice)

---

**Need help?** Contact the repository owner or check the [Collaborator Guide](COLLABORATOR_GUIDE.md) for more details.

