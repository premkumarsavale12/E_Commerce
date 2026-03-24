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
            console.log(res.data); // check structure
            setData(res.data);
        } catch (err) {
            console.log(err);
        }
    };

    return (
        <>
            <div className="max-w-[1300px] mx-auto px-6 py-8">

                <h2 className="text-2xl font-semibold mb-6">Our Best Sellers</h2>

                <div className="grid grid-cols-4 gap-6"> 

                    {data.map((item, index) => ( 

                        <div key={index} className="bg-white p-4 shadow rounded-lg"> 


                            <img
                                src={item.Image}
                                alt={item.Image_Name}
                                className="w-full h-[250px] object-contain mb-4"
                            />


                            <h3 className="text-lg font-medium"> 

                                {item.Image_Name} 

                            </h3>


                            <p className="text-gray-500 text-sm mt-1"> 

                                {item.Image_Description} 

                            </p>


                            <p className="text-black font-semibold mt-2"> 

                                ₹ {item.price}

                            </p>


                            <button className="mt-4 w-full bg-black text-white py-2">

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