import React, { useState } from 'react'
import axios from 'axios';
import { ArrowLeftFromLine } from 'lucide-react';
import { useNavigate, useParams } from 'react-router-dom';

const CreateFood = () => {
    const isDarkMode = true;
    const navigate = useNavigate();
    const { storeId } = useParams();
    const backtoprofile = ()=>{
        navigate(-1);
    }

    const [name, setName] = useState("");
    const [price, setPrice] = useState(""); // added
    const [description, setDescription] = useState("");
    const [image, setImage] = useState(null); // added
    const [imagePreview, setImagePreview] = useState(null); // added
    const [video, setVideo] = useState(null);
    const [loading, setLoading] = useState(false);

    const MAX_IMG_MB = 5;
    const MAX_VIDEO_MB = 20;

    const handleImageUpload = (event) => {
        const file = event.target.files?.[0];
        if (!file) return;

        const sizeMb = file.size / (1024 * 1024);
        if (sizeMb > MAX_IMG_MB) {
            alert(`Image exceeds ${MAX_IMG_MB}MB.`);
            event.target.value = null;
            setImage(null);
            setImagePreview(null);
            return;
        }
        setImage(file);
        setImagePreview(URL.createObjectURL(file));
    };

    const handleVideoUpload = (event) => {
        const file = event.target.files?.[0];
        if (!file) return;

        const sizeMb = file.size / (1024 * 1024);
        if (sizeMb > MAX_VIDEO_MB) {
            alert(`Video exceeds ${MAX_VIDEO_MB}MB.`);
            event.target.value = null;
            setVideo(null);
            return;
        }
        setVideo(file);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!name || !price || !image || !video) {
            alert("Please provide name, price, image, and video.");
            return;
        }

        const numericPrice = Number(price);
        if (Number.isNaN(numericPrice) || numericPrice <= 0) {
            alert("Price must be a positive number.");
            return;
        }

        setLoading(true);
        const formData = new FormData();
        formData.append('name', name);
        formData.append('price', numericPrice); // model requires number
        formData.append('image', image);        // model requires image
        formData.append('video', video);        // model requires video
        formData.append('description', description);

        // Debug: Log form data contents
        console.log('FormData contents:');
        for (let [key, value] of formData.entries()) {
            console.log(key, value);
        }

        try {
            const endpoint = storeId
        ? `http://localhost:3000/api/stores/${storeId}/foods`
        : `http://localhost:3000/api/food`;
        
            const response = await axios.post(
                endpoint,
                formData,
                {
                    withCredentials: true,
                    headers: { 'Content-Type': 'multipart/form-data' },
                     timeout: 30000,
                }
            );
            console.log(response.data);
            alert("Food created successfully");

            // reset
            setName("");
            setPrice("");
            setDescription("");
            setImage(null);
            setImagePreview(null);
            setVideo(null);
        } catch (error) {
            console.error(error);
            alert(error?.response?.data?.message || "Failed to create food");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen flex lg:items-center justify-center bg-gray-50 dark:bg-gray-900">
            <ArrowLeftFromLine size={25} color="#ffffff" strokeWidth={1.5} className="absolute top-3 left-4 cursor-pointer" onClick={backtoprofile} />
            <form
                onSubmit={handleSubmit}
                className={`w-full max-w-lg p-8 ${isDarkMode ? 'bg-gray-800' : 'bg-white'} lg:rounded-2xl shadow-2xl space-y-6`}
            >
                <h2 className={`text-3xl font-bold text-center ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
                    Create Food
                </h2>

                {/* Name */}
                <input
                    type="text"
                    id="food-name"
                    name="name"
                    placeholder="Food Name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="w-full px-4 py-3 rounded-lg border focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-700 dark:text-white dark:border-gray-600"
                    required
                />

                {/* Price */}
                <input
                    type="number"
                    step="0.01"
                    min="0"
                    id="food-price"
                    name="price"
                    placeholder="Price (e.g. 9.99)"
                    value={price}
                    onChange={(e) => setPrice(e.target.value)}
                    className="w-full px-4 py-3 rounded-lg border focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-700 dark:text-white dark:border-gray-600"
                    required
                />

                {/* Description */}
                <textarea
                    id="food-description"
                    name="description"
                    placeholder="Food Description (optional)"
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    className="w-full px-4 py-3 rounded-lg border focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-700 dark:text-white dark:border-gray-600 min-h-[120px]"
                />

                {/* Image */}
                <div className="space-y-2">
                    <label
                        htmlFor="food-image"
                        className={`block text-sm font-medium ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}
                    >
                        Upload Image
                    </label>
                    <input
                        id="food-image"
                        name="image"
                        type="file"
                        accept="image/*"
                        onChange={handleImageUpload}
                        className={`w-full file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold ${
                            isDarkMode ? 'file:bg-gray-700 file:text-white text-gray-300' : 'file:bg-blue-50 file:text-blue-700 text-gray-700'
                        }`}
                        required
                    />
                    {imagePreview && (
                        <img
                            src={imagePreview}
                            alt="Preview"
                            className="mt-2 h-28 w-28 object-cover rounded-md border border-gray-600"
                        />
                    )}
                </div>

                {/* Video */}
                <div className="space-y-2">
                    <label
                        htmlFor="food-video"
                        className={`block text-sm font-medium ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}
                    >
                        Upload Video
                    </label>
                    <input
                        id="food-video"
                        name="video"
                        type="file"
                        accept="video/*"
                        onChange={handleVideoUpload}
                        className={`w-full file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold ${
                            isDarkMode ? 'file:bg-gray-700 file:text-white text-gray-300' : 'file:bg-blue-50 file:text-blue-700 text-gray-700'
                        }`}
                        required
                    />
                    {video && <p className="text-xs text-gray-400">Selected: {video.name}</p>}
                    <p className="text-xs text-gray-500">Max image: {MAX_IMG_MB}MB. Max video: {MAX_VIDEO_MB}MB.</p>
                </div>

                <button
                    type="submit"
                    disabled={loading}
                    className="w-full py-3 font-semibold rounded-lg bg-blue-600 text-white hover:bg-blue-700 focus:ring-4 focus:ring-blue-300 disabled:opacity-50 disabled:cursor-not-allowed transition duration-200"
                >
                    {loading ? 'Uploading... please wait....' : 'Save Food'}
                </button>
            </form>
        </div>
    );
}

export default CreateFood;
