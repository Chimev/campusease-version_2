import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_API_KEY);

export const sendEmail = async ({
  to,
  subject,
  html,
}: {
  to: string;
  subject: string;
  html: string;
}) => {
  try {
    const data = await resend.emails.send({
      from: 'CampusEase <noreply@campusease.com.ng>',
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
