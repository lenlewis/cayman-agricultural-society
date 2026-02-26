'use client';

import { useState } from 'react';

interface AdminLoginProps {
  onLogin: (success: boolean) => void;
}

export default function AdminLogin({ onLogin }: AdminLoginProps) {
  const [open, setOpen] = useState(false);
  const [user, setUser] = useState('');
  const [pass, setPass] = useState('');
  const [error, setError] = useState(false);

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (user === 'admin' && pass === 'cias2026') {
      setOpen(false);
      setError(false);
      setUser('');
      setPass('');
      onLogin(true);
    } else {
      setError(true);
    }
  }

  return (
    <>
      <button
        onClick={() => { setOpen(true); setError(false); }}
        className="bg-[#7EA629] hover:bg-[#6b8f22] text-white px-5 py-1.5 rounded-full text-sm font-semibold transition-colors duration-200"
      >
        Admin Login
      </button>

      {open && (
        <div
          onClick={() => setOpen(false)}
          style={{
            position: 'fixed', inset: 0, zIndex: 2000,
            background: 'rgba(0,0,0,0.5)', backdropFilter: 'blur(4px)',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            padding: '1rem',
          }}
        >
          <div
            onClick={e => e.stopPropagation()}
            style={{
              background: '#fff', borderRadius: 20, width: '100%', maxWidth: 420,
              boxShadow: '0 20px 60px rgba(0,0,0,0.15)',
              animation: 'modalIn 0.3s ease-out', overflow: 'hidden', position: 'relative',
            }}
          >
            <button
              onClick={() => setOpen(false)}
              style={{
                position: 'absolute', top: 12, right: 16, background: 'none',
                border: 'none', fontSize: '1.5rem', cursor: 'pointer', color: '#999', zIndex: 5,
              }}
            >×</button>

            <div style={{ padding: '2rem 2rem 0', textAlign: 'center' }}>
              <div style={{
                width: 64, height: 64, borderRadius: '50%',
                background: 'linear-gradient(135deg, #027373, #04BFBF)',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                margin: '0 auto 1rem', color: '#fff',
              }}>
                <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
                  <rect x="3" y="11" width="18" height="11" rx="2" />
                  <path d="M7 11V7a5 5 0 0 1 10 0v4" />
                </svg>
              </div>
              <h2 style={{ fontSize: '1.5rem', color: '#1a1a2e', marginBottom: 4, fontWeight: 600 }}>Admin Login</h2>
              <p style={{ fontSize: '0.88rem', color: '#888' }}>Access the event management dashboard</p>
            </div>

            <div style={{ padding: '1.5rem 2rem 2rem' }}>
              {error && (
                <div style={{
                  background: '#fde8e8', color: '#c62828', padding: '8px 14px',
                  borderRadius: 8, fontSize: '0.85rem', marginBottom: 12,
                }}>
                  Invalid username or password
                </div>
              )}
              <form onSubmit={handleSubmit}>
                <div style={{ marginBottom: 12 }}>
                  <label style={{ display: 'block', fontSize: '0.82rem', fontWeight: 600, color: '#333', marginBottom: 4 }}>Username</label>
                  <input
                    type="text" value={user} onChange={e => setUser(e.target.value)}
                    placeholder="admin" required
                    style={{
                      width: '100%', padding: '10px 14px', border: '1.5px solid #e0e0e0',
                      borderRadius: 10, fontSize: '0.92rem', outline: 'none',
                      background: '#f8faf8',
                    }}
                  />
                </div>
                <div style={{ marginBottom: 16 }}>
                  <label style={{ display: 'block', fontSize: '0.82rem', fontWeight: 600, color: '#333', marginBottom: 4 }}>Password</label>
                  <input
                    type="password" value={pass} onChange={e => setPass(e.target.value)}
                    placeholder="Password" required
                    style={{
                      width: '100%', padding: '10px 14px', border: '1.5px solid #e0e0e0',
                      borderRadius: 10, fontSize: '0.92rem', outline: 'none',
                      background: '#f8faf8',
                    }}
                  />
                </div>
                <button
                  type="submit"
                  style={{
                    width: '100%', padding: '12px', background: '#027373', color: '#fff',
                    border: 'none', borderRadius: 50, fontSize: '1rem', fontWeight: 600,
                    cursor: 'pointer',
                  }}
                >
                  Sign In
                </button>
              </form>
              <p style={{ textAlign: 'center', fontSize: '0.78rem', color: '#aaa', marginTop: 12 }}>
                Default: admin / cias2026
              </p>
            </div>
          </div>
        </div>
      )}

      <style jsx global>{`
        @keyframes modalIn {
          from { opacity: 0; transform: scale(0.95) translateY(10px); }
          to { opacity: 1; transform: scale(1) translateY(0); }
        }
      `}</style>
    </>
  );
}
