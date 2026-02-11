# 🛡️ SilentBox v2: Context-Aware Private Data Vault

> **"Privacy that only exists when it has a purpose."**

SilentBox is a privacy-first data vault built on **NEAR Protocol**. Unlike traditional vaults, it ensures that your sensitive data is only accessible within a specific **Context** (Time + Purpose + Recipient).

### 🚀 Key Features
- **Context-Locked Access:** Data is only revealed if predefined rules (time, purpose) are met.
- **Purpose-Bound Security:** Smart contract-level enforcement to prevent data misuse.
- **Self-Destructing Metadata:** Access keys "fade" away once the session ends.
- **Silent Identity:** No permanent profiles, no tracking, zero footprint.

### 🛠 Tech Stack
- **Blockchain:** NEAR Protocol
- **Smart Contracts:** Rust
- **Storage:** Encrypted IPFS
- **Auth:** NEAR Wallet (Chain Abstraction)

### 📂 How it works
1. **Upload:** Client-side encryption ensures data is private before reaching the cloud.
2. **Define Context:** Set "Who", "How long", and "For what purpose".
3. **Execute:** The recipient gains temporary access.
4. **Fade:** Access is automatically revoked. No traces left.
