# 🔍 Sensitive Data Detection Patterns

**Purpose**: Regex patterns and detection strategies for identifying sensitive data that should not be publicly exposed.

**Owner**: Security Auditor Persona

**Last Updated**: 2025-11-09

---

## Overview

This document contains regular expression patterns and contextual indicators used to detect sensitive information in documentation. These patterns help automate the initial scan, but **human review is always required** to validate findings in context.

⚠️ **Important**: These are detection patterns, not validation rules. Always review matches in context to distinguish legitimate from false positives.

---

## Contact Information Patterns

### Email Addresses

**Pattern (Basic)**:
```regex
[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}
```

**Pattern (Comprehensive)**:
```regex
\b[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}\b
```

**Usage**:
```bash
grep -E '[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}' *.md
```

**Context to Check**:
- ✅ **PUBLIC**: `info@ecobalance.org`, `contact@ecobalance.org`, `hello@ecobalance.org`
- ❌ **PRIVATE**: Personal emails (gmail, yahoo, outlook, etc.)
- ❌ **INTERNAL**: Individual team member work emails

**False Positives**:
- Email examples in documentation: `user@example.com`, `name@domain.com`
- Code snippets with placeholder emails

**Validation**:
- Is this a generic organizational email (PUBLIC) or personal email (PRIVATE)?
- Is this email already publicly listed elsewhere?
- Is this a real email or an example placeholder?

---

### Phone Numbers

**Pattern (International Format)**:
```regex
(\+\d{1,3}[-.\s]?)?\(?\d{1,4}\)?[-.\s]?\d{1,4}[-.\s]?\d{1,9}
```

**Pattern (German Phone Numbers)**:
```regex
(\+49|0049|0)\s?\d{2,5}\s?\d{3,}\s?\d{3,}
```

**Pattern (Portuguese Phone Numbers)**:
```regex
(\+351|00351)\s?\d{2,3}\s?\d{3}\s?\d{3,4}
```

**Pattern (Generic - Various Formats)**:
```regex
\b(\+\d{1,3}[-.\s]?)?(\(?\d{2,5}\)?[-.\s]?)?\d{3,}[-.\s]?\d{3,4}\b
```

**Usage**:
```bash
# German numbers
grep -E '(\+49|0049|0)\s?\d{2,5}\s?\d{3,}\s?\d{3,}' *.md

# Portuguese numbers
grep -E '(\+351|00351)\s?\d{2,3}\s?\d{3}\s?\d{3,4}' *.md

# International
grep -E '(\+\d{1,3}[-.\s]?)?\(?\d{1,4}\)?[-.\s]?\d{1,4}[-.\s]?\d{1,9}' *.md
```

**Context to Check**:
- ✅ **PUBLIC**: Published helpline, public office number
- ❌ **PRIVATE**: Personal mobile numbers, direct lines
- ⚠️ **INTERNAL**: Office numbers not on public website

**False Positives**:
- Numerical sequences that look like phone numbers (IDs, codes)
- Years or dates: `2025-11-09`, `20241109`
- Measurement numbers: `200-500 trees`

**Validation**:
- Is this number publicly listed already?
- Is this a personal or organizational number?
- Does the context indicate this is actually a phone number?

---

### Physical Addresses

**Pattern (Street Address)**:
```regex
(street|str\.|straße|strasse|rua|avenida|avenue|ave\.|road|rd\.)\s+.+,\s*\d{4,5}
```

**Pattern (Full Address with Postal Code)**:
```regex
\d{1,5}\s+[A-Za-z\s]+,\s+[A-Za-z\s]+,\s+\d{4,5}
```

**Pattern (European Postal Codes)**:
```regex
\b\d{4,5}\s+[A-Z][a-z]+\b
```

**Usage**:
```bash
grep -E '(street|str\.|straße|rua|avenida)\s+.+,\s*\d{4,5}' *.md
```

**Context to Check**:
- ✅ **PUBLIC**: City/region level only: `Berlin, Germany`, `Lisbon, Portugal`, `Bavaria Region`
- ❌ **PRIVATE**: Full street address with house number
- ❌ **CONFIDENTIAL**: Personal home addresses

**Granularity Guidelines**:
- **PUBLIC**: Country, state/region, city
- **INTERNAL**: City district, neighborhood (if necessary)
- **CONFIDENTIAL**: Street, house number, apartment number

**Validation**:
- What level of location detail is necessary?
- Is this a business address or personal residence?
- Is the full address publicly available already?

---

## Financial Information Patterns

