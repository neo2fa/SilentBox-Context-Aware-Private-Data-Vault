// SilentBox Frontend Logic
import React, { useState } from 'react";
import { connect, WalletConnection } from 'near-api-js';

const SilentBoxApp = () => {
    const [fileId, setFileId] = useState("");
    const [purpose, setPurpose] = useState("");
    const [duration, setDuration] = useState(3600); // Default 1 hour

    const handleUpload = async () => {
        // Logic to interact with our Rust Smart Contract
        console.log(`Uploading ${fileId} for purpose: ${purpose}`);
        // contract.upload_data({ id: fileId, cid: "ipfs_hash", purpose, duration_sec: duration, recipient: "target.near" })
    };

    return (
        <div className="container">
            <h1>🛡️ SilentBox v2</h1>
            <p>Context-Aware Private Data Sharing</p>
            
            <input placeholder="File ID" onChange={(e) => setFileId(e.target.value)} />
            <input placeholder="Purpose (e.g. KYC)" onChange={(e) => setPurpose(e.target.value)} />
            <select onChange={(e) => setDuration(e.target.value)}>
                <option value="600">10 Minutes</option>
                <option value="3600">1 Hour</option>
                <option value="86400">24 Hours</option>
            </select>

            <button onClick={handleUpload}>Securely Share</button>
        </div>
    );
};
