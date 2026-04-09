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


            <h1 className="text-3xl md:text-4xl font-semibold mb-12">
                How to take your picture for skin analysis?
            </h1>


            <div className="grid grid-cols-1 md:grid-cols-3 gap-10 max-w-6xl mx-auto">

                {data.map((item, index) => (
                    <div key={index} className="flex flex-col items-center">

                        <div className="text-6xl font-bold text-black mb-4">
                            {index + 1}
                        </div>

                        <div className="w-40 h-72 rounded-3xl overflow-hidden shadow-lg mb-6">
                            <img
                                src={`http://localhost:5000/uploads/${item.Image}`}
                                alt={item.Heading}
                                className="w-full h-full object-cover"
                            />
                        </div>


                        <h2 className="text-lg font-semibold mb-2">
                            {item.Heading}
                        </h2>
                        <p className="text-gray-500 text-sm max-w-xs">
                            {item.Paragraph}
                        </p>

                    </div>
                ))}
            </div>


            <div className="mt-12">
                <button className="bg-black text-white px-8 py-3 rounded-md hover:bg-gray-800 transition">
                    Try Now
                </button>
            </div>
        </div>
    );
};

export default Skin_analysis;