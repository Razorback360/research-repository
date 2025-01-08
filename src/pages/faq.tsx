import React from "react";

const FAQ = () => {
  const faqs = [
    {
      question: "What is the Saudi Research Data Repository Initiative (SRDRI)?",
      answer:
        "SRDRI is a platform dedicated to providing researchers and institutions with access to curated datasets and research papers. It is backed by King Saud University to foster a culture of collaboration and data sharing.",
    },
    {
      question: "Who can use the SRDRI platform?",
      answer:
        "SRDRI is open to researchers, academics, students, and institutions from all over the world who wish to access or contribute datasets and research papers.",
    },
    {
      question: "How do I submit a paper or dataset?",
      answer:
        "You can submit a paper or dataset by using the submission form on our platform. Make sure your data complies with the submission guidelines and provides all necessary details, including authorship, abstract, and keywords.",
    },
    {
      question: "Is there a cost to use SRDRI?",
      answer:
        "No, SRDRI is completely free to use. Our mission is to make research and data accessible to everyone without financial barriers.",
    },
    {
      question: "How do I ensure my data or research is secure?",
      answer:
        "We follow industry-standard security protocols to ensure your submissions are safe. Our team also reviews each submission to ensure quality and compliance.",
    },
    {
      question: "Can I collaborate with other researchers using SRDRI?",
      answer:
        "Absolutely! SRDRI is designed to foster collaboration. You can connect with researchers working on similar topics and explore their work to build partnerships.",
    },
    {
      question: "What types of data and research papers are accepted?",
      answer:
        "We accept a wide range of datasets and research papers across various disciplines. As long as the content is ethical, relevant, and aligns with our guidelines, it is welcome on our platform.",
    },
    {
      question: "How can I contact support if I face issues?",
      answer:
        "If you need help, you can reach out to our support team via the 'Contact Us' page. We’re here to assist you with any questions or concerns.",
    },
    {
      question: "How often is the repository updated?",
      answer:
        "The repository is continuously updated as new datasets and papers are submitted and reviewed. We ensure that the content remains current and relevant.",
    },
  ];

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-semibold text-center mb-6 text-gray-800">
        Frequently Asked Questions (FAQ)
      </h1>
      <div className="space-y-6">
        {faqs.map((faq, index) => (
          <div
            key={index}
            className="border border-gray-300 p-4 rounded-lg bg-gray-50"
          >
            <h2 className="text-xl font-semibold text-gray-800 mb-2">
              {faq.question}
            </h2>
            <p className="text-gray-700">{faq.answer}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default FAQ;
