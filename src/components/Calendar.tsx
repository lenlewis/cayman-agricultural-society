'use client';

import { useState, useEffect } from 'react';

export interface CalendarEvent {
  id: string;
  title: string;
  cat: string;
  start: string;
  end: string;
  time: string;
  loc: string;
  desc: string;
}

const MONTHS = ['January','February','March','April','May','June','July','August','September','October','November','December'];
const DAYS = ['Sun','Mon','Tue','Wed','Thu','Fri','Sat'];
const CAT_STYLES: Record<string, { bg: string; color: string; border: string }> = {
  show:      { bg: '#e8f5e9', color: '#2e7d32', border: '#2e7d32' },
  meeting:   { bg: '#e0f2f1', color: '#027373', border: '#027373' },
  workshop:  { bg: '#fff3e0', color: '#e65100', border: '#e65100' },
  market:    { bg: '#fce4ec', color: '#c62828', border: '#c62828' },
  other:     { bg: '#f3e5f5', color: '#6a1b9a', border: '#6a1b9a' },
};

const DEFAULT_EVENTS: CalendarEvent[] = [
  { id:'d1', title:'57th Annual Agriculture Show', cat:'show', start:'2026-03-04', end:'', time:'7:00 AM - 6:00 PM', loc:'Stacy Watler Agriculture Pavilion', desc:'The largest family-friendly event in the Cayman Islands featuring farm vendors, livestock exhibitions, local food, entertainment and the annual show raffle.' },
  { id:'d2', title:'Board Meeting', cat:'meeting', start:'2026-03-15', end:'', time:'6:00 PM', loc:'CIAS Conference Room', desc:'Monthly board meeting to discuss upcoming events and agricultural initiatives.' },
  { id:'d3', title:'School Garden Workshop', cat:'workshop', start:'2026-04-10', end:'', time:'9:00 AM - 12:00 PM', loc:'Prospect Primary School', desc:'Hands-on workshop teaching students about sustainable gardening practices.' },
  { id:'d4', title:'Farmers Market', cat:'market', start:'2026-03-22', end:'', time:'7:00 AM - 1:00 PM', loc:'Agriculture Pavilion Grounds', desc:'Monthly farmers market featuring locally grown produce, honey, jams and crafts.' },
  { id:'d5', title:'Composting Workshop', cat:'workshop', start:'2026-04-18', end:'', time:'10:00 AM - 2:00 PM', loc:'Agriculture Pavilion', desc:'Learn how to create and maintain a composting system for your home garden.' },
  { id:'d6', title:'Farmers Market', cat:'market', start:'2026-04-26', end:'', time:'7:00 AM - 1:00 PM', loc:'Agriculture Pavilion Grounds', desc:'Monthly farmers market featuring locally grown produce and artisan goods.' },
  { id:'d7', title:'Annual General Meeting', cat:'meeting', start:'2026-07-18', end:'', time:'7:00 PM', loc:'Stacy Watler Agriculture Pavilion', desc:'Annual General Meeting. All members encouraged to attend.' },
  { id:'d8', title:'Farm-to-Table Dinner', cat:'other', start:'2026-05-16', end:'', time:'6:30 PM - 10:00 PM', loc:'Grand Old House', desc:'A special evening celebrating Caymanian cuisine with locally sourced ingredients.' },
];

function getStoredEvents(): CalendarEvent[] {
  if (typeof window === 'undefined') return DEFAULT_EVENTS;
  try {
    const s = localStorage.getItem('cias_events');
    return s ? JSON.parse(s) : DEFAULT_EVENTS;
  } catch { return DEFAULT_EVENTS; }
}

function saveEvents(events: CalendarEvent[]) {
  if (typeof window !== 'undefined') {
    localStorage.setItem('cias_events', JSON.stringify(events));
  }
}

function EventModal({ event, onClose }: { event: CalendarEvent; onClose: () => void }) {
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
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#027373" strokeWidth="2"><rect x="3" y="4" width="18" height="18" rx="2"/><line x1="16" y1="2" x2="16" y2="6"/><line x1="8" y1="2" x2="8" y2="6"/><line x1="3" y1="10" x2="21" y2="10"/></svg>
            {MONTHS[d.getMonth()]} {d.getDate()}, {d.getFullYear()}
          </div>
          {event.time && <div style={{display:'flex',alignItems:'center',gap:8,marginBottom:8,fontSize:'0.92rem',color:'#666'}}>
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#027373" strokeWidth="2"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>
            {event.time}
          </div>}
          {event.loc && <div style={{display:'flex',alignItems:'center',gap:8,marginBottom:8,fontSize:'0.92rem',color:'#666'}}>
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#027373" strokeWidth="2"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/><circle cx="12" cy="10" r="3"/></svg>
            {event.loc}
          </div>}
          {event.desc && <p style={{marginTop:12,color:'#666',fontSize:'0.92rem',lineHeight:1.7}}>{event.desc}</p>}
        </div>
      </div>
    </div>
  );
}

