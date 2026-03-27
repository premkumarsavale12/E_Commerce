import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../component/Navbar";
import Footer from "./Footer";

const Collection = () => {
    const navigate = useNavigate();
    const [data, setData] = useState([]);

    useEffect(() => {
        FetchApiData();
    }, []);

    const FetchApiData = async () => {
        try {
            const res = await axios.get("http://localhost:5000/api/collection/all");
            console.log("API Response:", res.data);
            setData(res.data);
        } catch (err) {
            console.error("Error fetching shop data:", err);
        }
    };

    const handleCardClick = (itemName) => {
        if (!itemName) return;
        const name = itemName.toLowerCase();

        if (name.includes("body")) {
            navigate("/body");
        } else if (name.includes("skin") || name.includes("launch")) {
            navigate("/skin");
        } else if (name.includes("hair-rpoduct") || name.includes("hair")) {
            navigate("/hair-product");
        } else if (name.includes("lip")) {
            navigate("/lip");
        } else if (name.includes("best_seller") || name.includes("best-seller") || name.includes("best seller") || name.includes("bestseller")) {
            navigate("/best_seller");
        } else if (name.includes("concern")) {
            navigate("/concern");
        } else {
            // Fallback or generic dynamic route
            navigate("/body");
        }
    };

    return (
        <div className="min-h-screen bg-white">
            <Navbar />

            <main className="max-w-[1300px] mx-auto px-6 py-12">
                <h1 className="text-3xl font-semibold mb-10 tracking-tight">
                    Collections
                </h1>

                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-x-6 gap-y-10">
                    {data.length > 0 ? (
                        data.map((item, index) => (
                            <div
                                key={index}
                                className="group cursor-pointer"
                                onClick={() => handleCardClick(item.Image_Name)}
                            >
                                <div className="aspect-[3/4] overflow-hidden bg-gray-100 rounded-lg mb-4">
                                    <img
                                        src={item.Image}
                                        alt={item.Image_Name}
                                        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                                    />
                                </div>
                                <h3 className="text-[15px] font-medium text-center text-gray-800 group-hover:text-gray-600 transition-colors">
                                    {item.Image_Name}
                                </h3>
                            </div>
                        ))
                    ) : (
                        <div className="col-span-full py-20 text-center text-gray-400">
                            No products found in collections.
                        </div>
                    )}
                </div>
            </main>

            <Footer />
        </div>
    );
};

export default Collection;
