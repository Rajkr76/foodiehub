import React, { useState , useEffect} from "react";
import { CircleUserRound, Search, ArrowLeft } from "lucide-react";
import axios from "axios";
import { useNavigate , useParams} from "react-router-dom";
import FoodCard from "../../components/foodCard";
import Footer from "../../components/footer";

const FoodHome = () => {
  const navigate = useNavigate();
  const { storeId } = useParams();
  const [foods, setFoods] = useState([]);
  const [loadmore, setLoadMore] = useState(4);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(false);
  const [err, setErr] = useState(null);

  const backToProfile = () => navigate(-1);
  const loadMore = () => {
    setLoadMore((prev) => prev + 20);
  };

  useEffect(() => {
    
  const fetchFoods = async()=>{    setLoading(true);
    setErr(null);
    try{
      const res = await axios.get(`http://localhost:3000/api/food/stores/${storeId}/foods`, {
        withCredentials: true,
      });
      const data = res.data;
      const list = Array.isArray(data) ? data : [];
      setFoods(list);
    } catch (error) {
      setErr(error?.response?.data?.message || error.message || "Something went wrong");
    } finally {
      setLoading(false);
    }
  }
  if(storeId) fetchFoods();
  }, [storeId])
  
  const filtered = foods.filter(f =>
    f.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <>
      <div>
        {/* Navbar */}
        <nav className="h-16 w-full flex justify-between items-center">
          <ArrowLeft size={24} color="#121212" className="ml-3" onClick={backToProfile} />
          <h1 className="ml-4 text-red-400 p-2 rounded text-xl font-bold">FoodhieHub</h1>
          <CircleUserRound size={32} className="mr-4" />
        </nav>
        <hr className="text-slate-300" />

        {/* Search */}
        <div className="w-auto h-10 ml-4 mr-4 my-4 rounded flex items-center justify-center bg-slate-300">
          <input
            type="text"
            className="h-10 w-full px-3 my-4 rounded text-[#000000] font-base"
            placeholder="Search for food"
             value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
          <Search size={24} color="#5e5e5e" className="mr-4 " />
        </div>

        {loading && <p className="px-4">Loading...</p>}
        {err && <p className="px-4 text-red-500">{err}</p>}
        {!loading && !err && filtered.length === 0 && (
          <p className="px-4">No foods found.</p>
        )}

        {/* Food Cards - Only image and name */}
        <div className="grid grid-cols-2 grid-rows-2 pb-24  w-full my-4 px-4 gap-y-14 gap-x-4 transition-all duration-500 ease-in-out sm:grid-cols-3 md:grid-cols-4">
          {filtered.slice(0, loadmore).map((item) => (
            <div
              key={item._id || item.id}
              onClick={() => navigate("/fooditem", { state: { id: item._id || item.id, name: item.name, image: item.image } })}
              className="cursor-pointer"
            >
              <FoodCard name={item.name} image={item.image || "/placeholder-food.png"} />
            </div>
          ))}
        </div>

        {loadmore < foods.length && (
          <div className=" flex w-auto rounded-xl justify-center items-center h-0 ">
            
            <h1 className="bg-green-400 rounded-xl w-30 text-center p-2  text-white mb-15 z-20" onClick={loadMore}>load more

            </h1>
          </div>
        )}

        <div className="fixed bottom-0 left-0 w-full sm:static sm:mt-auto">
          <Footer />
        </div>
      </div>


    </>
  );
};
export default FoodHome;