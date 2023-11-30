import React, { useRef } from "react";
import emailjs from "@emailjs/browser";
import Card from "../../components/card/Card";
import styles from "./Contact.module.scss";
import { FaEnvelope, FaPhoneAlt, FaTwitter } from "react-icons/fa";
import { FaLocationDot } from "react-icons/fa6";
import { toast } from "react-toastify";

const Contact = () => {
  const form = useRef();

  const sendEmail = (e) => {
    e.preventDefault();

    emailjs
      .sendForm(
        process.env.REACT_APP_GMAIL_SERVICE,
        "template_6g1m1m5",
        form.current,
        "g-zxwHTtxhVH3iIHd"
      )
      .then(
        (result) => {
          toast.success("Message send successfully");
          console.log(result.text);
        },
        (error) => {
          toast.error(error.text)
          console.log(error.text);
        }
      );

      e.target.reset()
  };

  return (
    <section>
      <div className={`container ${styles.contact}`}>
        <h2>Contact Us</h2>
        <div className={styles.section}>
          <Card className={styles.card}>
            <form ref={form} onSubmit={(e) => sendEmail(e)}>
              <label>Name:</label>
              <input
                type="text"
                name="user_name"
                placeholder="Full Name"
                required
              />
              <label>Email:</label>
              <input
                type="email"
                name="user_email"
                placeholder="Email"
                required
              />
              <label>Subject:</label>
              <input
                type="text"
                name="subject"
                placeholder="Subject"
                required
              />
              <label>Message:</label>
              <textarea name="message" id="" cols="30" rows="10"></textarea>
              <button type="submit" className="--btn --btn-red">Contact Us</button>
            </form>
          </Card>
          <div className={styles.details}>
            <Card className={styles.card2}>
              <h3>Our Contact Information</h3>
              <p>Fill the form or use the following media to contact us</p>
              <div className={styles.icons}>
                <span>
                  <FaPhoneAlt size={18} />
                  <p>+91 9182452335</p>
                </span>
                <span>
                  <FaEnvelope size={18} />
                  <p>support@prokart.com</p>
                </span>
                <span>
                  <FaTwitter size={18} />
                  <p>@ProKart</p>
                </span>
                <span>
                  <FaLocationDot size={18} />
                  <p>Andhrapradesh, India</p>
                </span>
              </div>
            </Card>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;
