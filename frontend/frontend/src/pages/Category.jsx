import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';


const Category = () => {

    const [data, setData] = useState([]);

    useEffect(() => {
        FetchApiData();

    }, []);

    const navigate = useNavigate();

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

            navigate("/body");
        }
    };

    const FetchApiData = async () => {

        try {
            const res = await axios.get("http://localhost:5000/api/category/all");
            setData(res.data);

        }

        catch (err) {

            console.log(err);

        }
    }


    return (

        <>

            <div className="max-w-[1300px] mx-auto px-4 sm:px-6 py-8">

                <h2 className="text-xl sm:text-2xl font-semibold mb-6 text-center sm:text-left">
                    Shop by Category
                </h2>

                <div className="  grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-3">
                    {

                        data.map((item, index) => {

                            return (

                                <div key={index}

                                    className="group cursor-pointer"
                                    onClick={() => handleCardClick(item.Text)}
                                >

                                    <img src={`http://localhost:5000/uploads/${item.Image}`}
                                    />

                                    <h2 className='font-bold   text-center  text-black '> {item.Text}</h2>

                                </div>

                            )
                        })

                    }

                </div>


            </div>


        </>

    )

}

export default Category