'use client';
import React, { useState, useEffect } from 'react';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { FiBell, FiBellOff } from 'react-icons/fi';
import { toast } from 'react-toastify';

interface NotifyButtonProps {
  category: string; // "accommodation" or "roommate"
  onToggle?: (enabled: boolean) => void;
}

const NotifyButton: React.FC<NotifyButtonProps> = ({ category, onToggle }) => {
  const [enabled, setEnabled] = useState(false);
  const [loading, setLoading] = useState(false);
  const { data: session, status } = useSession();
  const router = useRouter();

  useEffect(() => {
    const fetchPreference = async () => {
      if (status !== 'authenticated') return;
      try {
        const res = await fetch(`/api/notifications/preferences?category=${category}`);
        const data = await res.json();
        if (data.preference) {
          setEnabled(data.preference.enabled);
        }
      } catch (error) {
        console.error('Error loading preference:', error);
      }
    };

    fetchPreference();
  }, [status, category]);

 const toggleNotify = async () => {
  if (status !== 'authenticated') {
    toast.error('Please log in to manage notifications.');
    return;
  }

  // Special handling for 'roommate'
  if (category === 'roommate') {
    if (enabled) {
      // 👇 Turn off notification if it's already on
      setLoading(true);
      try {
        const res = await fetch('/api/notifications/preferences', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ category, enabled: false }),
        });

        const data = await res.json();

        if (res.ok && data.success) {
          setEnabled(false);
          if (onToggle) onToggle(false);
          toast.success('Notifications disabled for roommate');
        } else {
          toast.error(data.error || 'Error updating preference');
        }
      } catch (err) {
        console.error(err);
        toast.error('Network error');
      } finally {
        setLoading(false);
      }
    } else {
      // 👇 If it's off, redirect to add listing
      router.push('/add-listing?notifyRoommate=true');
    }
    return;
  }

  // ✅ Normal categories (accommodation, etc.)
  setLoading(true);
  const newEnabled = !enabled;

  try {
    const res = await fetch('/api/notifications/preferences', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ category, enabled: newEnabled }),
    });

    const data = await res.json();

    if (res.ok && data.success) {
      setEnabled(newEnabled);
      if (onToggle) onToggle(newEnabled);
      toast.success(`Notifications ${newEnabled ? 'enabled' : 'disabled'} for ${category}`);
    } else {
      toast.error(data.error || 'Error updating preference');
    }
  } catch (err) {
    console.error(err);
    toast.error('Network error');
  } finally {
    setLoading(false);
  }
};


  if (category !== 'accommodation' && category !== 'roommate') return null;

  return (
    <button
      onClick={toggleNotify}
      disabled={loading}
      className={`flex items-center space-x-2 px-4 py-2 rounded-md border transition
        ${enabled ? 'bg-amber-400 text-white border-amber-400' : 'bg-white border-teal-300 text-teal-700'}
        hover:${enabled ? 'bg-amber-500' : 'bg-teal-100'}
        ${loading ? 'opacity-50 cursor-not-allowed' : ''}
      `}
      aria-pressed={enabled}
      aria-label={enabled ? `Unsubscribe from ${category} notifications` : `Subscribe to ${category} notifications`}
      title={enabled ? `Unsubscribe from ${category} notifications` : `Subscribe to ${category} notifications`}
      type="button"
    >
      {enabled ? <FiBell size={20} /> : <FiBellOff size={20} />}
      <span>{enabled ? 'Notifications On' : 'Notify Me'}</span>
    </button>
  );
};

export default NotifyButton;
