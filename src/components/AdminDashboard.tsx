'use client';

import { useState, useEffect } from 'react';
import { getStoredEvents, saveEvents, CAT_STYLES, MONTHS } from './Calendar';
import type { CalendarEvent } from './Calendar';

interface AdminDashboardProps {
  onClose: () => void;
  onLogout: () => void;
}

interface EventForm {
  title: string;
  cat: string;
  start: string;
  end: string;
  time: string;
  loc: string;
  desc: string;
}

export default function AdminDashboard({ onClose, onLogout }: AdminDashboardProps) {
  const [events, setEvents] = useState<CalendarEvent[]>([]);
  const [editId, setEditId] = useState('');
  const [form, setForm] = useState<EventForm>({ title:'', cat:'show', start:'', end:'', time:'', loc:'', desc:'' });
  const [toast, setToast] = useState('');

  useEffect(() => { setEvents(getStoredEvents()); }, []);

  function showToast(msg: string) { setToast(msg); setTimeout(() => setToast(''), 3000); }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    let updated: CalendarEvent[];
    if (editId) {
      updated = events.map(ev => ev.id === editId ? { ...form, id: editId } : ev);
      showToast('Event updated!');
    } else {
      updated = [...events, { ...form, id: 'ev' + Date.now() }];
      showToast('Event added!');
    }
    setEvents(updated);
    saveEvents(updated);
    resetForm();
  }

  function editEvent(ev: CalendarEvent) {
    setEditId(ev.id);
    setForm({ title:ev.title, cat:ev.cat, start:ev.start, end:ev.end||'', time:ev.time||'', loc:ev.loc||'', desc:ev.desc||'' });
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  function deleteEvent(id: string) {
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

  return (
    <div className="fixed inset-0 z-[1500] bg-gray-50 overflow-y-auto">
      {/* Top bar */}
      <div className="bg-[#027373] text-white px-6 py-3 flex justify-between items-center sticky top-0 z-10 shadow-lg">
        <h3 className="text-lg font-semibold">📋 CIAS Admin Dashboard</h3>
        <div className="flex gap-2">
          <button onClick={onClose} className="bg-white/15 hover:bg-white/25 px-5 py-2 rounded-full text-sm transition-colors">← Back to Site</button>
          <button onClick={onLogout} className="bg-red-500 hover:bg-red-600 px-5 py-2 rounded-full text-sm transition-colors">Logout</button>
        </div>
      </div>

      <div className="max-w-5xl mx-auto py-6 px-5">
        {/* Form */}
        <div className="bg-white p-6 rounded-2xl shadow-md mb-6">
          <h3 className="text-xl font-bold text-gray-900 mb-5">
            {editId ? '✏️ Edit Event' : '➕ Add New Event'}
          </h3>
          <form onSubmit={handleSubmit}>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              <div>
                <label className="block text-xs font-semibold text-gray-600 mb-1">Event Title *</label>
                <input className="w-full px-3.5 py-2.5 border border-gray-200 rounded-xl text-sm bg-gray-50 outline-none focus:border-[#027373] focus:ring-2 focus:ring-[#027373]/10 transition-all" type="text" value={form.title} onChange={e=>setForm({...form,title:e.target.value})} required placeholder="e.g. Annual Agriculture Show" />
              </div>
              <div>
                <label className="block text-xs font-semibold text-gray-600 mb-1">Category *</label>
                <select className="w-full px-3.5 py-2.5 border border-gray-200 rounded-xl text-sm bg-gray-50 outline-none focus:border-[#027373] transition-all" value={form.cat} onChange={e=>setForm({...form,cat:e.target.value})}>
                  <option value="show">Show</option>
                  <option value="meeting">Meeting</option>
                  <option value="workshop">Workshop</option>
                  <option value="market">Market</option>
                  <option value="other">Other</option>
                </select>
              </div>
              <div>
                <label className="block text-xs font-semibold text-gray-600 mb-1">Start Date *</label>
                <input className="w-full px-3.5 py-2.5 border border-gray-200 rounded-xl text-sm bg-gray-50 outline-none focus:border-[#027373] transition-all" type="date" value={form.start} onChange={e=>setForm({...form,start:e.target.value})} required />
              </div>
              <div>
                <label className="block text-xs font-semibold text-gray-600 mb-1">End Date</label>
                <input className="w-full px-3.5 py-2.5 border border-gray-200 rounded-xl text-sm bg-gray-50 outline-none focus:border-[#027373] transition-all" type="date" value={form.end} onChange={e=>setForm({...form,end:e.target.value})} />
              </div>
              <div>
                <label className="block text-xs font-semibold text-gray-600 mb-1">Time</label>
                <input className="w-full px-3.5 py-2.5 border border-gray-200 rounded-xl text-sm bg-gray-50 outline-none focus:border-[#027373] transition-all" type="text" value={form.time} onChange={e=>setForm({...form,time:e.target.value})} placeholder="e.g. 7:00 AM - 6:00 PM" />
              </div>
              <div>
                <label className="block text-xs font-semibold text-gray-600 mb-1">Location</label>
                <input className="w-full px-3.5 py-2.5 border border-gray-200 rounded-xl text-sm bg-gray-50 outline-none focus:border-[#027373] transition-all" type="text" value={form.loc} onChange={e=>setForm({...form,loc:e.target.value})} placeholder="e.g. Stacy Watler Pavilion" />
              </div>
            </div>
            <div className="mt-3">
              <label className="block text-xs font-semibold text-gray-600 mb-1">Description</label>
              <textarea className="w-full px-3.5 py-2.5 border border-gray-200 rounded-xl text-sm bg-gray-50 outline-none focus:border-[#027373] transition-all min-h-[100px] resize-y" value={form.desc} onChange={e=>setForm({...form,desc:e.target.value})} placeholder="Brief description..." />
            </div>
            <div className="flex gap-2 mt-4">
              <button type="submit" className="bg-[#027373] hover:bg-[#015858] text-white px-7 py-2.5 rounded-full text-sm font-semibold transition-colors">
                {editId ? 'Update Event' : 'Add Event'}
              </button>
              <button type="button" onClick={resetForm} className="bg-transparent text-gray-500 border border-gray-200 px-7 py-2.5 rounded-full text-sm transition-colors hover:bg-gray-50">
                Clear
              </button>
            </div>
          </form>
        </div>

        {/* Table */}
        <div className="bg-white rounded-2xl shadow-md overflow-hidden">
          <h3 className="px-6 pt-5 text-xl font-bold text-gray-900">All Events ({events.length})</h3>
          {sorted.length === 0 ? (
            <div className="p-12 text-center text-gray-400">No events yet. Add your first event above!</div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full mt-3">
                <thead>
                  <tr>
                    {['Date','Title','Category','Time','Location','Actions'].map(h => (
                      <th key={h} className="px-4 py-2.5 text-left text-[11px] uppercase tracking-wider text-gray-400 bg-gray-50 border-b-2 border-gray-100 font-semibold">{h}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {sorted.map(ev => {
                    const d = new Date(ev.start + 'T00:00:00');
                    const cat = CAT_STYLES[ev.cat] || CAT_STYLES.other;
                    return (
                      <tr key={ev.id} className="hover:bg-gray-50 transition-colors">
                        <td className="px-4 py-3 border-b border-gray-100 text-sm">{d.getDate()} {MONTHS[d.getMonth()].slice(0,3)} {d.getFullYear()}</td>
                        <td className="px-4 py-3 border-b border-gray-100 text-sm font-semibold">{ev.title}</td>
                        <td className="px-4 py-3 border-b border-gray-100">
                          <span className="inline-block px-2.5 py-0.5 rounded-full text-[11px] font-semibold" style={{background:cat.bg,color:cat.color}}>{ev.cat}</span>
                        </td>
                        <td className="px-4 py-3 border-b border-gray-100 text-sm text-gray-500">{ev.time || '—'}</td>
                        <td className="px-4 py-3 border-b border-gray-100 text-sm text-gray-500">{ev.loc || '—'}</td>
                        <td className="px-4 py-3 border-b border-gray-100">
                          <button onClick={()=>editEvent(ev)} className="text-[#027373] hover:bg-teal-50 text-sm px-2 py-1 rounded mr-1 transition-colors">Edit</button>
                          <button onClick={()=>deleteEvent(ev.id)} className="text-red-600 hover:bg-red-50 text-sm px-2 py-1 rounded transition-colors">Delete</button>
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
        <div className="fixed bottom-6 right-6 bg-[#027373] text-white px-5 py-3 rounded-xl shadow-xl z-[3000] animate-[modalIn_0.3s_ease-out]">
          {toast}
        </div>
      )}
    </div>
  );
}
