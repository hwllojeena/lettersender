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

        // Check for environment variables with detailed logging for Vercel troubleshooting
        const { SMTP_USER, SMTP_PASS } = process.env;

        console.log('Environment Check:', {
            hasUser: !!SMTP_USER,
            hasPass: !!SMTP_PASS,
            userPreview: SMTP_USER ? `${SMTP_USER.substring(0, 3)}...` : 'not-found'
        });

        if (!SMTP_USER || !SMTP_PASS) {
            console.error('❌ Missing GMAIL credentials in environment variables.');
            return NextResponse.json({
                error: 'Server configuration error: Missing credentials.',
                success: false
            }, { status: 500 });
        }

        // Configure transporter for Gmail - Port 587 with STARTTLS is often better for Vercel
        const transporter = nodemailer.createTransport({
            host: 'smtp.gmail.com',
            port: 587,
            secure: false, // use STARTTLS
            auth: {
                user: SMTP_USER,
                pass: SMTP_PASS,
            },
            // Add timeouts to prevent hanging
            connectionTimeout: 15000, // 15 seconds
            greetingTimeout: 15000,
            socketTimeout: 15000,
        });

        // Verify connection configuration
        try {
            await transporter.verify();
            console.log("SMTP connection verified successfully");
        } catch (verifyError) {
            console.error("SMTP verification failed:", verifyError);
            return NextResponse.json({
                error: 'SMTP connection failed. Check your Gmail App Password and security settings.',
                details: verifyError.message
            }, { status: 500 });
        }

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
