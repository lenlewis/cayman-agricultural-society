'use client';

import { useState, useEffect } from 'react';
import { getStoredEvents, saveEvents, CAT_STYLES, MONTHS } from './Calendar';

export default function AdminDashboard({ onClose, onLogout }) {
  const [events, setEvents] = useState([]);
  const [editId, setEditId] = useState('');
  const [form, setForm] = useState({ title:'', cat:'show', start:'', end:'', time:'', loc:'', desc:'' });
  const [toast, setToast] = useState('');

  useEffect(() => { setEvents(getStoredEvents()); }, []);

  function showToast(msg) {
    setToast(msg);
    setTimeout(() => setToast(''), 3000);
  }

  function handleSubmit(e) {
    e.preventDefault();
    let updated;
    if (editId) {
      updated = events.map(ev => ev.id === editId ? { ...form, id: editId } : ev);
      showToast('Event updated!');
    } else {
      const newEv = { ...form, id: 'ev' + Date.now() };
      updated = [...events, newEv];
      showToast('Event added!');
    }
    setEvents(updated);
    saveEvents(updated);
    resetForm();
  }

  function editEvent(ev) {
    setEditId(ev.id);
    setForm({ title:ev.title, cat:ev.cat, start:ev.start, end:ev.end||'', time:ev.time||'', loc:ev.loc||'', desc:ev.desc||'' });
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  function deleteEvent(id) {
    if (!confirm('Delete this event?')) return;
    const updated = events.filter(x => x.id !== id);
    setEvents(updated);
    saveEvents(updated);
    showToast('Event deleted');
  }

  function resetForm() {
    setEditId('');
    setForm({ title:'', cat:'show', start:'', end:'', time:'', loc:'', desc:'' });
  }

  const sorted = [...events].sort((a, b) => a.start.localeCompare(b.start));

  const inputStyle = {
    width:'100%', padding:'10px 14px', border:'1.5px solid #e0e0e0',
    borderRadius:10, fontSize:'0.92rem', outline:'none', background:'#f8faf5',
    fontFamily:'inherit', transition:'border-color 0.3s',
  };
  const labelStyle = { display:'block', fontSize:'0.82rem', fontWeight:600, color:'#333', marginBottom:4 };

  return (
    <div style={{position:'fixed',inset:0,zIndex:1500,background:'#f8faf5',overflowY:'auto'}}>
      {/* Top bar */}
      <div style={{background:'#1a1a2e',color:'#fff',padding:'12px 24px',display:'flex',justifyContent:'space-between',alignItems:'center',position:'sticky',top:0,zIndex:10}}>
        <h3 style={{fontSize:'1.1rem',fontWeight:600}}>📋 CIAS Admin Dashboard</h3>
        <div style={{display:'flex',gap:8}}>
          <button onClick={onClose} style={{background:'rgba(255,255,255,0.15)',border:'none',color:'#fff',padding:'8px 18px',borderRadius:50,fontSize:'0.85rem',cursor:'pointer',fontFamily:'inherit'}}>← Back to Site</button>
          <button onClick={onLogout} style={{background:'#c0392b',border:'none',color:'#fff',padding:'8px 18px',borderRadius:50,fontSize:'0.85rem',cursor:'pointer',fontFamily:'inherit'}}>Logout</button>
        </div>
      </div>

      <div style={{maxWidth:1000,margin:'24px auto',padding:'0 20px'}}>
        {/* Event Form */}
        <div style={{background:'#fff',padding:'2rem',borderRadius:16,boxShadow:'0 4px 24px rgba(0,0,0,0.08)',marginBottom:24}}>
          <h3 style={{fontSize:'1.3rem',color:'#1a1a2e',marginBottom:20,fontWeight:600}}>
            {editId ? '✏️ Edit Event' : '➕ Add New Event'}
          </h3>
          <form onSubmit={handleSubmit}>
            <div style={{display:'grid',gridTemplateColumns:'1fr 1fr',gap:12}}>
              <div>
                <label style={labelStyle}>Event Title *</label>
                <input style={inputStyle} type="text" value={form.title} onChange={e=>setForm({...form,title:e.target.value})} required placeholder="e.g. Annual Agriculture Show" />
              </div>
              <div>
                <label style={labelStyle}>Category *</label>
                <select style={inputStyle} value={form.cat} onChange={e=>setForm({...form,cat:e.target.value})}>
                  <option value="show">Show</option>
                  <option value="meeting">Meeting</option>
                  <option value="workshop">Workshop</option>
                  <option value="market">Market</option>
                  <option value="other">Other</option>
                </select>
              </div>
              <div>
                <label style={labelStyle}>Start Date *</label>
                <input style={inputStyle} type="date" value={form.start} onChange={e=>setForm({...form,start:e.target.value})} required />
              </div>
              <div>
                <label style={labelStyle}>End Date</label>
                <input style={inputStyle} type="date" value={form.end} onChange={e=>setForm({...form,end:e.target.value})} />
              </div>
              <div>
                <label style={labelStyle}>Time</label>
                <input style={inputStyle} type="text" value={form.time} onChange={e=>setForm({...form,time:e.target.value})} placeholder="e.g. 7:00 AM - 6:00 PM" />
              </div>
              <div>
                <label style={labelStyle}>Location</label>
                <input style={inputStyle} type="text" value={form.loc} onChange={e=>setForm({...form,loc:e.target.value})} placeholder="e.g. Stacy Watler Pavilion" />
              </div>
            </div>
            <div style={{marginTop:12}}>
              <label style={labelStyle}>Description</label>
              <textarea style={{...inputStyle,minHeight:100,resize:'vertical'}} value={form.desc} onChange={e=>setForm({...form,desc:e.target.value})} placeholder="Brief description..." />
            </div>
            <div style={{display:'flex',gap:8,marginTop:16}}>
              <button type="submit" style={{background:'#2d6a4f',color:'#fff',border:'none',padding:'10px 28px',borderRadius:50,fontSize:'0.95rem',fontWeight:600,cursor:'pointer',fontFamily:'inherit'}}>
                {editId ? 'Update Event' : 'Add Event'}
              </button>
              <button type="button" onClick={resetForm} style={{background:'transparent',color:'#666',border:'1.5px solid #ddd',padding:'10px 28px',borderRadius:50,fontSize:'0.95rem',cursor:'pointer',fontFamily:'inherit'}}>
                Clear
              </button>
            </div>
          </form>
        </div>

        {/* Events Table */}
        <div style={{background:'#fff',borderRadius:16,boxShadow:'0 4px 24px rgba(0,0,0,0.08)',overflow:'hidden'}}>
          <h3 style={{padding:'20px 24px 0',fontSize:'1.3rem',color:'#1a1a2e',fontWeight:600}}>All Events ({events.length})</h3>
          {sorted.length === 0 ? (
            <div style={{padding:48,textAlign:'center',color:'#999'}}>No events yet. Add your first event above!</div>
          ) : (
            <div style={{overflowX:'auto'}}>
              <table style={{width:'100%',borderCollapse:'collapse',marginTop:12}}>
                <thead>
                  <tr>
                    {['Date','Title','Category','Time','Location','Actions'].map(h => (
                      <th key={h} style={{padding:'10px 16px',textAlign:'left',fontSize:'0.78rem',textTransform:'uppercase',letterSpacing:'0.08em',color:'#999',background:'#fafafa',borderBottom:'2px solid #eee'}}>{h}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {sorted.map(ev => {
                    const d = new Date(ev.start + 'T00:00:00');
                    const cat = CAT_STYLES[ev.cat] || CAT_STYLES.other;
                    return (
                      <tr key={ev.id} style={{transition:'background 0.2s'}}>
                        <td style={{padding:'10px 16px',borderBottom:'1px solid #f0f0f0',fontSize:'0.9rem'}}>{d.getDate()} {MONTHS[d.getMonth()].slice(0,3)} {d.getFullYear()}</td>
                        <td style={{padding:'10px 16px',borderBottom:'1px solid #f0f0f0',fontSize:'0.9rem',fontWeight:600}}>{ev.title}</td>
                        <td style={{padding:'10px 16px',borderBottom:'1px solid #f0f0f0'}}>
                          <span style={{display:'inline-block',padding:'2px 10px',borderRadius:50,fontSize:'0.75rem',fontWeight:600,background:cat.bg,color:cat.color}}>{ev.cat}</span>
                        </td>
                        <td style={{padding:'10px 16px',borderBottom:'1px solid #f0f0f0',fontSize:'0.9rem',color:'#666'}}>{ev.time || '—'}</td>
                        <td style={{padding:'10px 16px',borderBottom:'1px solid #f0f0f0',fontSize:'0.9rem',color:'#666'}}>{ev.loc || '—'}</td>
                        <td style={{padding:'10px 16px',borderBottom:'1px solid #f0f0f0'}}>
                          <button onClick={()=>editEvent(ev)} style={{background:'none',border:'none',cursor:'pointer',color:'#2d6a4f',fontSize:'0.85rem',padding:'4px 8px',borderRadius:6,marginRight:4}}>Edit</button>
                          <button onClick={()=>deleteEvent(ev.id)} style={{background:'none',border:'none',cursor:'pointer',color:'#c62828',fontSize:'0.85rem',padding:'4px 8px',borderRadius:6}}>Delete</button>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>

      {/* Toast */}
      {toast && (
        <div style={{
          position:'fixed',bottom:24,right:24,background:'#1a1a2e',color:'#fff',
          padding:'12px 20px',borderRadius:12,fontSize:'0.9rem',
          boxShadow:'0 8px 32px rgba(0,0,0,0.15)',zIndex:3000,
          animation:'modalIn 0.3s ease-out',
        }}>
          {toast}
        </div>
      )}
    </div>
  );
}
