import React from "react";


const FAQCard = (props) => {
    const title = props.title
    const text = props.text

    return (
        <div className="row faq-item d-flex align-items-stretch" data-aos="fade-up" data-aos-delay="100">
        <div className="col-lg-5">
          <i className="ri-question-line"></i>
          <h4>{title}</h4>
        </div>
        <div className="col-lg-7">
          <p>
        {text}
        </p>
        </div>
      </div>
    )

}

export default FAQCard