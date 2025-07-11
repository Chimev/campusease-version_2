import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_API_KEY);

export const sendListingNotificationEmail  = async ({
  to,
  html,
  subject
}: {
  to: string;
  html: string;
  subject: string;
}) => {
  try {
    const data = await resend.emails.send({
      from: 'CampusEase - Listing <noreply@campusease.com.ng>',
      to,
      subject,
      html,
    });
    return data;
  } catch (error) {
    console.error('Email sending error:', error);
    throw error;
  }
};
