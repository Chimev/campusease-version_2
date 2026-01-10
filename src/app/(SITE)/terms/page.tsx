
import React from 'react';

const TermsAndConditions = () => {
  return (
    <section className="px-6 py-10 max-w-4xl mx-auto">
      <h1 className="text-3xl font-bold mb-6">Terms and Conditions</h1>
      
      <p className="mb-4">
        Welcome to CampusEase! By accessing or using our platform, you agree to comply with and be bound by the following terms and conditions. Please read them carefully.
      </p>
      
      <h2 className="text-xl font-semibold mt-6 mb-4">1. Acceptance of Terms</h2>
      <p className="mb-4">
        By using CampusEase, you confirm that you are at least 18 years old or have the consent of a parent or guardian. If you do not agree with these terms, you must not use our platform.
      </p>
      
      <h2 className="text-xl font-semibold mt-6 mb-4">2. User Responsibilities</h2>
      <p className="mb-4">
        You are solely responsible for the information you post, including listings, services, and interactions with other users. Ensure that all information provided is accurate, legal, and does not infringe on the rights of others.
      </p>
      
      <h2 className="text-xl font-semibold mt-6 mb-4">3. Prohibited Activities</h2>
      <p className="mb-4">
        Users are prohibited from engaging in the following activities:
      </p>
      <ul className="list-disc list-inside mb-4">
        <li>Posting false or misleading information.</li>
        <li>Engaging in fraudulent or illegal activities.</li>
        <li>Harassing or abusing other users.</li>
        <li>Uploading malicious content, including viruses or spam.</li>
      </ul>
      
      <h2 className="text-xl font-semibold mt-6 mb-4">4. Limitation of Liability</h2>
      <p className="mb-4">
        CampusEase is not liable for any direct, indirect, or incidental damages arising from the use of our platform. Users interact with each other and engage in transactions at their own risk.
      </p>
      
      <h2 className="text-xl font-semibold mt-6 mb-4">5. Privacy</h2>
      <p className="mb-4">
        Your privacy is important to us. Please review our 
        <a href="/privacy-policy" className="text-lightBlue hover:underline">Privacy Policy</a> to understand how we collect, use, and protect your information.
      </p>
      
      <h2 className="text-xl font-semibold mt-6 mb-4">6. Modifications to Terms</h2>
      <p className="mb-4">
        CampusEase reserves the right to modify these terms at any time. Changes will be communicated via the platform or email. Continued use of the platform constitutes acceptance of the updated terms.
      </p>
      
      <h2 className="text-xl font-semibold mt-6 mb-4">7. Governing Law</h2>
      <p className="mb-4">
        These terms are governed by the laws of Nigeria. Any disputes shall be resolved under the jurisdiction of Nigerian courts.
      </p>
      
      <h2 className="text-xl font-semibold mt-6 mb-4">8. Contact Us</h2>
      <p className="mb-4">
        For questions or concerns about these terms, please contact us at <a href="mailto:support@campusease.com" className="text-lightBlue hover:underline">support@campusease.com</a>.
      </p>
    </section>
  );
};

export default TermsAndConditions;
