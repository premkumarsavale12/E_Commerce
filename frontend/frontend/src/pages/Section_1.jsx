import axios from "axios";
import { useEffect, useState } from "react"

const Section_1 = () => {

    const [data, setData] = useState([]);

    useEffect(() => {

        FetchApiData();

    }, []);

    const FetchApiData = async () => {

        try {

            const res = await axios.get("http://localhost:5000/api/section_1/all");

            console.log(res.data);

            setData(res.data);

        }

        catch (err) {

            console.log(err)
        }
    }
    return (

        <>
            <div className="max-w-[1300px] max-h-[1200px] mx-auto px-4 sm:px-6 py-10">
                {
                    data.map((item, index) => {
                        return (
                            <div
                                key={index}
                                className="flex flex-col md:flex-row items-center justify-between bg-gray-100 p-8 rounded-lg"
                            >

                                {/* LEFT CONTENT */}
                                <div className="md:w-1/2 space-y-4">
                                    <h1 className="text-4xl font-bold">
                                        {item.Heading}
                                    </h1>

                                    <h2 className="text-xl text-gray-700">
                                        {item.Sub_Heading}
                                    </h2>

                                    <p className="text-gray-600">
                                        {item.Description}
                                    </p>

                                    <p className="text-lg font-semibold">
                                        {item.Sub_Description}
                                    </p>

                                    <button className="bg-black text-white px-6 py-2 rounded-md hover:bg-gray-800">
                                        {item.Button}
                                    </button>
                                </div>

                                {/* RIGHT IMAGE */}
                                <div className="md:w-1/2 mt-6 md:mt-0 flex justify-center">
                                    <img
                                        src={`http://localhost:5000/uploads/${item.Image}`}
                                        alt=""
                                        className="w-full max-w-md object-contain"
                                    />
                                </div>

                            </div>
                        );
                    })
                }
            </div>



        </>
    )
}

export default Section_1