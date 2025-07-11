import React, { type CSSProperties } from 'react';
import {
  Html,
  Head,
  Body,
  Container,
  Section,
  Row,
  Column,
  Heading,
  Text,
  Link,
  Hr,
  Button,
} from '@react-email/components';

type WelcomeEmailProps = {
  name?: string;
};

const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL || 'https://campusease.com.ng';

const WelcomeEmail = ({ name = 'User' }: WelcomeEmailProps) => {
  return (
    <Html>
      <Head />
      <Body style={main}>
        <Container style={container}>
          {/* Header */}
          <Section style={header}>
            <img src={`${BASE_URL}/4.png`} alt='logoImage' style={logo} />
            <Text style={headerSubtitle}>Simplifying Student Living</Text>
          </Section>

          {/* Main Content */}
          <Section style={content}>
            <Heading style={welcomeTitle}>Welcome to CampusEase!</Heading>
            <Text style={welcomeText}>Hi {name},</Text>
            <Text style={welcomeText}>
              We're genuinely excited to have you as part of our community. At CampusEase, our mission is to simplify your campus experience by connecting you to everything you need—whether that's finding accommodation, roommates, services, or great deals.
              <br />
              If you ever have questions or need help, we're here for you.
              <br />
              Thank you for joining us!
            </Text>

            {/* Features */}
            <Section style={featuresSection}>
              <Row>
                <Column style={featureCard}>
                  <div style={featureIcon}>🏠</div>
                  <Text style={featureTitle}>Accommodation</Text>
                  <Text style={featureDesc}>Find your perfect home away from home</Text>
                </Column>
                <Column style={featureCard}>
                  <div style={featureIcon}>👥</div>
                  <Text style={featureTitle}>Roommates</Text>
                  <Text style={featureDesc}>Connect with compatible roommates</Text>
                </Column>
              </Row>
              <Row>
                <Column style={featureCard}>
                  <div style={featureIcon}>🛠️</div>
                  <Text style={featureTitle}>Services</Text>
                  <Text style={featureDesc}>Access essential campus services</Text>
                </Column>
                <Column style={featureCard}>
                  <div style={featureIcon}>🛒</div>
                  <Text style={featureTitle}>Marketplace</Text>
                  <Text style={featureDesc}>Buy and sell items with ease</Text>
                </Column>
              </Row>
            </Section>

            {/* CTA */}
            <Section style={ctaSection}>
              <Heading style={ctaTitle}>Ready to Get Started?</Heading>
              <Text style={ctaText}>
                Explore thousands of listings and connect with your campus community today!
              </Text>
              <Button style={ctaButton} href={`${BASE_URL}/sign-in`}>
                Start Exploring
              </Button>
            </Section>

            {/* Quick Links */}
            <Section style={quickLinksSection}>
              <Heading style={sectionTitle}>Quick Links</Heading>
              <Row>
                <Column>
                  <Link style={quickLink} href={`${BASE_URL}/category/accommodation`}>
                    🏠 Find Accommodation
                  </Link>
                </Column>
                <Column>
                  <Link style={quickLink} href={`${BASE_URL}/category/roommate`}>
                    👥 Find Roommates
                  </Link>
                </Column>
              </Row>
              <Row>
                <Column>
                  <Link style={quickLink} href={`${BASE_URL}/category/service`}>
                    🛠️ Browse Services
                  </Link>
                </Column>
                <Column>
                  <Link style={quickLink} href={`${BASE_URL}/category/marketplace`}>
                    🛒 Visit Marketplace
                  </Link>
                </Column>
              </Row>
            </Section>

            {/* Stats */}
            <Section style={statsSection}>
              <Text style={statsTitle}>Join Our Growing Community</Text>
              <Row>
                <Column style={statItem}>
                  <Text style={statNumber}>50+</Text>
                  <Text style={statLabel}>Campuses</Text>
                </Column>
                <Column style={statItem}>
                  <Text style={statNumber}>10k+</Text>
                  <Text style={statLabel}>Users</Text>
                </Column>
                <Column style={statItem}>
                  <Text style={statNumber}>5k+</Text>
                  <Text style={statLabel}>Listings</Text>
                </Column>
              </Row>
            </Section>
          </Section>

          {/* Footer */}
          <Section style={footer}>
            <Text style={footerText}>
              Need help? Visit our{' '}
              <Link href={`${BASE_URL}/faq`} style={footerLink}>
                Help Center
              </Link>
            </Text>

            <Hr style={hr} />

            <Text style={footerText}>Follow us on social media:</Text>
            <Row>
              <Column>
                <Link href="https://x.com/campus_ease" style={socialLink}>X</Link>
              </Column>
              <Column>
                <Link href="https://instagram.com/campus_ease" style={socialLink}>Instagram</Link>
              </Column>
              <Column>
                <Link href="#" style={socialLink}>Facebook</Link>
              </Column>
            </Row>

            <Hr style={hr} />

            <Text style={footerSmall}>
              © 2025 CampusEase. All rights reserved.
              <br />
              <Link href={`${BASE_URL}/unsubscribe`} style={unsubscribeLink}>Unsubscribe</Link>
              {' | '}
              <Link href={`${BASE_URL}/privacy`} style={unsubscribeLink}>Privacy Policy</Link>
            </Text>
          </Section>
        </Container>
      </Body>
    </Html>
  );
};

