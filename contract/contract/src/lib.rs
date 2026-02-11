use near_sdk::borsh::{self, BorshDeserialize, BorshSerialize};
use near_sdk::collections::UnorderedMap;
use near_sdk::{env, near_bindgen, AccountId, PanicOnDefault};
use serde::{Deserialize, Serialize};

/// DataContext defines the unique "Context" for each shared piece of data.
/// It ensures the data is purpose-bound and time-limited.
#[derive(BorshDeserialize, BorshSerialize, Serialize, Deserialize)]
pub struct DataContext {
    pub cid: String,            // Encrypted data address on IPFS
    pub purpose: String,        // Explicit reason for access (e.g., "Medical Verification")
    pub expires_at: u64,        // Access expiration timestamp in nanoseconds
    pub allowed_recipient: AccountId, // Only this specific address can view the data
}

#[near_bindgen]
#[derive(BorshDeserialize, BorshSerialize, PanicOnDefault)]
pub struct SilentBox {
    // Mapping: A unique ID -> DataContext
    pub vaults: UnorderedMap<String, DataContext>,
}

#[near_bindgen]
impl SilentBox {
    #[init]
    pub fn new() -> Self {
        Self {
            vaults: UnorderedMap::new(b"v".to_vec()),
        }
    }

    /// Upload data with a specific context. 
    /// The owner defines WHO can see it, WHY, and for HOW LONG.
    pub fn upload_data(
        &mut self, 
        id: String, 
        cid: String, 
        purpose: String, 
        duration_sec: u64, 
        recipient: AccountId
    ) {
        let owner = env::predecessor_account_id();
        let expires_at = env::block_timestamp() + (duration_sec * 1_000_000_000); // Convert seconds to nanos
        
        let context = DataContext {
            cid,
            purpose,
            expires_at,
            allowed_recipient: recipient,
        };

        // Unique storage key based on owner and data ID
        let key = format!("{}:{}", owner, id);
        self.vaults.insert(&key, &context);
    }

    /// Get data only if the context is valid.
    /// This is the core "Context-Aware" logic.
    pub fn get_data_context(&self, owner: AccountId, id: String) -> Option<DataContext> {
        let key = format!("{}:{}", owner, id);
        let context = self.vaults.get(&key).expect("Error: Data record not found.");

        let caller = env::predecessor_account_id();

        // 1. Security Check: Is the caller the owner or the authorized recipient?
        assert!(
            caller == owner || caller == context.allowed_recipient,
            "Access Denied: You are not authorized to view this data."
        );

        // 2. Time Check: Has the context expired?
        assert!(
            env::block_timestamp() < context.expires_at,
            "Context Expired: This data is no longer available as per the owner's rules."
        );

        Some(context)
    }

    /// Manually revoke access to the data before the expiration time.
    pub fn revoke_access(&mut self, id: String) {
        let owner = env::predecessor_account_id();
        let key = format!("{}:{}", owner, id);
        self.vaults.remove(&key);
    }
}
