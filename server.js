const express = require('express');
const nodemailer = require('nodemailer');
const bodyParser = require('body-parser');

const app = express();
const port = process.env.PORT || 3000;

// Middleware to parse form data
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static('public')); // Assuming your HTML and JS files are in the 'public' directory

// Serve your HTML page
app.get('/', (req, res) => {
    res.sendFile(__dirname + '/public/index.html');
});

// Handle form submission
app.post('/send-email', (req, res) => {
    const { name, email, message } = req.body;

    // Create a transporter using your SMTP server credentials
    const transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: 'bhargavviraj143@gmail.com', // Replace with your SMTP email address
            pass: 'Viraj@2023' // Replace with your SMTP password
        }
    });

    // Define email options
    const mailOptions = {
        from: 'bhargavviraj143@gmail.com', // Replace with your SMTP email address
        to: 'bhargavbhargav995@gmail.com', // Replace with your email address
        subject: 'New Contact Form Submission',
        text: `Name: ${name}\nEmail: ${email}\nMessage: ${message}`
    };

    // Send the email
    transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            return res.status(500).send(error.toString());
        }
        res.send('Email sent: ' + info.response);
    });
});

// Start the server
app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
