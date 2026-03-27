import axios from 'axios';
import React, { useEffect, useState } from 'react'
const Concern = () => {

    const [data, setData] = useState([]);

    useEffect(() => {
        FetchApiData();

    }, []);

    const FetchApiData = async () => {

        try {
            const res = await axios.get("http://localhost:5000/api/concern/all");
        
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
                    Shop by Concerns
                </h2>

                <div className="  grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 gap-10">
                    {

                        data.map((item, index) => {

                            return (

                                <div key={index}>

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

export default Concern