// app/about-us/page.tsx
import Image from 'next/image';
import Link from 'next/link';


export const metadata = {
  title: 'About Us',
  description: 'Learn more about CampusEase — the all-in-one student platform in Nigeria for accommodation, roommates, marketplace, and campus services.',
  keywords: 'CampusEase, student housing Nigeria, roommates, campus marketplace, verified agents, student services',
  openGraph: {
    title: 'About Us | CampusEase',
    description: 'CampusEase is the go-to platform for students across Nigeria to find trusted accommodation, match with like-minded roommates, buy/sell/swap items, and access campus-based services — all in one place.',
    url: `${process.env.NEXT_PUBLIC_BASE_URL}/aboutus`,
    siteName: 'CampusEase',
    // images: [
    //   {
    //     url: '/about.jpg',
    //     width: 1200,
    //     height: 630,
    //     alt: 'Students collaborating on CampusEase',
    //   },
    // ],
    locale: 'en_NG',
    type: 'website',
  },
};


export default function AboutUsPage() {
  return (
    <div className="max-w-6xl mx-auto px-4 py-12 text-[#484848]">
      <section className="text-center mb-20">
        <h1 className="text-5xl font-bold mb-4 text-[#1b656a]">About CampusEase</h1>
        <p className="text-lg text-[#4f4d4d] max-w-2xl mx-auto">
          CampusEase is the go-to platform for students across Nigeria to find trusted accommodation, match with like-minded roommates, buy/sell/swap items, and access campus-based services — all in one place.
        </p>
      </section>

      <section className="grid md:grid-cols-2 gap-12 mb-20 items-center">
        <div>
          <h2 className="text-3xl font-semibold mb-6 text-[#1b656a]">What We Offer</h2>
          <ul className="space-y-4 list-disc list-inside text-[#4f4d4d]">
            <li>🏡 <strong>Verified Accommodation:</strong> Connect with verified agents for safe and comfortable housing</li>
            <li>👯‍♀️ <strong>Roommate Matching:</strong> Find roommates that match your lifestyle and vibe</li>
            <li>🛍️ <strong>Marketplace:</strong> Buy, sell, or swap items like books, furniture, gadgets, and more</li>
            <li>💇 <strong>Campus Services:</strong> Hire barbers, hairdressers, academic assistants, and other service providers</li>
          </ul>
        </div>
        <div className="h-[400px] -mt- relative w-full">
          <Image
            src="/about.jpg"
            alt="Students collaborating"
            fill
            objectFit="cover"
            className="rounded-2xl shadow-lg object-[center_27%]"
          />
        </div>
        
      </section>

      <section className="text-center mb-20">
        <h2 className="text-3xl font-semibold mb-4 text-[#1b656a]">Our Vision</h2>
        <p className="text-[#4f4d4d] max-w-2xl mx-auto">
          To redefine student life in Nigeria by building a connected, trusted, and convenient community platform that supports every aspect of campus living.
        </p>
      </section>

      <section className="text-center mb-20">
        <h2 className="text-3xl font-semibold mb-4 text-[#1b656a]">Become a Verified Agent</h2>
        <p className="text-[#4f4d4d] mb-6 max-w-xl mx-auto">
          Are you a local agent passionate about helping students? Join our network and get verified to connect with thousands of students looking for housing.
        </p>
        <Link href="/apply-agent" className="inline-block bg-[#f8ae24] text-white px-8 py-3 rounded-xl font-medium shadow-md hover:bg-[#d9941f] transition">
            Apply to be a Verified Agent
        </Link>
      </section>

      <section className="text-center">
        <h2 className="text-3xl font-semibold mb-4 text-[#1b656a]">Need Help?</h2>
        <p className="text-[#4f4d4d]">
          Reach out to our support team anytime — we're here to help make your campus life easier.
        </p>
      </section>
    </div>
  );
}