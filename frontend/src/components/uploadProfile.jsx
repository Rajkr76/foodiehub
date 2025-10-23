import Profile from './profile';
import { useNavigate } from 'react-router-dom';

const UploadProfile = () => {

    const navigate = useNavigate();

    const handleUpload = () =>{
        navigate('/createfood');
    }
  return (
    <div className="relative">
        <button className='rounded-2xl bg-slate-900 text-white p-3 absolute top-4 right-4 z-10 cursor-pointer' onClick={handleUpload}>
         Upload food
        </button>
      <Profile  />
    </div>
  )
}

export default UploadProfile