### IBAN (International Bank Account Number)

**Pattern (EU IBAN)**:
```regex
[A-Z]{2}\d{2}[A-Z0-9]{1,30}
```

**Pattern (IBAN with spaces)**:
```regex
[A-Z]{2}\d{2}[\s]?([A-Z0-9]{4}[\s]?){2,7}[A-Z0-9]{0,4}
```

**Pattern (German IBAN)**:
```regex
DE\d{2}[\s]?([A-Z0-9]{4}[\s]?){4}[A-Z0-9]{2}
```

**Pattern (Portuguese IBAN)**:
```regex
PT\d{2}[\s]?([A-Z0-9]{4}[\s]?){5}[A-Z0-9]{1}
```

**Usage**:
```bash
grep -E '[A-Z]{2}\d{2}[A-Z0-9]{1,30}' *.md
```

**Context to Check**:
- ❌ **ALWAYS CONFIDENTIAL**: Real IBAN should NEVER be in documentation
- ⚠️ **Exception**: Example/placeholder IBANs in templates

**False Positives**:
- Random alphanumeric codes starting with 2 letters + 2 digits
- Product codes, reference numbers

**Validation**:
- Is this a real IBAN or an example?
- If real: **CRITICAL** - must be removed immediately
- Use IBAN checksum validation if uncertain

---

### Credit Card Numbers

**Pattern (Standard)**:
```regex
\b\d{4}[-\s]?\d{4}[-\s]?\d{4}[-\s]?\d{4}\b
```

**Pattern (Specific Formats)**:
```regex
# Visa: starts with 4
\b4\d{3}[-\s]?\d{4}[-\s]?\d{4}[-\s]?\d{4}\b

# Mastercard: starts with 5
\b5\d{3}[-\s]?\d{4}[-\s]?\d{4}[-\s]?\d{4}\b

# American Express: starts with 3, 15 digits
\b3[47]\d{2}[-\s]?\d{6}[-\s]?\d{5}\b
```

**Usage**:
```bash
grep -E '\b\d{4}[-\s]?\d{4}[-\s]?\d{4}[-\s]?\d{4}\b' *.md
```

**Context to Check**:
- ❌ **ALWAYS CONFIDENTIAL**: Real credit card numbers should NEVER appear
- ⚠️ **Exception**: Test/example numbers (e.g., `4111 1111 1111 1111`)

**False Positives**:
- Other 16-digit sequences (IDs, codes)
- Dates in numerical format

**Validation**:
- Use Luhn algorithm to verify if it could be a real card number
- If real: **CRITICAL** - must be removed immediately

---

### Euro Amounts (Specific vs Range)

**Pattern (Specific Euro Amounts)**:
```regex
€\s?\d{1,3}(,\d{3})*(\.\d{2})?
```

**Pattern (Euro with Currency Code)**:
```regex
EUR\s?\d{1,3}(,\d{3})*(\.\d{2})?
```

**Usage**:
```bash
grep -E '€\s?\d{1,3}(,\d{3})*(\.\d{2})?' *.md
```

**Context to Check**:
- ✅ **PUBLIC**: Ranges and approximations: `€20-30k`, `€100,000-150,000`, `~€50k`
- ⚠️ **INTERNAL**: Specific amounts: `€47,532.18`, `€123,456.78`
- ❌ **CONFIDENTIAL**: Bank balances, exact account amounts, salary specifics

**Redaction Strategy**:
- **Specific → Range**: `€47,532.18` → `€45-50k` or `~€50k`
- **Exact → Approximate**: `€123,456.78` → `€120-125k` or `~€125k`

**Validation**:
- Is this a projection/estimate (PUBLIC) or actual transaction (INTERNAL)?
- What level of precision is necessary to communicate the point?
- Does revealing the exact amount create any risk?

---

### Bank Account References

**Pattern (Account Number)**:
```regex
(account|acct|a/c|konto)[\s#:]+\d{6,}
```

**Pattern (Sort Codes / Routing Numbers)**:
```regex
\b\d{2}-\d{2}-\d{2}\b
```

**Usage**:
```bash
grep -Ei '(account|acct|konto)[\s#:]+\d{6,}' *.md
```

**Context to Check**:
- ❌ **ALWAYS CONFIDENTIAL**: Real account numbers should never appear

---

## Personal Identification Patterns

### Names in Context

**Contextual Patterns**:
```regex
(founder|co-founder|ceo|director|owner|manager|contact):\s*[A-Z][a-z]+\s+[A-Z][a-z]+
```

