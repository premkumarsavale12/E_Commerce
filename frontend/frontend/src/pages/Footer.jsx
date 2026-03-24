import { useEffect, useState } from "react";
import axios from "axios";


const Footer = () => {

    const [footer, setFooter] = useState(null);

    useEffect(() => {
        fetchFooter();
    }, []);

    const fetchFooter = async () => {
        try {
            const res = await axios.get("http://localhost:5000/api/footersection/all");
            setFooter(res.data[0]);  
        } catch (err) {
            console.log(err);
        }
    };

    if (!footer) return <p className="loading">Loading...</p>;

    return (
        <footer className="footer-container">
            <div className="footer-content">
                {/* Company Section */}
                <div className="footer-section">
                    <h3 className="footer-title">{footer?.company?.title}</h3>
                    <ul className="footer-links">
                        {footer?.company?.links?.map((item, i) => (
                            <li key={i}><a href={item.url}>{item.name}</a></li>
                        ))}
                    </ul>
                </div>

                {/* Quick Links Section */}
                <div className="footer-section">
                    <h3 className="footer-title">{footer?.quickLinks?.title}</h3>
                    <ul className="footer-links">
                        {footer?.quickLinks?.links?.map((item, i) => (
                            <li key={i}><a href={item.url}>{item.name}</a></li>
                        ))}
                    </ul>
                </div>

                {/* Contact Section */}
                <div className="footer-section">
                    <h3 className="footer-title">{footer?.contact?.title}</h3>
                    <div className="contact-info">
                        <p>{footer?.contact?.description}</p>
                        <p><a href={`mailto:${footer?.contact?.email}`} className="contact-link">{footer?.contact?.email}</a></p>
                        <p className="support-text">{footer?.contact?.supportText}</p>
                        <p><a href={`mailto:${footer?.contact?.supportEmail}`} className="contact-link">{footer?.contact?.supportEmail}</a></p>
                    </div>
                    
                    {/* Social Media Section - Inside Contact Column as per user image */}
                    <div className="social-links">
                        {footer?.social?.map((item, i) => (
                            <a key={i} href={item.url} className="social-icon" target="_blank" rel="noopener noreferrer">
                                {item.name === "Facebook" && <i className="fab fa-facebook-f"></i>}
                                {item.name === "Instagram" && <i className="fab fa-instagram"></i>}
                                {item.name === "YouTube" && <i className="fab fa-youtube"></i>}
                                {!["Facebook", "Instagram", "YouTube"].includes(item.name) && item.name}
                            </a>
                        ))}
                    </div>
                </div>
            </div>
        </footer>
    );
};

export default Footer;