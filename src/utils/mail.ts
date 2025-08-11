import nodemailer from 'nodemailer';
import { env } from "@app/utils/env"

const transporter = nodemailer.createTransport({
    host: env.EMAIL_SERVER_URL,
    port: parseInt(env.EMAIL_SMTP_PORT),
    secure: env.EMAIL_SSL === 'true', // true for 465, may be false for other ports
    auth: {
        user: env.EMAIL_USER,
        pass: env.EMAIL_PASS,
    },
});


export const sendOtpEmail = async (email: string, otp: string, username?: string): Promise<void> => {
    const mailOptions = {
        from: {
            name: 'Saudi Research Data Repository Initiative',
            address: env.EMAIL_USER
        },
        to: email,
        subject: 'Your Email Verification Link',
        text: `Your email verification link`,
        html: `
        <!DOCTYPE html>
        <html>
          <head>
            <meta charset="utf-8">
            <title>Verification Code</title>
          </head>
          <body style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px;">
            <div style="background-color: #f8f9fa; padding: 30px; border-radius: 10px;">
              <h2 style="color: #333; text-align: center;">Email Verification</h2>
              ${username ? `<p>Hello ${username},</p>` : '<p>Hello,</p>'}
              <p>Your verification link to activate your account for the Saudi Research Data Repository Initiative application is:</p>
              <div style="text-align: center;">
                <a href="${otp}" style="display: inline-block; background-color: #007bff; color: white; font-size: 24px; font-weight: bold; text-align: center; padding: 15px; border-radius: 5px; margin: 20px 0; text-decoration: none;">
                  Verify Now
                </a>
              </div>
              <p style="color: #666; font-size: 14px;">
                This link will expire in 60 minutes. If you didn't request this link, please ignore this email.
              </p>
              // Add a if you ar not able to click the button, copy and paste the link below
              <p style="color: #666; font-size: 14px;">
                If you are not able to click the button, copy and paste the link below in your browser:
              </p>
              <p style="color: #007bff; font-size: 14px; text-align: center;">
                ${otp}
              </p>
              <hr style="border: none; border-top: 1px solid #eee; margin: 20px 0;">
              <p style="color: #999; font-size: 12px; text-align: center;">
                Saudi Research Data Repository Initiative<br>
                King Saud University
              </p>
            </div>
          </body>
        </html>
        `
    };

    await transporter.sendMail(mailOptions);
};