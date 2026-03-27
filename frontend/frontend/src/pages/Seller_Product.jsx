import { useEffect, useState } from "react";
import axios from "axios";

const Seller_Product = () => {

    const [data, setData] = useState([]);

    useEffect(() => {
        FetchApiData();
    }, []);

    const FetchApiData = async () => {
        try {
            const res = await axios.get("http://localhost:5000/api/sellerproduct/all");
          
            setData(res.data);
        } catch (err) {
            console.log(err);
        }
    };

    return (
        <>
            <div className="max-w-[1300px] mx-auto px-4 sm:px-6 py-8">

                <h2 className="text-xl sm:text-2xl font-semibold mb-6 text-center sm:text-left">
                    Our Best Sellers
                </h2>

                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">

                    {data.map((item, index) => (
                        <div
                            key={index}
                            className="bg-white p-4 shadow rounded-lg hover:shadow-lg transition duration-300"
                        >
                            <img
                                src={item.Image}
                                alt={item.Image_Name}
                                className="w-full h-[200px] sm:h-[220px] md:h-[240px] object-contain mb-4"
                            />

                            <h3 className="text-base sm:text-lg font-medium">
                                {item.Image_Name}
                            </h3>

                            <p className="text-gray-500 text-xs sm:text-sm mt-1 line-clamp-2">
                                {item.Image_Description}
                            </p>

                            <p className="text-black font-semibold mt-2 text-sm sm:text-base">
                                ₹ {item.price}
                            </p>

                            <button className="mt-4 w-full bg-black text-white py-2 text-sm sm:text-base hover:bg-gray-800 transition">
                                Select Size
                            </button>

                        </div>
                    ))}

                </div>
            </div>
          
        </>
    );
};

export default Seller_Product;