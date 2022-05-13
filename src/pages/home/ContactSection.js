import React from "react";
import bg from "../../assets/images/appointment.png";

const ContactSection = () => {
  return (
    <section style={{ background: `url(${bg})` }}>
      <div className="container mx-auto py-24">
        <div className="text-center pb-4">
          <h2 className="text-primary text-2xl mb-3">Contact Us</h2>
          <h3 className="text-4xl text-white mb-4">Stay connected with us</h3>
        </div>
        <div className="text-center flex flex-col items-center justify-center gap-3 px-4">
          <input
            type="email"
            placeholder="Email Address"
            className="input input-lg w-full lg:max-w-xl "
          />
          <input
            type="text"
            placeholder="Subject"
            className="input input-lg w-full lg:max-w-xl "
          />
          <textarea
            className="textarea  textarea-accent h-24 input-lg w-full lg:max-w-xl "
            placeholder="Your Message"
          ></textarea>
        </div>
      </div>
    </section>
  );
};

export default ContactSection;
