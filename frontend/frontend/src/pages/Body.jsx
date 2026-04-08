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
            temp = temp.filter((item) => {
                const desc = item.Image_Description?.toLowerCase() || "";
                const name = item.Image_Name?.toLowerCase() || "";
                return (
                    desc.includes(selectedCategory.toLowerCase()) ||
                    name.includes(selectedCategory.toLowerCase())
                );
            });
        }

        if (selectedPrice) {
            temp = temp.filter((item) => {

                const priceValue = parseFloat(
                    item.Price?.toString().replace(/[^0-9.]/g, "")
                );

                if (isNaN(priceValue)) return true;

                if (selectedPrice === "low") return priceValue < 400;
                if (selectedPrice === "mid")
                    return priceValue >= 400 && priceValue <= 700;
                if (selectedPrice === "high") return priceValue > 700;
                return true;
            });
        }

        setFilteredData(temp);
    };

    const clearFilters = () => {
        setSelectedCategory("");
        setSelectedPrice("");
    };

    return (
        <div className="flex flex-col md:flex-row max-w-[1300px] mx-auto min-h-screen">
            {/* LEFT SIDE PRODUCTS */}
            <div className="w-full md:w-3/4 p-6">
                <header className="flex justify-between items-center mb-6">
                    <h2 className="text-2xl font-bold">Body Products</h2>
                    <p className="text-gray-500 text-sm">
                        Showing {filteredData.length} products
                    </p>
                </header>

                {filteredData.length > 0 ? (
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                        {filteredData.map((item) => (
                            <div
                                key={item._id}
                                className="border rounded-xl p-4 shadow-sm hover:shadow-lg transition-shadow bg-white flex flex-col h-full"
                            >
                                <div className="h-48 flex items-center justify-center overflow-hidden mb-4">
                                    <img
                                        src={item.Image}
                                        alt={item.Image_Name}
                                        className="max-h-full object-contain hover:scale-105 transition-transform duration-300"
                                        onError={(e) => {
                                            e.target.src = "https://via.placeholder.com/200?text=No+Image";
                                        }}
                                    />
                                </div>

                                <div className="flex-grow">
                                    <h3 className="font-semibold text-lg line-clamp-1">
                                        {item.Image_Name}
                                    </h3>
                                    <p className="text-gray-500 text-xs mt-1 line-clamp-2">
                                        {item.Image_Description}
                                    </p>
                                </div>

                                <div className="mt-4 flex flex-col gap-3">
                                    <div className="font-bold text-xl text-indigo-600">
                                        {item.Price}
                                    </div>

                                    <button className="w-full bg-black text-white py-2.5 rounded-lg hover:bg-gray-800 transition-colors font-medium">
                                        {item.Button || "Add to Cart"}
                                    </button>
                                </div>
                            </div>
                        ))}
                    </div>
                ) : (
                    <div className="flex flex-col items-center justify-center py-20 text-gray-400">
                        <p className="text-xl">No products match your filters</p>
                        <button
                            onClick={clearFilters}
                            className="mt-4 text-indigo-600 font-medium underline"
                        >
                            Reset All Filters
                        </button>
                    </div>
                )}
            </div>

            {/* RIGHT SIDE FILTERS */}
            <div className="w-full md:w-1/4 p-6 bg-gray-50 border-l border-gray-200 sticky top-0 h-fit">
                <div className="flex items-center justify-between mb-6">
                    <h3 className="font-bold text-lg">Filters</h3>
                    {(selectedCategory || selectedPrice) && (
                        <button
                            onClick={clearFilters}
                            className="text-xs text-red-500 hover:text-red-700 font-medium underline"
                        >
                            Clear All
                        </button>
                    )}
                </div>

                {/* CATEGORY FILTER */}
                <div className="mb-8">
                    <h4 className="font-semibold text-sm text-gray-600 uppercase tracking-wider mb-4 font-sans">
                        Skin Concern
                    </h4>

                    {["Acne", "Dry", "Pigmentation", "Odor"].map((cat) => (
                        <label
                            key={cat}
                            className="flex items-center gap-3 text-sm mb-3 cursor-pointer group"
                        >
                            <input
                                type="radio"
                                name="category"
                                checked={selectedCategory.toLowerCase() === cat.toLowerCase()}
                                onChange={() => setSelectedCategory(cat.toLowerCase())}
                                className="w-4 h-4 text-indigo-600 focus:ring-indigo-500 border-gray-300"
                            />
                            <span className="group-hover:text-black transition-colors">
                                {cat}
                            </span>
                        </label>
                    ))}
                </div>

                {/* PRICE FILTER */}
                <div>
                    <h4 className="font-semibold text-sm text-gray-600 uppercase tracking-wider mb-4 font-sans">
                        Price Range
                    </h4>

                    {[
                        { label: "Under ₹400", value: "low" },
                        { label: "₹400 - ₹700", value: "mid" },
                        { label: "Above ₹700", value: "high" },
                    ].map((range) => (
                        <label
                            key={range.value}
                            className="flex items-center gap-3 text-sm mb-3 cursor-pointer group"
                        >
                            <input
                                type="radio"
                                name="price"
                                checked={selectedPrice === range.value}
                                onChange={() => setSelectedPrice(range.value)}
                                className="w-4 h-4 text-indigo-600 focus:ring-indigo-500 border-gray-300"
                            />
                            <span className="group-hover:text-black transition-colors">
                                {range.label}
                            </span>
                        </label>
                    ))}
                </div>
            </div>
        </div>
    );
}