import axios from "axios";
import { useEffect, useState } from "react"

const Section_2 = () => {

    const [data, setData] = useState([]);

    useEffect(() => {

        FetchApiData();

    }, []);

    const FetchApiData = async () => {

        try {

            const res = await axios.get("http://localhost:5000/api/section_2/all");

            setData(res.data);

        }
        catch (err) {

            console.log(err)
        }
    }
    return (

        <>
            <div className="max-w-[1300px] mx-auto px-4 sm:px-6 py-8">
                {data.map((item, index) => {
                    return (
                        <div
                            key={index}
                            className="flex items-center justify-between px-16 py-12 min-h-[500px]"
                        >
                            {/* Left Image */}
                            <div className="w-2/3 h-full flex items-center justify-center">
                                <img
                                    src={`http://localhost:5000/uploads/${item.Image}`}
                                    alt="skin"
                                    className="h-full w-auto object-cover"
                                />
                            </div>

                            {/* Right Content */}
                            <div className="w-1/2 text-center space-y-4">
                                <h1 className="text-5xl font-bold">{item.Heading}</h1>

                                <h2 className="text-2xl text-gray-700">

                                    {item.Sub_Heading}

                                </h2>

                                <p className="text-gray-600 max-w-md mx-auto">
                                    {item.Description}
                                </p>

                                <p className="text-lg font-medium">
                                    {item.Sub_Description}
                                </p>

                                <button className="bg-black text-white px-8 py-3 rounded-md hover:bg-gray-800">
                                    {item.Button}
                                </button>
                            </div>
                        </div>
                    );
                })}
            </div>

        </>
    )
}

export default Section_2