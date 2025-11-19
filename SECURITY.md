# Security Policy

## Supported Versions

We actively support the following versions of this documentation repository:

| Version | Supported          |
| ------- | ------------------ |
| 2025.11 | :white_check_mark: |
| < 2025.11 | :x: |

## Reporting a Vulnerability

We take the security of this project seriously. If you discover a security vulnerability, please follow these steps:

### How to Report

1. **Do NOT** create a public GitHub issue for security vulnerabilities
2. Report security vulnerabilities through GitHub Security Advisories: https://github.com/presiannedyalkov/eco-balance-documentation/security/advisories/new
3. Include the following information:
   - Description of the vulnerability
   - Steps to reproduce (if applicable)
   - Potential impact
   - Suggested fix (if you have one)

### What to Expect

- **Response Time**: We will acknowledge your report within 48 hours
- **Update**: We will provide updates on our progress every 7-10 days
- **Resolution**: We will work to resolve the issue as quickly as possible

### Scope

This security policy applies to:
- Security vulnerabilities in the documentation website
- Security issues with GitHub Actions workflows
- Security concerns with repository access or permissions
- Issues with dependencies or third-party integrations

### Out of Scope

The following are **not** considered security vulnerabilities:
- Documentation errors or typos
- Feature requests
- General questions about the project
- Issues with external services (GitHub, Docusaurus, etc.)

## Security Best Practices

When contributing to this repository:

- **Never commit sensitive information** (API keys, passwords, tokens, personal data)
- **Use environment variables** for any configuration that might be sensitive
- **Review dependencies** regularly for known vulnerabilities
- **Follow secure coding practices** in any scripts or workflows
- **Report security issues** through the proper channels (not public issues)

## Disclosure Policy

- We will publicly disclose security vulnerabilities after they have been fixed
- We will credit security researchers who responsibly disclose vulnerabilities (if they wish)
- We will not take legal action against security researchers who follow responsible disclosure practices

## Security Updates

Security updates will be documented in:
- `_versions/v[VERSION]/RELEASE_NOTES.md` - For version-specific security fixes
- `_versions/v[VERSION]/BREAKING_CHANGES.md` - For security-related breaking changes

---

**Note**: This is a documentation repository. If you discover security vulnerabilities in the actual Eco Balance project operations (not this documentation), please contact the project team through the appropriate channels.

