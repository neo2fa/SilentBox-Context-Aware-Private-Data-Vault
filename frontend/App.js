import React, { useState } from 'react';

const SilentBoxApp = () => {
  const [view, setView] = useState('upload'); // upload, active, expired
  const [purpose, setPurpose] = useState('');

  const startDemo = () => {
    setView('active');
    // Simulate automatic access revocation after 7 seconds
    setTimeout(() => {
      setView('expired');
    }, 7000);
  };

  const containerStyle = {
    backgroundColor: '#0a0a0a',
    color: '#ffffff',
    minHeight: '100vh',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    fontFamily: 'Arial, sans-serif',
    padding: '20px'
  };

  const cardStyle = {
    border: '1px solid #333',
    padding: '30px',
    borderRadius: '15px',
    backgroundColor: '#111',
    maxWidth: '400px',
    textAlign: 'center'
  };

  return (
    <div style={containerStyle}>
      <h1 style={{color: '#00d1ff'}}>🛡️ SilentBox v2</h1>
      <p>Context-Aware Private Data Vault</p>

      {view === 'upload' && (
        <div style={cardStyle}>
          <h3>Create Secure Vault</h3>
          <input 
            type="text" 
            placeholder="Purpose (e.g. KYC Verification)" 
            style={{width: '100%', padding: '10px', marginBottom: '10px'}}
            onChange={(e) => setPurpose(e.target.value)}
          />
          <select style={{width: '100%', padding: '10px', marginBottom: '20px'}}>
            <option>Access Duration: 7 Seconds (Demo Mode)</option>
            <option>Access Duration: 1 Hour</option>
          </select>
          <button 
            onClick={startDemo}
            style={{backgroundColor: '#00d1ff', border: 'none', padding: '12px 25px', borderRadius: '5px', fontWeight: 'bold'}}
          >
            Encrypt & Share
          </button>
        </div>
      )}

      {view === 'active' && (
        <div style={cardStyle}>
          <h3 style={{color: '#00ff88'}}>🔓 Access Active</h3>
          <p>Purpose: <b>{purpose || 'General Access'}</b></p>
          <div style={{fontSize: '12px', color: '#888'}}>
            The recipient can now view the data. 
            The Smart Contract will revoke access automatically.
          </div>
          <div style={{marginTop: '20px', fontSize: '24px'}}>⏳</div>
        </div>
      )}

      {view === 'expired' && (
        <div style={cardStyle}>
          <h3 style={{color: '#ff4444'}}>🔒 Access Revoked</h3>
          <p>Status: <b>Faded Away</b></p>
          <p style={{fontSize: '14px'}}>
            The context has expired. The encryption keys have been destroyed by the contract.
          </p>
          <button onClick={() => setView('upload')} style={{color: '#00d1ff', background: 'none', border: '1px solid #00d1ff', padding: '5px 15px'}}>
            Reset Demo
          </button>
        </div>
      )}
    </div>
  );
};

export default SilentBoxApp;
