import React, { useState } from "react";

const ContactUs = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });

  const handleFormChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log("Form Data Submitted:", formData);
    // Submit the form data to backend or API
    alert("Thank you for contacting us. We'll get back to you shortly!");
    setFormData({ name: "", email: "", subject: "", message: "" });
  };

  return (
    <div className="container mx-auto p-6 h-full">
      <h1 className="text-3xl font-semibold text-center mb-8 text-gray-800">
        Contact Us
      </h1>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Contact Form */}
        <div className="bg-gray-50 p-6 rounded-lg shadow-md">
          <h2 className="text-xl font-semibold text-gray-800 mb-4">
            Get in Touch
          </h2>
          <form onSubmit={handleSubmit} className="space-y-4">
            {/* Name Field */}
            <div>
              <label
                className="block text-sm font-medium text-gray-700 mb-2"
                htmlFor="name"
              >
                Your Name
              </label>
              <input
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleFormChange}
                className="w-full p-2 border border-gray-300 rounded-sm"
                required
              />
            </div>

            {/* Email Field */}
            <div>
              <label
                className="block text-sm font-medium text-gray-700 mb-2"
                htmlFor="email"
              >
                Your Email
              </label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleFormChange}
                className="w-full p-2 border border-gray-300 rounded-sm"
                required
              />
            </div>

            {/* Subject Field */}
            <div>
              <label
                className="block text-sm font-medium text-gray-700 mb-2"
                htmlFor="subject"
              >
                Subject
              </label>
              <input
                type="text"
                id="subject"
                name="subject"
                value={formData.subject}
                onChange={handleFormChange}
                className="w-full p-2 border border-gray-300 rounded-sm"
                required
              />
            </div>

            {/* Message Field */}
            <div>
              <label
                className="block text-sm font-medium text-gray-700 mb-2"
                htmlFor="message"
              >
                Message
              </label>
              <textarea
                id="message"
                name="message"
                value={formData.message}
                onChange={handleFormChange}
                rows={5}
                className="w-full p-2 border border-gray-300 rounded-sm"
                required
              ></textarea>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              className="w-full p-2 bg-primary text-white rounded-sm hover:bg-blue-950"
            >
              Send Message
            </button>
          </form>
        </div>

        {/* Contact Information and Map */}
        <div>
          <div className="mb-6">
            <h2 className="text-xl font-semibold text-gray-800 mb-4">
              Contact Information
            </h2>
            <p className="text-gray-700 mb-2">
              <strong>Address:</strong> King Saud University, Riyadh, Saudi
              Arabia
            </p>
            <p className="text-gray-700 mb-2">
              <strong>Email:</strong>{" "}
              <a href="mailto:info@srdr.sa" className="text-blue-500">
                info@srdr.sa
              </a>
            </p>
            <p className="text-gray-700 mb-2">
              <strong>Phone:</strong> +966-1-234-5678
            </p>
          </div>
          <div>
            <h2 className="text-xl font-semibold text-gray-800 mb-4">
              Find Us Here
            </h2>
            <div className="w-full h-94 bg-gray-200 rounded-sm flex items-center justify-center">
              <iframe className="w-full h-full" src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d34391.0156500862!2d46.603916765262795!3d24.724110174969397!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3e2f1d87a42c25d9%3A0xb7bc9ced1525d129!2sKing%20Saud%20University%2C%20Riyadh!5e1!3m2!1sen!2ssa!4v1749733049560!5m2!1sen!2ssa" allowFullScreen loading="lazy" referrerPolicy="no-referrer-when-downgrade"></iframe>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContactUs;
