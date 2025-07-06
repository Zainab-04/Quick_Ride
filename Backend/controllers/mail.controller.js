const asyncHandler = require("express-async-handler");
const { validationResult } = require("express-validator");
const jwt = require("jsonwebtoken");

const { sendMail } = require("../services/mail.service");

let mailTemplate = `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <title>Email Verification</title>
  <style>
    body {
      font-family: 'Segoe UI', Roboto, sans-serif;
      background-color: #f5f7fa;
      color: #333;
      margin: 0;
      padding: 0;
    }
    .container {
      max-width: 600px;
      margin: auto;
      background: #ffffff;
      padding: 30px;
      border-radius: 8px;
      box-shadow: 0 4px 12px rgba(0, 0, 0, 0.08);
    }
    .button {
      display: inline-block;
      padding: 12px 24px;
      background-color: #bde8ff;
      color: #fff;
      text-decoration: none;
      font-weight: bold;
      border-radius: 6px;
      margin-top: 20px;
    }
    
    a{
      color: #fff;
      text-decoration: none;
    }
    
    .footer {
      font-size: 13px;
      color: #777;
      margin-top: 30px;
      text-align: center;
    }
    .link {
      word-break: break-all;
      color: #4CAF50;
    }
  </style>
</head>
<body>
  <div class="container">
    <h1 style="text-align: center">QuickRide</h1>
    <h2>Email Verification Required</h2>
    <p>Hi there,</p>
    <p>Thanks for signing up! To start using your account, please verify your email address by clicking the button below.</p>

    <a href="{{verification_link}}" class="button" target="_blank">Verify Email</a>

    <p style="margin-top: 20px;">If the button above doesn’t work, please copy and paste the following link into your browser:</p>
    <p class="link">{{verification_link}}</p>

    <p>This verification link is valid for <strong>15 minutes</strong> only.</p>

    <p>If you didn’t request this email, you can safely ignore it.</p>

    <div class="footer">
      &mdash; The QuickRide Team<br>
      <small>Need help? Contact us at <a href="mailto:${process.env.MAIL_USER}">${process.env.MAIL_USER}</a></small>
    </div>
  </div>
</body>
</html>
`;

module.exports.sendVerificationEmail = asyncHandler(async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json(errors.array());
  }

  let user;

  if (req.userType === "user") {
    user = req.user;
  } else if (req.userType === "captain") {
    user = req.captain;
  } else {
    return res.status(400).json({ message: "Invalid user type" });
  }

  if (user.emailVerified) {
    return res.status(400).json({ message: "Email already verified" });
  }

  const token = jwt.sign(
    { id: user._id, userType: req.userType },
    process.env.JWT_SECRET,
    {
      expiresIn: "15m",
    }
  );

  if (!token) {
    return res
      .status(500)
      .json({ message: "Failed to generate verification token" });
  }

  try {
    const verification_link = `${process.env.CLIENT_URL}/${req.userType}/verify-email?token=${token}`;

    // Replace all occurrences of the placeholder
    const mailHtml = mailTemplate.replace(
      /{{verification_link}}/g,
      verification_link
    );

    const result = await sendMail(
      user.email,
      "QuickRide - Email Verification",
      mailHtml
    );

    return res.status(200).json({
      message: "Verification email sent successfully",
      user: {
        email: user.email,
        fullname: user.fullname,
      },
    });
  } catch (error) {
    console.error("Error sending verification email:", error);
    return res
      .status(500)
      .json({ message: "Failed to send verification email" });
  }
});
