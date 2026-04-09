import axios from "axios";
import { useEffect, useState } from "react";

const Skin_analysis = () => {
    const [data, setData] = useState([]);

    useEffect(() => {
        FetchApiData();
    }, []);

    async function FetchApiData() {
        try {
            const res = await axios.get("http://localhost:5000/api/skin_analysis/all");
            setData(res.data);
        } catch (err) {
            console.log(err);
        }
    }

    return (
        <div className="bg-gray-100 py-16 px-4 text-center">

            <h1 className="text-3xl md:text-4xl font-semibold mb-16">
                How to take your picture for skin analysis?
            </h1>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-16 max-w-6xl mx-auto">

                {data.map((item, index) => (
                    <div key={index} className="relative flex flex-col items-center">

                        {/* BIG NUMBER (BACKGROUND STYLE) */}
                        <span className="absolute -left-6 md:-left-10 top-20 text-[120px] font-bold text-black opacity-90 -z-0">
                            {index + 1}
                        </span>

                        {/* PHONE STYLE CONTAINER */}
                        <div className="relative z-10 bg-black p-2 rounded-[30px] shadow-xl">
                            <img
                                src={`http://localhost:5000/uploads/${item.Image}`}
                                alt={item.Heading}
                                className="w-44 h-80 object-cover rounded-[20px]"
                            />
                        </div>

                        {/* TEXT */}
                        <h2 className="mt-6 text-lg font-semibold">
                            {item.Heading}
                        </h2>

                        <p className="text-gray-500 text-sm mt-2 max-w-xs">
                            {item.Paragraph}
                        </p>

                    </div>
                ))}

            </div>

            {/* BUTTON */}
            <div className="mt-12">
                <button className="bg-black text-white px-8 py-3 rounded-md hover:bg-gray-800 transition">
                    Try Now
                </button>
            </div>
        </div>
    );
};

export default Skin_analysis;