**Pattern (Full Names)**:
```regex
\b[A-Z][a-z]+\s+[A-Z][a-z]+\s+[A-Z][a-z]+\b
```

**Usage**:
```bash
grep -E '(founder|contact|owner):\s*[A-Z][a-z]+\s+[A-Z][a-z]+' *.md
```

**Context to Check**:
- ✅ **PUBLIC**: Public figures, founders in marketing materials
- ⚠️ **INTERNAL**: Team members, advisors
- ❌ **CONFIDENTIAL**: Personal names in sensitive contexts (contracts, salaries, etc.)

**Validation**:
- Is this person a public figure for the organization?
- Is the context appropriate for naming them?
- Do we have permission to use their name publicly?

---

### Social Security / Tax ID Numbers

**Pattern (German Steuer-ID)**:
```regex
\b\d{11}\b
```

**Pattern (Portuguese NIF)**:
```regex
\b[1-9]\d{8}\b
```

**Pattern (Generic Tax ID)**:
```regex
(tax\s*id|steuer|nif|ssn|social\s*security)[\s#:]+[\d-]+
```

**Usage**:
```bash
grep -Ei '(tax\s*id|steuer|nif)[\s#:]+[\d-]+' *.md
```

**Context to Check**:
- ❌ **ALWAYS CONFIDENTIAL**: Real tax IDs, SSNs should NEVER appear
- ⚠️ **Exception**: Redacted/partial numbers in legal templates: `NIF: XXX-XXX-123`

---

## Credentials & Security Patterns

### API Keys and Tokens

**Pattern (API Keys)**:
```regex
(api[_-]?key|apikey|api[_-]?token)[\s=:]+['"][a-zA-Z0-9_-]{20,}['"]
```

**Pattern (Bearer Tokens)**:
```regex
(bearer|token|auth)[\s=:]+['"][a-zA-Z0-9_-]{20,}['"]
```

**Pattern (Generic Secrets)**:
```regex
(secret|password|passwd|pwd)[\s=:]+['"][^'"]+['"]
```

**Usage**:
```bash
grep -Ei '(api[_-]?key|token|secret)[\s=:]+['\''"][a-zA-Z0-9_-]{20,}['\''"]' *.md
```

**Context to Check**:
- ❌ **CRITICAL**: Real credentials should NEVER be in documentation
- ⚠️ **Exception**: Example/placeholder credentials: `api_key: YOUR_API_KEY_HERE`

**Immediate Action Required**:
- If real credentials found: **Rotate immediately** (old key is compromised)
- Remove from all files, commits, and history
- Notify security team

---

### Passwords

**Pattern (Password Assignments)**:
```regex
(password|passwd|pwd|pass)[\s=:]+['"][^'"]+['"]
```

**Pattern (Password in Config)**:
```regex
(password|passwd)[\s]*=[\s]*[a-zA-Z0-9!@#$%^&*]+
```

**Usage**:
```bash
grep -Ei '(password|passwd|pwd)[\s=:]+' *.md
```

**Context to Check**:
- ❌ **CRITICAL**: Real passwords should NEVER appear
- ⚠️ **Exception**: Placeholders: `password: ********` or `password: YOUR_PASSWORD_HERE`

---

### SSH Keys / Private Keys

**Pattern (Private Key Headers)**:
```regex
-----BEGIN (RSA|DSA|EC|OPENSSH) PRIVATE KEY-----
```

**Pattern (SSH Key Pattern)**:
```regex
(ssh-rsa|ssh-dss|ecdsa-sha2|ssh-ed25519)\s+[A-Za-z0-9+/=]+
```

**Usage**:
```bash
grep -E '-----BEGIN.*PRIVATE KEY-----' *.md
```

**Context to Check**:
- ❌ **CRITICAL**: Private keys should NEVER be in documentation
- ✅ **OK**: Public keys (in appropriate context)

---

## Network & System Patterns

### IP Addresses

**Pattern (IPv4)**:
```regex
\b\d{1,3}\.\d{1,3}\.\d{1,3}\.\d{1,3}\b
```

**Pattern (IPv6)**:
```regex
\b([0-9a-fA-F]{1,4}:){7}[0-9a-fA-F]{1,4}\b
```

**Usage**:
```bash
grep -E '\b\d{1,3}\.\d{1,3}\.\d{1,3}\.\d{1,3}\b' *.md
```

