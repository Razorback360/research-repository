import React, { useState } from "react";
import { GetServerSideProps } from "next";
import { cmsFetcher } from "../utils/fetcher";
import { ContactProps } from "../../interfaces";
import { useTranslations } from "next-intl";

const ContactUs = ({ contactData, error }: ContactProps) => {
  const t = useTranslations();
  
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
        {t("contact.header")}
      </h1>
      {error && (
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
          <p>{error}</p>
        </div>
      )}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Contact Form */}
        <div className="bg-gray-50 p-6 rounded-lg shadow-md">
          <h2 className="text-xl font-semibold text-gray-800 mb-4">
            {t("contact.getInTouch")}
          </h2>
          <form onSubmit={handleSubmit} className="space-y-4">
            {/* Name Field */}
            <div>
              <label
                className="block text-sm font-medium text-gray-700 mb-2"
                htmlFor="name"
              >
                {t("contact.form.name")}
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
                {t("contact.form.email")}
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
                {t("contact.form.subject")}
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
                {t("contact.form.message")}
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
              {t("contact.form.submit")}
            </button>
          </form>
        </div>

        {/* Contact Information and Map */}
        <div>
          <div className="mb-6">
            <h2 className="text-xl font-semibold text-gray-800 mb-4">
              {t("contact.contactInfo.title")}
            </h2>
            <p className="text-gray-700 mb-2">
              <strong>{t("contact.contactInfo.address")}</strong> {contactData.address}
            </p>
            <p className="text-gray-700 mb-2">
              <strong>{t("contact.contactInfo.email")} </strong>
              <a href={`mailto:${contactData.email}`} className="text-blue-500">
                {contactData.email}
              </a>
            </p>
            <p className="text-gray-700 mb-2">
              <strong>{t("contact.contactInfo.phone")}</strong> {contactData.phone}
            </p>
          </div>
          <div>
            <h2 className="text-xl font-semibold text-gray-800 mb-4">
              {t("contact.findUs")}
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

export const getServerSideProps: GetServerSideProps = async ({ res }) => {
  // Set cache control headers
  res.setHeader(
    'Cache-Control',
    'public, s-maxage=3600, stale-while-revalidate=86400'
  );

  try {
    const response = await cmsFetcher.get('/api/contact?populate=*');
    
    return {
      props: {
        contactData: response.data.data,
      },
    };
  } catch (error) {
    console.error("Error fetching contact information:", error);
    
    // Fallback to static data if CMS fetch fails
    return {
      props: {
        contactData: {
          id: 0,
          address: "King Saud University, Riyadh, Saudi Arabia",
          email: "info@srdr.sa",
          phone: "+966-1-234-5678",
        },
        error: "Failed to load contact information from CMS. Showing default contact details.",
      },
    };
  }
};

export default ContactUs;
