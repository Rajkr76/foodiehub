import React, { useState } from 'react'
import axios from 'axios';

const CreateFood = () => {
    const isDarkMode = true;

    const [name, setName] = useState("");
    const [description, setDescription] = useState("");
    const [video, setVideo] = useState(null);
    const [loading, setLoading] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!name || !video) {
            alert("Please fill all the fields");
            return;
        }
        setLoading(true);
        const formData = new FormData();
        formData.append('name', name);
        formData.append('video', video);
        formData.append('description', description);

        try {
            const response = await axios.post('http://localhost:3000/api/food', formData, {
            withCredentials: true,
            headers: {
                'Content-Type': 'multipart/form-data',
            },
            });
            console.log(response.data);
            alert("Food created successfully");
            setName("");
            setDescription("");
            setVideo(null);
        } catch (error) {
            console.error(error);
            alert("Failed to create food");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen flex lg:items-center justify-center bg-gray-50 dark:bg-gray-900">
            <form
                onSubmit={handleSubmit}
                className={`w-full max-w-lg p-8 ${
                    isDarkMode ? 'bg-gray-800' : 'bg-white'
                } lg:rounded-2xl  shadow-2xl space-y-6`}
            >
                <h2
                    className={`text-3xl font-bold text-center ${
                        isDarkMode ? 'text-white' : 'text-gray-900'
                    }`}
                >
                    Create Food
                </h2>

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

                <textarea
                    id="food-description"
                    name="description"
                    placeholder="Food Description (optional)"
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    className="w-full px-4 py-3 rounded-lg border focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-700 dark:text-white dark:border-gray-600 min-h-[120px]"
                />

                <div className="space-y-2">
                    <label
                        htmlFor="food-video"
                        className={`block text-sm font-medium ${
                            isDarkMode ? 'text-gray-300' : 'text-gray-700'
                        }`}
                    >
                        Upload Video
                    </label>
                    <input
                        id="food-video"
                        name="video"
                        type="file"
                        accept="video/*"
                        onChange={(e) => setVideo(e.target.files?.[0] || null)}
                        className={`w-full file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold ${
                            isDarkMode
                                ? 'file:bg-gray-700 file:text-white text-gray-300'
                                : 'file:bg-blue-50 file:text-blue-700 text-gray-700'
                        }`}
                        required
                    />
                    {video && (
                        <p className="text-xs text-gray-400">Selected: {video.name}</p>
                    )}
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