**Context to Check**:
- ✅ **PUBLIC**: Example IPs: `192.168.1.1`, `10.0.0.1`, `127.0.0.1`
- ⚠️ **INTERNAL**: Internal network IPs
- ❌ **CONFIDENTIAL**: Production server IPs, public-facing service IPs

**False Positives**:
- Version numbers: `1.2.3.4`
- Dates: `2025.11.09`

**Validation**:
- Is this a real IP or example/placeholder?
- Is this an internal or external IP?
- Does revealing this IP create a security risk?

---

### Server Names / Hostnames

**Pattern (Server References)**:
```regex
(server|host|hostname|db)[\s=:]+[a-z0-9.-]+
```

**Pattern (Database Connection Strings)**:
```regex
(postgres|mysql|mongodb)://[^@]+@[a-z0-9.-]+(:\d+)?
```

**Usage**:
```bash
grep -Ei '(server|host|db)[\s=:]+[a-z0-9.-]+' *.md
```

**Context to Check**:
- ⚠️ **INTERNAL**: Real server names/hostnames
- ✅ **PUBLIC**: Example hostnames: `example.com`, `localhost`, `db.example.com`

---

## Contextual Indicators

These are not regex patterns but contextual clues that content may be sensitive:

### Section Headers to Flag

- "Confidential"
- "Internal Only"
- "Not for Distribution"
- "Draft - Do Not Share"
- "Proprietary"
- "NDA Required"
- "Restricted"

### Document Types to Review Carefully

- Contracts and agreements
- Financial statements
- Legal opinions
- Personnel records
- Meeting minutes (may contain sensitive discussions)
- Email threads (may contain private correspondence)
- Grant applications (may contain bank details)

### Content Types Often Containing Sensitive Data

- Signature blocks in scanned documents
- Email footers with personal contact info
- Budget spreadsheets with account numbers
- Partner communications with confidential terms
- Legal documents with sensitive clauses
- Internal memos with personnel information

---

## Usage Guidelines

### 1. Automated Scanning

Use these patterns for initial automated scans:

```bash
# Comprehensive scan
for pattern in email phone iban address; do
  echo "Scanning for $pattern..."
  # Use appropriate grep command with pattern
done
```

### 2. Manual Review Required

**Always review matches in context**:
- Not all matches are sensitive (false positives)
- Some sensitive data won't match patterns (false negatives)
- Context determines sensitivity

### 3. Prioritize by Risk

**CRITICAL** (Scan first):
- Credentials (API keys, passwords)
- Financial details (IBANs, account numbers)
- Personal identification (tax IDs, SSNs)

**HIGH** (Scan second):
- Personal contact info (emails, phones, addresses)
- Internal financial specifics
- Unpublished partnership details

**MEDIUM** (Scan third):
- Internal process details
- Organizational structure specifics

### 4. Document Decisions

For each finding, document:
- Match location (file:line)
- Pattern matched
- Context review result
- Classification decision (PUBLIC/INTERNAL/CONFIDENTIAL)
- Redaction recommendation (if needed)

---

## Pattern Testing

Before using patterns in production audits, test for:

### False Positives
- Run against known-safe documents
- Check if pattern over-triggers on non-sensitive content

### False Negatives
- Run against documents with known sensitive data
- Check if pattern misses any sensitive content

### Performance
- Test on large document sets
- Optimize patterns if scan takes too long

---

## Pattern Maintenance

### Regular Updates Needed

- **When**: New sensitive data types identified
- **When**: False positive rate too high (pattern too broad)
- **When**: False negative rate too high (pattern too narrow)
- **When**: New regulations require scanning for additional data types

### Version History

| Version | Date | Changes |
|---------|------|---------|
| 1.0 | 2025-11-09 | Initial pattern library created |

---

## External Tools

### Recommended Scanning Tools

- **`grep`**: Basic pattern matching
- **`ripgrep` (rg)**: Fast, modern grep alternative
- **`git-secrets`**: Prevent committing secrets to git
- **`truffleHog`**: Find secrets in git history
- **`detect-secrets`**: Enterprise secrets detection

### Online Pattern Testers

- **Regex101**: https://regex101.com/ (test patterns before using)
- **RegExr**: https://regexr.com/ (interactive regex tester)

---

## Security Notice

⚠️ **Important**: These patterns are detection aids, not security guarantees.

- **Human review is mandatory** for all findings
- **Context always matters** in sensitivity assessment
- **Err on the side of caution** when uncertain
- **Document all decisions** for audit trail
- **Update patterns regularly** as new risks emerge

---

*"Automation finds candidates; human judgment determines sensitivity."*
— Security Auditor Persona
