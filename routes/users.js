const express = require('express');
const router = express.Router();
const path = require('path')
const bcrypt = require('bcryptjs');
const passport = require('passport');
const nodemailer = require('nodemailer');
// Load User model
const User = require('../models/User');
// const fisrtMail = require('../firstmail.html')
const { forwardAuthenticated } = require('../config/auth');

// Login Page
router.get('/login', forwardAuthenticated, (req, res) => res.render('login'));

// Register Page
router.get('/register', forwardAuthenticated, (req, res) => res.render('register'));
// Register
router.post('/register', (req, res) => {
  const { fisrt_name, last_name, email, password, password2, code,} = req.body;
  let errors = [];
  const referalcode = fisrt_name + Math.floor(Math.random() * 76876559);

  if (!fisrt_name || !last_name|| !email || !password || !password2 ) {
    errors.push({ msg: 'Please enter all fields' });
  }

  if (password != password2) {
    errors.push({ msg: 'Passwords do not match' });
  }

  if (password.length < 6) {
    errors.push({ msg: 'Password must be at least 6 characters' });
  }

  if (errors.length > 0) {
    res.render('register', {
      errors,
      fisrt_name,
      last_name,
      email,
      password,
      password2
    });
  } else {
    User.findOne({ email: email }).then(user => {
      if (user) {
        errors.push({ msg: 'Email already exists' });
        res.render('register', {
          errors,
          fisrt_name,
          last_name,
          email,
          password,
          password2,
          code,
          referalcode
        });
      } else {
        const newUser = new User({
          fisrt_name,
          last_name,
          email,
          password,
          password2,
          code,
          referalcode
        });

        
        bcrypt.genSalt(10, (err, salt) => {
          bcrypt.hash(newUser.password, salt, (err, hash) => {
            if (err) throw err;
            newUser.password = hash;
            newUser
              .save()
              .then(user => {
                req.flash(
                  'success_msg',
                  'You are now registered and can log in'
                );
                console.log(email);
     
                let transporter = nodemailer.createTransport({
                  host: 'mail.privateemail.com',
                  port: 465,
                  secure: true, // true for 465, false for other ports
                  auth: {
                      user: 'mail@coinanalytica.com', // generated ethereal user
                      pass: 'mirahmirah'  // generated ethereal password
                  },
                  tls:{
                    rejectUnauthorized:false
                  }
                });
              
                // setup email data with unicode symbols
                let mailOptions = {
                    from: '"Bennit from Coin Analytica" <mail@coinanalytica.com>', // sender address
                    to: email, // list of receivers
                    subject: 'Your Passport to financial Freedom', // Subject line
                    text: 'Start Today!', // plain text body
                    html: `<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional //EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">

                    <html xmlns="http://www.w3.org/1999/xhtml" xmlns:o="urn:schemas-microsoft-com:office:office" xmlns:v="urn:schemas-microsoft-com:vml">
                    <head>
                    <!--[if gte mso 9]><xml><o:OfficeDocumentSettings><o:AllowPNG/><o:PixelsPerInch>96</o:PixelsPerInch></o:OfficeDocumentSettings></xml><![endif]-->
                    <meta content="text/html; charset=utf-8" http-equiv="Content-Type"/>
                    <meta content="width=device-width" name="viewport"/>
                    <!--[if !mso]><!-->
                    <meta content="IE=edge" http-equiv="X-UA-Compatible"/>
                    <!--<![endif]-->
                    <title></title>
                    <!--[if !mso]><!-->
                    <!--<![endif]-->
                    <style type="text/css">
                        body {
                          margin: 0;
                          padding: 0;
                        }
                    
                        table,
                        td,
                        tr {
                          vertical-align: top;
                          border-collapse: collapse;
                        }
                    
                        * {
                          line-height: inherit;
                        }
                    
                        a[x-apple-data-detectors=true] {
                          color: inherit !important;
                          text-decoration: none !important;
                        }
                      </style>
                    <style id="media-query" type="text/css">
                        @media (max-width: 720px) {
                    
                          .block-grid,
                          .col {
                            min-width: 320px !important;
                            max-width: 100% !important;
                            display: block !important;
                          }
                    
                          .block-grid {
                            width: 100% !important;
                          }
                    
                          .col {
                            width: 100% !important;
                          }
                    
                          .col>div {
                            margin: 0 auto;
                          }
                    
                          img.fullwidth,
                          img.fullwidthOnMobile {
                            max-width: 100% !important;
                          }
                    
                          .no-stack .col {
                            min-width: 0 !important;
                            display: table-cell !important;
                          }
                    
                          .no-stack.two-up .col {
                            width: 50% !important;
                          }
                    
                          .no-stack .col.num4 {
                            width: 33% !important;
                          }
                    
                          .no-stack .col.num8 {
                            width: 66% !important;
                          }
                    
                          .no-stack .col.num4 {
                            width: 33% !important;
                          }
                    
                          .no-stack .col.num3 {
                            width: 25% !important;
                          }
                    
                          .no-stack .col.num6 {
                            width: 50% !important;
                          }
                    
                          .no-stack .col.num9 {
                            width: 75% !important;
                          }
                    
                          .video-block {
                            max-width: none !important;
                          }
                    
                          .mobile_hide {
                            min-height: 0px;
                            max-height: 0px;
                            max-width: 0px;
                            display: none;
                            overflow: hidden;
                            font-size: 0px;
                          }
                    
                          .desktop_hide {
                            display: block !important;
                            max-height: none !important;
                          }
                        }
                      </style>
                    </head>
                    <body class="clean-body" style="margin: 0; padding: 0; -webkit-text-size-adjust: 100%; background-color: #f9f9f9;">
                    <!--[if IE]><div class="ie-browser"><![endif]-->
                    <table bgcolor="#f9f9f9" cellpadding="0" cellspacing="0" class="nl-container" role="presentation" style="table-layout: fixed; vertical-align: top; min-width: 320px; Margin: 0 auto; border-spacing: 0; border-collapse: collapse; mso-table-lspace: 0pt; mso-table-rspace: 0pt; background-color: #f9f9f9; width: 100%;" valign="top" width="100%">
                    <tbody>
                    <tr style="vertical-align: top;" valign="top">
                    <td style="word-break: break-word; vertical-align: top;" valign="top">
                    <!--[if (mso)|(IE)]><table width="100%" cellpadding="0" cellspacing="0" border="0"><tr><td align="center" style="background-color:#f9f9f9"><![endif]-->
                    <div style="background-color:transparent;">
                    <div class="block-grid" style="Margin: 0 auto; min-width: 320px; max-width: 700px; overflow-wrap: break-word; word-wrap: break-word; word-break: break-word; background-color: transparent;">
                    <div style="border-collapse: collapse;display: table;width: 100%;background-color:transparent;">
                    <!--[if (mso)|(IE)]><table width="100%" cellpadding="0" cellspacing="0" border="0" style="background-color:transparent;"><tr><td align="center"><table cellpadding="0" cellspacing="0" border="0" style="width:700px"><tr class="layout-full-width" style="background-color:transparent"><![endif]-->
                    <!--[if (mso)|(IE)]><td align="center" width="700" style="background-color:transparent;width:700px; border-top: 0px solid transparent; border-left: 0px solid transparent; border-bottom: 0px solid transparent; border-right: 0px solid transparent;" valign="top"><table width="100%" cellpadding="0" cellspacing="0" border="0"><tr><td style="padding-right: 0px; padding-left: 0px; padding-top:5px; padding-bottom:5px;"><![endif]-->
                    <div class="col num12" style="min-width: 320px; max-width: 700px; display: table-cell; vertical-align: top; width: 700px;">
                    <div style="width:100% !important;">
                    <!--[if (!mso)&(!IE)]><!-->
                    <div style="border-top:0px solid transparent; border-left:0px solid transparent; border-bottom:0px solid transparent; border-right:0px solid transparent; padding-top:5px; padding-bottom:5px; padding-right: 0px; padding-left: 0px;">
                    <!--<![endif]-->
                    <table border="0" cellpadding="0" cellspacing="0" class="divider" role="presentation" style="table-layout: fixed; vertical-align: top; border-spacing: 0; border-collapse: collapse; mso-table-lspace: 0pt; mso-table-rspace: 0pt; min-width: 100%; -ms-text-size-adjust: 100%; -webkit-text-size-adjust: 100%;" valign="top" width="100%">
                    <tbody>
                    <tr style="vertical-align: top;" valign="top">
                    <td class="divider_inner" style="word-break: break-word; vertical-align: top; min-width: 100%; -ms-text-size-adjust: 100%; -webkit-text-size-adjust: 100%; padding-top: 5px; padding-right: 5px; padding-bottom: 5px; padding-left: 5px;" valign="top">
                    <table align="center" border="0" cellpadding="0" cellspacing="0" class="divider_content" height="0" role="presentation" style="table-layout: fixed; vertical-align: top; border-spacing: 0; border-collapse: collapse; mso-table-lspace: 0pt; mso-table-rspace: 0pt; border-top: 0px solid transparent; height: 0px; width: 100%;" valign="top" width="100%">
                    <tbody>
                    <tr style="vertical-align: top;" valign="top">
                    <td height="0" style="word-break: break-word; vertical-align: top; -ms-text-size-adjust: 100%; -webkit-text-size-adjust: 100%;" valign="top"><span></span></td>
                    </tr>
                    </tbody>
                    </table>
                    </td>
                    </tr>
                    </tbody>
                    </table>
                    <!--[if (!mso)&(!IE)]><!-->
                    </div>
                    <!--<![endif]-->
                    </div>
                    </div>
                    <!--[if (mso)|(IE)]></td></tr></table><![endif]-->
                    <!--[if (mso)|(IE)]></td></tr></table></td></tr></table><![endif]-->
                    </div>
                    </div>
                    </div>
                    <div style="background-color:transparent;">
                    <div class="block-grid" style="Margin: 0 auto; min-width: 320px; max-width: 700px; overflow-wrap: break-word; word-wrap: break-word; word-break: break-word; background-color: transparent;">
                    <div style="border-collapse: collapse;display: table;width: 100%;background-color:transparent;">
                    <!--[if (mso)|(IE)]><table width="100%" cellpadding="0" cellspacing="0" border="0" style="background-color:transparent;"><tr><td align="center"><table cellpadding="0" cellspacing="0" border="0" style="width:700px"><tr class="layout-full-width" style="background-color:transparent"><![endif]-->
                    <!--[if (mso)|(IE)]><td align="center" width="700" style="background-color:transparent;width:700px; border-top: 0px solid transparent; border-left: 0px solid transparent; border-bottom: 0px solid transparent; border-right: 0px solid transparent;" valign="top"><table width="100%" cellpadding="0" cellspacing="0" border="0"><tr><td style="padding-right: 0px; padding-left: 0px; padding-top:5px; padding-bottom:5px;"><![endif]-->
                    <div class="col num12" style="min-width: 320px; max-width: 700px; display: table-cell; vertical-align: top; width: 700px;">
                    <!-- <div style="width:100% !important;">
                    <!--[if (!mso)&(!IE)]><!-->
                    <div style="border-top:0px solid transparent; border-left:0px solid transparent; border-bottom:0px solid transparent; border-right:0px solid transparent; padding-top:5px; padding-bottom:5px; padding-right: 0px; padding-left: 0px;">
                    <!--<![endif]-->
                    <div align="center" class="img-container center autowidth" style="padding-right: 0px;padding-left: 0px;">
                    <!--[if mso]><table width="100%" cellpadding="0" cellspacing="0" border="0"><tr style="line-height:0px"><td style="padding-right: 0px;padding-left: 0px;" align="center"><![endif]--><img align="center" alt=" " border="0" class="center autowidth" src="https://coinanalytica.com/images/Your_Logo.png" style="text-decoration: none; -ms-interpolation-mode: bicubic; height: auto; border: 0; width: 100%; max-width: 154px; display: block;" title="Alternate text" width="154"/>
                    <!--[if mso]></td></tr></table><![endif]-->
                    </div>
                    <!--[if (!mso)&(!IE)]><!-->
                    </div> 
                    <!--<![endif]-->
                    </div>
                    </div>
                    <!--[if (mso)|(IE)]></td></tr></table><![endif]-->
                    <!--[if (mso)|(IE)]></td></tr></table></td></tr></table><![endif]-->
                    </div>
                    </div>
                    </div>
                    <div style="background-color:transparent;">
                    <div class="block-grid" style="Margin: 0 auto; min-width: 320px; max-width: 700px; overflow-wrap: break-word; word-wrap: break-word; word-break: break-word; background-color: transparent;">
                    <div style="border-collapse: collapse;display: table;width: 100%;background-color:transparent;">
                    <!--[if (mso)|(IE)]><table width="100%" cellpadding="0" cellspacing="0" border="0" style="background-color:transparent;"><tr><td align="center"><table cellpadding="0" cellspacing="0" border="0" style="width:700px"><tr class="layout-full-width" style="background-color:transparent"><![endif]-->
                    <!--[if (mso)|(IE)]><td align="center" width="700" style="background-color:transparent;width:700px; border-top: 0px solid transparent; border-left: 0px solid transparent; border-bottom: 0px solid transparent; border-right: 0px solid transparent;" valign="top"><table width="100%" cellpadding="0" cellspacing="0" border="0"><tr><td style="padding-right: 0px; padding-left: 0px; padding-top:5px; padding-bottom:5px;"><![endif]-->
                    <div class="col num12" style="min-width: 320px; max-width: 700px; display: table-cell; vertical-align: top; width: 700px;">
                    <div style="width:100% !important;">
                    <!--[if (!mso)&(!IE)]><!-->
                    <div style="border-top:0px solid transparent; border-left:0px solid transparent; border-bottom:0px solid transparent; border-right:0px solid transparent; padding-top:5px; padding-bottom:5px; padding-right: 0px; padding-left: 0px;">
                    <!--<![endif]-->
                    <table border="0" cellpadding="0" cellspacing="0" class="divider" role="presentation" style="table-layout: fixed; vertical-align: top; border-spacing: 0; border-collapse: collapse; mso-table-lspace: 0pt; mso-table-rspace: 0pt; min-width: 100%; -ms-text-size-adjust: 100%; -webkit-text-size-adjust: 100%;" valign="top" width="100%">
                    <tbody>
                    <tr style="vertical-align: top;" valign="top">
                    <td class="divider_inner" style="word-break: break-word; vertical-align: top; min-width: 100%; -ms-text-size-adjust: 100%; -webkit-text-size-adjust: 100%; padding-top: 5px; padding-right: 5px; padding-bottom: 5px; padding-left: 5px;" valign="top">
                    <table align="center" border="0" cellpadding="0" cellspacing="0" class="divider_content" height="5" role="presentation" style="table-layout: fixed; vertical-align: top; border-spacing: 0; border-collapse: collapse; mso-table-lspace: 0pt; mso-table-rspace: 0pt; border-top: 0px solid transparent; height: 5px; width: 100%;" valign="top" width="100%">
                    <tbody>
                    <tr style="vertical-align: top;" valign="top">
                    <td height="5" style="word-break: break-word; vertical-align: top; -ms-text-size-adjust: 100%; -webkit-text-size-adjust: 100%;" valign="top"><span></span></td>
                    </tr>
                    </tbody>
                    </table>
                    </td>
                    </tr>
                    </tbody>
                    </table>
                    <!--[if (!mso)&(!IE)]><!-->
                    </div>
                    <!--<![endif]-->
                    </div>
                    </div>
                    <!--[if (mso)|(IE)]></td></tr></table><![endif]-->
                    <!--[if (mso)|(IE)]></td></tr></table></td></tr></table><![endif]-->
                    </div>
                    </div>
                    </div>
                    <div style="background-color:transparent;">
                    <div class="block-grid" style="Margin: 0 auto; min-width: 320px; max-width: 700px; overflow-wrap: break-word; word-wrap: break-word; word-break: break-word; background-color: transparent;">
                    <div style="border-collapse: collapse;display: table;width: 100%;background-color:transparent;">
                    <!--[if (mso)|(IE)]><table width="100%" cellpadding="0" cellspacing="0" border="0" style="background-color:transparent;"><tr><td align="center"><table cellpadding="0" cellspacing="0" border="0" style="width:700px"><tr class="layout-full-width" style="background-color:transparent"><![endif]-->
                    <!--[if (mso)|(IE)]><td align="center" width="700" style="background-color:transparent;width:700px; border-top: 0px solid transparent; border-left: 0px solid transparent; border-bottom: 0px solid transparent; border-right: 0px solid transparent;" valign="top"><table width="100%" cellpadding="0" cellspacing="0" border="0"><tr><td style="padding-right: 0px; padding-left: 0px; padding-top:5px; padding-bottom:0px;"><![endif]-->
                    <div class="col num12" style="min-width: 320px; max-width: 700px; display: table-cell; vertical-align: top; width: 700px;">
                    <div style="width:100% !important;">
                    <!--[if (!mso)&(!IE)]><!-->
                    <div style="border-top:0px solid transparent; border-left:0px solid transparent; border-bottom:0px solid transparent; border-right:0px solid transparent; padding-top:5px; padding-bottom:0px; padding-right: 0px; padding-left: 0px;">
                    <!--<![endif]-->
                    <!--[if (!mso)&(!IE)]><!-->
                    </div>
                    <!--<![endif]-->
                    </div>
                    </div>
                    <!--[if (mso)|(IE)]></td></tr></table><![endif]-->
                    <!--[if (mso)|(IE)]></td></tr></table></td></tr></table><![endif]-->
                    </div>
                    </div>
                    </div>
                    <div style="background-color:transparent;">
                    <div class="block-grid" style="Margin: 0 auto; min-width: 320px; max-width: 700px; overflow-wrap: break-word; word-wrap: break-word; word-break: break-word; background-color: #0d8cec;">
                    <div style="border-collapse: collapse;display: table;width: 100%;background-color:#0d8cec;">
                    <!--[if (mso)|(IE)]><table width="100%" cellpadding="0" cellspacing="0" border="0" style="background-color:transparent;"><tr><td align="center"><table cellpadding="0" cellspacing="0" border="0" style="width:700px"><tr class="layout-full-width" style="background-color:#0d8cec"><![endif]-->
                    <!--[if (mso)|(IE)]><td align="center" width="700" style="background-color:#0d8cec;width:700px; border-top: 0px solid transparent; border-left: 0px solid transparent; border-bottom: 0px solid transparent; border-right: 0px solid transparent;" valign="top"><table width="100%" cellpadding="0" cellspacing="0" border="0"><tr><td style="padding-right: 0px; padding-left: 0px; padding-top:0px; padding-bottom:0px;"><![endif]-->
                    <div class="col num12" style="min-width: 320px; max-width: 700px; display: table-cell; vertical-align: top; width: 700px;">
                    <div style="width:100% !important;">
                    <!--[if (!mso)&(!IE)]><!-->
                    <div style="border-top:0px solid transparent; border-left:0px solid transparent; border-bottom:0px solid transparent; border-right:0px solid transparent; padding-top:0px; padding-bottom:0px; padding-right: 0px; padding-left: 0px;">
                    <!--<![endif]-->
                    <table border="0" cellpadding="0" cellspacing="0" class="divider" role="presentation" style="table-layout: fixed; vertical-align: top; border-spacing: 0; border-collapse: collapse; mso-table-lspace: 0pt; mso-table-rspace: 0pt; min-width: 100%; -ms-text-size-adjust: 100%; -webkit-text-size-adjust: 100%;" valign="top" width="100%">
                    <tbody>
                    <tr style="vertical-align: top;" valign="top">
                    <td class="divider_inner" style="word-break: break-word; vertical-align: top; min-width: 100%; -ms-text-size-adjust: 100%; -webkit-text-size-adjust: 100%; padding-top: 10px; padding-right: 10px; padding-bottom: 10px; padding-left: 10px;" valign="top">
                    <table align="center" border="0" cellpadding="0" cellspacing="0" class="divider_content" height="10" role="presentation" style="table-layout: fixed; vertical-align: top; border-spacing: 0; border-collapse: collapse; mso-table-lspace: 0pt; mso-table-rspace: 0pt; border-top: 0px solid transparent; height: 10px; width: 100%;" valign="top" width="100%">
                    <tbody>
                    <tr style="vertical-align: top;" valign="top">
                    <td height="10" style="word-break: break-word; vertical-align: top; -ms-text-size-adjust: 100%; -webkit-text-size-adjust: 100%;" valign="top"><span></span></td>
                    </tr>
                    </tbody>
                    </table>
                    </td>
                    </tr>
                    </tbody>
                    </table>
                    <div align="center" class="img-container center fixedwidth" style="padding-right: 0px;padding-left: 0px;">
                    <!--[if mso]><table width="100%" cellpadding="0" cellspacing="0" border="0"><tr style="line-height:0px"><td style="padding-right: 0px;padding-left: 0px;" align="center"><![endif]--><img align="center" alt=" " border="0" class="center fixedwidth" src="https://coinanalytica.com/images/Welcome_Email.png" style="text-decoration: none; -ms-interpolation-mode: bicubic; height: auto; border: 0; width: 100%; max-width: 420px; display: block;" title="I'm an image" width="420"/>
                    <!--[if mso]></td></tr></table><![endif]-->
                    </div>
                    <!--[if mso]><table width="100%" cellpadding="0" cellspacing="0" border="0"><tr><td style="padding-right: 40px; padding-left: 40px; padding-top: 10px; padding-bottom: 10px; font-family: Tahoma, sans-serif"><![endif]-->
                    <div style="color:#191919;font-family:Montserrat, Trebuchet MS, Lucida Grande, Lucida Sans Unicode, Lucida Sans, Tahoma, sans-serif;line-height:1.5;padding-top:10px;padding-right:40px;padding-bottom:10px;padding-left:40px;">
                    <div style="line-height: 1.5; font-size: 12px; color: #191919; font-family: Montserrat, Trebuchet MS, Lucida Grande, Lucida Sans Unicode, Lucida Sans, Tahoma, sans-serif; mso-line-height-alt: 18px;">
                    <p style="font-size: 16px; line-height: 1.5; text-align: center; word-break: break-word; mso-line-height-alt: 24px; margin: 0;"><strong><span style="font-size: 38px;">${fisrt_name} ${last_name} </span></strong></p>
                    <p style="font-size: 16px; line-height: 1.5; text-align: center; word-break: break-word; mso-line-height-alt: 24px; margin: 0;"><strong><span style="font-size: 38px;">welcome to Coin Analytica!</span></strong></p>
                    </div>
                    </div>
                    <!--[if mso]></td></tr></table><![endif]-->
                    <!--[if mso]><table width="100%" cellpadding="0" cellspacing="0" border="0"><tr><td style="padding-right: 10px; padding-left: 10px; padding-top: 10px; padding-bottom: 10px; font-family: Tahoma, sans-serif"><![endif]-->
                    <div style="color:#191919;font-family:Montserrat, Trebuchet MS, Lucida Grande, Lucida Sans Unicode, Lucida Sans, Tahoma, sans-serif;line-height:1.2;padding-top:10px;padding-right:10px;padding-bottom:10px;padding-left:10px;">
                    <div style="line-height: 1.2; font-size: 12px; color: #191919; font-family: Montserrat, Trebuchet MS, Lucida Grande, Lucida Sans Unicode, Lucida Sans, Tahoma, sans-serif; mso-line-height-alt: 14px;">
                    <p style="font-size: 22px; line-height: 1.2; text-align: center; word-break: break-word; mso-line-height-alt: 26px; margin: 0;"><span style="font-size: 22px;">Start your Investment Journey!</span></p>
                    </div>
                    </div>
                    <!--[if mso]></td></tr></table><![endif]-->
                    <table border="0" cellpadding="0" cellspacing="0" class="divider" role="presentation" style="table-layout: fixed; vertical-align: top; border-spacing: 0; border-collapse: collapse; mso-table-lspace: 0pt; mso-table-rspace: 0pt; min-width: 100%; -ms-text-size-adjust: 100%; -webkit-text-size-adjust: 100%;" valign="top" width="100%">
                    <tbody>
                    <tr style="vertical-align: top;" valign="top">
                    <td class="divider_inner" style="word-break: break-word; vertical-align: top; min-width: 100%; -ms-text-size-adjust: 100%; -webkit-text-size-adjust: 100%; padding-top: 10px; padding-right: 10px; padding-bottom: 10px; padding-left: 10px;" valign="top">
                    <table align="center" border="0" cellpadding="0" cellspacing="0" class="divider_content" height="35" role="presentation" style="table-layout: fixed; vertical-align: top; border-spacing: 0; border-collapse: collapse; mso-table-lspace: 0pt; mso-table-rspace: 0pt; border-top: 0px solid transparent; height: 35px; width: 100%;" valign="top" width="100%">
                    <tbody>
                    <tr style="vertical-align: top;" valign="top">
                    <td height="35" style="word-break: break-word; vertical-align: top; -ms-text-size-adjust: 100%; -webkit-text-size-adjust: 100%;" valign="top"><span></span></td>
                    </tr>
                    </tbody>
                    </table>
                    </td>
                    </tr>
                    </tbody>
                    </table>
                    <!--[if (!mso)&(!IE)]><!-->
                    </div>
                    <!--<![endif]-->
                    </div>
                    </div>
                    <!--[if (mso)|(IE)]></td></tr></table><![endif]-->
                    <!--[if (mso)|(IE)]></td></tr></table></td></tr></table><![endif]-->
                    </div>
                    </div>
                    </div>
                    <div style="background-color:transparent;">
                    <div class="block-grid" style="Margin: 0 auto; min-width: 320px; max-width: 700px; overflow-wrap: break-word; word-wrap: break-word; word-break: break-word; background-color: #ffffff;">
                    <div style="border-collapse: collapse;display: table;width: 100%;background-color:#ffffff;">
                    <!--[if (mso)|(IE)]><table width="100%" cellpadding="0" cellspacing="0" border="0" style="background-color:transparent;"><tr><td align="center"><table cellpadding="0" cellspacing="0" border="0" style="width:700px"><tr class="layout-full-width" style="background-color:#ffffff"><![endif]-->
                    <!--[if (mso)|(IE)]><td align="center" width="700" style="background-color:#ffffff;width:700px; border-top: 0px solid transparent; border-left: 0px solid transparent; border-bottom: 0px solid transparent; border-right: 0px solid transparent;" valign="top"><table width="100%" cellpadding="0" cellspacing="0" border="0"><tr><td style="padding-right: 0px; padding-left: 0px; padding-top:0px; padding-bottom:5px;"><![endif]-->
                    <div class="col num12" style="min-width: 320px; max-width: 700px; display: table-cell; vertical-align: top; width: 700px;">
                    <div style="width:100% !important;">
                    <!--[if (!mso)&(!IE)]><!-->
                    <div style="border-top:0px solid transparent; border-left:0px solid transparent; border-bottom:0px solid transparent; border-right:0px solid transparent; padding-top:0px; padding-bottom:5px; padding-right: 0px; padding-left: 0px;">
                    <!--<![endif]-->
                    <table border="0" cellpadding="0" cellspacing="0" class="divider" role="presentation" style="table-layout: fixed; vertical-align: top; border-spacing: 0; border-collapse: collapse; mso-table-lspace: 0pt; mso-table-rspace: 0pt; min-width: 100%; -ms-text-size-adjust: 100%; -webkit-text-size-adjust: 100%;" valign="top" width="100%">
                    <tbody>
                    <tr style="vertical-align: top;" valign="top">
                    <td class="divider_inner" style="word-break: break-word; vertical-align: top; min-width: 100%; -ms-text-size-adjust: 100%; -webkit-text-size-adjust: 100%; padding-top: 10px; padding-right: 10px; padding-bottom: 10px; padding-left: 10px;" valign="top">
                    <table align="center" border="0" cellpadding="0" cellspacing="0" class="divider_content" height="5" role="presentation" style="table-layout: fixed; vertical-align: top; border-spacing: 0; border-collapse: collapse; mso-table-lspace: 0pt; mso-table-rspace: 0pt; border-top: 0px solid transparent; height: 5px; width: 100%;" valign="top" width="100%">
                    <tbody>
                    <tr style="vertical-align: top;" valign="top">
                    <td height="5" style="word-break: break-word; vertical-align: top; -ms-text-size-adjust: 100%; -webkit-text-size-adjust: 100%;" valign="top"><span></span></td>
                    </tr>
                    </tbody>
                    </table>
                    </td>
                    </tr>
                    </tbody>
                    </table>
                    <!--[if mso]><table width="100%" cellpadding="0" cellspacing="0" border="0"><tr><td style="padding-right: 20px; padding-left: 20px; padding-top: 10px; padding-bottom: 0px; font-family: Tahoma, sans-serif"><![endif]-->
                    <div style="color:#191919;font-family:Montserrat, Trebuchet MS, Lucida Grande, Lucida Sans Unicode, Lucida Sans, Tahoma, sans-serif;line-height:1.5;padding-top:10px;padding-right:20px;padding-bottom:0px;padding-left:20px;">
                    <div style="line-height: 1.5; font-size: 12px; color: #191919; font-family: Montserrat, Trebuchet MS, Lucida Grande, Lucida Sans Unicode, Lucida Sans, Tahoma, sans-serif; mso-line-height-alt: 18px;">
                    <p style="font-size: 28px; line-height: 1.5; text-align: center; word-break: break-word; mso-line-height-alt: 42px; margin: 0;"><span style="font-size: 28px;"><strong><span style="">Let's Get Started</span></strong></span></p>
                    </div>
                    </div>
                    <!--[if mso]></td></tr></table><![endif]-->
                    <table border="0" cellpadding="0" cellspacing="0" class="divider" role="presentation" style="table-layout: fixed; vertical-align: top; border-spacing: 0; border-collapse: collapse; mso-table-lspace: 0pt; mso-table-rspace: 0pt; min-width: 100%; -ms-text-size-adjust: 100%; -webkit-text-size-adjust: 100%;" valign="top" width="100%">
                    <tbody>
                    <tr style="vertical-align: top;" valign="top">
                    <td class="divider_inner" style="word-break: break-word; vertical-align: top; min-width: 100%; -ms-text-size-adjust: 100%; -webkit-text-size-adjust: 100%; padding-top: 5px; padding-right: 5px; padding-bottom: 5px; padding-left: 5px;" valign="top">
                    <table align="center" border="0" cellpadding="0" cellspacing="0" class="divider_content" role="presentation" style="table-layout: fixed; vertical-align: top; border-spacing: 0; border-collapse: collapse; mso-table-lspace: 0pt; mso-table-rspace: 0pt; border-top: 2px solid #FFD3E0; width: 15%;" valign="top" width="15%">
                    <tbody>
                    <tr style="vertical-align: top;" valign="top">
                    <td style="word-break: break-word; vertical-align: top; -ms-text-size-adjust: 100%; -webkit-text-size-adjust: 100%;" valign="top"><span></span></td>
                    </tr>
                    </tbody>
                    </table>
                    </td>
                    </tr>
                    </tbody>
                    </table>
                    <table border="0" cellpadding="0" cellspacing="0" class="divider" role="presentation" style="table-layout: fixed; vertical-align: top; border-spacing: 0; border-collapse: collapse; mso-table-lspace: 0pt; mso-table-rspace: 0pt; min-width: 100%; -ms-text-size-adjust: 100%; -webkit-text-size-adjust: 100%;" valign="top" width="100%">
                    <tbody>
                    <tr style="vertical-align: top;" valign="top">
                    <td class="divider_inner" style="word-break: break-word; vertical-align: top; min-width: 100%; -ms-text-size-adjust: 100%; -webkit-text-size-adjust: 100%; padding-top: 0px; padding-right: 0px; padding-bottom: 0px; padding-left: 0px;" valign="top">
                    <table align="center" border="0" cellpadding="0" cellspacing="0" class="divider_content" role="presentation" style="table-layout: fixed; vertical-align: top; border-spacing: 0; border-collapse: collapse; mso-table-lspace: 0pt; mso-table-rspace: 0pt; border-top: 2px solid #FFD3E0; width: 5%;" valign="top" width="5%">
                    <tbody>
                    <tr style="vertical-align: top;" valign="top">
                    <td style="word-break: break-word; vertical-align: top; -ms-text-size-adjust: 100%; -webkit-text-size-adjust: 100%;" valign="top"><span></span></td>
                    </tr>
                    </tbody>
                    </table>
                    </td>
                    </tr>
                    </tbody>
                    </table>
                    <!--[if (!mso)&(!IE)]><!-->
                    </div>
                    <!--<![endif]-->
                    </div>
                    </div>
                    <!--[if (mso)|(IE)]></td></tr></table><![endif]-->
                    <!--[if (mso)|(IE)]></td></tr></table></td></tr></table><![endif]-->
                    </div>
                    </div>
                    </div>
                    <div style="background-color:transparent;">
                    <div class="block-grid mixed-two-up" style="Margin: 0 auto; min-width: 320px; max-width: 700px; overflow-wrap: break-word; word-wrap: break-word; word-break: break-word; background-color: #ffffff;">
                    <div style="border-collapse: collapse;display: table;width: 100%;background-color:#ffffff;">
                    <!--[if (mso)|(IE)]><table width="100%" cellpadding="0" cellspacing="0" border="0" style="background-color:transparent;"><tr><td align="center"><table cellpadding="0" cellspacing="0" border="0" style="width:700px"><tr class="layout-full-width" style="background-color:#ffffff"><![endif]-->
                    <!--[if (mso)|(IE)]><td align="center" width="466" style="background-color:#ffffff;width:466px; border-top: 0px solid transparent; border-left: 0px solid transparent; border-bottom: 0px solid transparent; border-right: 0px solid transparent;" valign="top"><table width="100%" cellpadding="0" cellspacing="0" border="0"><tr><td style="padding-right: 0px; padding-left: 0px; padding-top:5px; padding-bottom:5px;"><![endif]-->
                    <div class="col num8" style="display: table-cell; vertical-align: top; min-width: 320px; max-width: 464px; width: 466px;">
                    <div style="width:100% !important;">
                    <!--[if (!mso)&(!IE)]><!-->
                    <div style="border-top:0px solid transparent; border-left:0px solid transparent; border-bottom:0px solid transparent; border-right:0px solid transparent; padding-top:5px; padding-bottom:5px; padding-right: 0px; padding-left: 0px;">
                    <!--<![endif]-->
                    <div class="mobile_hide">
                    <table border="0" cellpadding="0" cellspacing="0" class="divider" role="presentation" style="table-layout: fixed; vertical-align: top; border-spacing: 0; border-collapse: collapse; mso-table-lspace: 0pt; mso-table-rspace: 0pt; min-width: 100%; -ms-text-size-adjust: 100%; -webkit-text-size-adjust: 100%;" valign="top" width="100%">
                    <tbody>
                    <tr style="vertical-align: top;" valign="top">
                    <td class="divider_inner" style="word-break: break-word; vertical-align: top; min-width: 100%; -ms-text-size-adjust: 100%; -webkit-text-size-adjust: 100%; padding-top: 10px; padding-right: 10px; padding-bottom: 10px; padding-left: 15px;" valign="top">
                    <table align="left" border="0" cellpadding="0" cellspacing="0" class="divider_content" height="0" role="presentation" style="table-layout: fixed; vertical-align: top; border-spacing: 0; border-collapse: collapse; mso-table-lspace: 0pt; mso-table-rspace: 0pt; border-top: 5px solid transparent; height: 0px; width: 15%;" valign="top" width="15%">
                    <tbody>
                    <tr style="vertical-align: top;" valign="top">
                    <td height="0" style="word-break: break-word; vertical-align: top; -ms-text-size-adjust: 100%; -webkit-text-size-adjust: 100%;" valign="top"><span></span></td>
                    </tr>
                    </tbody>
                    </table>
                    </td>
                    </tr>
                    </tbody>
                    </table>
                    </div>
                    <!--[if mso]><table width="100%" cellpadding="0" cellspacing="0" border="0"><tr><td style="padding-right: 10px; padding-left: 40px; padding-top: 0px; padding-bottom: 10px; font-family: Tahoma, sans-serif"><![endif]-->
                    <div style="color:#34495e;font-family:Montserrat, Trebuchet MS, Lucida Grande, Lucida Sans Unicode, Lucida Sans, Tahoma, sans-serif;line-height:2;padding-top:0px;padding-right:10px;padding-bottom:10px;padding-left:40px;">
                    <div style="line-height: 2; font-size: 12px; color: #34495e; font-family: Montserrat, Trebuchet MS, Lucida Grande, Lucida Sans Unicode, Lucida Sans, Tahoma, sans-serif; mso-line-height-alt: 24px;">
                    <p style="font-size: 20px; line-height: 2; word-break: break-word; text-align: left; mso-line-height-alt: 40px; margin: 0;"><span style="font-size: 20px;"><strong><span style="">Step 1</span></strong></span></p>
                    </div>
                    </div>
                    <!--[if mso]></td></tr></table><![endif]-->
                    <!--[if mso]><table width="100%" cellpadding="0" cellspacing="0" border="0"><tr><td style="padding-right: 30px; padding-left: 40px; padding-top: 0px; padding-bottom: 10px; font-family: Tahoma, sans-serif"><![endif]-->
                    <div style="color:#555555;font-family:Montserrat, Trebuchet MS, Lucida Grande, Lucida Sans Unicode, Lucida Sans, Tahoma, sans-serif;line-height:2;padding-top:0px;padding-right:30px;padding-bottom:10px;padding-left:40px;">
                    <div style="line-height: 2; font-size: 12px; color: #555555; font-family: Montserrat, Trebuchet MS, Lucida Grande, Lucida Sans Unicode, Lucida Sans, Tahoma, sans-serif; mso-line-height-alt: 24px;">
                    <p style="font-size: 14px; line-height: 2; word-break: break-word; text-align: left; mso-line-height-alt: 28px; margin: 0;">Take your time to get familiar with our great investment plans.</p>
                    </div>
                    </div>
                    <!--[if mso]></td></tr></table><![endif]-->
                    <!--[if mso]><table width="100%" cellpadding="0" cellspacing="0" border="0"><tr><td style="padding-right: 10px; padding-left: 45px; padding-top: 0px; padding-bottom: 10px; font-family: Tahoma, sans-serif"><![endif]-->
                    <div style="color:#a96b7d;font-family:Montserrat, Trebuchet MS, Lucida Grande, Lucida Sans Unicode, Lucida Sans, Tahoma, sans-serif;line-height:2;padding-top:0px;padding-right:10px;padding-bottom:10px;padding-left:45px;">
                    <div style="line-height: 2; font-size: 12px; color: #a96b7d; font-family: Montserrat, Trebuchet MS, Lucida Grande, Lucida Sans Unicode, Lucida Sans, Tahoma, sans-serif; mso-line-height-alt: 24px;">
                    <p style="font-size: 14px; line-height: 2; word-break: break-word; text-align: left; mso-line-height-alt: 28px; margin: 0;"><span style="font-size: 14px;"><strong><span style=""><a href="https://coinanalytica.com/"><span style=""><span style="">Start now →</span></span></a></span></strong></span></p>
                    </div>
                    </div>
                    <!--[if mso]></td></tr></table><![endif]-->
                    <!--[if (!mso)&(!IE)]><!-->
                    </div>
                    <!--<![endif]-->
                    </div>
                    </div>
                    <!--[if (mso)|(IE)]></td></tr></table><![endif]-->
                    <!--[if (mso)|(IE)]></td><td align="center" width="233" style="background-color:#ffffff;width:233px; border-top: 0px solid transparent; border-left: 0px solid transparent; border-bottom: 0px solid transparent; border-right: 0px solid transparent;" valign="top"><table width="100%" cellpadding="0" cellspacing="0" border="0"><tr><td style="padding-right: 0px; padding-left: 0px; padding-top:5px; padding-bottom:5px;"><![endif]-->
                    <div class="col num4" style="display: table-cell; vertical-align: top; max-width: 320px; min-width: 232px; width: 233px;">
                    <div style="width:100% !important;">
                    <!--[if (!mso)&(!IE)]><!-->
                    <div style="border-top:0px solid transparent; border-left:0px solid transparent; border-bottom:0px solid transparent; border-right:0px solid transparent; padding-top:5px; padding-bottom:5px; padding-right: 0px; padding-left: 0px;">
                    <!--<![endif]-->
                    <div align="center" class="img-container center fixedwidth" style="padding-right: 40px;padding-left: 0px;">
                    <!--[if mso]><table width="100%" cellpadding="0" cellspacing="0" border="0"><tr style="line-height:0px"><td style="padding-right: 40px;padding-left: 0px;" align="center"><![endif]--><img align="center" alt=" " border="0" class="center fixedwidth" src="https://coinanalytica.com/images/Step_1_1.png" style="text-decoration: none; -ms-interpolation-mode: bicubic; height: auto; border: 0; width: 100%; max-width: 193px; display: block;" title="I'm an image" width="193"/>
                    <!--[if mso]></td></tr></table><![endif]-->
                    </div>
                    <!--[if (!mso)&(!IE)]><!-->
                    </div>
                    <!--<![endif]-->
                    </div>
                    </div>
                    <!--[if (mso)|(IE)]></td></tr></table><![endif]-->
                    <!--[if (mso)|(IE)]></td></tr></table></td></tr></table><![endif]-->
                    </div>
                    </div>
                    </div>
                    <div style="background-color:transparent;">
                    <div class="block-grid" style="Margin: 0 auto; min-width: 320px; max-width: 700px; overflow-wrap: break-word; word-wrap: break-word; word-break: break-word; background-color: #ffffff;">
                    <div style="border-collapse: collapse;display: table;width: 100%;background-color:#ffffff;">
                    <!--[if (mso)|(IE)]><table width="100%" cellpadding="0" cellspacing="0" border="0" style="background-color:transparent;"><tr><td align="center"><table cellpadding="0" cellspacing="0" border="0" style="width:700px"><tr class="layout-full-width" style="background-color:#ffffff"><![endif]-->
                    <!--[if (mso)|(IE)]><td align="center" width="700" style="background-color:#ffffff;width:700px; border-top: 0px solid transparent; border-left: 0px solid transparent; border-bottom: 0px solid transparent; border-right: 0px solid transparent;" valign="top"><table width="100%" cellpadding="0" cellspacing="0" border="0"><tr><td style="padding-right: 0px; padding-left: 0px; padding-top:5px; padding-bottom:5px;"><![endif]-->
                    <div class="col num12" style="min-width: 320px; max-width: 700px; display: table-cell; vertical-align: top; width: 700px;">
                    <div style="width:100% !important;">
                    <!--[if (!mso)&(!IE)]><!-->
                    <div style="border-top:0px solid transparent; border-left:0px solid transparent; border-bottom:0px solid transparent; border-right:0px solid transparent; padding-top:5px; padding-bottom:5px; padding-right: 0px; padding-left: 0px;">
                    <!--<![endif]-->
                    <table border="0" cellpadding="0" cellspacing="0" class="divider" role="presentation" style="table-layout: fixed; vertical-align: top; border-spacing: 0; border-collapse: collapse; mso-table-lspace: 0pt; mso-table-rspace: 0pt; min-width: 100%; -ms-text-size-adjust: 100%; -webkit-text-size-adjust: 100%;" valign="top" width="100%">
                    <tbody>
                    <tr style="vertical-align: top;" valign="top">
                    <td class="divider_inner" style="word-break: break-word; vertical-align: top; min-width: 100%; -ms-text-size-adjust: 100%; -webkit-text-size-adjust: 100%; padding-top: 10px; padding-right: 10px; padding-bottom: 10px; padding-left: 10px;" valign="top">
                    <table align="center" border="0" cellpadding="0" cellspacing="0" class="divider_content" height="15" role="presentation" style="table-layout: fixed; vertical-align: top; border-spacing: 0; border-collapse: collapse; mso-table-lspace: 0pt; mso-table-rspace: 0pt; border-top: 0px solid transparent; height: 15px; width: 100%;" valign="top" width="100%">
                    <tbody>
                    <tr style="vertical-align: top;" valign="top">
                    <td height="15" style="word-break: break-word; vertical-align: top; -ms-text-size-adjust: 100%; -webkit-text-size-adjust: 100%;" valign="top"><span></span></td>
                    </tr>
                    </tbody>
                    </table>
                    </td>
                    </tr>
                    </tbody>
                    </table>
                    <!--[if (!mso)&(!IE)]><!-->
                    </div>
                    <!--<![endif]-->
                    </div>
                    </div>
                    <!--[if (mso)|(IE)]></td></tr></table><![endif]-->
                    <!--[if (mso)|(IE)]></td></tr></table></td></tr></table><![endif]-->
                    </div>
                    </div>
                    </div>
                    <div style="background-color:transparent;">
                    <div class="block-grid mixed-two-up" style="Margin: 0 auto; min-width: 320px; max-width: 700px; overflow-wrap: break-word; word-wrap: break-word; word-break: break-word; background-color: #ffffff;">
                    <div style="border-collapse: collapse;display: table;width: 100%;background-color:#ffffff;">
                    <!--[if (mso)|(IE)]><table width="100%" cellpadding="0" cellspacing="0" border="0" style="background-color:transparent;"><tr><td align="center"><table cellpadding="0" cellspacing="0" border="0" style="width:700px"><tr class="layout-full-width" style="background-color:#ffffff"><![endif]-->
                    <!--[if (mso)|(IE)]><td align="center" width="233" style="background-color:#ffffff;width:233px; border-top: 0px solid transparent; border-left: 0px solid transparent; border-bottom: 0px solid transparent; border-right: 0px solid transparent;" valign="top"><table width="100%" cellpadding="0" cellspacing="0" border="0"><tr><td style="padding-right: 0px; padding-left: 0px; padding-top:5px; padding-bottom:5px;"><![endif]-->
                    <div class="col num4" style="display: table-cell; vertical-align: top; max-width: 320px; min-width: 232px; width: 233px;">
                    <div style="width:100% !important;">
                    <!--[if (!mso)&(!IE)]><!-->
                    <div style="border-top:0px solid transparent; border-left:0px solid transparent; border-bottom:0px solid transparent; border-right:0px solid transparent; padding-top:5px; padding-bottom:5px; padding-right: 0px; padding-left: 0px;">
                    <!--<![endif]-->
                    <div align="center" class="img-container center autowidth" style="padding-right: 0px;padding-left: 40px;">
                    <!--[if mso]><table width="100%" cellpadding="0" cellspacing="0" border="0"><tr style="line-height:0px"><td style="padding-right: 0px;padding-left: 40px;" align="center"><![endif]--><img align="center" alt=" " border="0" class="center autowidth" src="https://coinanalytica.com/images/Step_2_2.png" style="text-decoration: none; -ms-interpolation-mode: bicubic; height: auto; border: 0; width: 100%; max-width: 193px; display: block;" title="I'm an image" width="193"/>
                    <!--[if mso]></td></tr></table><![endif]-->
                    </div>
                    <!--[if (!mso)&(!IE)]><!-->
                    </div>
                    <!--<![endif]-->
                    </div>
                    </div>
                    <!--[if (mso)|(IE)]></td></tr></table><![endif]-->
                    <!--[if (mso)|(IE)]></td><td align="center" width="466" style="background-color:#ffffff;width:466px; border-top: 0px solid transparent; border-left: 0px solid transparent; border-bottom: 0px solid transparent; border-right: 0px solid transparent;" valign="top"><table width="100%" cellpadding="0" cellspacing="0" border="0"><tr><td style="padding-right: 0px; padding-left: 0px; padding-top:5px; padding-bottom:5px;"><![endif]-->
                    <div class="col num8" style="display: table-cell; vertical-align: top; min-width: 320px; max-width: 464px; width: 466px;">
                    <div style="width:100% !important;">
                    <!--[if (!mso)&(!IE)]><!-->
                    <div style="border-top:0px solid transparent; border-left:0px solid transparent; border-bottom:0px solid transparent; border-right:0px solid transparent; padding-top:5px; padding-bottom:5px; padding-right: 0px; padding-left: 0px;">
                    <!--<![endif]-->
                    <!--[if mso]><table width="100%" cellpadding="0" cellspacing="0" border="0"><tr><td style="padding-right: 10px; padding-left: 40px; padding-top: 0px; padding-bottom: 10px; font-family: Tahoma, sans-serif"><![endif]-->
                    <div style="color:#34495e;font-family:Montserrat, Trebuchet MS, Lucida Grande, Lucida Sans Unicode, Lucida Sans, Tahoma, sans-serif;line-height:2;padding-top:0px;padding-right:10px;padding-bottom:10px;padding-left:40px;">
                    <div style="line-height: 2; font-size: 12px; color: #34495e; font-family: Montserrat, Trebuchet MS, Lucida Grande, Lucida Sans Unicode, Lucida Sans, Tahoma, sans-serif; mso-line-height-alt: 24px;">
                    <p style="font-size: 20px; line-height: 2; word-break: break-word; text-align: left; mso-line-height-alt: 40px; margin: 0;"><span style="font-size: 20px;"><strong><span style="">Step 2</span></strong></span></p>
                    </div>
                    </div>
                    <!--[if mso]></td></tr></table><![endif]-->
                    <!--[if mso]><table width="100%" cellpadding="0" cellspacing="0" border="0"><tr><td style="padding-right: 30px; padding-left: 40px; padding-top: 0px; padding-bottom: 10px; font-family: Tahoma, sans-serif"><![endif]-->
                    <div style="color:#555555;font-family:Montserrat, Trebuchet MS, Lucida Grande, Lucida Sans Unicode, Lucida Sans, Tahoma, sans-serif;line-height:2;padding-top:0px;padding-right:30px;padding-bottom:10px;padding-left:40px;">
                    <div style="line-height: 2; font-size: 12px; color: #555555; font-family: Montserrat, Trebuchet MS, Lucida Grande, Lucida Sans Unicode, Lucida Sans, Tahoma, sans-serif; mso-line-height-alt: 24px;">
                    <p style="font-size: 14px; line-height: 2; word-break: break-word; text-align: left; mso-line-height-alt: 28px; margin: 0;">Choose a plan you like and invest.It is this simple, A step to your financial freedom .</p>
                    </div>
                    </div>
                    <!--[if mso]></td></tr></table><![endif]-->
                    <!--[if mso]><table width="100%" cellpadding="0" cellspacing="0" border="0"><tr><td style="padding-right: 10px; padding-left: 40px; padding-top: 0px; padding-bottom: 10px; font-family: Tahoma, sans-serif"><![endif]-->
                    <div style="color:#a96b7d;font-family:Montserrat, Trebuchet MS, Lucida Grande, Lucida Sans Unicode, Lucida Sans, Tahoma, sans-serif;line-height:2;padding-top:0px;padding-right:10px;padding-bottom:10px;padding-left:40px;">
                    <div style="line-height: 2; font-size: 12px; color: #a96b7d; font-family: Montserrat, Trebuchet MS, Lucida Grande, Lucida Sans Unicode, Lucida Sans, Tahoma, sans-serif; mso-line-height-alt: 24px;">
                    <p style="font-size: 14px; line-height: 2; word-break: break-word; text-align: left; mso-line-height-alt: 28px; margin: 0;"><span style="font-size: 14px;"><strong><span style=""><span style=""><a href="https://coinanalytica.com/invest"><span style="">choose a plan →</span></a></span></span></strong></span></p>
                    </div>
                    </div>
                    <!--[if mso]></td></tr></table><![endif]-->
                    <!--[if (!mso)&(!IE)]><!-->
                    </div>
                    <!--<![endif]-->
                    </div>
                    </div>
                    <!--[if (mso)|(IE)]></td></tr></table><![endif]-->
                    <!--[if (mso)|(IE)]></td></tr></table></td></tr></table><![endif]-->
                    </div>
                    </div>
                    </div>
                    <div style="background-color:transparent;">
                    <div class="block-grid" style="Margin: 0 auto; min-width: 320px; max-width: 700px; overflow-wrap: break-word; word-wrap: break-word; word-break: break-word; background-color: #ffffff;">
                    <div style="border-collapse: collapse;display: table;width: 100%;background-color:#ffffff;">
                    <!--[if (mso)|(IE)]><table width="100%" cellpadding="0" cellspacing="0" border="0" style="background-color:transparent;"><tr><td align="center"><table cellpadding="0" cellspacing="0" border="0" style="width:700px"><tr class="layout-full-width" style="background-color:#ffffff"><![endif]-->
                    <!--[if (mso)|(IE)]><td align="center" width="700" style="background-color:#ffffff;width:700px; border-top: 0px solid transparent; border-left: 0px solid transparent; border-bottom: 0px solid transparent; border-right: 0px solid transparent;" valign="top"><table width="100%" cellpadding="0" cellspacing="0" border="0"><tr><td style="padding-right: 0px; padding-left: 0px; padding-top:5px; padding-bottom:5px;"><![endif]-->
                    <div class="col num12" style="min-width: 320px; max-width: 700px; display: table-cell; vertical-align: top; width: 700px;">
                    <div style="width:100% !important;">
                    <!--[if (!mso)&(!IE)]><!-->
                    <div style="border-top:0px solid transparent; border-left:0px solid transparent; border-bottom:0px solid transparent; border-right:0px solid transparent; padding-top:5px; padding-bottom:5px; padding-right: 0px; padding-left: 0px;">
                    <!--<![endif]-->
                    <table border="0" cellpadding="0" cellspacing="0" class="divider" role="presentation" style="table-layout: fixed; vertical-align: top; border-spacing: 0; border-collapse: collapse; mso-table-lspace: 0pt; mso-table-rspace: 0pt; min-width: 100%; -ms-text-size-adjust: 100%; -webkit-text-size-adjust: 100%;" valign="top" width="100%">
                    <tbody>
                    <tr style="vertical-align: top;" valign="top">
                    <td class="divider_inner" style="word-break: break-word; vertical-align: top; min-width: 100%; -ms-text-size-adjust: 100%; -webkit-text-size-adjust: 100%; padding-top: 10px; padding-right: 10px; padding-bottom: 10px; padding-left: 10px;" valign="top">
                    <table align="center" border="0" cellpadding="0" cellspacing="0" class="divider_content" height="15" role="presentation" style="table-layout: fixed; vertical-align: top; border-spacing: 0; border-collapse: collapse; mso-table-lspace: 0pt; mso-table-rspace: 0pt; border-top: 0px solid transparent; height: 15px; width: 100%;" valign="top" width="100%">
                    <tbody>
                    <tr style="vertical-align: top;" valign="top">
                    <td height="15" style="word-break: break-word; vertical-align: top; -ms-text-size-adjust: 100%; -webkit-text-size-adjust: 100%;" valign="top"><span></span></td>
                    </tr>
                    </tbody>
                    </table>
                    </td>
                    </tr>
                    </tbody>
                    </table>
                    <!--[if (!mso)&(!IE)]><!-->
                    </div>
                    <!--<![endif]-->
                    </div>
                    </div>
                    <!--[if (mso)|(IE)]></td></tr></table><![endif]-->
                    <!--[if (mso)|(IE)]></td></tr></table></td></tr></table><![endif]-->
                    </div>
                    </div>
                    </div>
                    <div style="background-color:transparent;">
                    <div class="block-grid mixed-two-up" style="Margin: 0 auto; min-width: 320px; max-width: 700px; overflow-wrap: break-word; word-wrap: break-word; word-break: break-word; background-color: #ffffff;">
                    <div style="border-collapse: collapse;display: table;width: 100%;background-color:#ffffff;">
                    <!--[if (mso)|(IE)]><table width="100%" cellpadding="0" cellspacing="0" border="0" style="background-color:transparent;"><tr><td align="center"><table cellpadding="0" cellspacing="0" border="0" style="width:700px"><tr class="layout-full-width" style="background-color:#ffffff"><![endif]-->
                    <!--[if (mso)|(IE)]><td align="center" width="466" style="background-color:#ffffff;width:466px; border-top: 0px solid transparent; border-left: 0px solid transparent; border-bottom: 0px solid transparent; border-right: 0px solid transparent;" valign="top"><table width="100%" cellpadding="0" cellspacing="0" border="0"><tr><td style="padding-right: 0px; padding-left: 0px; padding-top:5px; padding-bottom:10px;"><![endif]-->
                    <div class="col num8" style="display: table-cell; vertical-align: top; min-width: 320px; max-width: 464px; width: 466px;">
                    <div style="width:100% !important;">
                    <!--[if (!mso)&(!IE)]><!-->
                    <div style="border-top:0px solid transparent; border-left:0px solid transparent; border-bottom:0px solid transparent; border-right:0px solid transparent; padding-top:5px; padding-bottom:10px; padding-right: 0px; padding-left: 0px;">
                    <!--<![endif]-->
                    <div class="mobile_hide">
                    <table border="0" cellpadding="0" cellspacing="0" class="divider" role="presentation" style="table-layout: fixed; vertical-align: top; border-spacing: 0; border-collapse: collapse; mso-table-lspace: 0pt; mso-table-rspace: 0pt; min-width: 100%; -ms-text-size-adjust: 100%; -webkit-text-size-adjust: 100%;" valign="top" width="100%">
                    <tbody>
                    <tr style="vertical-align: top;" valign="top">
                    <td class="divider_inner" style="word-break: break-word; vertical-align: top; min-width: 100%; -ms-text-size-adjust: 100%; -webkit-text-size-adjust: 100%; padding-top: 10px; padding-right: 10px; padding-bottom: 10px; padding-left: 15px;" valign="top">
                    <table align="left" border="0" cellpadding="0" cellspacing="0" class="divider_content" height="0" role="presentation" style="table-layout: fixed; vertical-align: top; border-spacing: 0; border-collapse: collapse; mso-table-lspace: 0pt; mso-table-rspace: 0pt; border-top: 5px solid transparent; height: 0px; width: 15%;" valign="top" width="15%">
                    <tbody>
                    <tr style="vertical-align: top;" valign="top">
                    <td height="0" style="word-break: break-word; vertical-align: top; -ms-text-size-adjust: 100%; -webkit-text-size-adjust: 100%;" valign="top"><span></span></td>
                    </tr>
                    </tbody>
                    </table>
                    </td>
                    </tr>
                    </tbody>
                    </table>
                    </div>
                    <!--[if mso]><table width="100%" cellpadding="0" cellspacing="0" border="0"><tr><td style="padding-right: 10px; padding-left: 40px; padding-top: 0px; padding-bottom: 10px; font-family: Tahoma, sans-serif"><![endif]-->
                    <div style="color:#34495e;font-family:Montserrat, Trebuchet MS, Lucida Grande, Lucida Sans Unicode, Lucida Sans, Tahoma, sans-serif;line-height:2;padding-top:0px;padding-right:10px;padding-bottom:10px;padding-left:40px;">
                    <div style="line-height: 2; font-size: 12px; color: #34495e; font-family: Montserrat, Trebuchet MS, Lucida Grande, Lucida Sans Unicode, Lucida Sans, Tahoma, sans-serif; mso-line-height-alt: 24px;">
                    <p style="font-size: 20px; line-height: 2; word-break: break-word; text-align: left; mso-line-height-alt: 40px; margin: 0;"><span style="font-size: 20px;"><strong><span style="">Step 3</span></strong></span></p>
                    </div>
                    </div>
                    <!--[if mso]></td></tr></table><![endif]-->
                    <!--[if mso]><table width="100%" cellpadding="0" cellspacing="0" border="0"><tr><td style="padding-right: 30px; padding-left: 40px; padding-top: 0px; padding-bottom: 10px; font-family: Tahoma, sans-serif"><![endif]-->
                    <div style="color:#555555;font-family:Montserrat, Trebuchet MS, Lucida Grande, Lucida Sans Unicode, Lucida Sans, Tahoma, sans-serif;line-height:2;padding-top:0px;padding-right:30px;padding-bottom:10px;padding-left:40px;">
                    <div style="line-height: 2; font-size: 12px; color: #555555; font-family: Montserrat, Trebuchet MS, Lucida Grande, Lucida Sans Unicode, Lucida Sans, Tahoma, sans-serif; mso-line-height-alt: 24px;">
                    <p style="font-size: 14px; line-height: 2; word-break: break-word; text-align: left; mso-line-height-alt: 28px; margin: 0;">Get your friends and family to join this amazing opportunity. this will also lead some rewards like cash prizes and faster payouts</p>
                    </div>
                    </div>
                    <!--[if mso]></td></tr></table><![endif]-->
                    <!--[if mso]><table width="100%" cellpadding="0" cellspacing="0" border="0"><tr><td style="padding-right: 10px; padding-left: 40px; padding-top: 0px; padding-bottom: 10px; font-family: Tahoma, sans-serif"><![endif]-->
                    <div style="color:#a96b7d;font-family:Montserrat, Trebuchet MS, Lucida Grande, Lucida Sans Unicode, Lucida Sans, Tahoma, sans-serif;line-height:2;padding-top:0px;padding-right:10px;padding-bottom:10px;padding-left:40px;">
                    <div style="line-height: 2; font-size: 12px; color: #a96b7d; font-family: Montserrat, Trebuchet MS, Lucida Grande, Lucida Sans Unicode, Lucida Sans, Tahoma, sans-serif; mso-line-height-alt: 24px;">
                    <p style="font-size: 14px; line-height: 2; word-break: break-word; text-align: left; mso-line-height-alt: 28px; margin: 0;"><span style="font-size: 14px;"><strong><span style=""><span style=""><a href="https://coinanalytica.com/profile"><span style="">Start collaborating  →</span></a></span></span></strong></span></p>
                    </div>
                    </div>
                    <!--[if mso]></td></tr></table><![endif]-->
                    <!--[if (!mso)&(!IE)]><!-->
                    </div>
                    <!--<![endif]-->
                    </div>
                    </div>
                    <!--[if (mso)|(IE)]></td></tr></table><![endif]-->
                    <!--[if (mso)|(IE)]></td><td align="center" width="233" style="background-color:#ffffff;width:233px; border-top: 0px solid transparent; border-left: 0px solid transparent; border-bottom: 0px solid transparent; border-right: 0px solid transparent;" valign="top"><table width="100%" cellpadding="0" cellspacing="0" border="0"><tr><td style="padding-right: 0px; padding-left: 0px; padding-top:5px; padding-bottom:5px;"><![endif]-->
                    <div class="col num4" style="display: table-cell; vertical-align: top; max-width: 320px; min-width: 232px; width: 233px;">
                    <div style="width:100% !important;">
                    <!--[if (!mso)&(!IE)]><!-->
                    <div style="border-top:0px solid transparent; border-left:0px solid transparent; border-bottom:0px solid transparent; border-right:0px solid transparent; padding-top:5px; padding-bottom:5px; padding-right: 0px; padding-left: 0px;">
                    <!--<![endif]-->
                    <div align="center" class="img-container center autowidth" style="padding-right: 35px;padding-left: 0px;">
                    <!--[if mso]><table width="100%" cellpadding="0" cellspacing="0" border="0"><tr style="line-height:0px"><td style="padding-right: 35px;padding-left: 0px;" align="center"><![endif]--><img align="center" alt=" " border="0" class="center autowidth" src="https://coinanalytica.com/images/Step_3_1.png" style="text-decoration: none; -ms-interpolation-mode: bicubic; height: auto; border: 0; width: 100%; max-width: 198px; display: block;" title="I'm an image" width="198"/>
                    <div style="font-size:1px;line-height:10px"> </div>
                    <!--[if mso]></td></tr></table><![endif]-->
                    </div>
                    <!--[if (!mso)&(!IE)]><!-->
                    </div>
                    <!--<![endif]-->
                    </div>
                    </div>
                    <!--[if (mso)|(IE)]></td></tr></table><![endif]-->
                    <!--[if (mso)|(IE)]></td></tr></table></td></tr></table><![endif]-->
                    </div>
                    </div>
                    </div>
                    <div style="background-color:transparent;">
                    <div class="block-grid" style="Margin: 0 auto; min-width: 320px; max-width: 700px; overflow-wrap: break-word; word-wrap: break-word; word-break: break-word; background-color: #ffffff;">
                    <div style="border-collapse: collapse;display: table;width: 100%;background-color:#ffffff;">
                    <!--[if (mso)|(IE)]><table width="100%" cellpadding="0" cellspacing="0" border="0" style="background-color:transparent;"><tr><td align="center"><table cellpadding="0" cellspacing="0" border="0" style="width:700px"><tr class="layout-full-width" style="background-color:#ffffff"><![endif]-->
                    <!--[if (mso)|(IE)]><td align="center" width="700" style="background-color:#ffffff;width:700px; border-top: 0px solid transparent; border-left: 0px solid transparent; border-bottom: 0px solid transparent; border-right: 0px solid transparent;" valign="top"><table width="100%" cellpadding="0" cellspacing="0" border="0"><tr><td style="padding-right: 0px; padding-left: 0px; padding-top:0px; padding-bottom:5px;"><![endif]-->
                    <div class="col num12" style="min-width: 320px; max-width: 700px; display: table-cell; vertical-align: top; width: 700px;">
                    <div style="width:100% !important;">
                    <!--[if (!mso)&(!IE)]><!-->
                    <div style="border-top:0px solid transparent; border-left:0px solid transparent; border-bottom:0px solid transparent; border-right:0px solid transparent; padding-top:0px; padding-bottom:5px; padding-right: 0px; padding-left: 0px;">
                    <!--<![endif]-->
                    <table border="0" cellpadding="0" cellspacing="0" class="divider" role="presentation" style="table-layout: fixed; vertical-align: top; border-spacing: 0; border-collapse: collapse; mso-table-lspace: 0pt; mso-table-rspace: 0pt; min-width: 100%; -ms-text-size-adjust: 100%; -webkit-text-size-adjust: 100%;" valign="top" width="100%">
                    <tbody>
                    <tr style="vertical-align: top;" valign="top">
                    <td class="divider_inner" style="word-break: break-word; vertical-align: top; min-width: 100%; -ms-text-size-adjust: 100%; -webkit-text-size-adjust: 100%; padding-top: 10px; padding-right: 10px; padding-bottom: 10px; padding-left: 10px;" valign="top">
                    <table align="center" border="0" cellpadding="0" cellspacing="0" class="divider_content" height="0" role="presentation" style="table-layout: fixed; vertical-align: top; border-spacing: 0; border-collapse: collapse; mso-table-lspace: 0pt; mso-table-rspace: 0pt; border-top: 0px solid transparent; height: 0px; width: 100%;" valign="top" width="100%">
                    <tbody>
                    <tr style="vertical-align: top;" valign="top">
                    <td height="0" style="word-break: break-word; vertical-align: top; -ms-text-size-adjust: 100%; -webkit-text-size-adjust: 100%;" valign="top"><span></span></td>
                    </tr>
                    </tbody>
                    </table>
                    </td>
                    </tr>
                    </tbody>
                    </table>
                    <!--[if (!mso)&(!IE)]><!-->
                    </div>
                    <!--<![endif]-->
                    </div>
                    </div>
                    <!--[if (mso)|(IE)]></td></tr></table><![endif]-->
                    <!--[if (mso)|(IE)]></td></tr></table></td></tr></table><![endif]-->
                    </div>
                    </div>
                    </div>
                    <div style="background-color:transparent;">
                    <div class="block-grid" style="Margin: 0 auto; min-width: 320px; max-width: 700px; overflow-wrap: break-word; word-wrap: break-word; word-break: break-word; background-color: transparent;">
                    <div style="border-collapse: collapse;display: table;width: 100%;background-color:transparent;">
                    <!--[if (mso)|(IE)]><table width="100%" cellpadding="0" cellspacing="0" border="0" style="background-color:transparent;"><tr><td align="center"><table cellpadding="0" cellspacing="0" border="0" style="width:700px"><tr class="layout-full-width" style="background-color:transparent"><![endif]-->
                    <!--[if (mso)|(IE)]><td align="center" width="700" style="background-color:transparent;width:700px; border-top: 0px solid transparent; border-left: 0px solid transparent; border-bottom: 0px solid transparent; border-right: 0px solid transparent;" valign="top"><table width="100%" cellpadding="0" cellspacing="0" border="0"><tr><td style="padding-right: 0px; padding-left: 0px; padding-top:0px; padding-bottom:5px;"><![endif]-->
                    <div class="col num12" style="min-width: 320px; max-width: 700px; display: table-cell; vertical-align: top; width: 700px;">
                    <div style="width:100% !important;">
                    <!--[if (!mso)&(!IE)]><!-->
                    <div style="border-top:0px solid transparent; border-left:0px solid transparent; border-bottom:0px solid transparent; border-right:0px solid transparent; padding-top:0px; padding-bottom:5px; padding-right: 0px; padding-left: 0px;">
                    <!--<![endif]-->
                    <div align="center" class="img-container center autowidth" style="padding-right: 0px;padding-left: 0px;">
                    <!--[if mso]><table width="100%" cellpadding="0" cellspacing="0" border="0"><tr style="line-height:0px"><td style="padding-right: 0px;padding-left: 0px;" align="center"><![endif]--><img align="center" alt=" " border="0" class="center autowidth" src="https://coinanalytica.com/images/white_down.png" style="text-decoration: none; -ms-interpolation-mode: bicubic; height: auto; border: 0; width: 100%; max-width: 700px; display: block;" title="Alternate text" width="700"/>
                    <!--[if mso]></td></tr></table><![endif]-->
                    </div>
                    <!--[if (!mso)&(!IE)]><!-->
                    </div>
                    <!--<![endif]-->
                    </div>
                    </div>
                    <!--[if (mso)|(IE)]></td></tr></table><![endif]-->
                    <!--[if (mso)|(IE)]></td></tr></table></td></tr></table><![endif]-->
                    </div>
                    </div>
                    </div>
                    <div style="background-color:transparent;">
                    <div class="block-grid" style="Margin: 0 auto; min-width: 320px; max-width: 700px; overflow-wrap: break-word; word-wrap: break-word; word-break: break-word; background-color: transparent;">
                    <div style="border-collapse: collapse;display: table;width: 100%;background-color:transparent;">
                    <!--[if (mso)|(IE)]><table width="100%" cellpadding="0" cellspacing="0" border="0" style="background-color:transparent;"><tr><td align="center"><table cellpadding="0" cellspacing="0" border="0" style="width:700px"><tr class="layout-full-width" style="background-color:transparent"><![endif]-->
                    <!--[if (mso)|(IE)]><td align="center" width="700" style="background-color:transparent;width:700px; border-top: 0px solid transparent; border-left: 0px solid transparent; border-bottom: 0px solid transparent; border-right: 0px solid transparent;" valign="top"><table width="100%" cellpadding="0" cellspacing="0" border="0"><tr><td style="padding-right: 0px; padding-left: 0px; padding-top:5px; padding-bottom:5px;"><![endif]-->
                    <div class="col num12" style="min-width: 320px; max-width: 700px; display: table-cell; vertical-align: top; width: 700px;">
                    <div style="width:100% !important;">
                    <!--[if (!mso)&(!IE)]><!-->
                    <div style="border-top:0px solid transparent; border-left:0px solid transparent; border-bottom:0px solid transparent; border-right:0px solid transparent; padding-top:5px; padding-bottom:5px; padding-right: 0px; padding-left: 0px;">
                    <!--<![endif]-->
                    <table border="0" cellpadding="0" cellspacing="0" class="divider" role="presentation" style="table-layout: fixed; vertical-align: top; border-spacing: 0; border-collapse: collapse; mso-table-lspace: 0pt; mso-table-rspace: 0pt; min-width: 100%; -ms-text-size-adjust: 100%; -webkit-text-size-adjust: 100%;" valign="top" width="100%">
                    <tbody>
                    <tr style="vertical-align: top;" valign="top">
                    <td class="divider_inner" style="word-break: break-word; vertical-align: top; min-width: 100%; -ms-text-size-adjust: 100%; -webkit-text-size-adjust: 100%; padding-top: 5px; padding-right: 5px; padding-bottom: 5px; padding-left: 5px;" valign="top">
                    <table align="center" border="0" cellpadding="0" cellspacing="0" class="divider_content" height="10" role="presentation" style="table-layout: fixed; vertical-align: top; border-spacing: 0; border-collapse: collapse; mso-table-lspace: 0pt; mso-table-rspace: 0pt; border-top: 0px solid transparent; height: 10px; width: 100%;" valign="top" width="100%">
                    <tbody>
                    <tr style="vertical-align: top;" valign="top">
                    <td height="10" style="word-break: break-word; vertical-align: top; -ms-text-size-adjust: 100%; -webkit-text-size-adjust: 100%;" valign="top"><span></span></td>
                    </tr>
                    </tbody>
                    </table>
                    </td>
                    </tr>
                    </tbody>
                    </table>
                    <!--[if (!mso)&(!IE)]><!-->
                    </div>
                    <!--<![endif]-->
                    </div>
                    </div>
                    <!--[if (mso)|(IE)]></td></tr></table><![endif]-->
                    <!--[if (mso)|(IE)]></td></tr></table></td></tr></table><![endif]-->
                    </div>
                    </div>
                    </div>
                    <div style="background-color:transparent;">
                    <div class="block-grid" style="Margin: 0 auto; min-width: 320px; max-width: 700px; overflow-wrap: break-word; word-wrap: break-word; word-break: break-word; background-color: transparent;">
                    <div style="border-collapse: collapse;display: table;width: 100%;background-color:transparent;">
                    <!--[if (mso)|(IE)]><table width="100%" cellpadding="0" cellspacing="0" border="0" style="background-color:transparent;"><tr><td align="center"><table cellpadding="0" cellspacing="0" border="0" style="width:700px"><tr class="layout-full-width" style="background-color:transparent"><![endif]-->
                    <!--[if (mso)|(IE)]><td align="center" width="700" style="background-color:transparent;width:700px; border-top: 0px solid transparent; border-left: 0px solid transparent; border-bottom: 0px solid transparent; border-right: 0px solid transparent;" valign="top"><table width="100%" cellpadding="0" cellspacing="0" border="0"><tr><td style="padding-right: 0px; padding-left: 0px; padding-top:5px; padding-bottom:0px;"><![endif]-->
                    <div class="col num12" style="min-width: 320px; max-width: 700px; display: table-cell; vertical-align: top; width: 700px;">
                    <div style="width:100% !important;">
                    <!--[if (!mso)&(!IE)]><!-->
                    <div style="border-top:0px solid transparent; border-left:0px solid transparent; border-bottom:0px solid transparent; border-right:0px solid transparent; padding-top:5px; padding-bottom:0px; padding-right: 0px; padding-left: 0px;">
                    <!--<![endif]-->
                    <div></div>
                    <!--[if (!mso)&(!IE)]><!-->
                    </div>
                    <!--<![endif]-->
                    </div>
                    </div>
                    <!--[if (mso)|(IE)]></td></tr></table><![endif]-->
                    <!--[if (mso)|(IE)]></td></tr></table></td></tr></table><![endif]-->
                    </div>
                    </div>
                    </div>
                    <div style="background-color:transparent;">
                    <div class="block-grid two-up" style="Margin: 0 auto; min-width: 320px; max-width: 700px; overflow-wrap: break-word; word-wrap: break-word; word-break: break-word; background-color: #0d8cec;">
                    <div style="border-collapse: collapse;display: table;width: 100%;background-color:#0d8cec;">
                    <!--[if (mso)|(IE)]><table width="100%" cellpadding="0" cellspacing="0" border="0" style="background-color:transparent;"><tr><td align="center"><table cellpadding="0" cellspacing="0" border="0" style="width:700px"><tr class="layout-full-width" style="background-color:#0d8cec"><![endif]-->
                    <!--[if (mso)|(IE)]><td align="center" width="350" style="background-color:#0d8cec;width:350px; border-top: 0px solid transparent; border-left: 0px solid transparent; border-bottom: 0px solid transparent; border-right: 0px solid transparent;" valign="top"><table width="100%" cellpadding="0" cellspacing="0" border="0"><tr><td style="padding-right: 0px; padding-left: 0px; padding-top:5px; padding-bottom:0px;"><![endif]-->
                    <div class="col num6" style="min-width: 320px; max-width: 350px; display: table-cell; vertical-align: top; width: 350px;">
                    <div style="width:100% !important;">
                    <!--[if (!mso)&(!IE)]><!-->
                    <div style="border-top:0px solid transparent; border-left:0px solid transparent; border-bottom:0px solid transparent; border-right:0px solid transparent; padding-top:5px; padding-bottom:0px; padding-right: 0px; padding-left: 0px;">
                    <!--<![endif]-->
                    <table border="0" cellpadding="0" cellspacing="0" class="divider" role="presentation" style="table-layout: fixed; vertical-align: top; border-spacing: 0; border-collapse: collapse; mso-table-lspace: 0pt; mso-table-rspace: 0pt; min-width: 100%; -ms-text-size-adjust: 100%; -webkit-text-size-adjust: 100%;" valign="top" width="100%">
                    <tbody>
                    <tr style="vertical-align: top;" valign="top">
                    <td class="divider_inner" style="word-break: break-word; vertical-align: top; min-width: 100%; -ms-text-size-adjust: 100%; -webkit-text-size-adjust: 100%; padding-top: 5px; padding-right: 5px; padding-bottom: 5px; padding-left: 5px;" valign="top">
                    <table align="center" border="0" cellpadding="0" cellspacing="0" class="divider_content" height="25" role="presentation" style="table-layout: fixed; vertical-align: top; border-spacing: 0; border-collapse: collapse; mso-table-lspace: 0pt; mso-table-rspace: 0pt; border-top: 0px solid transparent; height: 25px; width: 100%;" valign="top" width="100%">
                    <tbody>
                    <tr style="vertical-align: top;" valign="top">
                    <td height="25" style="word-break: break-word; vertical-align: top; -ms-text-size-adjust: 100%; -webkit-text-size-adjust: 100%;" valign="top"><span></span></td>
                    </tr>
                    </tbody>
                    </table>
                    </td>
                    </tr>
                    </tbody>
                    </table>
                    <!--[if mso]><table width="100%" cellpadding="0" cellspacing="0" border="0"><tr><td style="padding-right: 40px; padding-left: 40px; padding-top: 10px; padding-bottom: 25px; font-family: Tahoma, sans-serif"><![endif]-->
                    <div style="color:#191919;font-family:Montserrat, Trebuchet MS, Lucida Grande, Lucida Sans Unicode, Lucida Sans, Tahoma, sans-serif;line-height:1.5;padding-top:10px;padding-right:40px;padding-bottom:25px;padding-left:40px;">
                    <div style="line-height: 1.5; font-size: 12px; color: #191919; font-family: Montserrat, Trebuchet MS, Lucida Grande, Lucida Sans Unicode, Lucida Sans, Tahoma, sans-serif; mso-line-height-alt: 18px;">
                    <p style="font-size: 30px; line-height: 1.5; text-align: center; word-break: break-word; mso-line-height-alt: 45px; margin: 0;"><span style="font-size: 30px;"><strong><span style="">Our mobile app are coming soon </span></strong></span></p>
                    <p style="font-size: 30px; line-height: 1.5; text-align: center; word-break: break-word; mso-line-height-alt: 45px; margin: 0;"><span style="font-size: 30px;"><strong><span style="">Mobile App</span></strong></span></p>
                    </div>
                    </div>
                    <!--[if mso]></td></tr></table><![endif]-->
                    <div align="center" class="img-container center fixedwidth" style="padding-right: 0px;padding-left: 0px;">
                    <!--[if mso]><table width="100%" cellpadding="0" cellspacing="0" border="0"><tr style="line-height:0px"><td style="padding-right: 0px;padding-left: 0px;" align="center"><![endif]--><img align="center" alt=" " border="0" class="center fixedwidth" src="https://coinanalytica.com/images/App_Store_Badge_US_Black.png" style="text-decoration: none; -ms-interpolation-mode: bicubic; height: auto; border: 0; width: 100%; max-width: 175px; display: block;" title="Alternate text" width="175"/>
                    <div style="font-size:1px;line-height:15px"> </div>
                    <!--[if mso]></td></tr></table><![endif]-->
                    </div>
                    <div align="center" class="img-container center fixedwidth" style="padding-right: 0px;padding-left: 0px;">
                    <!--[if mso]><table width="100%" cellpadding="0" cellspacing="0" border="0"><tr style="line-height:0px"><td style="padding-right: 0px;padding-left: 0px;" align="center"><![endif]--><img align="center" alt=" " border="0" class="center fixedwidth" src="https://coinanalytica.com/images/Google_Play_Badge_US.png" style="text-decoration: none; -ms-interpolation-mode: bicubic; height: auto; border: 0; width: 100%; max-width: 175px; display: block;" title=" " width="175"/>
                    <!--[if mso]></td></tr></table><![endif]-->
                    </div>
                    <table border="0" cellpadding="0" cellspacing="0" class="divider" role="presentation" style="table-layout: fixed; vertical-align: top; border-spacing: 0; border-collapse: collapse; mso-table-lspace: 0pt; mso-table-rspace: 0pt; min-width: 100%; -ms-text-size-adjust: 100%; -webkit-text-size-adjust: 100%;" valign="top" width="100%">
                    <tbody>
                    <tr style="vertical-align: top;" valign="top">
                    <td class="divider_inner" style="word-break: break-word; vertical-align: top; min-width: 100%; -ms-text-size-adjust: 100%; -webkit-text-size-adjust: 100%; padding-top: 5px; padding-right: 5px; padding-bottom: 5px; padding-left: 5px;" valign="top">
                    <table align="center" border="0" cellpadding="0" cellspacing="0" class="divider_content" height="25" role="presentation" style="table-layout: fixed; vertical-align: top; border-spacing: 0; border-collapse: collapse; mso-table-lspace: 0pt; mso-table-rspace: 0pt; border-top: 0px solid transparent; height: 25px; width: 100%;" valign="top" width="100%">
                    <tbody>
                    <tr style="vertical-align: top;" valign="top">
                    <td height="25" style="word-break: break-word; vertical-align: top; -ms-text-size-adjust: 100%; -webkit-text-size-adjust: 100%;" valign="top"><span></span></td>
                    </tr>
                    </tbody>
                    </table>
                    </td>
                    </tr>
                    </tbody>
                    </table>
                    <!--[if (!mso)&(!IE)]><!-->
                    </div>
                    <!--<![endif]-->
                    </div>
                    </div>
                    <!--[if (mso)|(IE)]></td></tr></table><![endif]-->
                    <!--[if (mso)|(IE)]></td><td align="center" width="350" style="background-color:#0d8cec;width:350px; border-top: 0px solid transparent; border-left: 0px solid transparent; border-bottom: 0px solid transparent; border-right: 0px solid transparent;" valign="top"><table width="100%" cellpadding="0" cellspacing="0" border="0"><tr><td style="padding-right: 0px; padding-left: 0px; padding-top:5px; padding-bottom:0px;"><![endif]-->
                    <div class="col num6" style="min-width: 320px; max-width: 350px; display: table-cell; vertical-align: top; width: 350px;">
                    <div style="width:100% !important;">
                    <!--[if (!mso)&(!IE)]><!-->
                    <div style="border-top:0px solid transparent; border-left:0px solid transparent; border-bottom:0px solid transparent; border-right:0px solid transparent; padding-top:5px; padding-bottom:0px; padding-right: 0px; padding-left: 0px;">
                    <!--<![endif]-->
                    <table border="0" cellpadding="0" cellspacing="0" class="divider" role="presentation" style="table-layout: fixed; vertical-align: top; border-spacing: 0; border-collapse: collapse; mso-table-lspace: 0pt; mso-table-rspace: 0pt; min-width: 100%; -ms-text-size-adjust: 100%; -webkit-text-size-adjust: 100%;" valign="top" width="100%">
                    <tbody>
                    <tr style="vertical-align: top;" valign="top">
                    <td class="divider_inner" style="word-break: break-word; vertical-align: top; min-width: 100%; -ms-text-size-adjust: 100%; -webkit-text-size-adjust: 100%; padding-top: 5px; padding-right: 5px; padding-bottom: 5px; padding-left: 5px;" valign="top">
                    <table align="center" border="0" cellpadding="0" cellspacing="0" class="divider_content" height="5" role="presentation" style="table-layout: fixed; vertical-align: top; border-spacing: 0; border-collapse: collapse; mso-table-lspace: 0pt; mso-table-rspace: 0pt; border-top: 0px solid transparent; height: 5px; width: 100%;" valign="top" width="100%">
                    <tbody>
                    <tr style="vertical-align: top;" valign="top">
                    <td height="5" style="word-break: break-word; vertical-align: top; -ms-text-size-adjust: 100%; -webkit-text-size-adjust: 100%;" valign="top"><span></span></td>
                    </tr>
                    </tbody>
                    </table>
                    </td>
                    </tr>
                    </tbody>
                    </table>
                    <div align="center" class="img-container center fixedwidth" style="padding-right: 0px;padding-left: 0px;">
                    <!--[if mso]><table width="100%" cellpadding="0" cellspacing="0" border="0"><tr style="line-height:0px"><td style="padding-right: 0px;padding-left: 0px;" align="center"><![endif]--><img align="center" alt=" " border="0" class="center fixedwidth" src="https://coinanalytica.com/images/app_image_2.png" style="text-decoration: none; -ms-interpolation-mode: bicubic; height: auto; border: 0; width: 100%; max-width: 297px; display: block;" title="Alternate text" width="297"/>
                    <!--[if mso]></td></tr></table><![endif]-->
                    </div>
                    <!--[if (!mso)&(!IE)]><!-->
                    </div>
                    <!--<![endif]-->
                    </div>
                    </div>
                    <!--[if (mso)|(IE)]></td></tr></table><![endif]-->
                    <!--[if (mso)|(IE)]></td></tr></table></td></tr></table><![endif]-->
                    </div>
                    </div>
                    </div>
                    <div style="background-color:transparent;">
                    <div class="block-grid" style="Margin: 0 auto; min-width: 320px; max-width: 700px; overflow-wrap: break-word; word-wrap: break-word; word-break: break-word; background-color: #ffffff;">
                    <div style="border-collapse: collapse;display: table;width: 100%;background-color:#ffffff;">
                    <!--[if (mso)|(IE)]><table width="100%" cellpadding="0" cellspacing="0" border="0" style="background-color:transparent;"><tr><td align="center"><table cellpadding="0" cellspacing="0" border="0" style="width:700px"><tr class="layout-full-width" style="background-color:#ffffff"><![endif]-->
                    <!--[if (mso)|(IE)]><td align="center" width="700" style="background-color:#ffffff;width:700px; border-top: 0px solid transparent; border-left: 0px solid transparent; border-bottom: 0px solid transparent; border-right: 0px solid transparent;" valign="top"><table width="100%" cellpadding="0" cellspacing="0" border="0"><tr><td style="padding-right: 0px; padding-left: 0px; padding-top:0px; padding-bottom:5px;"><![endif]-->
                    <div class="col num12" style="min-width: 320px; max-width: 700px; display: table-cell; vertical-align: top; width: 700px;">
                    <div style="width:100% !important;">
                    <!--[if (!mso)&(!IE)]><!-->
                    <div style="border-top:0px solid transparent; border-left:0px solid transparent; border-bottom:0px solid transparent; border-right:0px solid transparent; padding-top:0px; padding-bottom:5px; padding-right: 0px; padding-left: 0px;">
                    <!--<![endif]-->
                    <table border="0" cellpadding="0" cellspacing="0" class="divider" role="presentation" style="table-layout: fixed; vertical-align: top; border-spacing: 0; border-collapse: collapse; mso-table-lspace: 0pt; mso-table-rspace: 0pt; min-width: 100%; -ms-text-size-adjust: 100%; -webkit-text-size-adjust: 100%;" valign="top" width="100%">
                    <tbody>
                    <tr style="vertical-align: top;" valign="top">
                    <td class="divider_inner" style="word-break: break-word; vertical-align: top; min-width: 100%; -ms-text-size-adjust: 100%; -webkit-text-size-adjust: 100%; padding-top: 10px; padding-right: 10px; padding-bottom: 10px; padding-left: 10px;" valign="top">
                    <table align="center" border="0" cellpadding="0" cellspacing="0" class="divider_content" height="20" role="presentation" style="table-layout: fixed; vertical-align: top; border-spacing: 0; border-collapse: collapse; mso-table-lspace: 0pt; mso-table-rspace: 0pt; border-top: 0px solid transparent; height: 20px; width: 95%;" valign="top" width="95%">
                    <tbody>
                    <tr style="vertical-align: top;" valign="top">
                    <td height="20" style="word-break: break-word; vertical-align: top; -ms-text-size-adjust: 100%; -webkit-text-size-adjust: 100%;" valign="top"><span></span></td>
                    </tr>
                    </tbody>
                    </table>
                    </td>
                    </tr>
                    </tbody>
                    </table>
                    <table cellpadding="0" cellspacing="0" class="social_icons" role="presentation" style="table-layout: fixed; vertical-align: top; border-spacing: 0; border-collapse: collapse; mso-table-lspace: 0pt; mso-table-rspace: 0pt;" valign="top" width="100%">
                    <tbody>
                    <tr style="vertical-align: top;" valign="top">
                    <td style="word-break: break-word; vertical-align: top; padding-top: 10px; padding-right: 10px; padding-bottom: 10px; padding-left: 10px;" valign="top">
                    <table align="center" cellpadding="0" cellspacing="0" class="social_table" role="presentation" style="table-layout: fixed; vertical-align: top; border-spacing: 0; border-collapse: collapse; mso-table-tspace: 0; mso-table-rspace: 0; mso-table-bspace: 0; mso-table-lspace: 0;" valign="top">
                    <tbody>
                    <tr align="center" style="vertical-align: top; display: inline-block; text-align: center;" valign="top">
                    <td style="word-break: break-word; vertical-align: top; padding-bottom: 0; padding-right: 4px; padding-left: 4px;" valign="top"><a href="https://www.facebook.com/" target="_blank"><img alt="Facebook" height="32" src="https://coinanalytica.com/images/facebook2x.png" style="text-decoration: none; -ms-interpolation-mode: bicubic; height: auto; border: 0; display: block;" title="Facebook" width="32"/></a></td>
                    <td style="word-break: break-word; vertical-align: top; padding-bottom: 0; padding-right: 4px; padding-left: 4px;" valign="top"><a href="https://twitter.com/" target="_blank"><img alt="Twitter" height="32" src="https://coinanalytica.com/images/twitter2x.png" style="text-decoration: none; -ms-interpolation-mode: bicubic; height: auto; border: 0; display: block;" title="Twitter" width="32"/></a></td>
                    <td style="word-break: break-word; vertical-align: top; padding-bottom: 0; padding-right: 4px; padding-left: 4px;" valign="top"><a href="https://instagram.com/" target="_blank"><img alt="Instagram" height="32" src="https://coinanalytica.com/images/instagram2x.png" style="text-decoration: none; -ms-interpolation-mode: bicubic; height: auto; border: 0; display: block;" title="Instagram" width="32"/></a></td>
                    <td style="word-break: break-word; vertical-align: top; padding-bottom: 0; padding-right: 4px; padding-left: 4px;" valign="top"><a href="https://www.linkedin.com/" target="_blank"><img alt="LinkedIn" height="32" src="https://coinanalytica.com/images/linkedin2x.png" style="text-decoration: none; -ms-interpolation-mode: bicubic; height: auto; border: 0; display: block;" title="LinkedIn" width="32"/></a></td>
                    <td style="word-break: break-word; vertical-align: top; padding-bottom: 0; padding-right: 4px; padding-left: 4px;" valign="top"><a href="" target="_blank"><img alt="YouTube" height="32" src="https://coinanalytica.com/images/youtube2x.png" style="text-decoration: none; -ms-interpolation-mode: bicubic; height: auto; border: 0; display: block;" title="YouTube" width="32"/></a></td>
                    </tr>
                    </tbody>
                    </table>
                    </td>
                    </tr>
                    </tbody>
                    </table>
                    <table border="0" cellpadding="0" cellspacing="0" class="divider" role="presentation" style="table-layout: fixed; vertical-align: top; border-spacing: 0; border-collapse: collapse; mso-table-lspace: 0pt; mso-table-rspace: 0pt; min-width: 100%; -ms-text-size-adjust: 100%; -webkit-text-size-adjust: 100%;" valign="top" width="100%">
                    <tbody>
                    <tr style="vertical-align: top;" valign="top">
                    <td class="divider_inner" style="word-break: break-word; vertical-align: top; min-width: 100%; -ms-text-size-adjust: 100%; -webkit-text-size-adjust: 100%; padding-top: 10px; padding-right: 10px; padding-bottom: 10px; padding-left: 10px;" valign="top">
                    <table align="center" border="0" cellpadding="0" cellspacing="0" class="divider_content" height="5" role="presentation" style="table-layout: fixed; vertical-align: top; border-spacing: 0; border-collapse: collapse; mso-table-lspace: 0pt; mso-table-rspace: 0pt; border-top: 0px solid transparent; height: 5px; width: 95%;" valign="top" width="95%">
                    <tbody>
                    <tr style="vertical-align: top;" valign="top">
                    <td height="5" style="word-break: break-word; vertical-align: top; -ms-text-size-adjust: 100%; -webkit-text-size-adjust: 100%;" valign="top"><span></span></td>
                    </tr>
                    </tbody>
                    </table>
                    </td>
                    </tr>
                    </tbody>
                    </table>
                    <!--[if mso]><table width="100%" cellpadding="0" cellspacing="0" border="0"><tr><td style="padding-right: 40px; padding-left: 40px; padding-top: 0px; padding-bottom: 10px; font-family: Tahoma, sans-serif"><![endif]-->
                    <div style="color:#555555;font-family:Montserrat, Trebuchet MS, Lucida Grande, Lucida Sans Unicode, Lucida Sans, Tahoma, sans-serif;line-height:2;padding-top:0px;padding-right:40px;padding-bottom:10px;padding-left:40px;">
                    <div style="line-height: 2; font-size: 12px; color: #555555; font-family: Montserrat, Trebuchet MS, Lucida Grande, Lucida Sans Unicode, Lucida Sans, Tahoma, sans-serif; mso-line-height-alt: 24px;">
                    <p style="font-size: 14px; line-height: 2; word-break: break-word; text-align: center; mso-line-height-alt: 28px; margin: 0;">If you have any questions, feel free message us at mail@coinanalytica.com. All right reserved. Update <a href="#" rel="noopener" style="text-decoration: none; color: #555555;" target="_blank">email preferences</a> or <a href="#" rel="noopener" style="text-decoration: none; color: #555555;" target="_blank">unsubscribe</a>.</p>
                    </div>
                    </div>
                    <!--[if mso]></td></tr></table><![endif]-->
                    <!--[if mso]><table width="100%" cellpadding="0" cellspacing="0" border="0"><tr><td style="padding-right: 40px; padding-left: 40px; padding-top: 0px; padding-bottom: 10px; font-family: Tahoma, sans-serif"><![endif]-->
                    <div style="color:#555555;font-family:Montserrat, Trebuchet MS, Lucida Grande, Lucida Sans Unicode, Lucida Sans, Tahoma, sans-serif;line-height:2;padding-top:0px;padding-right:40px;padding-bottom:10px;padding-left:40px;">
                    <div style="line-height: 2; font-size: 12px; color: #555555; font-family: Montserrat, Trebuchet MS, Lucida Grande, Lucida Sans Unicode, Lucida Sans, Tahoma, sans-serif; mso-line-height-alt: 24px;">
                    <p style="font-size: 14px; line-height: 2; word-break: break-word; text-align: center; mso-line-height-alt: 28px; margin: 0;">5781 Spring St Salinas, Idaho 88606 United States</p>
                    </div>
                    </div>
                    <!--[if mso]></td></tr></table><![endif]-->
                    <!--[if (!mso)&(!IE)]><!-->
                    </div>
                    <!--<![endif]-->
                    </div>
                    </div>
                    <!--[if (mso)|(IE)]></td></tr></table><![endif]-->
                    <!--[if (mso)|(IE)]></td></tr></table></td></tr></table><![endif]-->
                    </div>
                    </div>
                    </div>
                    <div style="background-color:transparent;">
                    <div class="block-grid" style="Margin: 0 auto; min-width: 320px; max-width: 700px; overflow-wrap: break-word; word-wrap: break-word; word-break: break-word; background-color: #ffffff;">
                    <div style="border-collapse: collapse;display: table;width: 100%;background-color:#ffffff;">
                    <!--[if (mso)|(IE)]><table width="100%" cellpadding="0" cellspacing="0" border="0" style="background-color:transparent;"><tr><td align="center"><table cellpadding="0" cellspacing="0" border="0" style="width:700px"><tr class="layout-full-width" style="background-color:#ffffff"><![endif]-->
                    <!--[if (mso)|(IE)]><td align="center" width="700" style="background-color:#ffffff;width:700px; border-top: 0px solid transparent; border-left: 0px solid transparent; border-bottom: 0px solid transparent; border-right: 0px solid transparent;" valign="top"><table width="100%" cellpadding="0" cellspacing="0" border="0"><tr><td style="padding-right: 0px; padding-left: 0px; padding-top:5px; padding-bottom:0px;"><![endif]-->
                    <div class="col num12" style="min-width: 320px; max-width: 700px; display: table-cell; vertical-align: top; width: 700px;">
                    <div style="width:100% !important;">
                    <!--[if (!mso)&(!IE)]><!-->
                    <div style="border-top:0px solid transparent; border-left:0px solid transparent; border-bottom:0px solid transparent; border-right:0px solid transparent; padding-top:5px; padding-bottom:0px; padding-right: 0px; padding-left: 0px;">
                    <!--<![endif]-->
                    <!--[if mso]><table width="100%" cellpadding="0" cellspacing="0" border="0"><tr><td style="padding-right: 10px; padding-left: 10px; padding-top: 10px; padding-bottom: 10px; font-family: Tahoma, sans-serif"><![endif]-->
                    <div style="color:#ffffff;font-family:Montserrat, Trebuchet MS, Lucida Grande, Lucida Sans Unicode, Lucida Sans, Tahoma, sans-serif;line-height:1.2;padding-top:10px;padding-right:10px;padding-bottom:10px;padding-left:10px;">
                    <div style="line-height: 1.2; font-size: 12px; font-family: Montserrat, Trebuchet MS, Lucida Grande, Lucida Sans Unicode, Lucida Sans, Tahoma, sans-serif; color: #ffffff; mso-line-height-alt: 14px;">
                    <p style="font-size: 12px; line-height: 1.2; text-align: center; word-break: break-word; font-family: Montserrat, Trebuchet MS, Lucida Grande, Lucida Sans Unicode, Lucida Sans, Tahoma, sans-serif; mso-line-height-alt: 14px; margin: 0;"><span style="color: #555555;">Terms of use <strong>|</strong> Privacy Policy</span></p>
                    </div>
                    </div>
                    <!--[if mso]></td></tr></table><![endif]-->
                    <!--[if (!mso)&(!IE)]><!-->
                    </div>
                    <!--<![endif]-->
                    </div>
                    </div>
                    <!--[if (mso)|(IE)]></td></tr></table><![endif]-->
                    <!--[if (mso)|(IE)]></td></tr></table></td></tr></table><![endif]-->
                    </div>
                    </div>
                    </div>
                    <div style="background-color:transparent;">
                    <div class="block-grid" style="Margin: 0 auto; min-width: 320px; max-width: 700px; overflow-wrap: break-word; word-wrap: break-word; word-break: break-word; background-color: transparent;">
                    <div style="border-collapse: collapse;display: table;width: 100%;background-color:transparent;">
                    <!--[if (mso)|(IE)]><table width="100%" cellpadding="0" cellspacing="0" border="0" style="background-color:transparent;"><tr><td align="center"><table cellpadding="0" cellspacing="0" border="0" style="width:700px"><tr class="layout-full-width" style="background-color:transparent"><![endif]-->
                    <!--[if (mso)|(IE)]><td align="center" width="700" style="background-color:transparent;width:700px; border-top: 0px solid transparent; border-left: 0px solid transparent; border-bottom: 0px solid transparent; border-right: 0px solid transparent;" valign="top"><table width="100%" cellpadding="0" cellspacing="0" border="0"><tr><td style="padding-right: 0px; padding-left: 0px; padding-top:0px; padding-bottom:5px;"><![endif]-->
                    <div class="col num12" style="min-width: 320px; max-width: 700px; display: table-cell; vertical-align: top; width: 700px;">
                    <div style="width:100% !important;">
                    <!--[if (!mso)&(!IE)]><!-->
                    <div style="border-top:0px solid transparent; border-left:0px solid transparent; border-bottom:0px solid transparent; border-right:0px solid transparent; padding-top:0px; padding-bottom:5px; padding-right: 0px; padding-left: 0px;">
                    <!--<![endif]-->
                    <div align="center" class="img-container center autowidth" style="padding-right: 0px;padding-left: 0px;">
                    <!--[if mso]><table width="100%" cellpadding="0" cellspacing="0" border="0"><tr style="line-height:0px"><td style="padding-right: 0px;padding-left: 0px;" align="center"><![endif]--><img align="center" alt="Alternate text" border="0" class="center autowidth" src="https://coinanalytica.com/images/white_down.png" style="text-decoration: none; -ms-interpolation-mode: bicubic; height: auto; border: 0; width: 100%; max-width: 700px; display: block;" title="Alternate text" width="700"/>
                    <!--[if mso]></td></tr></table><![endif]-->
                    </div>
                    <!--[if (!mso)&(!IE)]><!-->
                    </div>
                    <!--<![endif]-->
                    </div>
                    </div>
                    <!--[if (mso)|(IE)]></td></tr></table><![endif]-->
                    <!--[if (mso)|(IE)]></td></tr></table></td></tr></table><![endif]-->
                    </div>
                    </div>
                    </div>
                    <div style="background-color:transparent;">
                    <div class="block-grid" style="Margin: 0 auto; min-width: 320px; max-width: 700px; overflow-wrap: break-word; word-wrap: break-word; word-break: break-word; background-color: transparent;">
                    <div style="border-collapse: collapse;display: table;width: 100%;background-color:transparent;">
                    <!--[if (mso)|(IE)]><table width="100%" cellpadding="0" cellspacing="0" border="0" style="background-color:transparent;"><tr><td align="center"><table cellpadding="0" cellspacing="0" border="0" style="width:700px"><tr class="layout-full-width" style="background-color:transparent"><![endif]-->
                    <!--[if (mso)|(IE)]><td align="center" width="700" style="background-color:transparent;width:700px; border-top: 0px solid transparent; border-left: 0px solid transparent; border-bottom: 0px solid transparent; border-right: 0px solid transparent;" valign="top"><table width="100%" cellpadding="0" cellspacing="0" border="0"><tr><td style="padding-right: 0px; padding-left: 0px; padding-top:5px; padding-bottom:5px;"><![endif]-->
                    <div class="col num12" style="min-width: 320px; max-width: 700px; display: table-cell; vertical-align: top; width: 700px;">
                    <div style="width:100% !important;">
                    <!--[if (!mso)&(!IE)]><!-->
                    <div style="border-top:0px solid transparent; border-left:0px solid transparent; border-bottom:0px solid transparent; border-right:0px solid transparent; padding-top:5px; padding-bottom:5px; padding-right: 0px; padding-left: 0px;">
                    <!--<![endif]-->
                    <table border="0" cellpadding="0" cellspacing="0" class="divider" role="presentation" style="table-layout: fixed; vertical-align: top; border-spacing: 0; border-collapse: collapse; mso-table-lspace: 0pt; mso-table-rspace: 0pt; min-width: 100%; -ms-text-size-adjust: 100%; -webkit-text-size-adjust: 100%;" valign="top" width="100%">
                    <tbody>
                    <tr style="vertical-align: top;" valign="top">
                    <td class="divider_inner" style="word-break: break-word; vertical-align: top; min-width: 100%; -ms-text-size-adjust: 100%; -webkit-text-size-adjust: 100%; padding-top: 10px; padding-right: 10px; padding-bottom: 10px; padding-left: 10px;" valign="top">
                    <table align="center" border="0" cellpadding="0" cellspacing="0" class="divider_content" height="5" role="presentation" style="table-layout: fixed; vertical-align: top; border-spacing: 0; border-collapse: collapse; mso-table-lspace: 0pt; mso-table-rspace: 0pt; border-top: 0px solid transparent; height: 5px; width: 100%;" valign="top" width="100%">
                    <tbody>
                    <tr style="vertical-align: top;" valign="top">
                    <td height="5" style="word-break: break-word; vertical-align: top; -ms-text-size-adjust: 100%; -webkit-text-size-adjust: 100%;" valign="top"><span></span></td>
                    </tr>
                    </tbody>
                    </table>
                    </td>
                    </tr>
                    </tbody>
                    </table>
                    <!--[if (!mso)&(!IE)]><!-->
                    </div>
                    <!--<![endif]-->
                    </div>
                    </div>
                    <!--[if (mso)|(IE)]></td></tr></table><![endif]-->
                    <!--[if (mso)|(IE)]></td></tr></table></td></tr></table><![endif]-->
                    </div>
                    </div>
                    </div>
                    <!--[if (mso)|(IE)]></td></tr></table><![endif]-->
                    </td>
                    </tr>
                    </tbody>
                    </table>
                    <!--[if (IE)]></div><![endif]-->
                    </body>
                    </html>`
                };
              
                // send mail with defined transport object
                transporter.sendMail(mailOptions, (error, info) => {
                    if (error) {
                        return console.log(error);
                    }
                    console.log('Message sent: %s', info.messageId);   
                    console.log('Preview URL: %s', nodemailer.getTestMessageUrl(info));
                });
                res.redirect('/users/login');
              })
              .catch(err => console.log(err));
          });
        });
      }
    });
  }
});

// Login
router.post('/login', (req, res, next) => {
  passport.authenticate('local', {
    successRedirect: '/dashboard',
    failureRedirect: '/users/login',
    failureFlash: true
  })(req, res, next);
});

// Logout
router.get('/logout', (req, res) => {
  req.logout();
  req.flash('success_msg', 'You are logged out');
  res.redirect('/users/login');
});

module.exports = router;
