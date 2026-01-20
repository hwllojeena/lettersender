import { NextResponse } from 'next/server';
import nodemailer from 'nodemailer';

export async function POST(request) {
    try {
        const body = await request.json();
        const { toName, toEmail, fromName, subject, message } = body;

        if (!toEmail || !message) {
            return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
        }

        // Check for environment variables
        const { SMTP_HOST, SMTP_PORT, SMTP_USER, SMTP_PASS } = process.env;

        if (!SMTP_HOST || !SMTP_USER || !SMTP_PASS) {
            console.log('---------------------------------------------------');
            console.log('⚠️  NO EMAIL CREDENTIALS FOUND. MOCKING EMAIL SEND.');
            console.log(`To: ${toName} <${toEmail}>`);
            console.log(`From: ${fromName}`);
            console.log(`Subject: ${subject}`);
            console.log(`Message:\n${message}`);
            console.log('---------------------------------------------------');

            // Simulate network delay
            await new Promise(resolve => setTimeout(resolve, 1000));

            return NextResponse.json({ success: true, message: 'Email simulated' });
        }

        // Configure transporter
        const transporter = nodemailer.createTransport({
            host: SMTP_HOST,
            port: SMTP_PORT || 587,
            secure: false, // true for 465, false for other ports
            auth: {
                user: SMTP_USER,
                pass: SMTP_PASS,
            },
            tls: {
                rejectUnauthorized: false
            }
        });

        // Email content
        const mailOptions = {
            from: `"${fromName}" <${process.env.SMTP_FROM || SMTP_USER}>`,
            to: toEmail,
            subject: subject,
            text: `Dear ${toName},\n\n${message}\n\nSincerely,\n${fromName}`,
            html: `
        <div style="font-family: sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; background-color: #f9f9f9; border-radius: 10px;">
          <h2 style="color: #444;">A Letter for You</h2>
          <p>Dear <strong>${toName}</strong>,</p>
          <div style="background-color: white; padding: 20px; border-radius: 5px; border: 1px solid #ddd; line-height: 1.6;">
            ${message.replace(/\n/g, '<br>')}
          </div>
          <p style="margin-top: 20px; color: #666;">Sincerely,<br><strong>${fromName}</strong></p>
        </div>
      `,
        };

        const info = await transporter.sendMail(mailOptions);
        console.log("Message sent: %s", info.messageId);

        return NextResponse.json({ success: true, messageId: info.messageId });

    } catch (error) {
        console.error('Error sending email:', error);
        return NextResponse.json({ error: 'Failed to send email' }, { status: 500 });
    }
}
