import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { FaStar, FaCheck, FaInfoCircle, FaMinus, FaPlus } from "react-icons/fa";

const ProductDetails = () => {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [selectedSize, setSelectedSize] = useState("100ml");
  const [quantity, setQuantity] = useState(1);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        setLoading(true);
        const endpoints = [
          "best_seller",
          "sellerproduct",
          "new_launch",
     
          "skin",
          "hair",
          "lip",
          "body",
          "baby_care"
        ];

        let foundProduct = null;


        for (const endpoint of endpoints) {
          try {
            const res = await axios.get(`http://localhost:5000/api/${endpoint}/${id}`);
            if (res.data && (res.data.Image_Name || res.data.name)) {
              foundProduct = res.data;
              break;
            }
          } catch (err) {

            continue;
          }
        }

        if (foundProduct) {
          setProduct(foundProduct);
        } else {
          console.error("Product not found in any endpoint for ID:", id);
        }
        setLoading(false);
      } catch (err) {
        console.error("Error fetching product details:", err);
        setLoading(false);
      }
    };
    fetchProduct();
  }, [id]);



  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-black"></div>
      </div>
    );
  }

  if (!product) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <h2 className="text-2xl font-bold">Product not found</h2>
      </div>
    );
  }


  const getPriceValue = (priceStr) => {
    if (!priceStr) return 0;
    return parseFloat(priceStr.toString().replace(/[^0-9.]/g, ""));
  };

  const currentPrice = getPriceValue(product.Price || product.price);
  const mrp = Math.round(currentPrice * 1.1); // Simulated MRP for aesthetic

  const discount = 10;

  return (
    <div className="max-w-[1200px] mx-auto p-4 md:p-8 font-sans">
      <div className="flex flex-col md:flex-row gap-12">
        {/* Left Side - Image Section */}
        <div className="w-full md:w-1/2 bg-gray-50 rounded-2xl flex items-center justify-center p-8 overflow-hidden">
          <img
            src={product.Image}
            alt={product.Image_Name || product.name}
            className="max-h-[500px] w-auto object-contain hover:scale-105 transition-transform duration-500"
            onError={(e) => {
              e.target.src = "https://via.placeholder.com/500?text=No+Image";
            }}
          />
        </div>

        {/* Right Side - Product Info Section */}
        <div className="w-full md:w-1/2 flex flex-col gap-6">

          <div className="flex flex-col gap-2">

            <h1 className="text-4xl font-bold text-gray-900 leading-tight">

              {product.Image_Name || product.name}

            </h1>

            <div className="flex items-center gap-4 mt-2">
              <div className="flex items-center bg-black text-white px-2 py-0.5 rounded text-sm font-medium">
                <span className="mr-1">4.8</span>
                <FaStar size={14} fill="currentColor" />
              </div>
              <span className="text-gray-500 text-sm font-medium underline underline-offset-4 cursor-pointer hover:text-black transition-colors">
                1787 Reviews
              </span>
            </div>
          </div>

          <div className="bg-yellow-50 border border-yellow-100 p-4 rounded-xl flex items-start gap-3">
            <div className="mt-1 flex-shrink-0">
              <div className="w-4 h-4 bg-orange-400 rounded-full flex items-center justify-center">
                <div className="w-1.5 h-1.5 bg-white rotate-45"></div>
              </div>
            </div>
            <p className="text-sm text-gray-800">
              <span className="font-bold">Highly rated by customers for: </span>
              <span className="underline underline-offset-2 cursor-pointer">Cleanser Effectiveness</span>,
              <span className="ml-1 underline underline-offset-2 cursor-pointer">Face Wash Effectiveness</span>,
              <span className="ml-1 underline underline-offset-2 cursor-pointer">Product Results</span>
            </p>
          </div>

          <div className="flex flex-col gap-4">
            <h3 className="font-bold text-lg text-gray-900 uppercase tracking-tight">
              {product.Image_Description || product.description}
            </h3>
            <p className="text-gray-600 leading-relaxed text-sm">
              {product.Paragraph || "A daily, gentle exfoliating, acne fighting face cleanser. It combines BHA + LHA (Salicylic Acid + Capryloyl Salicylic Acid) in 2% concentration, which provides deep cleansing, pore decongestion & sebum reduction without drying out the skin."}
            </p>
            <p className="italic text-gray-500 text-sm border-l-2 border-gray-200 pl-4 py-1">
              "I have seen a reduction in acne and oiliness ever since I started using this face cleanser" -Nikhil V.
            </p>
          </div>

          <div className="grid grid-cols-2 gap-y-3">
            {["Fragrance Free", "Non-comedogenic", "Essential Oil Free", "pH: 4.5 - 5.5"].map((feature) => (
              <div key={feature} className="flex items-center gap-2 text-xs font-medium text-gray-700">
                <FaCheck size={14} className="text-green-600" />
                <span>{feature}</span>
              </div>
            ))}
          </div>

          <div className="bg-black text-white p-4 rounded-xl flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="w-5 h-5 bg-orange-400 rounded-full flex items-center justify-center">
                <div className="w-2 h-2 bg-white rotate-45"></div>
              </div>
              <span className="text-sm">Get ₹14 worth of MCash post-delivery.</span>
            </div>
            <FaInfoCircle size={16} className="text-gray-400 cursor-pointer" />
          </div>

          <div className="border border-gray-200 rounded-2xl p-6 flex flex-col gap-4 bg-white shadow-sm">
            <h4 className="text-xs font-bold text-gray-500 uppercase tracking-widest">Choose Variants</h4>
            <div className="flex flex-col gap-2">
              <span className="text-sm font-bold text-gray-900">Select Size</span>
              <div className="flex gap-3">
                {["100ml", "250ml"].map((size) => (
                  <button
                    key={size}
                    onClick={() => setSelectedSize(size)}
                    className={`px-6 py-3 border-2 transition-all font-medium rounded-lg ${selectedSize === size
                      ? "border-black bg-white text-black ring-2 ring-black/5"
                      : "border-gray-200 text-gray-500 hover:border-gray-300"
                      }`}
                  >
                    {size}
                  </button>
                ))}
              </div>
            </div>
          </div>

          <div className="border border-gray-200 rounded-2xl p-6 bg-white shadow-sm flex flex-col gap-4">
            <h4 className="text-xs font-bold text-gray-500 uppercase tracking-widest">Price</h4>
            <div className="flex items-end gap-3">
              <div className="flex flex-col">
                <span className="text-xs text-gray-400 line-through">MRP ₹{mrp}</span>
                <span className="text-3xl font-black text-gray-900 leading-none">₹{currentPrice}</span>
              </div>
              <div className="bg-black text-white text-[10px] font-bold px-2 py-1 rounded tracking-tighter self-center ml-2">
                {discount}% OFF
              </div>
              <div className="self-center">
                <FaInfoCircle size={16} className="text-gray-400 cursor-pointer" />
              </div>
            </div>
            <p className="text-[10px] text-gray-500">(incl. of all taxes)</p>

            <div className="flex gap-4 mt-2">
              <div className="flex items-center border border-gray-300 rounded-lg p-1">
                <button
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  className="p-2 hover:bg-gray-100 rounded-md transition-colors"
                >
                  <FaMinus size={16} />
                </button>
                <span className="px-6 font-bold">{quantity}</span>
                <button
                  onClick={() => setQuantity(quantity + 1)}
                  className="p-2 hover:bg-gray-100 rounded-md transition-colors"
                >
                  <FaPlus size={16} />
                </button>
              </div>
              <button className="flex-grow bg-black text-white font-bold py-4 rounded-xl hover:bg-gray-800 transition-all shadow-lg hover:shadow-black/20 uppercase tracking-widest text-sm">
                Add to Cart
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Recommended Section / Footer Spacing */}
      <div className="mt-20 border-t border-gray-100 pt-10">
        <h2 className="text-2xl font-bold mb-8">Detailed Description</h2>
        <div className="prose prose-sm max-w-none text-gray-600">
          <p className="mb-4">
            {product.Paragraph || "This Salicylic Acid + LHA 2% Cleanser is formulated to target acne-prone skin. Salicylic acid is a well-known BHA that penetrates deep into pores to dissolve excess oil and dead skin cells. LHA is a derivative of salicylic acid that is more lipophilic and gentler, making it ideal for exfoliating the skin surface."}
          </p>
          <ul className="list-disc pl-5 space-y-2">
            <li>Reduces excess sebum production without over-drying.</li>
            <li>Prevents new breakouts by keeping pores clear.</li>
            <li>Contains hydrating ingredients like oat extract and zinc to soothe inflammation.</li>
            <li>Formulated at a skin-friendly pH for optimal effectiveness.</li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default ProductDetails;
