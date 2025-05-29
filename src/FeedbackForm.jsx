import React, { useState } from "react";
import emailjs from "emailjs-com";
import "./MinecDownload.css";

export default function FeedbackForm() {
  const [status, setStatus] = useState("");

  const sendFeedback = (e) => {
    e.preventDefault();
    setStatus("Sending...");
    emailjs
      .sendForm("service_6zddyuo", "template_8ceks2s", e.target, "yJbEHAdV4SpqB7Xf3")
      .then(
        () => {
          setStatus("Thank you! Your message has been sent.");
          e.target.reset();
        },
        (err) => {
          console.error(err);
          setStatus("An error occurred. Please try again.");
        }
      );
  };

  return (
    <form onSubmit={sendFeedback} className="feedback-form">
      <label>
        Your Name
        <input type="text" name="from_name" required />
      </label>
      <label>
        Your Email
        <input type="email" name="reply_to" required />
      </label>
      <label>
        Your Message
        <textarea name="message" rows="5" required />
      </label>
      <button type="submit" className="btn-feedback">
        Send
      </button>
      {status && <p className="feedback-status">{status}</p>}
    </form>
  );
}
