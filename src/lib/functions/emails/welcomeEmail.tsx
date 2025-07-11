import { sendWelcomeEmail } from "@/utilis/email/sendWelcomeEmail";
import WelcomeEmail from "@/components/emails/WelcomeEmail";
import { render } from "@react-email/render";

type User = {
  name: string;
  email: string;
};

export const welcomeEmail = async ({user}: {user: User}) => {
  const template = await  render(<WelcomeEmail name={user.name} />);

  console.log("📧 Sending welcome email to:", user.email);

  await sendWelcomeEmail({
    to: user.email,
    subject: "Welcome to CampusEase!",
    html: template,
  });
};
