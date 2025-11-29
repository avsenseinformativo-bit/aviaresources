const express = require('express');
const nodemailer = require('nodemailer');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();
const PORT = 3000;

// Middleware
app.use(cors());
app.use(bodyParser.json());
app.use(express.static('.'));

// Configure email transporter
// IMPORTANT: Replace with your actual email credentials
const transporter = nodemailer.createTransport({
    service: 'gmail', // or your email service
    auth: {
        user: 'your-email@gmail.com', // Replace with your email
        pass: 'your-app-password'      // Replace with your app password
    }
});

// Registration email endpoint
app.post('/api/send-registration-email', async (req, res) => {
    const { name, email, registeredAt } = req.body;

    try {
        // Email to admin
        const adminMailOptions = {
            from: 'AV IA Resources <your-email@gmail.com>',
            to: 'your-email@gmail.com', // Your email to receive notifications
            subject: '🎉 New User Registration - AV IA Resources',
            html: `
                <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
                    <h2 style="color: #3b82f6;">New User Registration!</h2>
                    <p>A new user has registered on AV IA Resources:</p>
                    <ul>
                        <li><strong>Name:</strong> ${name}</li>
                        <li><strong>Email:</strong> ${email}</li>
                        <li><strong>Registered:</strong> ${new Date(registeredAt).toLocaleString()}</li>
                    </ul>
                    <hr>
                    <p style="color: #666; font-size: 12px;">
                        This is an automated notification from AV IA Resources
                    </p>
                </div>
            `
        };

        // Welcome email to user
        const userMailOptions = {
            from: 'AV IA Resources <your-email@gmail.com>',
            to: email,
            subject: 'Welcome to AV IA Resources! 🚀',
            html: `
                <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
                    <div style="background: linear-gradient(135deg, #3b82f6 0%, #8b5cf6 100%); padding: 40px; text-align: center; border-radius: 10px 10px 0 0;">
                        <h1 style="color: white; margin: 0;">Welcome to AV IA Resources!</h1>
                    </div>
                    <div style="padding: 40px; background: #f9fafb; border-radius: 0 0 10px 10px;">
                        <h2 style="color: #1f2937;">Hi ${name}! 👋</h2>
                        <p style="color: #4b5563; font-size: 16px; line-height: 1.6;">
                            Thank you for joining AV IA Resources! We're excited to have you on board.
                        </p>
                        <p style="color: #4b5563; font-size: 16px; line-height: 1.6;">
                            You now have access to our collection of AI tools and resources. Start exploring:
                        </p>
                        <ul style="color: #4b5563; font-size: 16px; line-height: 1.8;">
                            <li>6 Free AI Resources</li>
                            <li>Premium Tools (upgrade anytime)</li>
                            <li>Regular updates and new features</li>
                        </ul>
                        <div style="text-align: center; margin: 30px 0;">
                            <a href="https://yourwebsite.com" style="background: linear-gradient(135deg, #3b82f6 0%, #8b5cf6 100%); color: white; padding: 15px 30px; text-decoration: none; border-radius: 8px; display: inline-block; font-weight: 600;">
                                Start Exploring
                            </a>
                        </div>
                        <hr style="border: none; border-top: 1px solid #e5e7eb; margin: 30px 0;">
                        <p style="color: #9ca3af; font-size: 14px; text-align: center;">
                            Questions? Reply to this email anytime!
                        </p>
                    </div>
                </div>
            `
        };

        // Send both emails
        await transporter.sendMail(adminMailOptions);
        await transporter.sendMail(userMailOptions);

        res.json({ success: true, message: 'Registration emails sent successfully' });
    } catch (error) {
        console.error('Error sending email:', error);
        res.status(500).json({ success: false, error: 'Failed to send email' });
    }
});

// Start server
app.listen(PORT, () => {
    console.log(`✅ Server running on http://localhost:${PORT}`);
    console.log(`📧 Email notifications enabled`);
});
