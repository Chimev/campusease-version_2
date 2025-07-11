import React, { type CSSProperties } from 'react';
import {
  Html,
  Head,
  Body,
  Container,
  Section,
  Heading,
  Text,
  Link,
  Button,
  Hr,
} from '@react-email/components';

type NewListingEmailProps = {
  schoolName: string;
  category: 'accommodation' | 'roommate' | string;
  listingTitle: string;
  listingDescription: string;
  listingPrice?: string;
  listingUrl: string;
};

const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL || 'https://campusease.com.ng';

const ListingEmail = ({ 
  schoolName,
  category,
  listingTitle,
  listingDescription,
  listingPrice,
  listingUrl,
}: NewListingEmailProps) => {
  const categoryEmoji = category === 'accommodation' ? '🏠' : '👥';
  const categoryLabel = category === 'accommodation' ? 'Accommodation' : 'Roommate';
  
  return (
    <Html>
      <Head />
      <Body style={main}>
        <Container style={container}>
          {/* Header */}
           {/* Header */}
            <Section style={header}>
                <img src={`${BASE_URL}/4.png`} alt='CampusEase Logo' style={logo} />
                <Text style={headerText}>Simplifying Student Living</Text>
            </Section>

          {/* Main Content */}
          <Section style={content}>
            <Heading style={title}>
              {categoryEmoji} New {categoryLabel} at {schoolName}
            </Heading>
            
            <Text style={greeting}>Hi,</Text>
            
            <Text style={mainText}>
              A new {category} listing has been posted at your school that might interest you!
            </Text>

            {/* Listing Card */}
            <Section style={listingCard}>
              <Heading style={listingTitleStyle}>{listingTitle}</Heading>
              {listingPrice && (
                <Text style={listingPriceStyle}>💰 {listingPrice}</Text>
              )}
              <Text style={listingDescriptionStyle}>
                {listingDescription}
              </Text>
              
              <Button style={viewButton} href={listingUrl}>
                View Full Details
              </Button>
            </Section>

            <Text style={footerText}>
              Don't miss out on this opportunity! Listings go fast.
            </Text>

            {/* Quick Action */}
            <Section style={quickAction}>
              <Link href={`${BASE_URL}/category/${category}`} style={browseLink}>
                Browse More {categoryLabel} Listings
              </Link>
            </Section>
          </Section>

          {/* Footer */}
          <Section style={footer}>
            <Hr style={hr} />
            <Text style={footerSmall}>
              You're receiving this because you have notifications enabled for {schoolName}.
              <br />
              <Link href={`${BASE_URL}/notifications`} style={footerLink}>
                Manage Notifications
              </Link>
              {' | '}
              <Link href={`${BASE_URL}/unsubscribe`} style={footerLink}>
                Unsubscribe
              </Link>
            </Text>
            <Text style={copyright}>
              © 2025 CampusEase. All rights reserved.
            </Text>
          </Section>
        </Container>
      </Body>
    </Html>
  );
};

// Styles
const main: CSSProperties = {
  backgroundColor: '#f3f4f6',
  fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
};

const container: CSSProperties = {
  backgroundColor: '#ffffff',
  margin: '0 auto',
  padding: '0',
  borderRadius: '8px',
  boxShadow: '0 2px 10px rgba(0, 0, 0, 0.1)',
  maxWidth: '600px',
  overflow: 'hidden',
};

const header: CSSProperties = {
  backgroundColor: '#0f766e',
  padding: '40px 30px',
  textAlign: 'center',
};

const logo: CSSProperties = {
  width: 'auto',
  height: 'auto',
  margin: '0 auto 10px',
};

const headerText: CSSProperties = {
  color: 'rgba(255, 255, 255, 0.9)',
  fontSize: '16px',
  margin: '0, 0, 4px',
};

const content: CSSProperties = {
  padding: '30px',
};

const title: CSSProperties = {
  color: '#0f766e',
  fontSize: '22px',
  fontWeight: 'bold',
  textAlign: 'center',
  margin: '0 0 20px 0',
};

const greeting: CSSProperties = {
  color: '#374151',
  fontSize: '16px',
  margin: '0 0 15px 0',
};

const mainText: CSSProperties = {
  color: '#6b7280',
  fontSize: '16px',
  lineHeight: 1.5,
  margin: '0 0 25px 0',
};

const listingCard: CSSProperties = {
  backgroundColor: '#f9fafb',
  border: '1px solid #e5e7eb',
  borderRadius: '8px',
  padding: '20px',
  margin: '20px 0',
  textAlign: 'center',
};

const listingTitleStyle: CSSProperties = {
  color: '#111827',
  fontSize: '18px',
  fontWeight: 'bold',
  margin: '0 0 10px 0',
};

const listingLocationStyle: CSSProperties = {
  color: '#6b7280',
  fontSize: '14px',
  margin: '0 0 5px 0',
};

const listingPriceStyle: CSSProperties = {
  color: '#059669',
  fontSize: '16px',
  fontWeight: 'bold',
  margin: '0 0 15px 0',
};

const listingDescriptionStyle: CSSProperties = {
  color: '#6b7280',
  fontSize: '14px',
  lineHeight: 1.4,
  margin: '0 0 20px 0',
};

const viewButton: CSSProperties = {
  backgroundColor: '#f59e0b',
  color: '#ffffff',
  padding: '12px 24px',
  borderRadius: '6px',
  textDecoration: 'none',
  fontWeight: 'bold',
  fontSize: '14px',
  display: 'inline-block',
};

const footerText: CSSProperties = {
  color: '#6b7280',
  fontSize: '14px',
  textAlign: 'center',
  margin: '20px 0',
};

const quickAction: CSSProperties = {
  textAlign: 'center',
  margin: '20px 0',
};

const browseLink: CSSProperties = {
  color: '#0f766e',
  textDecoration: 'none',
  fontSize: '14px',
  fontWeight: '500',
};

const footer: CSSProperties = {
  backgroundColor: '#f9fafb',
  padding: '20px',
  textAlign: 'center',
};

const hr: CSSProperties = {
  border: 'none',
  borderTop: '1px solid #e5e7eb',
  margin: '0 0 15px 0',
};

const footerSmall: CSSProperties = {
  color: '#9ca3af',
  fontSize: '12px',
  margin: '0 0 10px 0',
  lineHeight: 1.4,
};

const footerLink: CSSProperties = {
  color: '#0f766e',
  textDecoration: 'none',
};

const copyright: CSSProperties = {
  color: '#9ca3af',
  fontSize: '12px',
  margin: '0',
};

export default ListingEmail;