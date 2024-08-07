
import * as React from 'react';

interface EmailTemplateProps {
  username: string,
  otp:string
}

export const EmailTemplate: React.FC<Readonly<EmailTemplateProps>> = ({
  username,otp
}) => (
  <div>
    <h1>Welcome, {username}! here is your verification code ,{otp}</h1>
  </div>
);
