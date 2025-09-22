import React from 'react';
import { useParams } from 'react-router-dom';

// Mobile-first partner profile
// Layout per sketch: avatar (circle) + BusinessName + address, then a 3x2 grid of videos/thumbnails
const Profile = () => {
  const { storeId } = useParams();
  const isDark = true;

  const [partner, setPartner] = React.useState({ businessName: '', address: '' });
  const [items, setItems] = React.useState([]);
  const [loading, setLoading] = React.useState(true);
  const [error, setError] = React.useState('');

  React.useEffect(() => {
    let mounted = true;
    async function fetchStore() {
      try {
        setLoading(true);
        setError('');
        const res = await fetch(`http://localhost:3000/api/food?storeId=${storeId}`, {
          credentials: 'include',
        });
        if (!res.ok) throw new Error('Failed to load store');
        const data = await res.json();
        if (!mounted) return;
        const list = data.foodItems || [];
        setItems(list);
        if (list.length > 0) {
          setPartner({
            businessName: list[0].businessName || '',
            address: list[0].address || '',
          });
        }
      } catch (e) {
        if (mounted) setError(e.message || 'Something went wrong');
      } finally {
        if (mounted) setLoading(false);
      }
    }
    if (storeId) fetchStore();
    return () => { mounted = false; };
  }, [storeId]);

  if (loading) {
    return (
      <div className={`min-h-screen flex items-center justify-center ${isDark ? 'bg-black text-white' : 'bg-white text-gray-900'}`}>
        Loading…
      </div>
    );
  }
  if (error) {
    return (
      <div className={`min-h-screen flex items-center justify-center ${isDark ? 'bg-black text-white' : 'bg-white text-gray-900'}`}>
        {error}
      </div>
    );
  }

  return (
    <div className={`min-h-screen ${isDark ? 'bg-black text-white' : 'bg-white text-gray-900'}`}>
      <div className="mx-auto w-full max-w-md p-4">
        {/* Header */}
        <div className="flex items-center gap-4 py-4">
          <div className="h-20 w-20 rounded-full bg-gray-700/60 border border-white/10" />
          <div className="flex-1">
            <h1 className="text-lg font-semibold">{partner.businessName || 'Store'}</h1>
            <p className="text-sm text-gray-400">{partner.address || 'Address not available'}</p>
          </div>
        </div>

        {/* Grid 3 x 2 per sketch (auto-fill) */}
        <div className="mt-4 grid grid-cols-3 gap-2">
          {items.slice(0, 6).map((it) => (
            <div key={it.id} className="aspect-square overflow-hidden rounded-md bg-gray-800">
              {/* thumbnail: show video element posterless muted or simple cover */}
              <video
                src={it.video}
                className="h-full w-full object-cover"
                muted
                playsInline
              />
            </div>
          ))}
          {items.length === 0 && (
            <div className="col-span-3 text-center text-sm text-gray-400 py-8">
              No items yet.
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Profile;
