import React, { useState, useEffect } from 'react';
import axios from 'axios';

const AiSkinWorks = () => {
    const [data, setData] = useState(null);
    const [activeTab, setActiveTab] = useState(0);

    useEffect(() => {
        const fetchData = async () => {
            try {
                // Try fetching from /all to be safe, or handle array from root
                const res = await axios.get('http://localhost:5000/api/ai_skin_works/all');
                if (Array.isArray(res.data)) {
                    setData(res.data[0]); // Take the first section
                } else {
                    setData(res.data);
                }
            } catch (err) {
                console.error("Error fetching AI Skin Works data", err);
            }
        };
        fetchData();
    }, []);

    // If no data, show a placeholder or nothing
    if (!data) {
        return (
             <section className="bg-black text-white py-16 px-4 text-center">
                <p>Loading AI Skin Profile...</p>
             </section>
        );
    }

    return (
        <section className="bg-black text-white py-16 px-4">
            <div className="max-w-6xl mx-auto text-center">
                {/* Heading Area */}
                <div className="mb-6">
                    <h2 className="text-3xl md:text-4xl font-bold mb-4 uppercase tracking-[0.2em] border border-gray-600 inline-block px-12 py-3 bg-black">
                        {data.Heading || "How AI works"}
                    </h2>
                </div>
                
                <div className="mb-4">
                    <h3 className="text-lg md:text-xl font-semibold uppercase tracking-widest border border-gray-600 inline-block px-8 py-2">
                        {data.SubHeading || "A COMPLETE SKIN PROFILE"}
                    </h3>
                </div>

                <p className="text-gray-400 max-w-2xl mx-auto mb-12 text-sm font-light tracking-wide">
                    {data.Description || "Detect and analyze your skin strengths and areas of focus across 9 different skin concerns, such as"}
                </p>

                {/* Tabs Row */}
                <div className="flex flex-wrap justify-center gap-2 mb-12 border border-white/20 p-4 rounded-sm bg-black/50">
                    {data.Concerns && data.Concerns.map((concern, index) => (
                        <button
                            key={index}
                            onClick={() => setActiveTab(index)}
                            className={`px-6 py-2 text-xs md:text-sm font-semibold transition-all duration-300 ${
                                activeTab === index
                                    ? 'bg-white text-black'
                                    : 'bg-transparent text-white border border-white/20 hover:border-white'
                            }`}
                        >
                            {concern.name}
                        </button>
                    ))}
                </div>

                {/* Image Comparison Area */}
                <div className="relative w-full max-w-5xl mx-auto aspect-[16/10] md:aspect-[21/9] overflow-hidden border-2 border-red-900/50 shadow-2xl shadow-red-900/10">
                    {data.Concerns && data.Concerns[activeTab] && (
                        <div className="flex w-full h-full">
                            <div className="relative w-1/2 h-full border-r border-white/10">
                                <img
                                    src={data.Concerns[activeTab].beforeImage.startsWith('http') ? data.Concerns[activeTab].beforeImage : `http://localhost:5000/uploads/${data.Concerns[activeTab].beforeImage}`}
                                    alt="Before"
                                    className="w-full h-full object-cover"
                                />
                                <div className="absolute top-4 left-4 bg-black/80 backdrop-blur-sm border border-white/20 px-4 py-1.5 text-[10px] font-bold uppercase tracking-widest rounded-sm">
                                    Before
                                </div>
                            </div>
                            <div className="relative w-1/2 h-full">
                                <img
                                    src={data.Concerns[activeTab].afterImage.startsWith('http') ? data.Concerns[activeTab].afterImage : `http://localhost:5000/uploads/${data.Concerns[activeTab].afterImage}`}
                                    alt="After"
                                    className="w-full h-full object-cover"
                                />
                                <div className="absolute top-4 right-4 bg-black/80 backdrop-blur-sm border border-white/20 px-4 py-1.5 text-[10px] font-bold uppercase tracking-widest rounded-sm">
                                    After  
                                </div>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </section>
    );
};

export default AiSkinWorks;
