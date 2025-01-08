import React from "react";

const AboutUs = () => {
  return (
    <div className="container mx-auto p-4 h-full">
      <h1 className="text-3xl font-semibold text-center mb-6 text-gray-800">
        About Us
      </h1>
      <div className="space-y-6 text-gray-700 text-lg">
        <section>
          <p className="">
            At the <strong>Saudi Research Data Repository Initiative (SRDRI)</strong>, we believe in the transformative power of research and data. Our mission is to provide an open, accessible, and reliable platform where researchers, academics, and enthusiasts can collaborate, share, and access valuable datasets and research papers.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-semibold text-gray-800 mb-3">Who We Are</h2>
          <p>
            We are a team of dedicated professionals, researchers, and innovators working together to foster a culture of data sharing and collaboration. SRDRI is proudly backed by <strong>King Saud University</strong>, a leading academic institution committed to advancing knowledge and making a positive impact on society.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-semibold text-gray-800 mb-3">What We Do</h2>
          <ul className="list-disc list-inside">
            <li>
              <strong>Discover:</strong> Datasets and research papers relevant to their fields of study.
            </li>
            <li>
              <strong>Share:</strong> Their work with a global audience, ensuring visibility and impact.
            </li>
            <li>
              <strong>Collaborate:</strong> With peers and institutions to advance research and innovation.
            </li>
          </ul>
          <p>
            By providing seamless access to curated data and research, SRDRI empowers individuals and organizations to make informed decisions, drive scientific progress, and tackle real-world challenges.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-semibold text-gray-800 mb-3">Why Choose SRDRI?</h2>
          <ul className="list-disc list-inside space-y-2">
            <li>
              <strong>Comprehensive Repository:</strong> From cutting-edge datasets to peer-reviewed papers, our platform houses a diverse collection of resources.
            </li>
            <li>
              <strong>User-Friendly Interface:</strong> Easily search, browse, and access information tailored to your needs.
            </li>
            <li>
              <strong>Collaboration-Friendly:</strong> Our tools make it easy to connect with other researchers, fostering partnerships and idea exchange.
            </li>
            <li>
              <strong>Commitment to Excellence:</strong> Every dataset and paper is carefully curated to maintain the highest standards of quality and relevance.
            </li>
          </ul>
        </section>

        <section>
          <h2 className="text-xl font-semibold text-gray-800 mb-3">Our Vision</h2>
          <p>
            We envision a future where data and research are universally accessible, empowering a global community of problem solvers and innovators. By breaking down barriers to knowledge sharing, we aim to play a pivotal role in advancing education, science, and societal progress.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-semibold text-gray-800 mb-3">Get Involved</h2>
          <p>
            Join us in our mission to shape the future of research and data accessibility. Whether you’re a researcher, a data enthusiast, or an institution, SRDRI invites you to:
          </p>
          <ul className="list-disc list-inside space-y-2">
            <li>Contribute your datasets and research papers.</li>
            <li>Explore and utilize our repository to fuel your work.</li>
            <li>Be part of a growing community committed to knowledge-sharing and innovation.</li>
          </ul>
          <p>
            Together, we can create a world where knowledge flows freely, fueling discoveries and making a difference in the lives of people everywhere.
          </p>
        </section>
      </div>
    </div>
  );
};

export default AboutUs;
