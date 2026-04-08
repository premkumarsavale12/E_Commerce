import { useState, useEffect } from "react";
import axios from "axios";

const Ai_Powered = () => {
    const [data, setData] = useState([]);

    useEffect(() => {
        FetchApiData();
    }, []);

    async function FetchApiData() {
        try {
            const res = await axios.get(
                "http://localhost:5000/api/ai_powered/all"
            );
            setData(res.data);
        } catch (err) {
            console.log(err);
        }
    }

    return (

        <div className="w-full bg-gray-100 py-16 px-6  -mt-[170px] flex justify-center">
            <div className="max-w-7xl w-full">
                {data.map((item, index) => (
                    <div
                        key={index}
                        className="grid md:grid-cols-2 gap-12 items-center"
                    >
                        {/* LEFT CONTENT */}
                        <div>
                            <h1 className="text-4xl md:text-5xl font-bold text-black mb-4 leading-tight">
                                {item.Heading}
                            </h1>

                            <h2 className="text-xl md:text-2xl font-medium text-gray-700 mb-6">
                                {item.SubHeading}
                            </h2>

                            <ul className="space-y-3 text-gray-600 mb-8">{item.Paragraph}

                            </ul>



                        </div>

                        {/* RIGHT IMAGE */}
                        <div className="flex justify-center">
                            <div className="relative">
                                <img
                                    src={`http://localhost:5000/uploads/${item.Image}`}
                                    alt="AI Skin"
                                    className="w-[260px] sm:w-[300px] md:w-[360px] rounded-[30px] shadow-2xl object-cover"
                                />

                                {/* Optional markers (like your UI image) */}
                                <div className="absolute top-[30%] left-[50%] w-3 h-3 bg-red-500 rounded-full"></div>
                                <div className="absolute top-[55%] left-[35%] w-3 h-3 bg-yellow-400 rounded-full"></div>
                                <div className="absolute top-[65%] left-[60%] w-3 h-3 bg-green-500 rounded-full"></div>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Ai_Powered;