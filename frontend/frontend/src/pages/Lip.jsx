import axios from "axios";
import { useEffect, useState } from "react";

export default function LipProduct() {
    const [data, setData] = useState([]);

    useEffect(() => {
        FetchApiData();

    }, []);

    const FetchApiData = async () => {
        try {

            const res = await axios.get("http://localhost:5000/api/lip/all ");
            console.log(res.data)
            setData(res.data);
        }
        catch (err) {


            console.log(err);
        }
    }

    return (
        <div className="flex max-w-[1300px] mx-auto">
            {/* LEFT SIDE PRODUCTS */}
            <div className="w-full md:w-3/4 p-6">
                <h2 className="text-2xl font-semibold mb-6">Lip  Products</h2>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                    {data.map((item) => (
                        <div
                            key={item._id}
                            className="border rounded-xl p-4 shadow-sm hover:shadow-md transition"
                        >
                            <img
                                src={item.Image}
                                className="w-full h-48 object-contain mb-4"
                            />

                            <h3 className="font-medium text-lg">{item.Image_Name}</h3>
                            <p className="text-gray-500 text-sm mb-2">
                                {item.Image_Description}
                            </p>

                            <div className="flex items-center gap-2 mb-3">
                                <span className="font-semibold text-black">
                                    {item.Price}
                                </span>

                            </div>

                            <button className="w-full bg-black text-white py-2 rounded-md hover:bg-gray-800">
                                {item.Button}
                            </button>
                        </div>
                    ))}
                </div>
            </div>

            {/* RIGHT SIDE (optional sidebar) */}
            <div className="hidden md:block w-1/4 p-6 bg-gray-50 mt-16 border-l">
                <h3 className="font-semibold mb-4">Filters</h3>
                <p className="text-sm text-gray-500">Add filters here</p>
            </div>
        </div>
    );
}
