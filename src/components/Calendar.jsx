'use client';

import { useState, useEffect } from 'react';

const MONTHS = ['January','February','March','April','May','June','July','August','September','October','November','December'];
const DAYS = ['Sun','Mon','Tue','Wed','Thu','Fri','Sat'];
const CAT_STYLES = {
  show:      { bg: '#e8f5e9', color: '#2e7d32', border: '#2e7d32' },
  meeting:   { bg: '#e3f2fd', color: '#1565c0', border: '#1565c0' },
  workshop:  { bg: '#fff3e0', color: '#e65100', border: '#e65100' },
  market:    { bg: '#fce4ec', color: '#c62828', border: '#c62828' },
  other:     { bg: '#f3e5f5', color: '#6a1b9a', border: '#6a1b9a' },
};

const DEFAULT_EVENTS = [
  { id:'d1', title:'57th Annual Agriculture Show', cat:'show', start:'2026-03-04', end:'', time:'7:00 AM - 6:00 PM', loc:'Stacy Watler Agriculture Pavilion', desc:'The largest family-friendly event in the Cayman Islands featuring farm vendors, livestock exhibitions, local food, entertainment and the annual show raffle.' },
  { id:'d2', title:'Board Meeting', cat:'meeting', start:'2026-03-15', end:'', time:'6:00 PM', loc:'CIAS Conference Room', desc:'Monthly board meeting to discuss upcoming events and agricultural initiatives.' },
  { id:'d3', title:'School Garden Workshop', cat:'workshop', start:'2026-04-10', end:'', time:'9:00 AM - 12:00 PM', loc:'Prospect Primary School', desc:'Hands-on workshop teaching students about sustainable gardening practices.' },
  { id:'d4', title:'Farmers Market', cat:'market', start:'2026-03-22', end:'', time:'7:00 AM - 1:00 PM', loc:'Agriculture Pavilion Grounds', desc:'Monthly farmers market featuring locally grown produce, honey, jams and crafts.' },
  { id:'d5', title:'Composting Workshop', cat:'workshop', start:'2026-04-18', end:'', time:'10:00 AM - 2:00 PM', loc:'Agriculture Pavilion', desc:'Learn how to create and maintain a composting system for your home garden.' },
  { id:'d6', title:'Farmers Market', cat:'market', start:'2026-04-26', end:'', time:'7:00 AM - 1:00 PM', loc:'Agriculture Pavilion Grounds', desc:'Monthly farmers market featuring locally grown produce and artisan goods.' },
  { id:'d7', title:'Annual General Meeting', cat:'meeting', start:'2026-07-18', end:'', time:'7:00 PM', loc:'Stacy Watler Agriculture Pavilion', desc:'Annual General Meeting. All members encouraged to attend.' },
  { id:'d8', title:'Farm-to-Table Dinner', cat:'other', start:'2026-05-16', end:'', time:'6:30 PM - 10:00 PM', loc:'Grand Old House', desc:'A special evening celebrating Caymanian cuisine with locally sourced ingredients.' },
];

function getStoredEvents() {
  if (typeof window === 'undefined') return DEFAULT_EVENTS;
  try {
    const s = localStorage.getItem('cias_events');
    return s ? JSON.parse(s) : DEFAULT_EVENTS;
  } catch { return DEFAULT_EVENTS; }
}

function saveEvents(events) {
  if (typeof window !== 'undefined') {
    localStorage.setItem('cias_events', JSON.stringify(events));
  }
}

// ─── EVENT DETAIL MODAL ───
function EventModal({ event, onClose }) {
  if (!event) return null;
  const d = new Date(event.start + 'T00:00:00');
  const cat = CAT_STYLES[event.cat] || CAT_STYLES.other;
  return (
    <div style={{position:'fixed',inset:0,zIndex:2000,background:'rgba(0,0,0,0.5)',backdropFilter:'blur(4px)',display:'flex',alignItems:'center',justifyContent:'center',padding:'1rem'}} onClick={onClose}>
      <div style={{background:'#fff',borderRadius:16,maxWidth:480,width:'100%',boxShadow:'0 20px 60px rgba(0,0,0,0.15)',animation:'modalIn 0.3s ease-out',overflow:'hidden',position:'relative'}} onClick={e=>e.stopPropagation()}>
        <button onClick={onClose} style={{position:'absolute',top:12,right:16,background:'none',border:'none',fontSize:'1.5rem',cursor:'pointer',color:'#999'}}>×</button>
        <div style={{padding:'2rem 2rem 1rem',textAlign:'center'}}>
          <span style={{display:'inline-block',padding:'3px 14px',borderRadius:50,fontSize:'0.78rem',fontWeight:600,background:cat.bg,color:cat.color,marginBottom:8}}>{event.cat.charAt(0).toUpperCase()+event.cat.slice(1)}</span>
          <h3 style={{fontSize:'1.4rem',color:'#1a1a2e',fontWeight:600}}>{event.title}</h3>
        </div>
        <div style={{padding:'0 2rem 2rem'}}>
          <div style={{display:'flex',alignItems:'center',gap:8,marginBottom:8,fontSize:'0.92rem',color:'#666'}}>
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#2d6a4f" strokeWidth="2"><rect x="3" y="4" width="18" height="18" rx="2"/><line x1="16" y1="2" x2="16" y2="6"/><line x1="8" y1="2" x2="8" y2="6"/><line x1="3" y1="10" x2="21" y2="10"/></svg>
            {MONTHS[d.getMonth()]} {d.getDate()}, {d.getFullYear()}
          </div>
          {event.time && <div style={{display:'flex',alignItems:'center',gap:8,marginBottom:8,fontSize:'0.92rem',color:'#666'}}>
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#2d6a4f" strokeWidth="2"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>
            {event.time}
          </div>}
          {event.loc && <div style={{display:'flex',alignItems:'center',gap:8,marginBottom:8,fontSize:'0.92rem',color:'#666'}}>
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#2d6a4f" strokeWidth="2"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/><circle cx="12" cy="10" r="3"/></svg>
            {event.loc}
          </div>}
          {event.desc && <p style={{marginTop:12,color:'#666',fontSize:'0.92rem',lineHeight:1.7}}>{event.desc}</p>}
        </div>
      </div>
    </div>
  );
}

