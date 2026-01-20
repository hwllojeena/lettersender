import { NextResponse } from 'next/server';
import nodemailer from 'nodemailer';

export async function POST(request) {
    try {
        const body = await request.json();
        const { toEmail, fromName, message } = body;

        // Basic validation
        if (!toEmail || !message || !fromName) {
            return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
        }

        // Check for environment variables
        const { SMTP_USER, SMTP_PASS } = process.env;

        if (!SMTP_USER || !SMTP_PASS) {
            console.log('---------------------------------------------------');
            console.log('⚠️  NO GMAIL CREDENTIALS FOUND. MOCKING EMAIL SEND.');
            console.log(`To: ${toEmail}`);
            console.log(`From: ${fromName}`);
            console.log(`Message:\n${message}`);
            console.log('---------------------------------------------------');

            // Simulate network delay
            await new Promise(resolve => setTimeout(resolve, 1000));

            return NextResponse.json({ success: true, message: 'Email simulated' });
        }

        // Configure transporter for Gmail
        const transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
                user: SMTP_USER,
                pass: SMTP_PASS,
            }
        });

        // Email content
        const mailOptions = {
            from: `"${fromName}" <${SMTP_USER}>`,
            to: toEmail,
            subject: `A Handwritten Letter from ${fromName}`,
            text: `From: ${fromName}\n\n${message}`,
            html: `
                <div style="font-family: sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; background-color: #f9f9f9; border-radius: 10px; color: #134857;">
                    <h2 style="color: #134857; font-weight: 500;">You've received a letter!</h2>
                    <div style="background-color: white; padding: 20px; border-radius: 5px; border: 1px solid #eee; line-height: 1.6;">
                        ${message.replace(/\n/g, '<br>')}
                    </div>
                    <p style="margin-top: 20px; color: #546e7a;">Sincerely,<br><strong>${fromName}</strong></p>
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
