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
            <div className="max-w-[1300px] mx-auto px-4 sm:px-6 py-8">

         

                    {

                        data.map((item, index) => {
                            console.log(item);

                            return (
                                <div key={index}>
                                    <img src={item.Image} alt=""

                                    />
                                </div>
                            );
                        })

                    }

                </div>


          
        </>
    )
}

export default Section_1