export default function Calendar() {
  const [events, setEvents] = useState<CalendarEvent[]>([]);
  const [year, setYear] = useState(new Date().getFullYear());
  const [month, setMonth] = useState(new Date().getMonth());
  const [selected, setSelected] = useState<CalendarEvent | null>(null);

  useEffect(() => { setEvents(getStoredEvents()); }, []);

  const today = new Date();
  const firstDay = new Date(year, month, 1).getDay();
  const daysInMonth = new Date(year, month + 1, 0).getDate();

  function changeMonth(dir: number) {
    let m = month + dir, y = year;
    if (m > 11) { m = 0; y++; }
    if (m < 0) { m = 11; y--; }
    setMonth(m); setYear(y);
  }

  function getEventsForDate(dateStr: string) {
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
      <section id="calendar" className="py-20 px-5 bg-gray-50">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-3">Events Calendar</h2>
            <p className="text-gray-500 max-w-xl mx-auto text-lg">Stay up to date with our shows, workshops, markets and community gatherings.</p>
          </div>

          <div className="bg-white rounded-2xl shadow-lg overflow-hidden mb-6">
            <div className="flex justify-between items-center px-6 py-4 bg-[#027373] text-white">
              <button onClick={()=>changeMonth(-1)} className="w-9 h-9 rounded-full bg-white/15 hover:bg-white/30 flex items-center justify-center transition-colors text-lg">◀</button>
              <h3 className="text-xl font-semibold">{MONTHS[month]} {year}</h3>
              <button onClick={()=>changeMonth(1)} className="w-9 h-9 rounded-full bg-white/15 hover:bg-white/30 flex items-center justify-center transition-colors text-lg">▶</button>
            </div>

            <div className="grid grid-cols-7">
              {DAYS.map(d => (
                <div key={d} className="py-2.5 px-1 text-center text-xs font-semibold uppercase tracking-wider text-gray-400 bg-gray-50">{d}</div>
              ))}
            </div>

            <div className="grid grid-cols-7">
              {Array.from({length: firstDay}, (_, i) => (
                <div key={`e${i}`} className="min-h-[90px] p-1 bg-gray-50 border-r border-b border-gray-100" />
              ))}
              {Array.from({length: daysInMonth}, (_, i) => {
                const d = i + 1;
                const ds = `${year}-${String(month+1).padStart(2,'0')}-${String(d).padStart(2,'0')}`;
                const isToday = today.getFullYear() === year && today.getMonth() === month && today.getDate() === d;
                const dayEvents = getEventsForDate(ds);
                return (
                  <div key={d} className={`min-h-[90px] p-1 border-r border-b border-gray-100 ${isToday ? 'bg-teal-50' : ''}`}>
                    <div className={isToday ? 'bg-[#027373] text-white w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold mb-0.5' : 'text-sm font-semibold text-gray-700 mb-0.5'}>{d}</div>
                    {dayEvents.map(ev => {
                      const cat = CAT_STYLES[ev.cat] || CAT_STYLES.other;
                      return (
                        <div key={ev.id} onClick={()=>setSelected(ev)} className="text-[11px] px-1.5 py-0.5 rounded mb-0.5 cursor-pointer truncate font-medium hover:opacity-80 transition-opacity" style={{background:cat.bg,color:cat.color,borderLeft:`3px solid ${cat.border}`}}>
                          {ev.title}
                        </div>
                      );
                    })}
                  </div>
                );
              })}
            </div>

            <div className="flex gap-5 px-6 py-3 flex-wrap border-t border-gray-100">
              {Object.entries(CAT_STYLES).map(([k, v]) => (
                <div key={k} className="flex items-center gap-1.5 text-xs text-gray-500">
                  <div className="w-2.5 h-2.5 rounded-sm" style={{background:v.color}} />
                  {k.charAt(0).toUpperCase()+k.slice(1)}
                </div>
              ))}
            </div>
          </div>

          {upcoming.length > 0 && (
            <div>
              <h3 className="text-xl font-bold text-gray-900 mb-4">Upcoming Events</h3>
              {upcoming.map(e => {
                const d = new Date(e.start + 'T00:00:00');
                const cat = CAT_STYLES[e.cat] || CAT_STYLES.other;
                return (
                  <div key={e.id} onClick={()=>setSelected(e)} className="flex gap-4 p-4 bg-white rounded-xl mb-3 shadow-sm cursor-pointer hover:shadow-md transition-shadow items-start">
                    <div className="min-w-[64px] text-center py-2.5 px-2 bg-[#027373]/10 rounded-xl">
                      <div className="text-[10px] uppercase tracking-widest text-[#027373] font-bold">{MONTHS[d.getMonth()].slice(0,3)}</div>
                      <div className="text-2xl font-bold text-gray-900">{d.getDate()}</div>
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 mb-1 flex-wrap">
                        <h4 className="font-semibold text-gray-900">{e.title}</h4>
                        <span className="text-[11px] px-2 py-0.5 rounded-full font-semibold" style={{background:cat.bg,color:cat.color}}>{e.cat}</span>
                      </div>
                      {e.desc && <p className="text-sm text-gray-400 line-clamp-2">{e.desc}</p>}
                      {e.time && <div className="text-sm font-semibold text-[#027373] mt-1">{e.time}{e.loc ? ` · ${e.loc}` : ''}</div>}
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      </section>

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
