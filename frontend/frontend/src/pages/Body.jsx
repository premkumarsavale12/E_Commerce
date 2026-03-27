import axios from "axios";
import { useEffect, useState } from "react";

export default function BodyProducts() {
    const [data, setData] = useState([]);
    const [filteredData, setFilteredData] = useState([]);


    const [selectedCategory, setSelectedCategory] = useState("");
    const [selectedPrice, setSelectedPrice] = useState("");

    useEffect(() => {
        FetchApiData();
    }, []);

    useEffect(() => {
        applyFilters();
    }, [data, selectedCategory, selectedPrice]);

    const FetchApiData = async () => {
        try {
            const res = await axios.get("http://localhost:5000/api/body/all");
            setData(res.data);
            setFilteredData(res.data);
        } catch (err) {
            console.log(err);
        }
    };

  
    const applyFilters = () => {
        let temp = [...data];

     
        if (selectedCategory) {
            temp = temp.filter((item) =>
                item.Image_Description
                    .toLowerCase()
                    .includes(selectedCategory.toLowerCase())
            );
        }

       
        if (selectedPrice === "low") {
            temp = temp.filter((item) => item.Price < 400);
        } else if (selectedPrice === "mid") {
            temp = temp.filter(
                (item) => item.Price >= 400 && item.Price <= 700
            );
        } else if (selectedPrice === "high") {
            temp = temp.filter((item) => item.Price > 700);
        }

        setFilteredData(temp);
    };

    return (
        <div className="flex max-w-[1300px] mx-auto">
            {/* LEFT SIDE PRODUCTS */}
            <div className="w-full md:w-3/4 p-6">
                <h2 className="text-2xl font-semibold mb-6">Body Products</h2>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                    {filteredData.map((item) => (
                        <div
                            key={item._id}
                            className="border rounded-xl p-4 shadow-sm hover:shadow-md transition"
                        >
                            <img
                                src={item.Image}
                                className="w-full h-48 object-contain mb-4"
                            />

                            <h3 className="font-medium text-lg">
                                {item.Image_Name}
                            </h3>
                            <p className="text-gray-500 text-sm mb-2">
                                {item.Image_Description}
                            </p>

                            <div className="mb-3 font-semibold">
                                ₹ {item.Price}
                            </div>

                            <button className="w-full bg-black text-white py-2 rounded-md hover:bg-gray-800">
                                {item.Button}
                            </button>
                        </div>
                    ))}
                </div>
            </div>

            {/* RIGHT SIDE FILTERS */}
            <div className="hidden md:block w-1/4 p-6 bg-gray-50 mt-16 border-l">
                <h3 className="font-semibold mb-4">Filters</h3>

                {/* CATEGORY FILTER */}
                <div className="mb-6">
                    <h4 className="font-medium mb-2">Skin Concern</h4>

                    {["acne", "dry", "pigmentation", "odor"].map((cat) => (
                        <label key={cat} className="block text-sm mb-1">
                            <input
                                type="radio"
                                name="category"
                                className="mr-2"
                                onChange={() => setSelectedCategory(cat)}
                            />
                            {cat}
                        </label>
                    ))}
                </div>

                {/* PRICE FILTER */}
                <div className="mb-6">
                    <h4 className="font-medium mb-2">Price</h4>

                    <label className="block text-sm mb-1">
                        <input
                            type="radio"
                            name="price"
                            className="mr-2"
                            onChange={() => setSelectedPrice("low")}
                        />
                        Under ₹400
                    </label>

                    <label className="block text-sm mb-1">
                        <input
                            type="radio"
                            name="price"
                            className="mr-2"
                            onChange={() => setSelectedPrice("mid")}
                        />
                        ₹400 - ₹700
                    </label>

                    <label className="block text-sm mb-1">
                        <input
                            type="radio"
                            name="price"
                            className="mr-2"
                            onChange={() => setSelectedPrice("high")}
                        />
                        Above ₹700
                    </label>
                </div>

                {/* CLEAR BUTTON */}
                <button
                    onClick={() => {
                        setSelectedCategory("");
                        setSelectedPrice("");
                    }}
                    className="text-sm text-red-500 underline"
                >
                    Clear Filters
                </button>
            </div>
        </div>
    );
}