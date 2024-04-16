import type { NextApiRequest, NextApiResponse } from 'next';
import { EmailTemplate } from '../../app/components/email-templates';
import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_API_KEY);

export default async (req: NextApiRequest, res: NextApiResponse) => {
  const { data, error } = await resend.emails.send({
    from: 'Contact Form <causeway4dmin@gmail.com>',
    to: 'causeway4dmin@gmail.com', // We are going to query the donors email from the database 
    subject: 'Causeway Donation Digital Receipt',
    react: EmailTemplate({ firstName: 'John' }),  // Get the name as well as other variables values by querying from the database 
  });

  if (error) {
    return res.status(400).json(error);
  }

  res.status(200).json(data);
};
