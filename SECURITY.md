# Security Policy

## Supported Versions

We actively maintain and provide security updates for the following versions:

| Version | Supported          |
| ------- | ------------------ |
| 19.x    | :white_check_mark: |
| < 19.0  | :x:                |

## Reporting a Vulnerability

We take the security of our project seriously. If you discover a security vulnerability, please follow these steps to report it responsibly:

### How to Report

**DO NOT** create a public GitHub issue for security vulnerabilities.

Instead, please report security vulnerabilities privately by contacting:

- **Email**: [INSERT SECURITY EMAIL]
- **Subject Line**: `[SECURITY] Brief description of vulnerability`

### What to Include

When reporting a vulnerability, please include as much of the following information as possible:

1. **Description**: A clear description of the vulnerability
2. **Steps to Reproduce**: Detailed steps to reproduce the issue
3. **Impact**: What an attacker could achieve by exploiting this vulnerability
4. **Affected Versions**: Which versions of the project are affected
5. **Proof of Concept**: Code, screenshots, or other evidence (if available)
6. **Suggested Fix**: If you have ideas on how to fix the issue

### Response Timeline

After submitting a security vulnerability report, you can expect:

- **Acknowledgment**: Within 48 hours of your report
- **Initial Assessment**: Within 5 business days
- **Status Updates**: Every 7 days until resolution (if the investigation takes longer)
- **Resolution**: Will vary based on severity (see severity levels below)

### Severity Levels

We classify security vulnerabilities using the following severity levels:

#### Critical
- **Impact**: Immediate exploitation possible, severe impact on confidentiality, integrity, or availability
- **Examples**: Remote code execution, privilege escalation, complete system compromise
- **Response Time**: 24-48 hours for initial mitigation

#### High
- **Impact**: Significant impact but may require some conditions or user interaction
- **Examples**: SQL injection, cross-site scripting (XSS), authentication bypass
- **Response Time**: 3-7 days for initial mitigation

#### Medium
- **Impact**: Moderate impact, may require specific conditions or local access
- **Examples**: Information disclosure, CSRF vulnerabilities, insecure configurations
- **Response Time**: 14-30 days for resolution

#### Low
- **Impact**: Minimal impact, difficult to exploit or limited scope
- **Examples**: Minor information leaks, best practice violations
- **Response Time**: Next scheduled maintenance window

### Disclosure Policy

We follow a **coordinated disclosure** process:

1. **Report Received**: You submit the vulnerability report privately
2. **Acknowledgment**: We confirm receipt within 48 hours
3. **Investigation**: We investigate and validate the vulnerability
4. **Fix Development**: We develop and test a fix
5. **Release**: We release a patched version
6. **Disclosure**: We publicly disclose the vulnerability after the fix is available
   - You may be credited in the security advisory (unless you prefer to remain anonymous)
   - We will coordinate with you on the timing of public disclosure

### Bug Bounty

Currently, we do not offer a paid bug bounty program. However, we deeply appreciate security researchers who help improve our project's security and will acknowledge your contributions in our release notes and security advisories.

### Scope

This security policy applies to:
- The main source code repository
- Released versions of the software
- Official documentation

This policy does NOT apply to:
- Third-party dependencies (please report to their respective maintainers)
- Infrastructure hosting (if applicable, contact the hosting provider)
- Social engineering attacks against our team members

### Questions?

If you have questions about this security policy, please contact us at [INSERT CONTACT EMAIL].

---

Thank you for helping keep our project and its users safe!
