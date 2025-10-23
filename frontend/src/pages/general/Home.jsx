import {useEffect,useState,useRef} from 'react'
import { useNavigate } from 'react-router-dom';

const Home = () => {
  const isDarkMode = true;
  const navigate = useNavigate();

  // Feed state from backend
  const [videos, setVideos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  // Redirect unauthenticated users
useEffect(() => {
    const isSignedIn = document.cookie
      .split(';')
      .some((cookie) => cookie.trim().startsWith('token='));
    if (!isSignedIn) {
      navigate('/register');
    }
  }, [navigate]);

  // Fetch feed from backend
useEffect(() => {
    let isMounted = true;
    async function fetchFeed() {
      try {
        setLoading(true);
        setError('');
        const res = await fetch('http://localhost:3000/api/food', {
          method: 'GET',
          credentials: 'include',
        });
        if (!res.ok) {
          throw new Error('Failed to load feed');
        }
        const data = await res.json();
        if (!isMounted) return;
        const mapped = (data.foodItems || []).map((it) => ({
          id: it.id,
          src: it.video,
          description: it.description || '',
          businessName: it.businessName || '',
          storeId: it.storeId || '',
        }));
        setVideos(mapped);
      } catch (e) {
        if (isMounted) setError(e.message || 'Something went wrong');
      } finally {
        if (isMounted) setLoading(false);
      }
    }
    fetchFeed();
    return () => { isMounted = false; };
  }, []);

  // Handle autoplay/pause for visible video
  const videoRefs = useRef([]);
  const setRef = (el, index) => {
    videoRefs.current[index] = el;
  };

useEffect(() => {
    const options = {
      root: null,
      threshold: [0.5, 0.75],
    };
    const handleIntersect = (entries) => {
      entries.forEach((entry) => {
        const el = entry.target;
        if (!(el instanceof HTMLVideoElement)) return;
        if (entry.isIntersecting && entry.intersectionRatio >= 0.5) {
          // Pause all others
          videoRefs.current.forEach((v) => {
            if (v && v !== el) {
              try { v.pause(); } catch {}
            }
          });
          // Play active
          try { el.play().catch(() => {}); } catch {}
        } else {
          try { el.pause(); } catch {}
        }
      });
    };
    const observer = new IntersectionObserver(handleIntersect, options);
    videoRefs.current.forEach((v) => v && observer.observe(v));
    return () => observer.disconnect();
  }, [videos.length]);

  const handleVisitStore = (storeId) => {
    // Navigate to store page (wire up real route when available)
    navigate(`/store/${storeId}`);
  };

  const handleLogout = async () => {
    try {
      // Try user logout first
      const res = await fetch('http://localhost:3000/api/auth/user/logout', {
        method: 'GET',
        credentials: 'include',
      });
      if (!res.ok) {
        // Fallback to food-partner logout
        await fetch('http://localhost:3000/api/auth/food-partner/logout', {
          method: 'GET',
          credentials: 'include',
        });
      }
    } catch (e) {
        console.error('Logout error:', e);
    } finally {
      document.cookie = 'token=; Max-Age=0; path=/';
      navigate('/register');
    }
  };

  // Mobile-only gate: show message on larger screens
  const [isMobile, setIsMobile] = useState(() => {
    if (typeof window === 'undefined') return true;
    return window.matchMedia('(max-width: 767px)').matches; // < md
  });

  useEffect(() => {
    if (typeof window === 'undefined') return;
    const mq = window.matchMedia('(max-width: 767px)');
    const handler = (e) => setIsMobile(e.matches);
    // Set initial
    setIsMobile(mq.matches);
    // Subscribe
    mq.addEventListener?.('change', handler);
    return () => mq.removeEventListener?.('change', handler);
  }, []);

  // If not mobile, show only the message and skip the rest of the UI
  if (!isMobile) {
    return (
      <div className={`min-h-screen flex items-center justify-center ${isDarkMode ? 'bg-black text-white' : 'bg-white text-gray-900'}`}>
        <div className="text-center p-8">
          <div className="mx-auto mb-6 flex h-14 w-14 items-center justify-center rounded-full bg-gray-800/60 text-white">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="h-7 w-7">
              <path d="M4 4h16v16H4z" opacity="0.2"/>
              <path d="M7 8h10M7 12h6"/>
            </svg>
          </div>
          <h1 className="text-xl font-semibold">Please use a smaller device</h1>
          <p className="mt-2 text-sm text-gray-400">This experience is optimized for mobile screens.</p>
        </div>
      </div>
    );
  }

  return (
    <div className={`min-h-screen ${isDarkMode ? 'bg-black text-white' : 'bg-white text-gray-900'}`}>
      {/* Top-right logout icon button (mobile only UI) */}
      <button
        onClick={handleLogout}
        aria-label="Logout"
        className="fixed right-3 top-3 z-20 inline-flex h-10 w-10 items-center justify-center rounded-full bg-black/50 text-white backdrop-blur hover:bg-black/70 focus:outline-none focus:ring-2 focus:ring-white/60"
        title="Logout"
      >
        {/* Icon: power/off */}
        <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="h-5 w-5">
          <path d="M12 2v10" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
          <path d="M6.22 6.22a8 8 0 1011.56 0" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
        </svg>
      </button>
      {/* Vertical snapping feed */}
      {loading && (
        <div className="h-screen w-screen flex items-center justify-center">Loading…</div>
      )}
      {error && !loading && (
        <div className="h-screen w-screen flex items-center justify-center text-red-400">{error}</div>
      )}
      {!loading && !error && (
        <div className="h-screen w-screen overflow-y-scroll snap-y snap-mandatory no-scrollbar">
        {videos.map((video, idx) => (
          <section
            key={video.id}
            className="relative h-screen w-full snap-start"
          >
            {/* Video */}
            <video
              ref={(el) => setRef(el, idx)}
              src={video.src}
              className="absolute inset-0 h-full w-full object-cover"
              muted
              playsInline
              loop
              preload="metadata"
            />

            {/* Bottom-left overlay (description + button) */}
            <div className="absolute left-0 right-0 bottom-0 z-10 p-4 sm:p-6">
              {/* Gradient for readability from bottom */}
              <div className="relative max-w-md">
                <div className="bg-slate-200 rounded-2xl ">
                  <p
                  className="text-sm sm:text-base font-medium leading-snug text-black/90 px-3 py-1"
                  style={{
                    display: '-webkit-box',
                    WebkitBoxOrient: 'vertical',
                    WebkitLineClamp: 2,
                    overflow: 'hidden',
                  }}
                  title={video.description}
                >
                  {video.description}
                </p>
                </div>
                
                <button
                  onClick={() => handleVisitStore(video.storeId)}
                  className="mt-3 inline-flex items-center justify-center rounded-full bg-white/90 px-4 py-2 text-sm font-semibold text-gray-900  backdrop-blur hover:bg-white focus:outline-none focus:ring-2 focus:ring-white/80 active:scale-[0.98]"
                >
                  Visit Store
                </button>
              </div>
            </div>
          </section>
        ))}
        </div>
      )}
    </div>
  );
}

export default Home

