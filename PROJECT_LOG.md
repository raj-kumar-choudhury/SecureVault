# SecureVault - Project Log

## Project

**Project Name:** SecureVault

**Repository:** raj-kumar-choudhury/SecureVault

**Repository Visibility:** Public

**Default Branch:** master

---

## 1. Project Purpose

SecureVault is a secure, multi-user, multi-device personal data vault.

The application is intended to securely store:

- Passwords
- Personal information
- Bank information
- Insurance information
- Software licenses
- API keys
- Secure notes
- Other confidential personal data

Users should also be able to create their own schemas and custom fields.

---

## 2. Core Requirements

### 2.1 Multi-User

SecureVault will support multiple users.

Each user must have completely isolated data.

User A must never be able to access User B's vault or records.

Supabase Authentication and Row Level Security (RLS) will provide database-level user isolation.

---

### 2.2 Multi-Device

SecureVault will support access from multiple devices.

Example:

- Desktop/PC
- Laptop
- Other supported devices

Data created or modified on one device should be available on the user's other devices through cloud synchronization.

The design must therefore support secure vault access from a new device.

---

### 2.3 Client-Side Encryption

Confidential data must be encrypted before being stored in Supabase.

Supabase should not contain plaintext confidential record data.

Encryption and decryption should happen on the client.

---

## 3. Authentication

Supabase Auth will be used for user authentication.

Authentication and encryption are separate concerns.

Supabase authentication identifies the user.

The user's encryption keys protect the user's confidential data.

---

## 4. Master Password

The Master Password is the primary mechanism for unlocking the user's vault.

The Master Password:

- Must not be stored in Supabase.
- Must not be stored as plaintext.
- Will be used with a strong key derivation mechanism.
- Must work across multiple devices.

The Master Password should allow a user to unlock their existing vault from a new device.

---

## 5. PIN

SecureVault will support a PIN for quick unlocking.

Important:

The PIN must not be used directly as the vault encryption key.

The PIN is intended as a convenient local/device-level unlock mechanism.

The Master Password remains the primary vault recovery/unlock mechanism.

PIN handling must be designed carefully so that compromising a device PIN does not expose the user's cloud vault cryptographic key.

---

## 6. Vault Encryption Key

Each user will have a dedicated vault encryption key.

Conceptually:

    Master Password
           |
           v
      Strong KDF
           |
           v
    Key Encryption Key
           |
           v
    Wrapped Vault Key
           |
           v
      Secure Storage

The vault key will be used to encrypt/decrypt the user's confidential data.

This approach is intended to support:

- Multi-device access
- Master Password changes
- Secure key management
- Efficient encryption/decryption of records

The exact cryptographic implementation will be finalized before implementation.

---

## 7. Database

Supabase PostgreSQL will be used as the cloud database.

Conceptual entities include:

- Users / Profiles
- Vaults
- Schemas
- Fields
- Records

Confidential record content will be stored in encrypted form.

---

## 8. Row Level Security

Supabase RLS will be mandatory.

Database policies must ensure that a user can only access their own:

- Vault
- Schemas
- Fields
- Records

Application-level checks alone must not be relied upon for user isolation.

---

## 9. Custom Data Model

SecureVault should not be limited to a predefined password table.

Users should be able to create custom schemas.

Example:

    Schema: Bank Account

    Fields:
    - Bank Name
    - Account Number
    - IFSC
    - Account Type
    - Username
    - Password
    - Notes

Another example:

    Schema: Software License

    Fields:
    - Product
    - License Key
    - Purchase Date
    - Expiry Date
    - Notes

The application should support dynamic fields and records.

---

## 10. Application Login Automation

SecureVault may provide application login automation using Playwright.

A stored application credential can contain:

- Application name
- URL
- Username
- Password

The intended flow is:

    SecureVault
         |
         v
    Select credential
         |
         v
    Decrypt locally
         |
         v
    Credential available temporarily in memory
         |
         v
      Playwright
         |
         +--> Fill username
         |
         +--> Fill password
         |
         v
       Login

Credentials must not be hard-coded into Playwright scripts or committed to the repository.

Playwright is the automation mechanism; SecureVault remains the credential authority.

---

## 11. Existing DataManager

The existing DataManager application will be used only as a **functional reference**.

Its architecture will NOT be carried forward.

SecureVault will be designed independently using the new architecture.

Existing functionality may be reviewed to identify useful features that should be reproduced or improved.

---

## 12. Proposed Technology Direction

### Frontend

- React
- TypeScript

### Authentication

- Supabase Auth

### Database

- Supabase PostgreSQL

### Security

- Client-side encryption
- Strong password-based key derivation
- Supabase Row Level Security

### Cloud Synchronization

- Supabase

The final technology choices will be confirmed before implementation.

---

## 13. Development Approach

Development will proceed incrementally.

### Phase 1 - Planning

- Establish requirements
- Define security model
- Define data model
- Define encryption/key-management model
- Define multi-device behavior

### Phase 2 - Foundation

- React application
- Supabase integration
- Authentication
- Database schema
- RLS

### Phase 3 - Security

- Key derivation
- Vault key
- Encryption/decryption
- Master Password
- Device PIN

### Phase 4 - Vault Functionality

- Schemas
- Custom fields
- Records
- Search/filter
- CRUD operations

### Phase 5 - Multi-Device

- Vault synchronization
- New-device unlock
- Device registration/unlock
- Conflict handling

### Phase 6 - Testing & Hardening

- Security testing
- RLS testing
- Authentication testing
- Encryption testing
- Multi-device testing
- Recovery testing

---

## 14. Current Status

**Step 1 - Project Log:** Completed

**Repository Push:** Completed

**Implementation:** Authentication foundation implemented

**Architecture:** Foundation established; security architecture remains to be finalized

**Next Action:** Configure Supabase Auth and test sign-up, sign-in, and password reset before implementing vault security/key management.