// ─── MAIN CALENDAR COMPONENT ───
export default function Calendar() {
  const [events, setEvents] = useState([]);
  const [year, setYear] = useState(new Date().getFullYear());
  const [month, setMonth] = useState(new Date().getMonth());
  const [selected, setSelected] = useState(null);

  useEffect(() => { setEvents(getStoredEvents()); }, []);

  const today = new Date();
  const firstDay = new Date(year, month, 1).getDay();
  const daysInMonth = new Date(year, month + 1, 0).getDate();

  function changeMonth(dir) {
    let m = month + dir, y = year;
    if (m > 11) { m = 0; y++; }
    if (m < 0) { m = 11; y--; }
    setMonth(m); setYear(y);
  }

  function getEventsForDate(dateStr) {
    return events.filter(e => {
      if (e.start === dateStr) return true;
      if (e.end && e.start <= dateStr && e.end >= dateStr) return true;
      return false;
    });
  }

  const now = today.toISOString().split('T')[0];
  const upcoming = events.filter(e => e.start >= now).sort((a, b) => a.start.localeCompare(b.start)).slice(0, 5);

  return (
    <>
      <section id="calendar" style={{padding:'80px 20px',background:'#f8faf5'}}>
        <div style={{maxWidth:1200,margin:'0 auto'}}>
          <div style={{textAlign:'center',marginBottom:48}}>
            <h2 style={{fontSize:'clamp(1.8rem, 4vw, 2.5rem)',color:'#1a1a2e',marginBottom:12}}>Events Calendar</h2>
            <p style={{color:'#666',maxWidth:600,margin:'0 auto',fontSize:'1.05rem'}}>Stay up to date with our shows, workshops, markets and community gatherings.</p>
          </div>

          {/* Calendar */}
          <div style={{background:'#fff',borderRadius:16,boxShadow:'0 4px 24px rgba(0,0,0,0.08)',overflow:'hidden',marginBottom:24}}>
            {/* Header */}
            <div style={{display:'flex',justifyContent:'space-between',alignItems:'center',padding:'16px 24px',background:'#2d6a4f',color:'#fff'}}>
              <button onClick={()=>changeMonth(-1)} style={{background:'rgba(255,255,255,0.15)',border:'none',color:'#fff',width:36,height:36,borderRadius:'50%',cursor:'pointer',fontSize:'1rem',display:'flex',alignItems:'center',justifyContent:'center'}}>◀</button>
              <h3 style={{fontSize:'1.2rem',fontWeight:600}}>{MONTHS[month]} {year}</h3>
              <button onClick={()=>changeMonth(1)} style={{background:'rgba(255,255,255,0.15)',border:'none',color:'#fff',width:36,height:36,borderRadius:'50%',cursor:'pointer',fontSize:'1rem',display:'flex',alignItems:'center',justifyContent:'center'}}>▶</button>
            </div>

            {/* Day Names */}
            <div style={{display:'grid',gridTemplateColumns:'repeat(7,1fr)'}}>
              {DAYS.map(d => (
                <div key={d} style={{padding:'10px 4px',textAlign:'center',fontSize:'0.78rem',fontWeight:600,letterSpacing:'0.08em',textTransform:'uppercase',color:'#999',background:'#fafafa'}}>{d}</div>
              ))}
            </div>

            {/* Days Grid */}
            <div style={{display:'grid',gridTemplateColumns:'repeat(7,1fr)'}}>
              {Array.from({length: firstDay}, (_, i) => (
                <div key={`e${i}`} style={{minHeight:90,padding:4,background:'#fafafa',borderRight:'1px solid #f0f0f0',borderBottom:'1px solid #f0f0f0'}} />
              ))}
              {Array.from({length: daysInMonth}, (_, i) => {
                const d = i + 1;
                const ds = `${year}-${String(month+1).padStart(2,'0')}-${String(d).padStart(2,'0')}`;
                const isToday = today.getFullYear() === year && today.getMonth() === month && today.getDate() === d;
                const dayEvents = getEventsForDate(ds);
                return (
                  <div key={d} style={{minHeight:90,padding:4,borderRight:'1px solid #f0f0f0',borderBottom:'1px solid #f0f0f0',background:isToday?'#f0faf2':'transparent'}}>
                    <div style={isToday ? {background:'#2d6a4f',color:'#fff',width:26,height:26,borderRadius:'50%',display:'flex',alignItems:'center',justifyContent:'center',fontSize:'0.8rem',fontWeight:600,marginBottom:2} : {fontSize:'0.85rem',fontWeight:600,color:'#333',marginBottom:2}}>{d}</div>
                    {dayEvents.map(ev => {
                      const cat = CAT_STYLES[ev.cat] || CAT_STYLES.other;
                      return (
                        <div key={ev.id} onClick={()=>setSelected(ev)} style={{fontSize:'0.7rem',padding:'2px 6px',borderRadius:4,marginBottom:2,cursor:'pointer',whiteSpace:'nowrap',overflow:'hidden',textOverflow:'ellipsis',fontWeight:500,background:cat.bg,color:cat.color,borderLeft:`3px solid ${cat.border}`,transition:'all 0.2s'}}>
                          {ev.title}
                        </div>
                      );
                    })}
                  </div>
                );
              })}
            </div>

            {/* Legend */}
            <div style={{display:'flex',gap:20,padding:'12px 24px',flexWrap:'wrap',borderTop:'1px solid #eee'}}>
              {Object.entries(CAT_STYLES).map(([k, v]) => (
                <div key={k} style={{display:'flex',alignItems:'center',gap:6,fontSize:'0.8rem',color:'#666'}}>
                  <div style={{width:10,height:10,borderRadius:3,background:v.color}} />
                  {k.charAt(0).toUpperCase()+k.slice(1)}
                </div>
              ))}
            </div>
          </div>

          {/* Upcoming Events */}
          {upcoming.length > 0 && (
            <div>
              <h3 style={{fontSize:'1.3rem',color:'#1a1a2e',marginBottom:16,fontWeight:600}}>Upcoming Events</h3>
              {upcoming.map(e => {
                const d = new Date(e.start + 'T00:00:00');
                const cat = CAT_STYLES[e.cat] || CAT_STYLES.other;
                return (
                  <div key={e.id} onClick={()=>setSelected(e)} style={{display:'flex',gap:16,padding:16,background:'#fff',borderRadius:12,marginBottom:10,boxShadow:'0 2px 8px rgba(0,0,0,0.04)',cursor:'pointer',transition:'all 0.3s',alignItems:'flex-start'}}>
                    <div style={{minWidth:64,textAlign:'center',padding:10,background:'#f0f4e8',borderRadius:10}}>
                      <div style={{fontSize:'0.7rem',textTransform:'uppercase',letterSpacing:'0.1em',color:'#2d6a4f',fontWeight:700}}>{MONTHS[d.getMonth()].slice(0,3)}</div>
                      <div style={{fontSize:'1.5rem',fontWeight:700,color:'#1a1a2e'}}>{d.getDate()}</div>
                    </div>
                    <div style={{flex:1}}>
                      <div style={{display:'flex',alignItems:'center',gap:8,marginBottom:4}}>
                        <h4 style={{fontSize:'1rem',color:'#1a1a2e',fontWeight:600}}>{e.title}</h4>
                        <span style={{fontSize:'0.7rem',padding:'2px 8px',borderRadius:50,background:cat.bg,color:cat.color,fontWeight:600}}>{e.cat}</span>
                      </div>
                      {e.desc && <p style={{fontSize:'0.85rem',color:'#888',lineHeight:1.5}}>{e.desc.length > 100 ? e.desc.slice(0,100)+'...' : e.desc}</p>}
                      {e.time && <div style={{fontSize:'0.82rem',fontWeight:600,color:'#2d6a4f',marginTop:4}}>{e.time}{e.loc ? ` · ${e.loc}` : ''}</div>}
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      </section>

      {/* Event Detail Modal */}
      {selected && <EventModal event={selected} onClose={() => setSelected(null)} />}

      <style jsx global>{`
        @keyframes modalIn {
          from { opacity: 0; transform: scale(0.95) translateY(10px); }
          to { opacity: 1; transform: scale(1) translateY(0); }
        }
      `}</style>
    </>
  );
}

export { getStoredEvents, saveEvents, DEFAULT_EVENTS, CAT_STYLES, MONTHS };
