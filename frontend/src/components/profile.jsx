
import {useState , useEffect} from 'react';
import { useParams } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import { ArrowLeftFromLine } from 'lucide-react';

// Mobile-first partner profile

const Profile = () => {
  const { storeId } = useParams();
  const isDark = true;

  const [partner, setPartner] = useState({ businessName: '', address: '' });
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [selectedVideo, setSelectedVideo] = useState(null);

  const navigate = useNavigate();
  const backtohome = ()=>{
    navigate(-1);
  }

  useEffect(() => {
    let mounted = true;
    async function fetchStore() {
      try {
        setLoading(true);
        setError('');
        const res = await fetch(`https://backend-food-x7ic.onrender.com/api/food?storeId=${encodeURIComponent(storeId)}`, {
          credentials: 'include',
        });
        if (!res.ok) throw new Error('Failed to load store');
        const data = await res.json();
        if (!mounted) return;
        const list = data.foodItems || [];
        setItems(list);
        
        // Set partner info from food items if available, otherwise from businessInfo
        if (list.length > 0) {
          setPartner({
            businessName: list[0].businessName || '',
            address: list[0].address || '',
          });
        } else if (data.businessInfo) {
          setPartner({
            businessName: data.businessInfo.businessName || '',
            address: data.businessInfo.address || '',
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

  const isValidStoreId = typeof storeId === 'string' && /^[a-f\d]{24}$/i.test(storeId);
  if (!storeId || !isValidStoreId) {
    return (
      <div className={`min-h-screen flex items-center justify-center ${isDark ? 'bg-black text-white' : 'bg-white text-gray-900'}`}>
        Invalid store URL.
      </div>
    );
  }

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
       
          <ArrowLeftFromLine size={25} color="#ffffff" strokeWidth={1.5} onClick={backtohome} className=" cursor-pointer"/>
       
        {/* Header */}
        <div className="flex items-center gap-4 py-4">

          {/*this is for foodpartner image profile photo*/}

          <div className={`h-20 w-20 rounded-full bg-gray-700/60 border border-white/10`}>
          </div>

          <div className="flex-1">
            <h1 className="text-lg font-semibold">{partner.businessName || 'Store'}</h1>
            <p className="text-sm text-gray-400">{partner.address || 'Address not available'}</p>
          </div>
        </div>

        {/* Grid 3 x 2 per sketch (auto-fill) */}
        <div className="mt-4 grid grid-cols-3 gap-2">
          {items.slice(0, 6).map((it) => (
            <div key={it.id} className="aspect-square overflow-hidden rounded-md bg-gray-800" onClick={()=> setSelectedVideo(it.video)}>
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

      {/* fullscreen video modal */}
      {selectedVideo && ( 
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-75">
          <div className="relative">
            <button className="absolute top-10 right-5 z-99 text-black" onClick={() => setSelectedVideo(null)}>
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-x-icon lucide-x"><path d="M18 6 6 18"/><path d="m6 6 12 12"/></svg>
            </button>
            <video
              src={selectedVideo}
              className="h-full w-full object-cover"
              controls
              autoPlay
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default Profile;
