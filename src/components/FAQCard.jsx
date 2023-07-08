import React, { useState, useEffect } from "react";

const FAQCard = (props) => {
    const [isOpen, setIsOpen] = useState(false);
    const [isMobile, setIsMobile] = useState(window.innerWidth <= 767);
    const title = props.title;
    const text = props.text;

    const handleToggle = () => {
        if (isMobile) {
            setIsOpen(!isOpen);
        }
    }

    useEffect(() => {
        window.addEventListener("resize", () => {
            setIsMobile(window.innerWidth <= 767);
        });
    }, []);

    return (
        <div className="row faq-item d-flex align-items-stretch" data-aos="fade-up" data-aos-delay="100">
            <div className="col-lg-5" onClick={handleToggle} style={{cursor: isMobile ? "pointer" : "default"}}>
                <i className="ri-question-line"></i>
                <h4>{title}</h4>
            </div>
            <div className="col-lg-7" style={{display: isMobile && !isOpen ? "none" : "block"}}>
                <p>
                    {text}
                </p>
            </div>
        </div>
    )
}

export default FAQCard;
