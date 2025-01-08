import { HiOutlineUserGroup, HiOutlineNewspaper } from "react-icons/hi2";
import { HiOutlineDatabase, HiOutlineOfficeBuilding } from "react-icons/hi";
import type { FC } from "react";
import Link from "next/link";

const Home: FC = () => {
  return (
    <div className="w-full flex flex-col">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 p-6 lg:p-12 h-full">
        <div className="flex items-center justify-center">
          <img
            className="w-96 rounded-lg"
            src="/landing-catch.png"
            alt="Donation image"
          />
        </div>
        <div className="flex flex-col space-y-4 text-left">
          <h4 className="text-sm font-semibold text-primary uppercase">
            Submit Data
          </h4>
          <h2 className="text-2xl font-bold text-gray-800 leading-tight">
            Unlock the Power of Knowledge
          </h2>
          <p className="text-[#000000]">
            Every dataset stored, every paper shared, and every discovery made
            through SRDRI is a step toward building a brighter, more informed
            future. By joining our initiative, you’re contributing to the
            advancement of knowledge that benefits not only our community but
            also the world at large. Dive into our repository today. Whether
            you’re here to explore new ideas, contribute your work, or connect
            with peers, SRDRI is your gateway to a thriving research community.
          </p>
          <div className="flex space-x-4">
            <Link
              href="/upload"
              className="px-4 py-2 text-white bg-primary hover:bg-primary rounded-md font-medium"
            >
              Submit now
            </Link>
            <Link
              href="/about"
              className="px-4 py-2 text-primary border border-primary hover:bg-blue-50 rounded-md font-medium"
            >
              Learn more
            </Link>
          </div>
        </div>
      </div>

      <div className="p-6 lg:p-12 space-y-8">
        <h4 className="text-center text-sm font-semibold text-primary uppercase">
          Impact in Numbers
        </h4>
        <h2 className="text-center text-3xl font-bold text-gray-800 leading-snug">
          At SRDRI, our commitment to advancing research
          <br />
          and knowledge is making a real difference.
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 text-center">
          <div className="flex flex-col items-center space-y-4">
            <HiOutlineNewspaper className="w-16 h-16 text-[#c1c7cd] " />
            <p>
              <strong className="text-gray-800">50,000+ Shared Papers</strong>
            </p>
            <p className="w-3/4">
              Over <strong className="text-gray-800">50,000+</strong> research
              papers have been shared on our platform. Empowering researchers
              across disciplines by providing them with essential resources to
              fuel their discoveries.
            </p>
          </div>

          <div className="flex flex-col items-center space-y-4">
            <HiOutlineDatabase className="w-16 h-16 text-[#c1c7cd] " />
            <p>
              <strong className="text-gray-800">
                20,000+ Submitted Datasets
              </strong>
            </p>
            <p className="w-3/4">
              Enabling data-driven innovation through openly available,
              high-quality datasets.
            </p>
          </div>

          <div className="flex flex-col items-center space-y-4">
            <HiOutlineOfficeBuilding className="w-16 h-16 text-[#c1c7cd]" />
            <p>
              <strong className="text-gray-800">
                150+ Partnered Institutions
              </strong>
            </p>
            <p className="">
              Collaborating with prestigious universities and research centers
              worldwide.
            </p>
          </div>

          <div className="flex flex-col items-center space-y-4">
            <HiOutlineUserGroup className="w-16 h-16 text-[#c1c7cd]" />
            <p>
              <strong className="text-gray-800">
                10,000+ Registered Contributers
              </strong>
            </p>
            <p className="">
              A growing community of researchers, authors, and academics sharing
              their work and expertise.
            </p>
          </div>
        </div>
      </div>
      <div className="text-center md:text-left mt-8 w-full flex flex-col items-center px-2">
        <h2 className="text-2xl font-bold text-gray-800 leading-tight md:w-1/2 w-full">
          Together, We&apos;re Making a Difference
        </h2>
        <p className="text-[#000000] md:w-1/2 w-full">
          Every statistic represents lives touched, ideas shared, and a brighter
          future being built. Join the movement and be a part of a growing
          initiative that champions research, knowledge, and collaboration.
        </p>
      </div>
      <div className="text-center mt-8 mb-10">
        <Link
          href="/signup"
          className="px-6 py-3 text-[#ffffff] bg-primary hover:bg-primary rounded-md font-medium"
        >
          Join Us
        </Link>
      </div>
    </div>
  );
};

export default Home;
