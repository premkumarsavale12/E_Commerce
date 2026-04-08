import axios from "axios";
import { useEffect, useState } from "react";

export default function Skin_insights() {
    const [data, setData] = useState([]);

    useEffect(() => {
        FetchApiData();
    }, []);

    async function FetchApiData() {
        try {
            const res = await axios.get("http://localhost:5000/api/skin_insights/all");
            setData(res.data);
        } catch (err) {
            console.log(err);
        }
    }

    return (
        <div className="w-full min-h-screen bg-gray-100 flex items-center justify-center px-4">
            {data?.map((item, index) => (
                <div
                    key={index}
                    className="max-w-6xl w-full grid grid-cols-1 md:grid-cols-2 gap-10 items-center"
                >
                    {/* LEFT IMAGE */}
                    <div className="w-full flex justify-center">
                        <img
                            src={`http://localhost:5000/uploads/${item.Image}`}
                            alt="skin"
                            className="w-full max-w-md object-cover rounded-xl shadow-lg"
                        />
                    </div>

                    {/* RIGHT CONTENT */}
                    <div className="text-center md:text-left space-y-5">
                        <h1 className="text-3xl md:text-4xl font-bold text-gray-800">
                            {item.Heading}
                        </h1>

                        <p className="text-gray-600 text-lg">
                            {item.Description}
                        </p>

                        <button className="bg-black text-white px-6 py-3 rounded-md hover:bg-gray-800 transition">
                            {item.Button}
                        </button>

                        <p className="text-sm text-gray-500">
                            {item.Paragraph}
                        </p>
                    </div>
                </div>
            ))}
        </div>
    );
}