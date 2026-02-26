'use client';

import { useState, useEffect, useRef } from 'react';
import { getStoredEvents, saveEvents, CAT_STYLES, MONTHS } from './Calendar';
import { getStoredPhotos, savePhotos, GALLERY_CATEGORIES } from './Gallery';
import type { CalendarEvent } from './Calendar';
import type { GalleryPhoto } from './Gallery';

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

interface PhotoForm {
  caption: string;
  category: string;
}

export default function AdminDashboard({ onClose, onLogout }: AdminDashboardProps) {
  const [tab, setTab] = useState<'events' | 'gallery'>('events');
  const [toast, setToast] = useState('');

  // ── Events state ──
  const [events, setEvents] = useState<CalendarEvent[]>([]);
  const [editId, setEditId] = useState('');
  const [form, setForm] = useState<EventForm>({ title:'', cat:'show', start:'', end:'', time:'', loc:'', desc:'' });

  // ── Gallery state ──
  const [photos, setPhotos] = useState<GalleryPhoto[]>([]);
  const [photoForm, setPhotoForm] = useState<PhotoForm>({ caption: '', category: GALLERY_CATEGORIES[0] });
  const [photoPreview, setPhotoPreview] = useState<string | null>(null);
  const [editPhotoId, setEditPhotoId] = useState('');
  const fileInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    setEvents(getStoredEvents());
    setPhotos(getStoredPhotos());
  }, []);

  function showToast(msg: string) { setToast(msg); setTimeout(() => setToast(''), 3000); }

  // ── Events CRUD ──
  function handleEventSubmit(e: React.FormEvent) {
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
    resetEventForm();
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

  function resetEventForm() {
    setEditId('');
    setForm({ title:'', cat:'show', start:'', end:'', time:'', loc:'', desc:'' });
  }

  // ── Gallery CRUD ──
  function handleFileSelect(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (!file) return;
    if (!file.type.startsWith('image/')) { showToast('Please select an image file'); return; }
    if (file.size > 5 * 1024 * 1024) { showToast('Image must be under 5MB'); return; }

    const reader = new FileReader();
    reader.onload = (ev) => {
      setPhotoPreview(ev.target?.result as string);
    };
    reader.readAsDataURL(file);
  }

  function handlePhotoSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (editPhotoId) {
      // Editing existing photo caption/category
      const updated = photos.map(p => p.id === editPhotoId ? { ...p, caption: photoForm.caption, category: photoForm.category, ...(photoPreview ? { src: photoPreview } : {}) } : p);
      setPhotos(updated);
      savePhotos(updated);
      showToast('Photo updated!');
    } else {
      if (!photoPreview) { showToast('Please select a photo'); return; }
      const newPhoto: GalleryPhoto = {
        id: 'gp' + Date.now(),
        src: photoPreview,
        caption: photoForm.caption,
        category: photoForm.category,
      };
      const updated = [...photos, newPhoto];
      setPhotos(updated);
      savePhotos(updated);
      showToast('Photo added!');
    }
    resetPhotoForm();
    // Notify Gallery component
    window.dispatchEvent(new Event('cias_gallery_updated'));
  }

  function editPhoto(photo: GalleryPhoto) {
    setEditPhotoId(photo.id);
    setPhotoForm({ caption: photo.caption, category: photo.category });
    setPhotoPreview(null);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  function deletePhoto(id: string) {
    if (!confirm('Delete this photo?')) return;
    const updated = photos.filter(p => p.id !== id);
    setPhotos(updated);
    savePhotos(updated);
    showToast('Photo deleted');
    window.dispatchEvent(new Event('cias_gallery_updated'));
  }

  function resetPhotoForm() {
    setEditPhotoId('');
    setPhotoForm({ caption: '', category: GALLERY_CATEGORIES[0] });
    setPhotoPreview(null);
    if (fileInputRef.current) fileInputRef.current.value = '';
  }

  const sorted = [...events].sort((a, b) => a.start.localeCompare(b.start));
  const inputCls = "w-full px-3.5 py-2.5 border border-gray-200 rounded-xl text-sm bg-gray-50 outline-none focus:border-[#027373] focus:ring-2 focus:ring-[#027373]/10 transition-all";
  const labelCls = "block text-xs font-semibold text-gray-600 mb-1";

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

      {/* Tabs */}
      <div className="max-w-5xl mx-auto pt-6 px-5">
        <div className="flex gap-1 bg-white rounded-xl p-1 shadow-sm mb-6">
          <button
            onClick={() => setTab('events')}
            className={`flex-1 py-2.5 rounded-lg text-sm font-semibold transition-all ${tab === 'events' ? 'bg-[#027373] text-white shadow-md' : 'text-gray-500 hover:bg-gray-50'}`}
          >
            📅 Events
          </button>
          <button
            onClick={() => setTab('gallery')}
            className={`flex-1 py-2.5 rounded-lg text-sm font-semibold transition-all ${tab === 'gallery' ? 'bg-[#027373] text-white shadow-md' : 'text-gray-500 hover:bg-gray-50'}`}
          >
            🖼️ Gallery
          </button>
        </div>
      </div>

      <div className="max-w-5xl mx-auto pb-6 px-5">

        {/* ════════════ EVENTS TAB ════════════ */}
        {tab === 'events' && (
          <>
            <div className="bg-white p-6 rounded-2xl shadow-md mb-6">
              <h3 className="text-xl font-bold text-gray-900 mb-5">
                {editId ? '✏️ Edit Event' : '➕ Add New Event'}
              </h3>
              <form onSubmit={handleEventSubmit}>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  <div><label className={labelCls}>Event Title *</label><input className={inputCls} type="text" value={form.title} onChange={e=>setForm({...form,title:e.target.value})} required placeholder="e.g. Annual Agriculture Show" /></div>
                  <div><label className={labelCls}>Category *</label>
                    <select className={inputCls} value={form.cat} onChange={e=>setForm({...form,cat:e.target.value})}>
                      <option value="show">Show</option><option value="meeting">Meeting</option><option value="workshop">Workshop</option><option value="market">Market</option><option value="other">Other</option>
                    </select>
                  </div>
                  <div><label className={labelCls}>Start Date *</label><input className={inputCls} type="date" value={form.start} onChange={e=>setForm({...form,start:e.target.value})} required /></div>
                  <div><label className={labelCls}>End Date</label><input className={inputCls} type="date" value={form.end} onChange={e=>setForm({...form,end:e.target.value})} /></div>
                  <div><label className={labelCls}>Time</label><input className={inputCls} type="text" value={form.time} onChange={e=>setForm({...form,time:e.target.value})} placeholder="e.g. 7:00 AM - 6:00 PM" /></div>
                  <div><label className={labelCls}>Location</label><input className={inputCls} type="text" value={form.loc} onChange={e=>setForm({...form,loc:e.target.value})} placeholder="e.g. Stacy Watler Pavilion" /></div>
                </div>
                <div className="mt-3"><label className={labelCls}>Description</label><textarea className={`${inputCls} min-h-[100px] resize-y`} value={form.desc} onChange={e=>setForm({...form,desc:e.target.value})} placeholder="Brief description..." /></div>
                <div className="flex gap-2 mt-4">
                  <button type="submit" className="bg-[#027373] hover:bg-[#015858] text-white px-7 py-2.5 rounded-full text-sm font-semibold transition-colors">{editId ? 'Update Event' : 'Add Event'}</button>
                  <button type="button" onClick={resetEventForm} className="bg-transparent text-gray-500 border border-gray-200 px-7 py-2.5 rounded-full text-sm transition-colors hover:bg-gray-50">Clear</button>
                </div>
              </form>
            </div>

            <div className="bg-white rounded-2xl shadow-md overflow-hidden">
              <h3 className="px-6 pt-5 text-xl font-bold text-gray-900">All Events ({events.length})</h3>
              {sorted.length === 0 ? (
                <div className="p-12 text-center text-gray-400">No events yet. Add your first event above!</div>
              ) : (
                <div className="overflow-x-auto">
                  <table className="w-full mt-3">
                    <thead><tr>
                      {['Date','Title','Category','Time','Location','Actions'].map(h => (
                        <th key={h} className="px-4 py-2.5 text-left text-[11px] uppercase tracking-wider text-gray-400 bg-gray-50 border-b-2 border-gray-100 font-semibold">{h}</th>
                      ))}
                    </tr></thead>
                    <tbody>
                      {sorted.map(ev => {
                        const d = new Date(ev.start + 'T00:00:00');
                        const cat = CAT_STYLES[ev.cat] || CAT_STYLES.other;
                        return (
                          <tr key={ev.id} className="hover:bg-gray-50 transition-colors">
                            <td className="px-4 py-3 border-b border-gray-100 text-sm">{d.getDate()} {MONTHS[d.getMonth()].slice(0,3)} {d.getFullYear()}</td>
                            <td className="px-4 py-3 border-b border-gray-100 text-sm font-semibold">{ev.title}</td>
                            <td className="px-4 py-3 border-b border-gray-100"><span className="inline-block px-2.5 py-0.5 rounded-full text-[11px] font-semibold" style={{background:cat.bg,color:cat.color}}>{ev.cat}</span></td>
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
          </>
        )}

        {/* ════════════ GALLERY TAB ════════════ */}
        {tab === 'gallery' && (
          <>
            {/* Upload / Edit Form */}
            <div className="bg-white p-6 rounded-2xl shadow-md mb-6">
              <h3 className="text-xl font-bold text-gray-900 mb-5">
                {editPhotoId ? '✏️ Edit Photo' : '🖼️ Add New Photo'}
              </h3>
              <form onSubmit={handlePhotoSubmit}>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {/* Left: File upload + preview */}
                  <div>
                    <label className={labelCls}>{editPhotoId ? 'Replace Image (optional)' : 'Upload Photo *'}</label>
                    <div
                      onClick={() => fileInputRef.current?.click()}
                      className="border-2 border-dashed border-gray-200 rounded-xl p-4 text-center cursor-pointer hover:border-[#027373] hover:bg-[#027373]/5 transition-all min-h-[180px] flex items-center justify-center"
                    >
                      {photoPreview ? (
                        <img src={photoPreview} alt="Preview" className="max-h-[160px] rounded-lg object-contain" />
                      ) : editPhotoId ? (
                        <div>
                          <div className="text-gray-400 text-3xl mb-2">📷</div>
                          <p className="text-sm text-gray-400">Click to replace image</p>
                          <p className="text-xs text-gray-300 mt-1">Leave empty to keep current image</p>
                        </div>
                      ) : (
                        <div>
                          <div className="text-gray-400 text-3xl mb-2">📷</div>
                          <p className="text-sm text-gray-400">Click to select a photo</p>
                          <p className="text-xs text-gray-300 mt-1">JPG, PNG or WebP · Max 5MB</p>
                        </div>
                      )}
                    </div>
                    <input
                      ref={fileInputRef}
                      type="file"
                      accept="image/*"
                      onChange={handleFileSelect}
                      className="hidden"
                    />
                  </div>

                  {/* Right: Caption + Category */}
                  <div className="flex flex-col gap-3">
                    <div>
                      <label className={labelCls}>Caption *</label>
                      <input
                        className={inputCls}
                        type="text"
                        value={photoForm.caption}
                        onChange={e => setPhotoForm({ ...photoForm, caption: e.target.value })}
                        required
                        placeholder="e.g. 56th Annual Agriculture Show"
                      />
                    </div>
                    <div>
                      <label className={labelCls}>Category *</label>
                      <select
                        className={inputCls}
                        value={photoForm.category}
                        onChange={e => setPhotoForm({ ...photoForm, category: e.target.value })}
                      >
                        {GALLERY_CATEGORIES.map(cat => (
                          <option key={cat} value={cat}>{cat}</option>
                        ))}
                      </select>
                    </div>
                    <div className="flex gap-2 mt-auto pt-2">
                      <button type="submit" className="bg-[#027373] hover:bg-[#015858] text-white px-7 py-2.5 rounded-full text-sm font-semibold transition-colors">
                        {editPhotoId ? 'Update Photo' : 'Add Photo'}
                      </button>
                      <button type="button" onClick={resetPhotoForm} className="bg-transparent text-gray-500 border border-gray-200 px-7 py-2.5 rounded-full text-sm transition-colors hover:bg-gray-50">
                        Clear
                      </button>
                    </div>
                  </div>
                </div>
              </form>
            </div>

            {/* Photo Grid */}
            <div className="bg-white rounded-2xl shadow-md overflow-hidden p-6">
              <h3 className="text-xl font-bold text-gray-900 mb-4">All Photos ({photos.length})</h3>
              {photos.length === 0 ? (
                <div className="p-12 text-center text-gray-400">No photos yet. Add your first photo above!</div>
              ) : (
                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
                  {photos.map(photo => (
                    <div key={photo.id} className="relative group rounded-xl overflow-hidden bg-gray-100 aspect-square">
                      <img
                        src={photo.src}
                        alt={photo.caption}
                        className="w-full h-full object-cover"
                      />
                      {/* Overlay with info + actions */}
                      <div className="absolute inset-0 bg-black/0 group-hover:bg-black/50 transition-all duration-300 flex flex-col items-center justify-center opacity-0 group-hover:opacity-100">
                        <p className="text-white text-sm font-medium text-center px-2 mb-1">{photo.caption}</p>
                        <span className="text-white/70 text-xs bg-white/20 px-2 py-0.5 rounded-full mb-3">{photo.category}</span>
                        <div className="flex gap-2">
                          <button
                            onClick={() => editPhoto(photo)}
                            className="bg-white text-[#027373] text-xs font-semibold px-3 py-1.5 rounded-lg hover:bg-gray-100 transition-colors"
                          >
                            Edit
                          </button>
                          <button
                            onClick={() => deletePhoto(photo.id)}
                            className="bg-white text-red-600 text-xs font-semibold px-3 py-1.5 rounded-lg hover:bg-gray-100 transition-colors"
                          >
                            Delete
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </>
        )}
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
