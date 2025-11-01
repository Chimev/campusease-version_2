import { render } from "@react-email/render";
import { sendListingNotificationEmail } from "@/utilis/email/sendListingEmail";
import ListingEmail from "@/components/emails/ListingEmail";

type User = {
  email: string;
};

export const listingNotificationEmail  = async ({user, category, listing}: {user: User, category:string, listing:any}) => {
  const template = await  render(
    <ListingEmail
  schoolName={listing.schoolName}
  category={category}
  listingTitle={listing.listingTitle}
  listingDescription={listing.listingDescription}
  listingPrice={listing.listingPrice}
  listingUrl={listing.listingUrl}
/>
  );

  console.log("📧 Sending welcome email to:", user.email);
  const capitalizedCategory = category.charAt(0).toUpperCase() + category.slice(1);


  await sendListingNotificationEmail({
    to: user.email,
    subject: `New ${capitalizedCategory} Listing available`,
    html: template,
  });
};