// Styles
const main: CSSProperties = {
  backgroundColor: '#f8f9fa',
  fontFamily:
    '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif',
};

const container: CSSProperties = {
  backgroundColor: '#ffffff',
  margin: '0 auto',
  padding: '0',
  borderRadius: '12px',
  boxShadow: '0 4px 20px rgba(0, 0, 0, 0.1)',
  maxWidth: '600px',
  overflow: 'hidden',
};

const header: CSSProperties = {
  background: 'linear-gradient(135deg, #0f766e, #134e4a)',
  padding: '40px 30px',
  textAlign: 'center',
};

const logo: CSSProperties = {
    
  width: 'auto',
  height: 'auto',
  margin: '0 auto 10px ',
};

const headerSubtitle: CSSProperties = {
  color: 'rgba(255, 255, 255, 0.9)',
  fontSize: '16px',
  margin: '0',
};

const content: CSSProperties = {
  padding: '40px 30px',
};

const welcomeTitle: CSSProperties = {
  color: '#0f766e',
  fontSize: '28px',
  fontWeight: 'bold',
  textAlign: 'center',
  margin: '0 0 20px 0',
};

const welcomeText: CSSProperties = {
  color: '#666666',
  fontSize: '16px',
  lineHeight: 1.6,
  margin: '0 0 16px 0',
};

const featuresSection: CSSProperties = {
  margin: '30px 0',
};

const featureCard: CSSProperties = {
  backgroundColor: '#f0fdfa',
  padding: '20px',
  borderRadius: '8px',
  textAlign: 'center',
  border: '1px solid #ccfbf1',
  margin: '10px',
};

const featureIcon: CSSProperties = {
  fontSize: '24px',
  marginBottom: '10px',
};

const featureTitle: CSSProperties = {
  color: '#0f766e',
  fontWeight: 'bold',
  fontSize: '14px',
  margin: '0 0 5px 0',
};

const featureDesc: CSSProperties = {
  color: '#666666',
  fontSize: '12px',
  margin: '0',
};

const ctaSection: CSSProperties = {
  background: 'linear-gradient(135deg, #f8ae24, #d97706)',
  padding: '30px',
  borderRadius: '12px',
  textAlign: 'center',
  margin: '30px 0',
};

const ctaTitle: CSSProperties = {
  color: '#ffffff',
  fontSize: '20px',
  fontWeight: 'bold',
  margin: '0 0 15px 0',
};

const ctaText: CSSProperties = {
  color: '#ffffff',
  fontSize: '16px',
  margin: '0 0 20px 0',
};

const ctaButton: CSSProperties = {
  backgroundColor: '#ffffff',
  color: '#f8ae24',
  padding: '12px 30px',
  borderRadius: '25px',
  textDecoration: 'none',
  fontWeight: 'bold',
  display: 'inline-block',
};

const quickLinksSection: CSSProperties = {
  margin: '30px 0',
};

const sectionTitle: CSSProperties = {
  color: '#0f766e',
  fontSize: '18px',
  fontWeight: 'bold',
  textAlign: 'center',
  margin: '0 0 20px 0',
};

const quickLink: CSSProperties = {
  display: 'block',
  backgroundColor: '#f8f9fa',
  padding: '15px',
  borderRadius: '8px',
  textDecoration: 'none',
  color: '#0f766e',
  fontWeight: '500',
  textAlign: 'center',
  margin: '10px',
  border: '2px solid transparent',
};

const statsSection: CSSProperties = {
  backgroundColor: '#0f766e',
  padding: '25px',
  borderRadius: '8px',
  textAlign: 'center',
  margin: '30px 0',
};

const statsTitle: CSSProperties = {
  color: '#ffffff',
  fontSize: '18px',
  fontWeight: 'bold',
  margin: '0 0 20px 0',
};

const statItem: CSSProperties = {
  textAlign: 'center',
  padding: '0 10px',
};

const statNumber: CSSProperties = {
  fontSize: '24px',
  fontWeight: 'bold',
  color: '#f8ae24',
  margin: '0',
};

const statLabel: CSSProperties = {
  fontSize: '12px',
  color: 'rgba(255, 255, 255, 0.9)',
  margin: '0',
};

const tipsSection: CSSProperties = {
  backgroundColor: '#f8f9fa',
  padding: '25px',
  borderRadius: '8px',
  margin: '30px 0',
};

const tipItem: CSSProperties = {
  color: '#333333',
  fontSize: '14px',
  margin: '0 0 10px 0',
  lineHeight: 1.5,
};

const footer: CSSProperties = {
  backgroundColor: '#f8f9fa',
  padding: '30px',
  textAlign: 'center',
  borderTop: '1px solid #e5e7eb',
};

const footerText: CSSProperties = {
  color: '#666666',
  fontSize: '14px',
  margin: '0 0 15px 0',
};

const footerLink: CSSProperties = {
  color: '#0f766e',
  textDecoration: 'none',
};

const hr: CSSProperties = {
  border: 'none',
  borderTop: '1px solid #e5e7eb',
  margin: '20px 0',
};

const socialLink: CSSProperties = {
  color: '#0f766e',
  textDecoration: 'none',
  fontSize: '14px',
  margin: '0 10px',
};

const footerSmall: CSSProperties = {
  color: '#999999',
  fontSize: '12px',
  margin: '0',
};

const unsubscribeLink: CSSProperties = {
  color: '#999999',
  textDecoration: 'none',
};

export default WelcomeEmail;
