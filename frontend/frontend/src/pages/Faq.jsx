import { useEffect, useState } from "react";
import axios from "axios";

const Faq = () => {
    const [data, setData] = useState([]);
    const [openIndex, setOpenIndex] = useState(0); // first item open by default

    useEffect(() => {
        FetchApiData();
    }, []);

    async function FetchApiData() {
        const res = await axios.get("http://localhost:5000/api/faq/all");
        setData(res.data);
    }

    const toggleFAQ = (index) => {
        setOpenIndex(openIndex === index ? null : index);
    };

    return (
        <div className="max-w-4xl mx-auto px-4 py-12">
            {/* Title */}
            <h1 className="text-3xl md:text-4xl font-semibold text-center mb-10 tracking-wide">
                FAQ’S
            </h1>

            {/* FAQ List */}
            <div className="space-y-4">
                {data.map((item, index) => (
                    <div
                        key={index}
                        className="border-b border-gray-300 pb-4"
                    >
                        {/* Question */}
                        <button
                            onClick={() => toggleFAQ(index)}
                            className="w-full flex justify-between items-center text-left"
                        >
                            <span className="text-lg md:text-xl font-medium text-gray-800">
                                {item.Heading}
                            </span>

                            <span className="text-2xl text-gray-600">
                                {openIndex === index ? "−" : "+"}
                            </span>
                        </button>

                        {/* Answer */}
                        {openIndex === index && (
                            <p className="mt-3 text-gray-600 leading-relaxed max-w-3xl">
                                {item.Paragraph}
                            </p>
                        )}
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Faq;