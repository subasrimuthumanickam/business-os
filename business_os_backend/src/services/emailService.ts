// // // // // // // // // // // // // // // // // // // import nodemailer from 'nodemailer';
// // // // // // // // // // // // // // // // // // // import dotenv from 'dotenv';

// // // // // // // // // // // // // // // // // // // dotenv.config();

// // // // // // // // // // // // // // // // // // // console.log('📧 Email Service Initializing...');
// // // // // // // // // // // // // // // // // // // console.log('  SMTP_HOST:', process.env.SMTP_HOST || '❌ Not set');
// // // // // // // // // // // // // // // // // // // console.log('  SMTP_PORT:', process.env.SMTP_PORT || '❌ Not set');
// // // // // // // // // // // // // // // // // // // console.log('  SMTP_USER:', process.env.SMTP_USER ? '✅ Set' : '❌ Missing');
// // // // // // // // // // // // // // // // // // // console.log('  SMTP_PASS:', process.env.SMTP_PASS ? '✅ Set' : '❌ Missing');

// // // // // // // // // // // // // // // // // // // const hasValidCredentials = !!(process.env.SMTP_USER && process.env.SMTP_PASS);
// // // // // // // // // // // // // // // // // // // let transporter: any;

// // // // // // // // // // // // // // // // // // // if (hasValidCredentials) {
// // // // // // // // // // // // // // // // // // //   transporter = nodemailer.createTransport({
// // // // // // // // // // // // // // // // // // //     host: process.env.SMTP_HOST || 'smtp.gmail.com',
// // // // // // // // // // // // // // // // // // //     port: parseInt(process.env.SMTP_PORT || '587'),
// // // // // // // // // // // // // // // // // // //     secure: process.env.SMTP_SECURE === 'true',
// // // // // // // // // // // // // // // // // // //     auth: {
// // // // // // // // // // // // // // // // // // //       user: process.env.SMTP_USER || '',
// // // // // // // // // // // // // // // // // // //       pass: process.env.SMTP_PASS || ''
// // // // // // // // // // // // // // // // // // //     }
// // // // // // // // // // // // // // // // // // //   });

// // // // // // // // // // // // // // // // // // //   transporter.verify((error: Error | null, success: boolean) => {
// // // // // // // // // // // // // // // // // // //     if (error) {
// // // // // // // // // // // // // // // // // // //       console.error('❌ SMTP connection error:', error.message);
// // // // // // // // // // // // // // // // // // //     } else {
// // // // // // // // // // // // // // // // // // //       console.log('✅ SMTP server ready for sending emails');
// // // // // // // // // // // // // // // // // // //     }
// // // // // // // // // // // // // // // // // // //   });
// // // // // // // // // // // // // // // // // // // } else {
// // // // // // // // // // // // // // // // // // //   console.warn('⚠️ SMTP credentials missing - Email features will be disabled');
// // // // // // // // // // // // // // // // // // //   transporter = {
// // // // // // // // // // // // // // // // // // //     sendMail: (options: any) => {
// // // // // // // // // // // // // // // // // // //       console.log('📧 [MOCK] Would send email to:', options.to);
// // // // // // // // // // // // // // // // // // //       return Promise.resolve({ messageId: 'mock-' + Date.now() });
// // // // // // // // // // // // // // // // // // //     },
// // // // // // // // // // // // // // // // // // //     verify: (callback: any) => {
// // // // // // // // // // // // // // // // // // //       callback(null, true);
// // // // // // // // // // // // // // // // // // //       return Promise.resolve(true);
// // // // // // // // // // // // // // // // // // //     }
// // // // // // // // // // // // // // // // // // //   };
// // // // // // // // // // // // // // // // // // // }

// // // // // // // // // // // // // // // // // // // export const sendReworkRequestEmail = async (
// // // // // // // // // // // // // // // // // // //   developerEmail: string,
// // // // // // // // // // // // // // // // // // //   developerName: string,
// // // // // // // // // // // // // // // // // // //   taskTitle: string,
// // // // // // // // // // // // // // // // // // //   reworkNotes: string,
// // // // // // // // // // // // // // // // // // //   testerName: string
// // // // // // // // // // // // // // // // // // // ): Promise<boolean> => {
// // // // // // // // // // // // // // // // // // //   if (!hasValidCredentials) {
// // // // // // // // // // // // // // // // // // //     console.warn('⚠️ Rework email skipped - SMTP not configured');
// // // // // // // // // // // // // // // // // // //     return false;
// // // // // // // // // // // // // // // // // // //   }

// // // // // // // // // // // // // // // // // // //   const htmlContent = `
// // // // // // // // // // // // // // // // // // //     <!DOCTYPE html>
// // // // // // // // // // // // // // // // // // //     <html>
// // // // // // // // // // // // // // // // // // //       <head>
// // // // // // // // // // // // // // // // // // //         <style>
// // // // // // // // // // // // // // // // // // //           body { font-family: Arial, sans-serif; color: #333; }
// // // // // // // // // // // // // // // // // // //           .container { max-width: 600px; margin: 0 auto; padding: 20px; }
// // // // // // // // // // // // // // // // // // //           .header { background-color: #fef3c7; padding: 20px; border-radius: 5px; border-left: 4px solid #f59e0b; }
// // // // // // // // // // // // // // // // // // //           .header h2 { margin: 0; color: #92400e; }
// // // // // // // // // // // // // // // // // // //           .content { background-color: #ffffff; padding: 20px; border: 1px solid #e5e7eb; border-radius: 5px; }
// // // // // // // // // // // // // // // // // // //           .notes { background-color: #fef3c7; padding: 15px; border-left: 3px solid #f59e0b; margin: 15px 0; }
// // // // // // // // // // // // // // // // // // //           .footer { margin-top: 30px; font-size: 12px; color: #6b7280; border-top: 1px solid #e5e7eb; padding-top: 20px; text-align: center; }
// // // // // // // // // // // // // // // // // // //         </style>
// // // // // // // // // // // // // // // // // // //       </head>
// // // // // // // // // // // // // // // // // // //       <body>
// // // // // // // // // // // // // // // // // // //         <div class="container">
// // // // // // // // // // // // // // // // // // //           <div class="header">
// // // // // // // // // // // // // // // // // // //             <h2>⚠️ Rework Request</h2>
// // // // // // // // // // // // // // // // // // //           </div>
// // // // // // // // // // // // // // // // // // //           <div class="content">
// // // // // // // // // // // // // // // // // // //             <p>Hi <strong>${developerName}</strong>,</p>
// // // // // // // // // // // // // // // // // // //             <p>The task "<strong>${taskTitle}</strong>" requires rework and has been returned to you for further development.</p>
// // // // // // // // // // // // // // // // // // //             <p><strong>Reported by:</strong> ${testerName}</p>
// // // // // // // // // // // // // // // // // // //             <div class="notes">
// // // // // // // // // // // // // // // // // // //               <strong>📝 Feedback:</strong>
// // // // // // // // // // // // // // // // // // //               <p>${reworkNotes}</p>
// // // // // // // // // // // // // // // // // // //             </div>
// // // // // // // // // // // // // // // // // // //             <p>Please address these issues and update the task status when ready for re-testing.</p>
// // // // // // // // // // // // // // // // // // //           </div>
// // // // // // // // // // // // // // // // // // //           <div class="footer">
// // // // // // // // // // // // // // // // // // //             <p>&copy; ${new Date().getFullYear()} Business OS</p>
// // // // // // // // // // // // // // // // // // //           </div>
// // // // // // // // // // // // // // // // // // //         </div>
// // // // // // // // // // // // // // // // // // //       </body>
// // // // // // // // // // // // // // // // // // //     </html>
// // // // // // // // // // // // // // // // // // //   `;

// // // // // // // // // // // // // // // // // // //   try {
// // // // // // // // // // // // // // // // // // //     const info = await transporter.sendMail({
// // // // // // // // // // // // // // // // // // //       from: process.env.SMTP_FROM || process.env.SMTP_USER || 'noreply@business-os.com',
// // // // // // // // // // // // // // // // // // //       to: developerEmail,
// // // // // // // // // // // // // // // // // // //       subject: `⚠️ REWORK REQUIRED: ${taskTitle}`,
// // // // // // // // // // // // // // // // // // //       html: htmlContent
// // // // // // // // // // // // // // // // // // //     });

// // // // // // // // // // // // // // // // // // //     console.log('✅ Rework email sent:', info.messageId);
// // // // // // // // // // // // // // // // // // //     return true;
// // // // // // // // // // // // // // // // // // //   } catch (error: any) {
// // // // // // // // // // // // // // // // // // //     console.error('❌ Error sending rework email:', error.message);
// // // // // // // // // // // // // // // // // // //     return false;
// // // // // // // // // // // // // // // // // // //   }
// // // // // // // // // // // // // // // // // // // };

// // // // // // // // // // // // // // // // // // // export default transporter;
// // // // // // // // // // // // // // // // // // import nodemailer from 'nodemailer';
// // // // // // // // // // // // // // // // // // import dotenv from 'dotenv';

// // // // // // // // // // // // // // // // // // dotenv.config();

// // // // // // // // // // // // // // // // // // console.log('📧 Email Service Initializing...');
// // // // // // // // // // // // // // // // // // console.log('  SMTP_HOST:', process.env.SMTP_HOST || '❌ Not set');
// // // // // // // // // // // // // // // // // // console.log('  SMTP_PORT:', process.env.SMTP_PORT || '❌ Not set');
// // // // // // // // // // // // // // // // // // console.log('  SMTP_USER:', process.env.SMTP_USER ? '✅ Set' : '❌ Missing');
// // // // // // // // // // // // // // // // // // console.log('  SMTP_PASS:', process.env.SMTP_PASS ? '✅ Set' : '❌ Missing');

// // // // // // // // // // // // // // // // // // const hasValidCredentials = !!(process.env.SMTP_USER && process.env.SMTP_PASS);
// // // // // // // // // // // // // // // // // // let transporter: any;

// // // // // // // // // // // // // // // // // // if (hasValidCredentials) {
// // // // // // // // // // // // // // // // // //   transporter = nodemailer.createTransport({
// // // // // // // // // // // // // // // // // //     host: process.env.SMTP_HOST || 'smtp.gmail.com',
// // // // // // // // // // // // // // // // // //     port: parseInt(process.env.SMTP_PORT || '587'),
// // // // // // // // // // // // // // // // // //     secure: process.env.SMTP_SECURE === 'true',
// // // // // // // // // // // // // // // // // //     auth: {
// // // // // // // // // // // // // // // // // //       user: process.env.SMTP_USER || '',
// // // // // // // // // // // // // // // // // //       pass: process.env.SMTP_PASS || ''
// // // // // // // // // // // // // // // // // //     }
// // // // // // // // // // // // // // // // // //   });

// // // // // // // // // // // // // // // // // //   transporter.verify((error: Error | null, success: boolean) => {
// // // // // // // // // // // // // // // // // //     if (error) {
// // // // // // // // // // // // // // // // // //       console.error('❌ SMTP connection error:', error.message);
// // // // // // // // // // // // // // // // // //     } else {
// // // // // // // // // // // // // // // // // //       console.log('✅ SMTP server ready for sending emails');
// // // // // // // // // // // // // // // // // //     }
// // // // // // // // // // // // // // // // // //   });
// // // // // // // // // // // // // // // // // // } else {
// // // // // // // // // // // // // // // // // //   console.warn('⚠️ SMTP credentials missing - Email features will be disabled');
// // // // // // // // // // // // // // // // // //   transporter = {
// // // // // // // // // // // // // // // // // //     sendMail: (options: any) => {
// // // // // // // // // // // // // // // // // //       console.log('📧 [MOCK] Would send email to:', options.to);
// // // // // // // // // // // // // // // // // //       return Promise.resolve({ messageId: 'mock-' + Date.now() });
// // // // // // // // // // // // // // // // // //     },
// // // // // // // // // // // // // // // // // //     verify: (callback: any) => {
// // // // // // // // // // // // // // // // // //       callback(null, true);
// // // // // // // // // // // // // // // // // //       return Promise.resolve(true);
// // // // // // // // // // // // // // // // // //     }
// // // // // // // // // // // // // // // // // //   };
// // // // // // // // // // // // // // // // // // }

// // // // // // // // // // // // // // // // // // // ✅ FIXED: Accept object parameter instead of separate arguments
// // // // // // // // // // // // // // // // // // interface EmailParams {
// // // // // // // // // // // // // // // // // //   toEmail: string;      // Developer's email (from database)
// // // // // // // // // // // // // // // // // //   toName: string;       // Developer's name (from database)
// // // // // // // // // // // // // // // // // //   taskTitle: string;
// // // // // // // // // // // // // // // // // //   reworkNotes: string;
// // // // // // // // // // // // // // // // // //   fromName: string;     // Tester's name (from database)
// // // // // // // // // // // // // // // // // //   fromEmail: string;    // Tester's email (from database)
// // // // // // // // // // // // // // // // // // }

// // // // // // // // // // // // // // // // // // export const sendReworkRequestEmail = async (params: EmailParams): Promise<boolean> => {
// // // // // // // // // // // // // // // // // //   const { toEmail, toName, taskTitle, reworkNotes, fromName, fromEmail } = params;

// // // // // // // // // // // // // // // // // //   if (!hasValidCredentials) {
// // // // // // // // // // // // // // // // // //     console.warn('⚠️ Rework email skipped - SMTP not configured');
// // // // // // // // // // // // // // // // // //     console.log('📧 [MOCK] Would send email to:', toEmail);
// // // // // // // // // // // // // // // // // //     return false;
// // // // // // // // // // // // // // // // // //   }

// // // // // // // // // // // // // // // // // //   // ✅ Validate emails exist
// // // // // // // // // // // // // // // // // //   if (!toEmail || !fromEmail) {
// // // // // // // // // // // // // // // // // //     console.error('❌ Both sender and recipient emails are required');
// // // // // // // // // // // // // // // // // //     return false;
// // // // // // // // // // // // // // // // // //   }

// // // // // // // // // // // // // // // // // //   // ✅ Don't send if sender and recipient are the same
// // // // // // // // // // // // // // // // // //   if (toEmail === fromEmail) {
// // // // // // // // // // // // // // // // // //     console.warn('⚠️ Cannot send email: Sender and recipient have the same email address');
// // // // // // // // // // // // // // // // // //     return false;
// // // // // // // // // // // // // // // // // //   }

// // // // // // // // // // // // // // // // // //   const currentDate = new Date().toLocaleDateString('en-US', {
// // // // // // // // // // // // // // // // // //     weekday: 'long',
// // // // // // // // // // // // // // // // // //     year: 'numeric',
// // // // // // // // // // // // // // // // // //     month: 'long',
// // // // // // // // // // // // // // // // // //     day: 'numeric'
// // // // // // // // // // // // // // // // // //   });

// // // // // // // // // // // // // // // // // //   const htmlContent = `
// // // // // // // // // // // // // // // // // //     <!DOCTYPE html>
// // // // // // // // // // // // // // // // // //     <html>
// // // // // // // // // // // // // // // // // //       <head>
// // // // // // // // // // // // // // // // // //         <style>
// // // // // // // // // // // // // // // // // //           body { 
// // // // // // // // // // // // // // // // // //             font-family: 'Segoe UI', Arial, sans-serif; 
// // // // // // // // // // // // // // // // // //             color: #333; 
// // // // // // // // // // // // // // // // // //             background-color: #f9fafb;
// // // // // // // // // // // // // // // // // //             margin: 0;
// // // // // // // // // // // // // // // // // //             padding: 20px;
// // // // // // // // // // // // // // // // // //           }
// // // // // // // // // // // // // // // // // //           .container { 
// // // // // // // // // // // // // // // // // //             max-width: 600px; 
// // // // // // // // // // // // // // // // // //             margin: 0 auto; 
// // // // // // // // // // // // // // // // // //             padding: 20px; 
// // // // // // // // // // // // // // // // // //             background-color: #ffffff;
// // // // // // // // // // // // // // // // // //             border-radius: 12px;
// // // // // // // // // // // // // // // // // //             box-shadow: 0 2px 10px rgba(0,0,0,0.1);
// // // // // // // // // // // // // // // // // //           }
// // // // // // // // // // // // // // // // // //           .header { 
// // // // // // // // // // // // // // // // // //             background: linear-gradient(135deg, #f97316, #ea580c); 
// // // // // // // // // // // // // // // // // //             padding: 25px; 
// // // // // // // // // // // // // // // // // //             border-radius: 10px 10px 0 0; 
// // // // // // // // // // // // // // // // // //             margin: -20px -20px 20px -20px;
// // // // // // // // // // // // // // // // // //             text-align: center;
// // // // // // // // // // // // // // // // // //           }
// // // // // // // // // // // // // // // // // //           .header h2 { 
// // // // // // // // // // // // // // // // // //             margin: 0; 
// // // // // // // // // // // // // // // // // //             color: #ffffff; 
// // // // // // // // // // // // // // // // // //             font-size: 24px;
// // // // // // // // // // // // // // // // // //           }
// // // // // // // // // // // // // // // // // //           .header p {
// // // // // // // // // // // // // // // // // //             margin: 5px 0 0 0;
// // // // // // // // // // // // // // // // // //             color: #fef3c7;
// // // // // // // // // // // // // // // // // //             font-size: 14px;
// // // // // // // // // // // // // // // // // //           }
// // // // // // // // // // // // // // // // // //           .content { 
// // // // // // // // // // // // // // // // // //             padding: 0 10px; 
// // // // // // // // // // // // // // // // // //           }
// // // // // // // // // // // // // // // // // //           .task-details {
// // // // // // // // // // // // // // // // // //             background-color: #f8fafc;
// // // // // // // // // // // // // // // // // //             padding: 15px;
// // // // // // // // // // // // // // // // // //             border-radius: 8px;
// // // // // // // // // // // // // // // // // //             border-left: 4px solid #f97316;
// // // // // // // // // // // // // // // // // //             margin: 15px 0;
// // // // // // // // // // // // // // // // // //           }
// // // // // // // // // // // // // // // // // //           .task-details p {
// // // // // // // // // // // // // // // // // //             margin: 8px 0;
// // // // // // // // // // // // // // // // // //             font-size: 14px;
// // // // // // // // // // // // // // // // // //           }
// // // // // // // // // // // // // // // // // //           .task-details strong {
// // // // // // // // // // // // // // // // // //             color: #1e293b;
// // // // // // // // // // // // // // // // // //           }
// // // // // // // // // // // // // // // // // //           .notes { 
// // // // // // // // // // // // // // // // // //             background-color: #fef3c7; 
// // // // // // // // // // // // // // // // // //             padding: 15px; 
// // // // // // // // // // // // // // // // // //             border-radius: 8px; 
// // // // // // // // // // // // // // // // // //             margin: 15px 0; 
// // // // // // // // // // // // // // // // // //             border-left: 4px solid #f59e0b;
// // // // // // // // // // // // // // // // // //           }
// // // // // // // // // // // // // // // // // //           .notes strong {
// // // // // // // // // // // // // // // // // //             color: #92400e;
// // // // // // // // // // // // // // // // // //           }
// // // // // // // // // // // // // // // // // //           .notes p {
// // // // // // // // // // // // // // // // // //             margin: 8px 0 0 0;
// // // // // // // // // // // // // // // // // //             color: #78350f;
// // // // // // // // // // // // // // // // // //             white-space: pre-wrap;
// // // // // // // // // // // // // // // // // //           }
// // // // // // // // // // // // // // // // // //           .info-box {
// // // // // // // // // // // // // // // // // //             background-color: #f0f9ff;
// // // // // // // // // // // // // // // // // //             padding: 15px;
// // // // // // // // // // // // // // // // // //             border-radius: 8px;
// // // // // // // // // // // // // // // // // //             border-left: 4px solid #3b82f6;
// // // // // // // // // // // // // // // // // //             margin: 15px 0;
// // // // // // // // // // // // // // // // // //           }
// // // // // // // // // // // // // // // // // //           .info-box p {
// // // // // // // // // // // // // // // // // //             margin: 5px 0;
// // // // // // // // // // // // // // // // // //             font-size: 14px;
// // // // // // // // // // // // // // // // // //             color: #1e40af;
// // // // // // // // // // // // // // // // // //           }
// // // // // // // // // // // // // // // // // //           .sender-info {
// // // // // // // // // // // // // // // // // //             background-color: #f0fdf4;
// // // // // // // // // // // // // // // // // //             padding: 12px;
// // // // // // // // // // // // // // // // // //             border-radius: 8px;
// // // // // // // // // // // // // // // // // //             border-left: 4px solid #22c55e;
// // // // // // // // // // // // // // // // // //             margin: 15px 0;
// // // // // // // // // // // // // // // // // //             font-size: 14px;
// // // // // // // // // // // // // // // // // //           }
// // // // // // // // // // // // // // // // // //           .footer { 
// // // // // // // // // // // // // // // // // //             margin-top: 30px; 
// // // // // // // // // // // // // // // // // //             font-size: 12px; 
// // // // // // // // // // // // // // // // // //             color: #94a3b8; 
// // // // // // // // // // // // // // // // // //             border-top: 1px solid #e2e8f0; 
// // // // // // // // // // // // // // // // // //             padding-top: 20px; 
// // // // // // // // // // // // // // // // // //             text-align: center; 
// // // // // // // // // // // // // // // // // //           }
// // // // // // // // // // // // // // // // // //           .badge {
// // // // // // // // // // // // // // // // // //             display: inline-block;
// // // // // // // // // // // // // // // // // //             background-color: #f97316;
// // // // // // // // // // // // // // // // // //             color: white;
// // // // // // // // // // // // // // // // // //             padding: 4px 12px;
// // // // // // // // // // // // // // // // // //             border-radius: 20px;
// // // // // // // // // // // // // // // // // //             font-size: 12px;
// // // // // // // // // // // // // // // // // //             font-weight: bold;
// // // // // // // // // // // // // // // // // //           }
// // // // // // // // // // // // // // // // // //           .from-badge {
// // // // // // // // // // // // // // // // // //             display: inline-block;
// // // // // // // // // // // // // // // // // //             background-color: #22c55e;
// // // // // // // // // // // // // // // // // //             color: white;
// // // // // // // // // // // // // // // // // //             padding: 2px 10px;
// // // // // // // // // // // // // // // // // //             border-radius: 12px;
// // // // // // // // // // // // // // // // // //             font-size: 11px;
// // // // // // // // // // // // // // // // // //           }
// // // // // // // // // // // // // // // // // //         </style>
// // // // // // // // // // // // // // // // // //       </head>
// // // // // // // // // // // // // // // // // //       <body>
// // // // // // // // // // // // // // // // // //         <div class="container">
// // // // // // // // // // // // // // // // // //           <div class="header">
// // // // // // // // // // // // // // // // // //             <h2>⚠️ Rework Request</h2>
// // // // // // // // // // // // // // // // // //             <p>Task requires additional work</p>
// // // // // // // // // // // // // // // // // //           </div>
          
// // // // // // // // // // // // // // // // // //           <div class="content">
// // // // // // // // // // // // // // // // // //             <p>Hi <strong>${toName}</strong>,</p>
            
// // // // // // // // // // // // // // // // // //             <p>The task below requires rework and has been returned to you for further development.</p>
            
// // // // // // // // // // // // // // // // // //             <div class="task-details">
// // // // // // // // // // // // // // // // // //               <p><strong>📋 Task:</strong> ${taskTitle}</p>
// // // // // // // // // // // // // // // // // //               <p><strong>👤 Requested by:</strong> ${fromName}</p>
// // // // // // // // // // // // // // // // // //               <p><strong>📅 Date:</strong> ${currentDate}</p>
// // // // // // // // // // // // // // // // // //               <p><strong>📊 Status:</strong> <span class="badge">Rework Required</span></p>
// // // // // // // // // // // // // // // // // //             </div>

// // // // // // // // // // // // // // // // // //             <div class="sender-info">
// // // // // // // // // // // // // // // // // //               <p><strong>📧 From:</strong> ${fromName} (${fromEmail}) <span class="from-badge">Sender</span></p>
// // // // // // // // // // // // // // // // // //               <p style="margin: 0; font-size: 12px; color: #64748b;">
// // // // // // // // // // // // // // // // // //                 <em>Please reply directly to ${fromName} if you have questions.</em>
// // // // // // // // // // // // // // // // // //               </p>
// // // // // // // // // // // // // // // // // //             </div>
            
// // // // // // // // // // // // // // // // // //             <div class="notes">
// // // // // // // // // // // // // // // // // //               <strong>📝 Feedback from ${fromName}:</strong>
// // // // // // // // // // // // // // // // // //               <p>${reworkNotes}</p>
// // // // // // // // // // // // // // // // // //             </div>
            
// // // // // // // // // // // // // // // // // //             <div class="info-box">
// // // // // // // // // // // // // // // // // //               <p><strong>📌 Next Steps:</strong></p>
// // // // // // // // // // // // // // // // // //               <p>1️⃣ Review the feedback above</p>
// // // // // // // // // // // // // // // // // //               <p>2️⃣ Make the required changes</p>
// // // // // // // // // // // // // // // // // //               <p>3️⃣ Update task status to "In Progress"</p>
// // // // // // // // // // // // // // // // // //               <p>4️⃣ Submit for review when done</p>
// // // // // // // // // // // // // // // // // //             </div>

// // // // // // // // // // // // // // // // // //             <p style="font-size: 14px; color: #64748b;">
// // // // // // // // // // // // // // // // // //               <em>Please address these issues and update the task status when ready for re-testing.</em>
// // // // // // // // // // // // // // // // // //             </p>

// // // // // // // // // // // // // // // // // //             <p style="font-size: 13px; color: #64748b; background: #f8fafc; padding: 10px; border-radius: 6px;">
// // // // // // // // // // // // // // // // // //               <strong>💡 Need clarification?</strong> Reply directly to ${fromName} at ${fromEmail}.
// // // // // // // // // // // // // // // // // //             </p>
// // // // // // // // // // // // // // // // // //           </div>
          
// // // // // // // // // // // // // // // // // //           <div class="footer">
// // // // // // // // // // // // // // // // // //             <p>This is an automated notification from the Task Board System.</p>
// // // // // // // // // // // // // // // // // //             <p><strong>From:</strong> ${fromName} (${fromEmail})</p>
// // // // // // // // // // // // // // // // // //             <p><strong>To:</strong> ${toName} (${toEmail})</p>
// // // // // // // // // // // // // // // // // //             <p>&copy; ${new Date().getFullYear()} Business OS. All rights reserved.</p>
// // // // // // // // // // // // // // // // // //           </div>
// // // // // // // // // // // // // // // // // //         </div>
// // // // // // // // // // // // // // // // // //       </body>
// // // // // // // // // // // // // // // // // //     </html>
// // // // // // // // // // // // // // // // // //   `;

// // // // // // // // // // // // // // // // // //   try {
// // // // // // // // // // // // // // // // // //     // ✅ FROM = Tester's email (from database)
// // // // // // // // // // // // // // // // // //     // ✅ TO = Developer's email (from database)
// // // // // // // // // // // // // // // // // //     const info = await transporter.sendMail({
// // // // // // // // // // // // // // // // // //       from: fromEmail,        // ✅ FROM DATABASE - Tester's email
// // // // // // // // // // // // // // // // // //       to: toEmail,            // ✅ FROM DATABASE - Developer's email
// // // // // // // // // // // // // // // // // //       subject: `⚠️ REWORK REQUIRED: ${taskTitle} (from ${fromName})`,
// // // // // // // // // // // // // // // // // //       html: htmlContent,
// // // // // // // // // // // // // // // // // //       replyTo: fromEmail      // ✅ FROM DATABASE - Tester's email
// // // // // // // // // // // // // // // // // //     });

// // // // // // // // // // // // // // // // // //     console.log('✅ Rework request email sent successfully!');
// // // // // // // // // // // // // // // // // //     console.log('  From (Tester from DB):', fromEmail);
// // // // // // // // // // // // // // // // // //     console.log('  To (Developer from DB):', toEmail);
// // // // // // // // // // // // // // // // // //     console.log('  Message ID:', info.messageId);
// // // // // // // // // // // // // // // // // //     return true;
// // // // // // // // // // // // // // // // // //   } catch (error: any) {
// // // // // // // // // // // // // // // // // //     console.error('❌ Error sending rework request email:', error.message);
// // // // // // // // // // // // // // // // // //     return false;
// // // // // // // // // // // // // // // // // //   }
// // // // // // // // // // // // // // // // // // };

// // // // // // // // // // // // // // // // // // export default transporter;
// // // // // // // // // // // // // // // // // import nodemailer from 'nodemailer';
// // // // // // // // // // // // // // // // // import dotenv from 'dotenv';

// // // // // // // // // // // // // // // // // dotenv.config();

// // // // // // // // // // // // // // // // // const SMTP_USER = process.env.SMTP_USER || '';
// // // // // // // // // // // // // // // // // const SMTP_PASS = process.env.SMTP_PASS || '';
// // // // // // // // // // // // // // // // // const SMTP_FROM = process.env.SMTP_FROM || SMTP_USER || 'noreply@business-os.com';

// // // // // // // // // // // // // // // // // console.log('📧 Email Service:');
// // // // // // // // // // // // // // // // // console.log('  SMTP_USER:', SMTP_USER ? '✅ Set' : '❌ Missing');
// // // // // // // // // // // // // // // // // console.log('  SMTP_FROM:', SMTP_FROM);

// // // // // // // // // // // // // // // // // const hasValidCredentials = !!(SMTP_USER && SMTP_PASS);
// // // // // // // // // // // // // // // // // let transporter: any;

// // // // // // // // // // // // // // // // // if (hasValidCredentials) {
// // // // // // // // // // // // // // // // //   transporter = nodemailer.createTransport({
// // // // // // // // // // // // // // // // //     host: process.env.SMTP_HOST || 'smtp.gmail.com',
// // // // // // // // // // // // // // // // //     port: parseInt(process.env.SMTP_PORT || '587'),
// // // // // // // // // // // // // // // // //     secure: process.env.SMTP_SECURE === 'true',
// // // // // // // // // // // // // // // // //     auth: {
// // // // // // // // // // // // // // // // //       user: SMTP_USER,
// // // // // // // // // // // // // // // // //       pass: SMTP_PASS
// // // // // // // // // // // // // // // // //     }
// // // // // // // // // // // // // // // // //   });

// // // // // // // // // // // // // // // // //   transporter.verify((error: Error | null, success: boolean) => {
// // // // // // // // // // // // // // // // //     if (error) {
// // // // // // // // // // // // // // // // //       console.error('❌ SMTP connection error:', error.message);
// // // // // // // // // // // // // // // // //     } else {
// // // // // // // // // // // // // // // // //       console.log('✅ SMTP server ready');
// // // // // // // // // // // // // // // // //     }
// // // // // // // // // // // // // // // // //   });
// // // // // // // // // // // // // // // // // } else {
// // // // // // // // // // // // // // // // //   console.warn('⚠️ SMTP credentials missing');
// // // // // // // // // // // // // // // // //   transporter = {
// // // // // // // // // // // // // // // // //     sendMail: (options: any) => {
// // // // // // // // // // // // // // // // //       console.log('📧 [MOCK] Would send email to:', options.to);
// // // // // // // // // // // // // // // // //       return Promise.resolve({ messageId: 'mock-' + Date.now() });
// // // // // // // // // // // // // // // // //     },
// // // // // // // // // // // // // // // // //     verify: (callback: any) => {
// // // // // // // // // // // // // // // // //       callback(null, true);
// // // // // // // // // // // // // // // // //       return Promise.resolve(true);
// // // // // // // // // // // // // // // // //     }
// // // // // // // // // // // // // // // // //   };
// // // // // // // // // // // // // // // // // }

// // // // // // // // // // // // // // // // // interface EmailParams {
// // // // // // // // // // // // // // // // //   toEmail: string;
// // // // // // // // // // // // // // // // //   toName: string;
// // // // // // // // // // // // // // // // //   taskTitle: string;
// // // // // // // // // // // // // // // // //   reworkNotes: string;
// // // // // // // // // // // // // // // // //   fromName: string;
// // // // // // // // // // // // // // // // //   fromEmail: string;
// // // // // // // // // // // // // // // // // }

// // // // // // // // // // // // // // // // // export const sendReworkRequestEmail = async (params: EmailParams): Promise<boolean> => {
// // // // // // // // // // // // // // // // //   const { toEmail, toName, taskTitle, reworkNotes, fromName, fromEmail } = params;

// // // // // // // // // // // // // // // // //   if (!hasValidCredentials) {
// // // // // // // // // // // // // // // // //     console.warn('⚠️ Rework email skipped - SMTP not configured');
// // // // // // // // // // // // // // // // //     return false;
// // // // // // // // // // // // // // // // //   }

// // // // // // // // // // // // // // // // //   if (!toEmail) {
// // // // // // // // // // // // // // // // //     console.error('❌ Developer email is required');
// // // // // // // // // // // // // // // // //     return false;
// // // // // // // // // // // // // // // // //   }

// // // // // // // // // // // // // // // // //   console.log('📧 Sending email:');
// // // // // // // // // // // // // // // // //   console.log('  FROM (SMTP):', SMTP_FROM);
// // // // // // // // // // // // // // // // //   console.log('  TO (Developer):', toEmail);

// // // // // // // // // // // // // // // // //   const htmlContent = `
// // // // // // // // // // // // // // // // //     <!DOCTYPE html>
// // // // // // // // // // // // // // // // //     <html>
// // // // // // // // // // // // // // // // //       <head>
// // // // // // // // // // // // // // // // //         <style>
// // // // // // // // // // // // // // // // //           body { font-family: Arial, sans-serif; color: #333; }
// // // // // // // // // // // // // // // // //           .container { max-width: 600px; margin: 0 auto; padding: 20px; background: #fff; border-radius: 10px; }
// // // // // // // // // // // // // // // // //           .header { background: #f97316; padding: 20px; border-radius: 10px 10px 0 0; color: white; text-align: center; }
// // // // // // // // // // // // // // // // //           .content { padding: 20px; }
// // // // // // // // // // // // // // // // //           .notes { background: #fef3c7; padding: 15px; border-left: 4px solid #f59e0b; margin: 15px 0; }
// // // // // // // // // // // // // // // // //           .footer { text-align: center; padding: 10px; color: #666; font-size: 12px; }
// // // // // // // // // // // // // // // // //         </style>
// // // // // // // // // // // // // // // // //       </head>
// // // // // // // // // // // // // // // // //       <body>
// // // // // // // // // // // // // // // // //         <div class="container">
// // // // // // // // // // // // // // // // //           <div class="header">
// // // // // // // // // // // // // // // // //             <h2>⚠️ Rework Request</h2>
// // // // // // // // // // // // // // // // //           </div>
// // // // // // // // // // // // // // // // //           <div class="content">
// // // // // // // // // // // // // // // // //             <p>Hi <strong>${toName}</strong>,</p>
// // // // // // // // // // // // // // // // //             <p>The task "<strong>${taskTitle}</strong>" requires rework.</p>
// // // // // // // // // // // // // // // // //             <p><strong>Requested by:</strong> ${fromName} (${fromEmail})</p>
// // // // // // // // // // // // // // // // //             <div class="notes">
// // // // // // // // // // // // // // // // //               <strong>📝 Feedback:</strong>
// // // // // // // // // // // // // // // // //               <p>${reworkNotes}</p>
// // // // // // // // // // // // // // // // //             </div>
// // // // // // // // // // // // // // // // //             <p>Please fix the issues and update the task status.</p>
// // // // // // // // // // // // // // // // //           </div>
// // // // // // // // // // // // // // // // //           <div class="footer">
// // // // // // // // // // // // // // // // //             <p>This is an automated notification from Business OS</p>
// // // // // // // // // // // // // // // // //             <p>&copy; ${new Date().getFullYear()} Business OS</p>
// // // // // // // // // // // // // // // // //           </div>
// // // // // // // // // // // // // // // // //         </div>
// // // // // // // // // // // // // // // // //       </body>
// // // // // // // // // // // // // // // // //     </html>
// // // // // // // // // // // // // // // // //   `;

// // // // // // // // // // // // // // // // //   try {
// // // // // // // // // // // // // // // // //     const info = await transporter.sendMail({
// // // // // // // // // // // // // // // // //       from: SMTP_FROM,        // ✅ ALWAYS SMTP user
// // // // // // // // // // // // // // // // //       to: toEmail,            // ✅ Developer email from database
// // // // // // // // // // // // // // // // //       subject: `⚠️ REWORK REQUIRED: ${taskTitle}`,
// // // // // // // // // // // // // // // // //       html: htmlContent,
// // // // // // // // // // // // // // // // //       replyTo: fromEmail      // Tester email for replies
// // // // // // // // // // // // // // // // //     });

// // // // // // // // // // // // // // // // //     console.log('✅ Email sent successfully to:', toEmail);
// // // // // // // // // // // // // // // // //     return true;
// // // // // // // // // // // // // // // // //   } catch (error: any) {
// // // // // // // // // // // // // // // // //     console.error('❌ Error sending email:', error.message);
// // // // // // // // // // // // // // // // //     return false;
// // // // // // // // // // // // // // // // //   }
// // // // // // // // // // // // // // // // // };

// // // // // // // // // // // // // // // // // export default transporter;
// // // // // // // // // // // // // // // // // services/emailService.ts
// // // // // // // // // // // // // // // // import nodemailer from 'nodemailer';
// // // // // // // // // // // // // // // // import dotenv from 'dotenv';

// // // // // // // // // // // // // // // // dotenv.config();

// // // // // // // // // // // // // // // // // ✅ ALWAYS use this as FROM address
// // // // // // // // // // // // // // // // const SMTP_USER = 'subasrimuthumanickam@gmail.com';
// // // // // // // // // // // // // // // // const SMTP_PASS = 'paue kgwm tgub vynt';
// // // // // // // // // // // // // // // // const SMTP_FROM = SMTP_USER;

// // // // // // // // // // // // // // // // console.log('📧 Email Service:');
// // // // // // // // // // // // // // // // console.log('  SMTP FROM:', SMTP_FROM);

// // // // // // // // // // // // // // // // const hasValidCredentials = !!(SMTP_USER && SMTP_PASS);
// // // // // // // // // // // // // // // // let transporter: any;

// // // // // // // // // // // // // // // // if (hasValidCredentials) {
// // // // // // // // // // // // // // // //   transporter = nodemailer.createTransport({
// // // // // // // // // // // // // // // //     host: 'smtp.gmail.com',
// // // // // // // // // // // // // // // //     port: 587,
// // // // // // // // // // // // // // // //     secure: false,
// // // // // // // // // // // // // // // //     auth: {
// // // // // // // // // // // // // // // //       user: SMTP_USER,
// // // // // // // // // // // // // // // //       pass: SMTP_PASS
// // // // // // // // // // // // // // // //     }
// // // // // // // // // // // // // // // //   });

// // // // // // // // // // // // // // // //   transporter.verify((error: Error | null, success: boolean) => {
// // // // // // // // // // // // // // // //     if (error) {
// // // // // // // // // // // // // // // //       console.error('❌ SMTP connection error:', error.message);
// // // // // // // // // // // // // // // //     } else {
// // // // // // // // // // // // // // // //       console.log('✅ SMTP server ready');
// // // // // // // // // // // // // // // //     }
// // // // // // // // // // // // // // // //   });
// // // // // // // // // // // // // // // // } else {
// // // // // // // // // // // // // // // //   console.warn('⚠️ SMTP credentials missing');
// // // // // // // // // // // // // // // //   transporter = {
// // // // // // // // // // // // // // // //     sendMail: (options: any) => {
// // // // // // // // // // // // // // // //       console.log('📧 [MOCK] Would send email to:', options.to);
// // // // // // // // // // // // // // // //       return Promise.resolve({ messageId: 'mock-' + Date.now() });
// // // // // // // // // // // // // // // //     },
// // // // // // // // // // // // // // // //     verify: (callback: any) => {
// // // // // // // // // // // // // // // //       callback(null, true);
// // // // // // // // // // // // // // // //       return Promise.resolve(true);
// // // // // // // // // // // // // // // //     }
// // // // // // // // // // // // // // // //   };
// // // // // // // // // // // // // // // // }

// // // // // // // // // // // // // // // // interface EmailParams {
// // // // // // // // // // // // // // // //   toEmail: string;
// // // // // // // // // // // // // // // //   toName: string;
// // // // // // // // // // // // // // // //   taskTitle: string;
// // // // // // // // // // // // // // // //   reworkNotes: string;
// // // // // // // // // // // // // // // //   fromName: string;
// // // // // // // // // // // // // // // //   fromEmail: string;
// // // // // // // // // // // // // // // // }

// // // // // // // // // // // // // // // // export const sendReworkRequestEmail = async (params: EmailParams): Promise<boolean> => {
// // // // // // // // // // // // // // // //   const { toEmail, toName, taskTitle, reworkNotes, fromName, fromEmail } = params;

// // // // // // // // // // // // // // // //   if (!hasValidCredentials) {
// // // // // // // // // // // // // // // //     console.warn('⚠️ Rework email skipped - SMTP not configured');
// // // // // // // // // // // // // // // //     return false;
// // // // // // // // // // // // // // // //   }

// // // // // // // // // // // // // // // //   if (!toEmail) {
// // // // // // // // // // // // // // // //     console.error('❌ Developer email is required');
// // // // // // // // // // // // // // // //     return false;
// // // // // // // // // // // // // // // //   }

// // // // // // // // // // // // // // // //   console.log('📧 Sending email:');
// // // // // // // // // // // // // // // //   console.log('  FROM (SMTP):', SMTP_FROM);
// // // // // // // // // // // // // // // //   console.log('  TO (Developer):', toEmail);

// // // // // // // // // // // // // // // //   const htmlContent = `
// // // // // // // // // // // // // // // //     <!DOCTYPE html>
// // // // // // // // // // // // // // // //     <html>
// // // // // // // // // // // // // // // //       <head>
// // // // // // // // // // // // // // // //         <style>
// // // // // // // // // // // // // // // //           body { font-family: Arial, sans-serif; color: #333; }
// // // // // // // // // // // // // // // //           .container { max-width: 600px; margin: 0 auto; padding: 20px; background: #fff; border-radius: 10px; }
// // // // // // // // // // // // // // // //           .header { background: #f97316; padding: 20px; border-radius: 10px 10px 0 0; color: white; text-align: center; }
// // // // // // // // // // // // // // // //           .content { padding: 20px; }
// // // // // // // // // // // // // // // //           .notes { background: #fef3c7; padding: 15px; border-left: 4px solid #f59e0b; margin: 15px 0; }
// // // // // // // // // // // // // // // //           .footer { text-align: center; padding: 10px; color: #666; font-size: 12px; }
// // // // // // // // // // // // // // // //         </style>
// // // // // // // // // // // // // // // //       </head>
// // // // // // // // // // // // // // // //       <body>
// // // // // // // // // // // // // // // //         <div class="container">
// // // // // // // // // // // // // // // //           <div class="header">
// // // // // // // // // // // // // // // //             <h2>⚠️ Rework Request</h2>
// // // // // // // // // // // // // // // //           </div>
// // // // // // // // // // // // // // // //           <div class="content">
// // // // // // // // // // // // // // // //             <p>Hi <strong>${toName}</strong>,</p>
// // // // // // // // // // // // // // // //             <p>The task "<strong>${taskTitle}</strong>" requires rework.</p>
// // // // // // // // // // // // // // // //             <p><strong>Requested by:</strong> ${fromName} (${fromEmail})</p>
// // // // // // // // // // // // // // // //             <div class="notes">
// // // // // // // // // // // // // // // //               <strong>📝 Feedback:</strong>
// // // // // // // // // // // // // // // //               <p>${reworkNotes}</p>
// // // // // // // // // // // // // // // //             </div>
// // // // // // // // // // // // // // // //             <p>Please fix the issues and update the task status.</p>
// // // // // // // // // // // // // // // //           </div>
// // // // // // // // // // // // // // // //           <div class="footer">
// // // // // // // // // // // // // // // //             <p>This is an automated notification from Business OS</p>
// // // // // // // // // // // // // // // //             <p>&copy; ${new Date().getFullYear()} Business OS</p>
// // // // // // // // // // // // // // // //           </div>
// // // // // // // // // // // // // // // //         </div>
// // // // // // // // // // // // // // // //       </body>
// // // // // // // // // // // // // // // //     </html>
// // // // // // // // // // // // // // // //   `;

// // // // // // // // // // // // // // // //   try {
// // // // // // // // // // // // // // // //     const info = await transporter.sendMail({
// // // // // // // // // // // // // // // //       from: SMTP_FROM,        // ✅ ALWAYS subasrimuthumanickam@gmail.com
// // // // // // // // // // // // // // // //       to: toEmail,            // ✅ Developer email from database
// // // // // // // // // // // // // // // //       subject: `⚠️ REWORK REQUIRED: ${taskTitle}`,
// // // // // // // // // // // // // // // //       html: htmlContent,
// // // // // // // // // // // // // // // //       replyTo: fromEmail      // Tester email for replies
// // // // // // // // // // // // // // // //     });

// // // // // // // // // // // // // // // //     console.log('✅ Email sent successfully to:', toEmail);
// // // // // // // // // // // // // // // //     return true;
// // // // // // // // // // // // // // // //   } catch (error: any) {
// // // // // // // // // // // // // // // //     console.error('❌ Error sending email:', error.message);
// // // // // // // // // // // // // // // //     return false;
// // // // // // // // // // // // // // // //   }
// // // // // // // // // // // // // // // // };

// // // // // // // // // // // // // // // // export default transporter;
// // // // // // // // // // // // // // // import nodemailer from 'nodemailer';
// // // // // // // // // // // // // // // import dotenv from 'dotenv';

// // // // // // // // // // // // // // // dotenv.config();

// // // // // // // // // // // // // // // // ✅ ALWAYS use this as FROM address (SMTP user)
// // // // // // // // // // // // // // // const SMTP_USER = process.env.SMTP_USER || 'subasrimuthumanickam@gmail.com';
// // // // // // // // // // // // // // // const SMTP_PASS = process.env.SMTP_PASS || '';
// // // // // // // // // // // // // // // const SMTP_FROM = SMTP_USER; // Always use SMTP user as FROM

// // // // // // // // // // // // // // // console.log('📧 Email Service Initialized:');
// // // // // // // // // // // // // // // console.log('  FROM Address:', SMTP_FROM);

// // // // // // // // // // // // // // // const hasValidCredentials = !!(SMTP_USER && SMTP_PASS);
// // // // // // // // // // // // // // // let transporter: any;

// // // // // // // // // // // // // // // if (hasValidCredentials) {
// // // // // // // // // // // // // // //   transporter = nodemailer.createTransport({
// // // // // // // // // // // // // // //     host: process.env.SMTP_HOST || 'smtp.gmail.com',
// // // // // // // // // // // // // // //     port: parseInt(process.env.SMTP_PORT || '587'),
// // // // // // // // // // // // // // //     secure: process.env.SMTP_SECURE === 'true',
// // // // // // // // // // // // // // //     auth: {
// // // // // // // // // // // // // // //       user: SMTP_USER,
// // // // // // // // // // // // // // //       pass: SMTP_PASS
// // // // // // // // // // // // // // //     }
// // // // // // // // // // // // // // //   });

// // // // // // // // // // // // // // //   // Verify connection
// // // // // // // // // // // // // // //   transporter.verify((error: Error | null, success: boolean) => {
// // // // // // // // // // // // // // //     if (error) {
// // // // // // // // // // // // // // //       console.error('❌ SMTP connection error:', error.message);
// // // // // // // // // // // // // // //     } else {
// // // // // // // // // // // // // // //       console.log('✅ SMTP server ready');
// // // // // // // // // // // // // // //     }
// // // // // // // // // // // // // // //   });
// // // // // // // // // // // // // // // } else {
// // // // // // // // // // // // // // //   console.warn('⚠️ SMTP credentials missing - Email features disabled');
// // // // // // // // // // // // // // //   transporter = {
// // // // // // // // // // // // // // //     sendMail: (options: any) => {
// // // // // // // // // // // // // // //       console.log('📧 [MOCK] Would send email to:', options.to);
// // // // // // // // // // // // // // //       return Promise.resolve({ messageId: 'mock-' + Date.now() });
// // // // // // // // // // // // // // //     },
// // // // // // // // // // // // // // //     verify: (callback: any) => {
// // // // // // // // // // // // // // //       callback(null, true);
// // // // // // // // // // // // // // //       return Promise.resolve(true);
// // // // // // // // // // // // // // //     }
// // // // // // // // // // // // // // //   };
// // // // // // // // // // // // // // // }

// // // // // // // // // // // // // // // interface EmailParams {
// // // // // // // // // // // // // // //   toEmail: string;      // Developer's email
// // // // // // // // // // // // // // //   toName: string;       // Developer's name
// // // // // // // // // // // // // // //   taskTitle: string;
// // // // // // // // // // // // // // //   reworkNotes: string;
// // // // // // // // // // // // // // //   fromName: string;     // Tester's name
// // // // // // // // // // // // // // //   fromEmail: string;    // Tester's email (for reply-to)
// // // // // // // // // // // // // // // }

// // // // // // // // // // // // // // // export const sendReworkRequestEmail = async (params: EmailParams): Promise<boolean> => {
// // // // // // // // // // // // // // //   const { toEmail, toName, taskTitle, reworkNotes, fromName, fromEmail } = params;

// // // // // // // // // // // // // // //   // Check credentials
// // // // // // // // // // // // // // //   if (!hasValidCredentials) {
// // // // // // // // // // // // // // //     console.warn('⚠️ Rework email skipped - SMTP not configured');
// // // // // // // // // // // // // // //     return false;
// // // // // // // // // // // // // // //   }

// // // // // // // // // // // // // // //   // Validate recipient
// // // // // // // // // // // // // // //   if (!toEmail) {
// // // // // // // // // // // // // // //     console.error('❌ Developer email is required');
// // // // // // // // // // // // // // //     return false;
// // // // // // // // // // // // // // //   }

// // // // // // // // // // // // // // //   console.log('📧 Sending rework email:');
// // // // // // // // // // // // // // //   console.log('  FROM (SMTP):', SMTP_FROM);
// // // // // // // // // // // // // // //   console.log('  TO (Developer):', toEmail);
// // // // // // // // // // // // // // //   console.log('  REPLY-TO:', fromEmail);

// // // // // // // // // // // // // // //   const currentDate = new Date().toLocaleDateString('en-US', {
// // // // // // // // // // // // // // //     weekday: 'long',
// // // // // // // // // // // // // // //     year: 'numeric',
// // // // // // // // // // // // // // //     month: 'long',
// // // // // // // // // // // // // // //     day: 'numeric'
// // // // // // // // // // // // // // //   });

// // // // // // // // // // // // // // //   const htmlContent = `
// // // // // // // // // // // // // // //     <!DOCTYPE html>
// // // // // // // // // // // // // // //     <html>
// // // // // // // // // // // // // // //       <head>
// // // // // // // // // // // // // // //         <style>
// // // // // // // // // // // // // // //           body { font-family: 'Segoe UI', Arial, sans-serif; color: #333; background-color: #f9fafb; margin: 0; padding: 20px; }
// // // // // // // // // // // // // // //           .container { max-width: 600px; margin: 0 auto; padding: 20px; background-color: #ffffff; border-radius: 12px; box-shadow: 0 2px 10px rgba(0,0,0,0.1); }
// // // // // // // // // // // // // // //           .header { background: linear-gradient(135deg, #f97316, #ea580c); padding: 25px; border-radius: 10px 10px 0 0; margin: -20px -20px 20px -20px; text-align: center; }
// // // // // // // // // // // // // // //           .header h2 { margin: 0; color: #ffffff; font-size: 24px; }
// // // // // // // // // // // // // // //           .header p { margin: 5px 0 0 0; color: #fef3c7; font-size: 14px; }
// // // // // // // // // // // // // // //           .content { padding: 0 10px; }
// // // // // // // // // // // // // // //           .task-details { background-color: #f8fafc; padding: 15px; border-radius: 8px; border-left: 4px solid #f97316; margin: 15px 0; }
// // // // // // // // // // // // // // //           .task-details p { margin: 8px 0; font-size: 14px; }
// // // // // // // // // // // // // // //           .task-details strong { color: #1e293b; }
// // // // // // // // // // // // // // //           .notes { background-color: #fef3c7; padding: 15px; border-radius: 8px; margin: 15px 0; border-left: 4px solid #f59e0b; }
// // // // // // // // // // // // // // //           .notes strong { color: #92400e; }
// // // // // // // // // // // // // // //           .notes p { margin: 8px 0 0 0; color: #78350f; white-space: pre-wrap; }
// // // // // // // // // // // // // // //           .sender-info { background-color: #f0fdf4; padding: 12px; border-radius: 8px; border-left: 4px solid #22c55e; margin: 15px 0; font-size: 14px; }
// // // // // // // // // // // // // // //           .sender-info p { margin: 5px 0; }
// // // // // // // // // // // // // // //           .badge { display: inline-block; background-color: #f97316; color: white; padding: 4px 12px; border-radius: 20px; font-size: 12px; font-weight: bold; }
// // // // // // // // // // // // // // //           .footer { margin-top: 30px; font-size: 12px; color: #94a3b8; border-top: 1px solid #e2e8f0; padding-top: 20px; text-align: center; }
// // // // // // // // // // // // // // //         </style>
// // // // // // // // // // // // // // //       </head>
// // // // // // // // // // // // // // //       <body>
// // // // // // // // // // // // // // //         <div class="container">
// // // // // // // // // // // // // // //           <div class="header">
// // // // // // // // // // // // // // //             <h2>⚠️ Rework Request</h2>
// // // // // // // // // // // // // // //             <p>Task requires additional development</p>
// // // // // // // // // // // // // // //           </div>
          
// // // // // // // // // // // // // // //           <div class="content">
// // // // // // // // // // // // // // //             <p>Hi <strong>${toName}</strong>,</p>
            
// // // // // // // // // // // // // // //             <p>The task below requires rework and has been returned to you for further development.</p>
            
// // // // // // // // // // // // // // //             <div class="task-details">
// // // // // // // // // // // // // // //               <p><strong>📋 Task:</strong> ${taskTitle}</p>
// // // // // // // // // // // // // // //               <p><strong>👤 Requested by:</strong> ${fromName}</p>
// // // // // // // // // // // // // // //               <p><strong>📅 Date:</strong> ${currentDate}</p>
// // // // // // // // // // // // // // //               <p><strong>📊 Status:</strong> <span class="badge">Rework Required</span></p>
// // // // // // // // // // // // // // //             </div>

// // // // // // // // // // // // // // //             <div class="sender-info">
// // // // // // // // // // // // // // //               <p><strong>📧 From:</strong> ${fromName} (${fromEmail})</p>
// // // // // // // // // // // // // // //               <p style="margin: 0; font-size: 12px; color: #64748b;">
// // // // // // // // // // // // // // //                 <em>Please reply directly to ${fromName} if you have questions.</em>
// // // // // // // // // // // // // // //               </p>
// // // // // // // // // // // // // // //             </div>
            
// // // // // // // // // // // // // // //             <div class="notes">
// // // // // // // // // // // // // // //               <strong>📝 Feedback from ${fromName}:</strong>
// // // // // // // // // // // // // // //               <p>${reworkNotes}</p>
// // // // // // // // // // // // // // //             </div>

// // // // // // // // // // // // // // //             <p style="font-size: 14px; color: #64748b;">
// // // // // // // // // // // // // // //               <em>Please address these issues and update the task status when ready for re-testing.</em>
// // // // // // // // // // // // // // //             </p>
// // // // // // // // // // // // // // //           </div>
          
// // // // // // // // // // // // // // //           <div class="footer">
// // // // // // // // // // // // // // //             <p><strong>From:</strong> ${fromName} (${fromEmail})</p>
// // // // // // // // // // // // // // //             <p><strong>To:</strong> ${toName} (${toEmail})</p>
// // // // // // // // // // // // // // //             <p>&copy; ${new Date().getFullYear()} Business OS. All rights reserved.</p>
// // // // // // // // // // // // // // //           </div>
// // // // // // // // // // // // // // //         </div>
// // // // // // // // // // // // // // //       </body>
// // // // // // // // // // // // // // //     </html>
// // // // // // // // // // // // // // //   `;

// // // // // // // // // // // // // // //   try {
// // // // // // // // // // // // // // //     // ✅ FROM = SMTP_USER (subasrimuthumanickam@gmail.com)
// // // // // // // // // // // // // // //     // ✅ TO = Developer's email from database
// // // // // // // // // // // // // // //     // ✅ REPLY-TO = Tester's email
// // // // // // // // // // // // // // //     const info = await transporter.sendMail({
// // // // // // // // // // // // // // //       from: SMTP_FROM,        // ✅ ALWAYS subasrimuthumanickam@gmail.com
// // // // // // // // // // // // // // //       to: toEmail,            // ✅ Developer email from database
// // // // // // // // // // // // // // //       subject: `⚠️ REWORK REQUIRED: ${taskTitle} (from ${fromName})`,
// // // // // // // // // // // // // // //       html: htmlContent,
// // // // // // // // // // // // // // //       replyTo: fromEmail      // ✅ Tester email for replies
// // // // // // // // // // // // // // //     });

// // // // // // // // // // // // // // //     console.log('✅ Email sent successfully!');
// // // // // // // // // // // // // // //     console.log('  From:', SMTP_FROM);
// // // // // // // // // // // // // // //     console.log('  To:', toEmail);
// // // // // // // // // // // // // // //     console.log('  Reply-To:', fromEmail);
// // // // // // // // // // // // // // //     return true;
// // // // // // // // // // // // // // //   } catch (error: any) {
// // // // // // // // // // // // // // //     console.error('❌ Error sending email:', error.message);
// // // // // // // // // // // // // // //     return false;
// // // // // // // // // // // // // // //   }
// // // // // // // // // // // // // // // };

// // // // // // // // // // // // // // // export default transporter;
// // // // // // // // // // // // // // import nodemailer from 'nodemailer';
// // // // // // // // // // // // // // import dotenv from 'dotenv';

// // // // // // // // // // // // // // dotenv.config();

// // // // // // // // // // // // // // // ✅ Get SMTP from environment
// // // // // // // // // // // // // // const SMTP_USER = process.env.SMTP_USER || 'subasrimuthumanickam@gmail.com';
// // // // // // // // // // // // // // const SMTP_PASS = process.env.SMTP_PASS || '';
// // // // // // // // // // // // // // const SMTP_FROM = SMTP_USER;

// // // // // // // // // // // // // // console.log('📧 Email Service Initialized:');
// // // // // // // // // // // // // // console.log('  FROM Address:', SMTP_FROM);
// // // // // // // // // // // // // // console.log('  SMTP User:', SMTP_USER ? '✅ Set' : '❌ Missing');

// // // // // // // // // // // // // // let transporter: any;
// // // // // // // // // // // // // // let isConnected = false;

// // // // // // // // // // // // // // if (SMTP_USER && SMTP_PASS) {
// // // // // // // // // // // // // //   transporter = nodemailer.createTransport({
// // // // // // // // // // // // // //     host: process.env.SMTP_HOST || 'smtp.gmail.com',
// // // // // // // // // // // // // //     port: parseInt(process.env.SMTP_PORT || '587'),
// // // // // // // // // // // // // //     secure: process.env.SMTP_SECURE === 'true',
// // // // // // // // // // // // // //     auth: {
// // // // // // // // // // // // // //       user: SMTP_USER,
// // // // // // // // // // // // // //       pass: SMTP_PASS
// // // // // // // // // // // // // //     }
// // // // // // // // // // // // // //   });

// // // // // // // // // // // // // //   transporter.verify((error: Error | null, success: boolean) => {
// // // // // // // // // // // // // //     if (error) {
// // // // // // // // // // // // // //       console.error('❌ SMTP connection error:', error.message);
// // // // // // // // // // // // // //     } else {
// // // // // // // // // // // // // //       console.log('✅ SMTP server ready');
// // // // // // // // // // // // // //     }
// // // // // // // // // // // // // //   });
// // // // // // // // // // // // // // } else {
// // // // // // // // // // // // // //   console.warn('⚠️ SMTP credentials missing - Email features disabled');
// // // // // // // // // // // // // //   transporter = {
// // // // // // // // // // // // // //     sendMail: (options: any) => {
// // // // // // // // // // // // // //       console.log('📧 [MOCK] Would send email to:', options.to);
// // // // // // // // // // // // // //       return Promise.resolve({ messageId: 'mock-' + Date.now() });
// // // // // // // // // // // // // //     }
// // // // // // // // // // // // // //   };
// // // // // // // // // // // // // // }

// // // // // // // // // // // // // // interface EmailParams {
// // // // // // // // // // // // // //   toEmail: string;        // Developer's email (from database)
// // // // // // // // // // // // // //   toName: string;         // Developer's name (from database)
// // // // // // // // // // // // // //   taskTitle: string;      // Task title (from database)
// // // // // // // // // // // // // //   reworkNotes: string;    // Rework notes (from user input)
// // // // // // // // // // // // // //   fromName: string;       // Tester's name (from database - logged in user)
// // // // // // // // // // // // // //   fromEmail: string;      // Tester's email (from database - logged in user)
// // // // // // // // // // // // // //   taskId?: string;        // Optional task ID
// // // // // // // // // // // // // //   projectName?: string;   // Optional project name
// // // // // // // // // // // // // // }

// // // // // // // // // // // // // // export const sendReworkRequestEmail = async (params: EmailParams): Promise<boolean> => {
// // // // // // // // // // // // // //   const { 
// // // // // // // // // // // // // //     toEmail, 
// // // // // // // // // // // // // //     toName, 
// // // // // // // // // // // // // //     taskTitle, 
// // // // // // // // // // // // // //     reworkNotes, 
// // // // // // // // // // // // // //     fromName, 
// // // // // // // // // // // // // //     fromEmail,
// // // // // // // // // // // // // //     taskId,
// // // // // // // // // // // // // //     projectName 
// // // // // // // // // // // // // //   } = params;

// // // // // // // // // // // // // //   // Check credentials
// // // // // // // // // // // // // //   if (!SMTP_USER || !SMTP_PASS) {
// // // // // // // // // // // // // //     console.warn('⚠️ Rework email skipped - SMTP not configured');
// // // // // // // // // // // // // //     return false;
// // // // // // // // // // // // // //   }

// // // // // // // // // // // // // //   // Validate recipient
// // // // // // // // // // // // // //   if (!toEmail) {
// // // // // // // // // // // // // //     console.error('❌ Developer email is required');
// // // // // // // // // // // // // //     return false;
// // // // // // // // // // // // // //   }

// // // // // // // // // // // // // //   // Validate sender
// // // // // // // // // // // // // //   if (!fromEmail) {
// // // // // // // // // // // // // //     console.error('❌ Tester email is required');
// // // // // // // // // // // // // //     return false;
// // // // // // // // // // // // // //   }

// // // // // // // // // // // // // //   console.log('📧 ========== SENDING DYNAMIC EMAIL ==========');
// // // // // // // // // // // // // //   console.log('📧 FROM (SMTP):', SMTP_FROM);
// // // // // // // // // // // // // //   console.log('📧 TO (Developer):', toEmail);
// // // // // // // // // // // // // //   console.log('📧 REPLY-TO (Tester):', fromEmail);
// // // // // // // // // // // // // //   console.log('📧 Tester Name:', fromName);
// // // // // // // // // // // // // //   console.log('📧 Developer Name:', toName);
// // // // // // // // // // // // // //   console.log('📧 Task:', taskTitle);
// // // // // // // // // // // // // //   console.log('📧 Project:', projectName || 'Not specified');
// // // // // // // // // // // // // //   console.log('📧 ===========================================');

// // // // // // // // // // // // // //   const currentDate = new Date().toLocaleDateString('en-US', {
// // // // // // // // // // // // // //     weekday: 'long',
// // // // // // // // // // // // // //     year: 'numeric',
// // // // // // // // // // // // // //     month: 'long',
// // // // // // // // // // // // // //     day: 'numeric'
// // // // // // // // // // // // // //   });

// // // // // // // // // // // // // //   const currentTime = new Date().toLocaleTimeString('en-US', {
// // // // // // // // // // // // // //     hour: '2-digit',
// // // // // // // // // // // // // //     minute: '2-digit'
// // // // // // // // // // // // // //   });

// // // // // // // // // // // // // //   const htmlContent = `
// // // // // // // // // // // // // //     <!DOCTYPE html>
// // // // // // // // // // // // // //     <html>
// // // // // // // // // // // // // //       <head>
// // // // // // // // // // // // // //         <style>
// // // // // // // // // // // // // //           body { font-family: 'Segoe UI', Arial, sans-serif; color: #333; background: #f9fafb; margin: 0; padding: 20px; }
// // // // // // // // // // // // // //           .container { max-width: 600px; margin: 0 auto; padding: 20px; background: #fff; border-radius: 12px; box-shadow: 0 2px 10px rgba(0,0,0,0.1); }
// // // // // // // // // // // // // //           .header { background: linear-gradient(135deg, #f97316, #ea580c); padding: 25px; border-radius: 10px 10px 0 0; margin: -20px -20px 20px -20px; text-align: center; }
// // // // // // // // // // // // // //           .header h2 { margin: 0; color: #fff; font-size: 24px; }
// // // // // // // // // // // // // //           .header p { margin: 5px 0 0 0; color: #fef3c7; font-size: 14px; }
// // // // // // // // // // // // // //           .content { padding: 0 10px; }
// // // // // // // // // // // // // //           .task-details { background: #f8fafc; padding: 15px; border-radius: 8px; border-left: 4px solid #f97316; margin: 15px 0; }
// // // // // // // // // // // // // //           .task-details p { margin: 8px 0; font-size: 14px; }
// // // // // // // // // // // // // //           .task-details strong { color: #1e293b; }
// // // // // // // // // // // // // //           .notes { background: #fef3c7; padding: 15px; border-radius: 8px; margin: 15px 0; border-left: 4px solid #f59e0b; }
// // // // // // // // // // // // // //           .notes strong { color: #92400e; }
// // // // // // // // // // // // // //           .notes p { margin: 8px 0 0 0; color: #78350f; white-space: pre-wrap; }
// // // // // // // // // // // // // //           .sender-info { background: #f0fdf4; padding: 15px; border-radius: 8px; border-left: 4px solid #22c55e; margin: 15px 0; }
// // // // // // // // // // // // // //           .sender-info p { margin: 5px 0; }
// // // // // // // // // // // // // //           .badge { display: inline-block; background: #f97316; color: white; padding: 4px 12px; border-radius: 20px; font-size: 12px; font-weight: bold; }
// // // // // // // // // // // // // //           .footer { margin-top: 30px; font-size: 12px; color: #94a3b8; border-top: 1px solid #e2e8f0; padding-top: 20px; text-align: center; }
// // // // // // // // // // // // // //           .reply-btn { display: inline-block; background: #3b82f6; color: white; padding: 10px 20px; border-radius: 6px; text-decoration: none; margin: 10px 0; }
// // // // // // // // // // // // // //           .meta-info { font-size: 12px; color: #64748b; }
// // // // // // // // // // // // // //         </style>
// // // // // // // // // // // // // //       </head>
// // // // // // // // // // // // // //       <body>
// // // // // // // // // // // // // //         <div class="container">
// // // // // // // // // // // // // //           <div class="header">
// // // // // // // // // // // // // //             <h2>⚠️ Rework Request</h2>
// // // // // // // // // // // // // //             <p>Task requires additional development work</p>
// // // // // // // // // // // // // //           </div>
          
// // // // // // // // // // // // // //           <div class="content">
// // // // // // // // // // // // // //             <p>Hi <strong>${toName}</strong>,</p>
            
// // // // // // // // // // // // // //             <p>The task below requires rework and has been returned to you for further development.</p>
            
// // // // // // // // // // // // // //             <div class="task-details">
// // // // // // // // // // // // // //               <p><strong>📋 Task:</strong> ${taskTitle}</p>
// // // // // // // // // // // // // //               ${projectName ? `<p><strong>📁 Project:</strong> ${projectName}</p>` : ''}
// // // // // // // // // // // // // //               ${taskId ? `<p><strong>🆔 Task ID:</strong> #${taskId}</p>` : ''}
// // // // // // // // // // // // // //               <p><strong>👤 Reported by:</strong> ${fromName}</p>
// // // // // // // // // // // // // //               <p><strong>📧 Reporter Email:</strong> ${fromEmail}</p>
// // // // // // // // // // // // // //               <p><strong>📅 Date:</strong> ${currentDate}</p>
// // // // // // // // // // // // // //               <p><strong>⏰ Time:</strong> ${currentTime}</p>
// // // // // // // // // // // // // //               <p><strong>📊 Status:</strong> <span class="badge">Rework Required</span></p>
// // // // // // // // // // // // // //             </div>

// // // // // // // // // // // // // //             <div class="sender-info">
// // // // // // // // // // // // // //               <p><strong>📧 From:</strong> ${fromName} (${fromEmail})</p>
// // // // // // // // // // // // // //               <p style="margin: 0; font-size: 12px; color: #64748b;">
// // // // // // // // // // // // // //                 <em>Please reply directly to ${fromName} if you have any questions.</em>
// // // // // // // // // // // // // //               </p>
// // // // // // // // // // // // // //             </div>
            
// // // // // // // // // // // // // //             <div class="notes">
// // // // // // // // // // // // // //               <strong>📝 Feedback from ${fromName}:</strong>
// // // // // // // // // // // // // //               <p>${reworkNotes}</p>
// // // // // // // // // // // // // //             </div>

// // // // // // // // // // // // // //             <div style="background: #f0f9ff; padding: 15px; border-radius: 8px; border-left: 4px solid #3b82f6; margin: 15px 0;">
// // // // // // // // // // // // // //               <p><strong>📌 Next Steps:</strong></p>
// // // // // // // // // // // // // //               <p>1️⃣ Review the feedback above</p>
// // // // // // // // // // // // // //               <p>2️⃣ Make the required changes</p>
// // // // // // // // // // // // // //               <p>3️⃣ Update task status to "In Progress"</p>
// // // // // // // // // // // // // //               <p>4️⃣ Submit for review when done</p>
// // // // // // // // // // // // // //             </div>

// // // // // // // // // // // // // //             <p style="font-size: 14px; color: #64748b;">
// // // // // // // // // // // // // //               <em>Please address these issues and update the task status when ready for re-testing.</em>
// // // // // // // // // // // // // //             </p>

// // // // // // // // // // // // // //             <hr style="border: none; border-top: 1px solid #e2e8f0; margin: 20px 0;">
            
// // // // // // // // // // // // // //             <div style="background: #f8fafc; padding: 12px; border-radius: 6px;">
// // // // // // // // // // // // // //               <p style="margin: 0; font-size: 13px; color: #475569;">
// // // // // // // // // // // // // //                 <strong>💡 Need clarification?</strong> Reply directly to ${fromName} at 
// // // // // // // // // // // // // //                 <a href="mailto:${fromEmail}" style="color: #3b82f6; text-decoration: none;">${fromEmail}</a>
// // // // // // // // // // // // // //               </p>
// // // // // // // // // // // // // //             </div>
// // // // // // // // // // // // // //           </div>
          
// // // // // // // // // // // // // //           <div class="footer">
// // // // // // // // // // // // // //             <p><strong>From:</strong> ${fromName} (${fromEmail})</p>
// // // // // // // // // // // // // //             <p><strong>To:</strong> ${toName} (${toEmail})</p>
// // // // // // // // // // // // // //             <p>&copy; ${new Date().getFullYear()} Business OS. All rights reserved.</p>
// // // // // // // // // // // // // //             <p class="meta-info">This is an automated notification from the Task Board System.</p>
// // // // // // // // // // // // // //           </div>
// // // // // // // // // // // // // //         </div>
// // // // // // // // // // // // // //       </body>
// // // // // // // // // // // // // //     </html>
// // // // // // // // // // // // // //   `;

// // // // // // // // // // // // // //   try {
// // // // // // // // // // // // // //     const info = await transporter.sendMail({
// // // // // // // // // // // // // //       from: SMTP_FROM,        // ✅ ALWAYS subasrimuthumanickam@gmail.com
// // // // // // // // // // // // // //       to: toEmail,            // ✅ Developer email from database
// // // // // // // // // // // // // //       subject: `⚠️ REWORK REQUIRED: ${taskTitle} (from ${fromName})`,
// // // // // // // // // // // // // //       html: htmlContent,
// // // // // // // // // // // // // //       replyTo: fromEmail      // ✅ Tester email for replies
// // // // // // // // // // // // // //     });

// // // // // // // // // // // // // //     console.log('✅ Email sent successfully!');
// // // // // // // // // // // // // //     console.log('  From:', SMTP_FROM);
// // // // // // // // // // // // // //     console.log('  To:', toEmail);
// // // // // // // // // // // // // //     console.log('  Reply-To:', fromEmail);
// // // // // // // // // // // // // //     console.log('  Message ID:', info.messageId);
// // // // // // // // // // // // // //     return true;
// // // // // // // // // // // // // //   } catch (error: any) {
// // // // // // // // // // // // // //     console.error('❌ Error sending email:', error.message);
// // // // // // // // // // // // // //     return false;
// // // // // // // // // // // // // //   }
// // // // // // // // // // // // // // };

// // // // // // // // // // // // // // export default transporter;
// // // // // // // // // // // // // // services/emailService.ts

// // // // // // // // // // // // // import nodemailer from 'nodemailer';
// // // // // // // // // // // // // import dotenv from 'dotenv';

// // // // // // // // // // // // // dotenv.config();

// // // // // // // // // // // // // // ✅ Get SMTP from environment variables
// // // // // // // // // // // // // const SMTP_USER = process.env.SMTP_USER || '';
// // // // // // // // // // // // // const SMTP_PASS = process.env.SMTP_PASS || '';
// // // // // // // // // // // // // const SMTP_HOST = process.env.SMTP_HOST || 'smtp.gmail.com';
// // // // // // // // // // // // // const SMTP_PORT = parseInt(process.env.SMTP_PORT || '587');
// // // // // // // // // // // // // const SMTP_SECURE = process.env.SMTP_SECURE === 'true';
// // // // // // // // // // // // // const SMTP_FROM = process.env.SMTP_FROM || SMTP_USER || 'noreply@business-os.com';

// // // // // // // // // // // // // console.log('📧 Email Service Initialized:');
// // // // // // // // // // // // // console.log('  SMTP Host:', SMTP_HOST);
// // // // // // // // // // // // // console.log('  SMTP Port:', SMTP_PORT);
// // // // // // // // // // // // // console.log('  SMTP User:', SMTP_USER ? '✅ Set' : '❌ Missing');
// // // // // // // // // // // // // console.log('  SMTP Pass:', SMTP_PASS ? '✅ Set' : '❌ Missing');
// // // // // // // // // // // // // console.log('  SMTP FROM:', SMTP_FROM);

// // // // // // // // // // // // // let transporter: any;
// // // // // // // // // // // // // let isConnected = false;

// // // // // // // // // // // // // // ✅ Check if credentials exist
// // // // // // // // // // // // // if (SMTP_USER && SMTP_PASS) {
// // // // // // // // // // // // //   try {
// // // // // // // // // // // // //     transporter = nodemailer.createTransport({
// // // // // // // // // // // // //       host: SMTP_HOST,
// // // // // // // // // // // // //       port: SMTP_PORT,
// // // // // // // // // // // // //       secure: SMTP_SECURE,
// // // // // // // // // // // // //       auth: {
// // // // // // // // // // // // //         user: SMTP_USER,
// // // // // // // // // // // // //         pass: SMTP_PASS
// // // // // // // // // // // // //       },
// // // // // // // // // // // // //       // Add connection timeout
// // // // // // // // // // // // //       connectionTimeout: 10000,
// // // // // // // // // // // // //       greetingTimeout: 10000,
// // // // // // // // // // // // //       socketTimeout: 10000,
// // // // // // // // // // // // //     });

// // // // // // // // // // // // //     // Verify connection
// // // // // // // // // // // // //     transporter.verify((error: Error | null, success: boolean) => {
// // // // // // // // // // // // //       if (error) {
// // // // // // // // // // // // //         isConnected = false;
// // // // // // // // // // // // //         console.error('❌ SMTP connection error:', error.message);
// // // // // // // // // // // // //         if (error.message.includes('Invalid credentials')) {
// // // // // // // // // // // // //           console.error('💡 Your App Password may be expired.');
// // // // // // // // // // // // //           console.error('   Generate a new one at: https://myaccount.google.com/apppasswords');
// // // // // // // // // // // // //         }
// // // // // // // // // // // // //       } else {
// // // // // // // // // // // // //         isConnected = true;
// // // // // // // // // // // // //         console.log('✅ SMTP server ready');
// // // // // // // // // // // // //       }
// // // // // // // // // // // // //     });
// // // // // // // // // // // // //   } catch (error: any) {
// // // // // // // // // // // // //     console.error('❌ SMTP setup error:', error.message);
// // // // // // // // // // // // //     isConnected = false;
// // // // // // // // // // // // //   }
// // // // // // // // // // // // // } else {
// // // // // // // // // // // // //   console.warn('⚠️ SMTP credentials missing - Email features disabled');
// // // // // // // // // // // // //   console.warn('   Please set SMTP_USER and SMTP_PASS in .env file');
// // // // // // // // // // // // //   transporter = {
// // // // // // // // // // // // //     sendMail: (options: any) => {
// // // // // // // // // // // // //       console.log('📧 [MOCK] Would send email to:', options.to);
// // // // // // // // // // // // //       console.log('📧 [MOCK] From:', options.from);
// // // // // // // // // // // // //       return Promise.resolve({ messageId: 'mock-' + Date.now() });
// // // // // // // // // // // // //     }
// // // // // // // // // // // // //   };
// // // // // // // // // // // // // }

// // // // // // // // // // // // // interface EmailParams {
// // // // // // // // // // // // //   toEmail: string;        // Developer's email (from database)
// // // // // // // // // // // // //   toName: string;         // Developer's name (from database)
// // // // // // // // // // // // //   taskTitle: string;      // Task title (from database)
// // // // // // // // // // // // //   reworkNotes: string;    // Rework notes (from user input)
// // // // // // // // // // // // //   fromName: string;       // Tester's name (from database - logged in user)
// // // // // // // // // // // // //   fromEmail: string;      // Tester's email (from database - logged in user)
// // // // // // // // // // // // //   taskId?: string;        // Optional task ID
// // // // // // // // // // // // //   projectName?: string;   // Optional project name
// // // // // // // // // // // // //   reworkCount?: number;   // Optional rework count
// // // // // // // // // // // // // }

// // // // // // // // // // // // // export const sendReworkRequestEmail = async (params: EmailParams): Promise<boolean> => {
// // // // // // // // // // // // //   const { 
// // // // // // // // // // // // //     toEmail, 
// // // // // // // // // // // // //     toName, 
// // // // // // // // // // // // //     taskTitle, 
// // // // // // // // // // // // //     reworkNotes, 
// // // // // // // // // // // // //     fromName, 
// // // // // // // // // // // // //     fromEmail,
// // // // // // // // // // // // //     taskId,
// // // // // // // // // // // // //     projectName,
// // // // // // // // // // // // //     reworkCount
// // // // // // // // // // // // //   } = params;

// // // // // // // // // // // // //   // Check credentials
// // // // // // // // // // // // //   if (!SMTP_USER || !SMTP_PASS) {
// // // // // // // // // // // // //     console.warn('⚠️ Rework email skipped - SMTP not configured');
// // // // // // // // // // // // //     console.log('📧 [MOCK] Would send email to:', toEmail);
// // // // // // // // // // // // //     return false;
// // // // // // // // // // // // //   }

// // // // // // // // // // // // //   // Validate recipient
// // // // // // // // // // // // //   if (!toEmail) {
// // // // // // // // // // // // //     console.error('❌ Developer email is required');
// // // // // // // // // // // // //     return false;
// // // // // // // // // // // // //   }

// // // // // // // // // // // // //   // Validate sender
// // // // // // // // // // // // //   if (!fromEmail) {
// // // // // // // // // // // // //     console.error('❌ Tester email is required');
// // // // // // // // // // // // //     return false;
// // // // // // // // // // // // //   }

// // // // // // // // // // // // //   // ✅ Use SMTP_FROM from environment
// // // // // // // // // // // // //   const fromAddress = SMTP_FROM;

// // // // // // // // // // // // //   console.log('📧 ========== SENDING DYNAMIC EMAIL ==========');
// // // // // // // // // // // // //   console.log('📧 FROM (SMTP):', fromAddress);
// // // // // // // // // // // // //   console.log('📧 TO (Developer):', toEmail);
// // // // // // // // // // // // //   console.log('📧 REPLY-TO (Tester):', fromEmail);
// // // // // // // // // // // // //   console.log('📧 Tester Name:', fromName);
// // // // // // // // // // // // //   console.log('📧 Developer Name:', toName);
// // // // // // // // // // // // //   console.log('📧 Task:', taskTitle);
// // // // // // // // // // // // //   console.log('📧 Project:', projectName || 'Not specified');
// // // // // // // // // // // // //   console.log('📧 ===========================================');

// // // // // // // // // // // // //   const currentDate = new Date().toLocaleDateString('en-US', {
// // // // // // // // // // // // //     weekday: 'long',
// // // // // // // // // // // // //     year: 'numeric',
// // // // // // // // // // // // //     month: 'long',
// // // // // // // // // // // // //     day: 'numeric'
// // // // // // // // // // // // //   });

// // // // // // // // // // // // //   const currentTime = new Date().toLocaleTimeString('en-US', {
// // // // // // // // // // // // //     hour: '2-digit',
// // // // // // // // // // // // //     minute: '2-digit'
// // // // // // // // // // // // //   });

// // // // // // // // // // // // //   const htmlContent = `
// // // // // // // // // // // // //     <!DOCTYPE html>
// // // // // // // // // // // // //     <html>
// // // // // // // // // // // // //       <head>
// // // // // // // // // // // // //         <meta charset="UTF-8">
// // // // // // // // // // // // //         <meta name="viewport" content="width=device-width, initial-scale=1.0">
// // // // // // // // // // // // //         <title>Rework Request</title>
// // // // // // // // // // // // //         <style>
// // // // // // // // // // // // //           body { 
// // // // // // // // // // // // //             font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif;
// // // // // // // // // // // // //             color: #333; 
// // // // // // // // // // // // //             background: #f6f9fc; 
// // // // // // // // // // // // //             margin: 0; 
// // // // // // // // // // // // //             padding: 20px; 
// // // // // // // // // // // // //             line-height: 1.6;
// // // // // // // // // // // // //           }
// // // // // // // // // // // // //           .container { 
// // // // // // // // // // // // //             max-width: 600px; 
// // // // // // // // // // // // //             margin: 0 auto; 
// // // // // // // // // // // // //             padding: 20px; 
// // // // // // // // // // // // //             background: #ffffff; 
// // // // // // // // // // // // //             border-radius: 12px; 
// // // // // // // // // // // // //             box-shadow: 0 2px 12px rgba(0,0,0,0.08);
// // // // // // // // // // // // //           }
// // // // // // // // // // // // //           .header { 
// // // // // // // // // // // // //             background: linear-gradient(135deg, #f97316, #ea580c); 
// // // // // // // // // // // // //             padding: 30px 25px; 
// // // // // // // // // // // // //             border-radius: 12px 12px 0 0; 
// // // // // // // // // // // // //             margin: -20px -20px 20px -20px;
// // // // // // // // // // // // //             text-align: center;
// // // // // // // // // // // // //           }
// // // // // // // // // // // // //           .header h2 { 
// // // // // // // // // // // // //             margin: 0; 
// // // // // // // // // // // // //             color: #ffffff; 
// // // // // // // // // // // // //             font-size: 24px;
// // // // // // // // // // // // //             font-weight: 700;
// // // // // // // // // // // // //           }
// // // // // // // // // // // // //           .header p { 
// // // // // // // // // // // // //             margin: 6px 0 0 0; 
// // // // // // // // // // // // //             color: #fef3c7; 
// // // // // // // // // // // // //             font-size: 14px; 
// // // // // // // // // // // // //           }
// // // // // // // // // // // // //           .content { 
// // // // // // // // // // // // //             padding: 0 4px; 
// // // // // // // // // // // // //           }
// // // // // // // // // // // // //           .greeting {
// // // // // // // // // // // // //             font-size: 16px;
// // // // // // // // // // // // //             margin-bottom: 16px;
// // // // // // // // // // // // //           }
// // // // // // // // // // // // //           .greeting strong {
// // // // // // // // // // // // //             color: #1e293b;
// // // // // // // // // // // // //           }
// // // // // // // // // // // // //           .task-details { 
// // // // // // // // // // // // //             background: #f8fafc; 
// // // // // // // // // // // // //             padding: 16px 20px; 
// // // // // // // // // // // // //             border-radius: 8px; 
// // // // // // // // // // // // //             border-left: 4px solid #f97316; 
// // // // // // // // // // // // //             margin: 16px 0; 
// // // // // // // // // // // // //           }
// // // // // // // // // // // // //           .task-details p { 
// // // // // // // // // // // // //             margin: 6px 0; 
// // // // // // // // // // // // //             font-size: 14px; 
// // // // // // // // // // // // //           }
// // // // // // // // // // // // //           .task-details strong { 
// // // // // // // // // // // // //             color: #1e293b; 
// // // // // // // // // // // // //             display: inline-block;
// // // // // // // // // // // // //             min-width: 100px;
// // // // // // // // // // // // //           }
// // // // // // // // // // // // //           .task-details .value {
// // // // // // // // // // // // //             color: #334155;
// // // // // // // // // // // // //           }
// // // // // // // // // // // // //           .notes { 
// // // // // // // // // // // // //             background: #fef3c7; 
// // // // // // // // // // // // //             padding: 16px 20px; 
// // // // // // // // // // // // //             border-radius: 8px; 
// // // // // // // // // // // // //             margin: 16px 0; 
// // // // // // // // // // // // //             border-left: 4px solid #f59e0b;
// // // // // // // // // // // // //           }
// // // // // // // // // // // // //           .notes strong { 
// // // // // // // // // // // // //             color: #92400e; 
// // // // // // // // // // // // //             display: block;
// // // // // // // // // // // // //             margin-bottom: 6px;
// // // // // // // // // // // // //           }
// // // // // // // // // // // // //           .notes p { 
// // // // // // // // // // // // //             margin: 0; 
// // // // // // // // // // // // //             color: #78350f; 
// // // // // // // // // // // // //             white-space: pre-wrap; 
// // // // // // // // // // // // //             font-size: 14px;
// // // // // // // // // // // // //           }
// // // // // // // // // // // // //           .sender-info { 
// // // // // // // // // // // // //             background: #f0fdf4; 
// // // // // // // // // // // // //             padding: 14px 18px; 
// // // // // // // // // // // // //             border-radius: 8px; 
// // // // // // // // // // // // //             border-left: 4px solid #22c55e; 
// // // // // // // // // // // // //             margin: 16px 0; 
// // // // // // // // // // // // //           }
// // // // // // // // // // // // //           .sender-info p { 
// // // // // // // // // // // // //             margin: 4px 0; 
// // // // // // // // // // // // //             font-size: 14px;
// // // // // // // // // // // // //           }
// // // // // // // // // // // // //           .sender-info strong {
// // // // // // // // // // // // //             color: #166534;
// // // // // // // // // // // // //           }
// // // // // // // // // // // // //           .badge { 
// // // // // // // // // // // // //             display: inline-block; 
// // // // // // // // // // // // //             background: #f97316; 
// // // // // // // // // // // // //             color: white; 
// // // // // // // // // // // // //             padding: 3px 14px; 
// // // // // // // // // // // // //             border-radius: 20px; 
// // // // // // // // // // // // //             font-size: 12px; 
// // // // // // // // // // // // //             font-weight: 600; 
// // // // // // // // // // // // //           }
// // // // // // // // // // // // //           .rework-badge { 
// // // // // // // // // // // // //             display: inline-block; 
// // // // // // // // // // // // //             background: #ef4444; 
// // // // // // // // // // // // //             color: white; 
// // // // // // // // // // // // //             padding: 3px 14px; 
// // // // // // // // // // // // //             border-radius: 20px; 
// // // // // // // // // // // // //             font-size: 12px; 
// // // // // // // // // // // // //             font-weight: 600; 
// // // // // // // // // // // // //           }
// // // // // // // // // // // // //           .next-steps {
// // // // // // // // // // // // //             background: #f0f9ff;
// // // // // // // // // // // // //             padding: 16px 20px;
// // // // // // // // // // // // //             border-radius: 8px;
// // // // // // // // // // // // //             border-left: 4px solid #3b82f6;
// // // // // // // // // // // // //             margin: 16px 0;
// // // // // // // // // // // // //           }
// // // // // // // // // // // // //           .next-steps p {
// // // // // // // // // // // // //             margin: 4px 0;
// // // // // // // // // // // // //             font-size: 14px;
// // // // // // // // // // // // //             color: #1e40af;
// // // // // // // // // // // // //           }
// // // // // // // // // // // // //           .next-steps strong {
// // // // // // // // // // // // //             color: #1e3a8a;
// // // // // // // // // // // // //           }
// // // // // // // // // // // // //           .next-steps .step {
// // // // // // // // // // // // //             display: flex;
// // // // // // // // // // // // //             align-items: center;
// // // // // // // // // // // // //             gap: 8px;
// // // // // // // // // // // // //             margin: 4px 0;
// // // // // // // // // // // // //           }
// // // // // // // // // // // // //           .footer { 
// // // // // // // // // // // // //             margin-top: 30px; 
// // // // // // // // // // // // //             font-size: 12px; 
// // // // // // // // // // // // //             color: #94a3b8; 
// // // // // // // // // // // // //             border-top: 1px solid #e2e8f0; 
// // // // // // // // // // // // //             padding-top: 20px; 
// // // // // // // // // // // // //             text-align: center; 
// // // // // // // // // // // // //           }
// // // // // // // // // // // // //           .footer p {
// // // // // // // // // // // // //             margin: 4px 0;
// // // // // // // // // // // // //           }
// // // // // // // // // // // // //           .footer .email-info {
// // // // // // // // // // // // //             font-size: 11px;
// // // // // // // // // // // // //             color: #94a3b8;
// // // // // // // // // // // // //           }
// // // // // // // // // // // // //           .divider {
// // // // // // // // // // // // //             border: none;
// // // // // // // // // // // // //             border-top: 1px solid #e2e8f0;
// // // // // // // // // // // // //             margin: 20px 0;
// // // // // // // // // // // // //           }
// // // // // // // // // // // // //           .reply-box {
// // // // // // // // // // // // //             background: #f8fafc;
// // // // // // // // // // // // //             padding: 12px 16px;
// // // // // // // // // // // // //             border-radius: 6px;
// // // // // // // // // // // // //             margin: 16px 0;
// // // // // // // // // // // // //           }
// // // // // // // // // // // // //           .reply-box p {
// // // // // // // // // // // // //             margin: 0;
// // // // // // // // // // // // //             font-size: 13px;
// // // // // // // // // // // // //             color: #475569;
// // // // // // // // // // // // //           }
// // // // // // // // // // // // //           .reply-box a {
// // // // // // // // // // // // //             color: #3b82f6;
// // // // // // // // // // // // //             text-decoration: none;
// // // // // // // // // // // // //           }
// // // // // // // // // // // // //           .reply-box a:hover {
// // // // // // // // // // // // //             text-decoration: underline;
// // // // // // // // // // // // //           }
// // // // // // // // // // // // //           @media only screen and (max-width: 480px) {
// // // // // // // // // // // // //             .container {
// // // // // // // // // // // // //               padding: 12px;
// // // // // // // // // // // // //             }
// // // // // // // // // // // // //             .header {
// // // // // // // // // // // // //               padding: 20px 16px;
// // // // // // // // // // // // //               margin: -12px -12px 16px -12px;
// // // // // // // // // // // // //             }
// // // // // // // // // // // // //             .header h2 {
// // // // // // // // // // // // //               font-size: 20px;
// // // // // // // // // // // // //             }
// // // // // // // // // // // // //             .task-details p {
// // // // // // // // // // // // //               flex-direction: column;
// // // // // // // // // // // // //               align-items: flex-start;
// // // // // // // // // // // // //               gap: 2px;
// // // // // // // // // // // // //             }
// // // // // // // // // // // // //             .task-details strong {
// // // // // // // // // // // // //               min-width: auto;
// // // // // // // // // // // // //             }
// // // // // // // // // // // // //           }
// // // // // // // // // // // // //         </style>
// // // // // // // // // // // // //       </head>
// // // // // // // // // // // // //       <body>
// // // // // // // // // // // // //         <div class="container">
// // // // // // // // // // // // //           <!-- Header -->
// // // // // // // // // // // // //           <div class="header">
// // // // // // // // // // // // //             <h2>⚠️ Rework Request</h2>
// // // // // // // // // // // // //             <p>Task requires additional development work</p>
// // // // // // // // // // // // //           </div>
          
// // // // // // // // // // // // //           <!-- Content -->
// // // // // // // // // // // // //           <div class="content">
// // // // // // // // // // // // //             <!-- Greeting -->
// // // // // // // // // // // // //             <div class="greeting">
// // // // // // // // // // // // //               <p>Hi <strong>${toName}</strong>,</p>
// // // // // // // // // // // // //               <p>The task below requires rework and has been returned to you for further development.</p>
// // // // // // // // // // // // //             </div>

// // // // // // // // // // // // //             <!-- Task Details -->
// // // // // // // // // // // // //             <div class="task-details">
// // // // // // // // // // // // //               <p><strong>📋 Task:</strong> <span class="value">${taskTitle}</span></p>
// // // // // // // // // // // // //               ${taskId ? `<p><strong>🆔 Task ID:</strong> <span class="value">#${taskId}</span></p>` : ''}
// // // // // // // // // // // // //               ${projectName ? `<p><strong>📁 Project:</strong> <span class="value">${projectName}</span></p>` : ''}
// // // // // // // // // // // // //               ${reworkCount ? `<p><strong>🔄 Rework Attempt:</strong> <span class="rework-badge">#${reworkCount}</span></p>` : ''}
// // // // // // // // // // // // //               <p><strong>👤 Reported by:</strong> <span class="value">${fromName}</span></p>
// // // // // // // // // // // // //               <p><strong>📧 Reporter Email:</strong> <span class="value">${fromEmail}</span></p>
// // // // // // // // // // // // //               <p><strong>📅 Date:</strong> <span class="value">${currentDate}</span></p>
// // // // // // // // // // // // //               <p><strong>⏰ Time:</strong> <span class="value">${currentTime}</span></p>
// // // // // // // // // // // // //               <p><strong>📊 Status:</strong> <span class="badge">Rework Required</span></p>
// // // // // // // // // // // // //             </div>

// // // // // // // // // // // // //             <!-- Sender Info -->
// // // // // // // // // // // // //             <div class="sender-info">
// // // // // // // // // // // // //               <p><strong>📧 From:</strong> ${fromName} (${fromEmail})</p>
// // // // // // // // // // // // //               <p style="margin: 4px 0 0 0; font-size: 13px; color: #64748b;">
// // // // // // // // // // // // //                 <em>Please reply directly to ${fromName} if you have any questions.</em>
// // // // // // // // // // // // //               </p>
// // // // // // // // // // // // //             </div>

// // // // // // // // // // // // //             <!-- Rework Notes -->
// // // // // // // // // // // // //             <div class="notes">
// // // // // // // // // // // // //               <strong>📝 Feedback from ${fromName}:</strong>
// // // // // // // // // // // // //               <p>${reworkNotes}</p>
// // // // // // // // // // // // //             </div>

// // // // // // // // // // // // //             <!-- Next Steps -->
// // // // // // // // // // // // //             <div class="next-steps">
// // // // // // // // // // // // //               <p><strong>📌 Next Steps:</strong></p>
// // // // // // // // // // // // //               <div class="step">1️⃣ Review the feedback above</div>
// // // // // // // // // // // // //               <div class="step">2️⃣ Make the required changes</div>
// // // // // // // // // // // // //               <div class="step">3️⃣ Update task status to "In Progress"</div>
// // // // // // // // // // // // //               <div class="step">4️⃣ Submit for review when done</div>
// // // // // // // // // // // // //             </div>

// // // // // // // // // // // // //             <p style="font-size: 14px; color: #64748b;">
// // // // // // // // // // // // //               <em>Please address these issues and update the task status when ready for re-testing.</em>
// // // // // // // // // // // // //             </p>

// // // // // // // // // // // // //             <hr class="divider">

// // // // // // // // // // // // //             <!-- Reply Box -->
// // // // // // // // // // // // //             <div class="reply-box">
// // // // // // // // // // // // //               <p>
// // // // // // // // // // // // //                 <strong>💡 Need clarification?</strong> Reply directly to 
// // // // // // // // // // // // //                 <a href="mailto:${fromEmail}">${fromName}</a> at 
// // // // // // // // // // // // //                 <a href="mailto:${fromEmail}" style="color: #3b82f6; text-decoration: none;">${fromEmail}</a>
// // // // // // // // // // // // //               </p>
// // // // // // // // // // // // //             </div>
// // // // // // // // // // // // //           </div>
          
// // // // // // // // // // // // //           <!-- Footer -->
// // // // // // // // // // // // //           <div class="footer">
// // // // // // // // // // // // //             <p><strong>From:</strong> ${fromName} (${fromEmail})</p>
// // // // // // // // // // // // //             <p><strong>To:</strong> ${toName} (${toEmail})</p>
// // // // // // // // // // // // //             <p>&copy; ${new Date().getFullYear()} Business OS. All rights reserved.</p>
// // // // // // // // // // // // //             <p class="email-info">This is an automated notification from the Task Board System.</p>
// // // // // // // // // // // // //           </div>
// // // // // // // // // // // // //         </div>
// // // // // // // // // // // // //       </body>
// // // // // // // // // // // // //     </html>
// // // // // // // // // // // // //   `;

// // // // // // // // // // // // //   try {
// // // // // // // // // // // // //     const info = await transporter.sendMail({
// // // // // // // // // // // // //       from: fromAddress,     // ✅ From environment variable
// // // // // // // // // // // // //       to: toEmail,          // ✅ Developer email from database
// // // // // // // // // // // // //       subject: `⚠️ REWORK REQUIRED: ${taskTitle} (from ${fromName})`,
// // // // // // // // // // // // //       html: htmlContent,
// // // // // // // // // // // // //       replyTo: fromEmail    // ✅ Tester email for replies
// // // // // // // // // // // // //     });

// // // // // // // // // // // // //     console.log('✅ Email sent successfully!');
// // // // // // // // // // // // //     console.log('  From:', fromAddress);
// // // // // // // // // // // // //     console.log('  To:', toEmail);
// // // // // // // // // // // // //     console.log('  Reply-To:', fromEmail);
// // // // // // // // // // // // //     console.log('  Message ID:', info.messageId);
// // // // // // // // // // // // //     return true;
// // // // // // // // // // // // //   } catch (error: any) {
// // // // // // // // // // // // //     console.error('❌ Error sending email:', error.message);
// // // // // // // // // // // // //     if (error.message.includes('Invalid credentials')) {
// // // // // // // // // // // // //       console.error('💡 Your App Password is invalid or expired.');
// // // // // // // // // // // // //       console.error('   Generate a new one at: https://myaccount.google.com/apppasswords');
// // // // // // // // // // // // //     }
// // // // // // // // // // // // //     return false;
// // // // // // // // // // // // //   }
// // // // // // // // // // // // // };

// // // // // // // // // // // // // export default transporter;
// // // // // // // // // // // // // services/emailService.ts

// // // // // // // // // // // // import nodemailer from 'nodemailer';
// // // // // // // // // // // // import dotenv from 'dotenv';

// // // // // // // // // // // // dotenv.config();

// // // // // // // // // // // // // ✅ Get SMTP from environment variables
// // // // // // // // // // // // const SMTP_USER = process.env.SMTP_USER || '';
// // // // // // // // // // // // const SMTP_PASS = process.env.SMTP_PASS || '';
// // // // // // // // // // // // const SMTP_HOST = process.env.SMTP_HOST || 'smtp.gmail.com';
// // // // // // // // // // // // const SMTP_PORT = parseInt(process.env.SMTP_PORT || '587');
// // // // // // // // // // // // const SMTP_SECURE = process.env.SMTP_SECURE === 'true';
// // // // // // // // // // // // const SMTP_FROM = process.env.SMTP_FROM || SMTP_USER || 'noreply@business-os.com';

// // // // // // // // // // // // console.log('📧 Email Service Initialized:');
// // // // // // // // // // // // console.log('  SMTP Host:', SMTP_HOST);
// // // // // // // // // // // // console.log('  SMTP Port:', SMTP_PORT);
// // // // // // // // // // // // console.log('  SMTP User:', SMTP_USER ? '✅ Set' : '❌ Missing');
// // // // // // // // // // // // console.log('  SMTP Pass:', SMTP_PASS ? '✅ Set' : '❌ Missing');
// // // // // // // // // // // // console.log('  SMTP FROM:', SMTP_FROM);

// // // // // // // // // // // // let transporter: any;
// // // // // // // // // // // // let isConnected = false;

// // // // // // // // // // // // // ✅ Check if credentials exist
// // // // // // // // // // // // if (SMTP_USER && SMTP_PASS) {
// // // // // // // // // // // //   try {
// // // // // // // // // // // //     transporter = nodemailer.createTransport({
// // // // // // // // // // // //       host: SMTP_HOST,
// // // // // // // // // // // //       port: SMTP_PORT,
// // // // // // // // // // // //       secure: SMTP_SECURE,
// // // // // // // // // // // //       auth: {
// // // // // // // // // // // //         user: SMTP_USER,
// // // // // // // // // // // //         pass: SMTP_PASS
// // // // // // // // // // // //       }
// // // // // // // // // // // //     });

// // // // // // // // // // // //     // Verify connection
// // // // // // // // // // // //     transporter.verify((error: Error | null, success: boolean) => {
// // // // // // // // // // // //       if (error) {
// // // // // // // // // // // //         isConnected = false;
// // // // // // // // // // // //         console.error('❌ SMTP connection error:', error.message);
// // // // // // // // // // // //         if (error.message.includes('Invalid credentials')) {
// // // // // // // // // // // //           console.error('💡 Your App Password may be expired.');
// // // // // // // // // // // //           console.error('   Generate a new one at: https://myaccount.google.com/apppasswords');
// // // // // // // // // // // //         }
// // // // // // // // // // // //       } else {
// // // // // // // // // // // //         isConnected = true;
// // // // // // // // // // // //         console.log('✅ SMTP server ready');
// // // // // // // // // // // //       }
// // // // // // // // // // // //     });
// // // // // // // // // // // //   } catch (error: any) {
// // // // // // // // // // // //     console.error('❌ SMTP setup error:', error.message);
// // // // // // // // // // // //     isConnected = false;
// // // // // // // // // // // //   }
// // // // // // // // // // // // } else {
// // // // // // // // // // // //   console.warn('⚠️ SMTP credentials missing - Email features disabled');
// // // // // // // // // // // //   console.warn('   Please set SMTP_USER and SMTP_PASS in .env file');
// // // // // // // // // // // //   transporter = {
// // // // // // // // // // // //     sendMail: (options: any) => {
// // // // // // // // // // // //       console.log('📧 [MOCK] Would send email to:', options.to);
// // // // // // // // // // // //       console.log('📧 [MOCK] From:', options.from);
// // // // // // // // // // // //       return Promise.resolve({ messageId: 'mock-' + Date.now() });
// // // // // // // // // // // //     }
// // // // // // // // // // // //   };
// // // // // // // // // // // // }

// // // // // // // // // // // // interface EmailParams {
// // // // // // // // // // // //   toEmail: string;        // Developer's email (from database)
// // // // // // // // // // // //   toName: string;         // Developer's name (from database)
// // // // // // // // // // // //   taskTitle: string;      // Task title (from database)
// // // // // // // // // // // //   reworkNotes: string;    // Rework notes (from user input)
// // // // // // // // // // // //   fromName: string;       // Tester's name (from database - logged in user)
// // // // // // // // // // // //   fromEmail: string;      // Tester's email (from database - logged in user)
// // // // // // // // // // // //   taskId?: string;        // Optional task ID
// // // // // // // // // // // //   projectName?: string;   // Optional project name
// // // // // // // // // // // //   reworkCount?: number;   // Optional rework count
// // // // // // // // // // // // }

// // // // // // // // // // // // export const sendReworkRequestEmail = async (params: EmailParams): Promise<boolean> => {
// // // // // // // // // // // //   const { 
// // // // // // // // // // // //     toEmail, 
// // // // // // // // // // // //     toName, 
// // // // // // // // // // // //     taskTitle, 
// // // // // // // // // // // //     reworkNotes, 
// // // // // // // // // // // //     fromName, 
// // // // // // // // // // // //     fromEmail,
// // // // // // // // // // // //     taskId,
// // // // // // // // // // // //     projectName,
// // // // // // // // // // // //     reworkCount
// // // // // // // // // // // //   } = params;

// // // // // // // // // // // //   // Check credentials
// // // // // // // // // // // //   if (!SMTP_USER || !SMTP_PASS) {
// // // // // // // // // // // //     console.warn('⚠️ Rework email skipped - SMTP not configured');
// // // // // // // // // // // //     console.log('📧 [MOCK] Would send email to:', toEmail);
// // // // // // // // // // // //     return false;
// // // // // // // // // // // //   }

// // // // // // // // // // // //   // Validate recipient
// // // // // // // // // // // //   if (!toEmail) {
// // // // // // // // // // // //     console.error('❌ Developer email is required');
// // // // // // // // // // // //     return false;
// // // // // // // // // // // //   }

// // // // // // // // // // // //   // Validate sender
// // // // // // // // // // // //   if (!fromEmail) {
// // // // // // // // // // // //     console.error('❌ Tester email is required');
// // // // // // // // // // // //     return false;
// // // // // // // // // // // //   }

// // // // // // // // // // // //   // ✅ Use SMTP_FROM from environment
// // // // // // // // // // // //   const fromAddress = SMTP_FROM;

// // // // // // // // // // // //   console.log('📧 ========== SENDING DYNAMIC EMAIL ==========');
// // // // // // // // // // // //   console.log('📧 FROM (SMTP):', fromAddress);
// // // // // // // // // // // //   console.log('📧 TO (Developer):', toEmail);
// // // // // // // // // // // //   console.log('📧 REPLY-TO (Tester):', fromEmail);
// // // // // // // // // // // //   console.log('📧 Tester Name:', fromName);
// // // // // // // // // // // //   console.log('📧 Developer Name:', toName);
// // // // // // // // // // // //   console.log('📧 Task:', taskTitle);
// // // // // // // // // // // //   console.log('📧 Project:', projectName || 'Not specified');
// // // // // // // // // // // //   console.log('📧 ===========================================');

// // // // // // // // // // // //   const currentDate = new Date().toLocaleDateString('en-US', {
// // // // // // // // // // // //     weekday: 'long',
// // // // // // // // // // // //     year: 'numeric',
// // // // // // // // // // // //     month: 'long',
// // // // // // // // // // // //     day: 'numeric'
// // // // // // // // // // // //   });

// // // // // // // // // // // //   const currentTime = new Date().toLocaleTimeString('en-US', {
// // // // // // // // // // // //     hour: '2-digit',
// // // // // // // // // // // //     minute: '2-digit'
// // // // // // // // // // // //   });

// // // // // // // // // // // //   const htmlContent = `
// // // // // // // // // // // //     <!DOCTYPE html>
// // // // // // // // // // // //     <html>
// // // // // // // // // // // //       <head>
// // // // // // // // // // // //         <meta charset="UTF-8">
// // // // // // // // // // // //         <meta name="viewport" content="width=device-width, initial-scale=1.0">
// // // // // // // // // // // //         <title>Rework Request</title>
// // // // // // // // // // // //         <style>
// // // // // // // // // // // //           body { 
// // // // // // // // // // // //             font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif;
// // // // // // // // // // // //             color: #333; 
// // // // // // // // // // // //             background: #f6f9fc; 
// // // // // // // // // // // //             margin: 0; 
// // // // // // // // // // // //             padding: 20px; 
// // // // // // // // // // // //             line-height: 1.6;
// // // // // // // // // // // //           }
// // // // // // // // // // // //           .container { 
// // // // // // // // // // // //             max-width: 600px; 
// // // // // // // // // // // //             margin: 0 auto; 
// // // // // // // // // // // //             padding: 20px; 
// // // // // // // // // // // //             background: #ffffff; 
// // // // // // // // // // // //             border-radius: 12px; 
// // // // // // // // // // // //             box-shadow: 0 2px 12px rgba(0,0,0,0.08);
// // // // // // // // // // // //           }
// // // // // // // // // // // //           .header { 
// // // // // // // // // // // //             background: linear-gradient(135deg, #f97316, #ea580c); 
// // // // // // // // // // // //             padding: 30px 25px; 
// // // // // // // // // // // //             border-radius: 12px 12px 0 0; 
// // // // // // // // // // // //             margin: -20px -20px 20px -20px;
// // // // // // // // // // // //             text-align: center;
// // // // // // // // // // // //           }
// // // // // // // // // // // //           .header h2 { 
// // // // // // // // // // // //             margin: 0; 
// // // // // // // // // // // //             color: #ffffff; 
// // // // // // // // // // // //             font-size: 24px;
// // // // // // // // // // // //             font-weight: 700;
// // // // // // // // // // // //           }
// // // // // // // // // // // //           .header p { 
// // // // // // // // // // // //             margin: 6px 0 0 0; 
// // // // // // // // // // // //             color: #fef3c7; 
// // // // // // // // // // // //             font-size: 14px; 
// // // // // // // // // // // //           }
// // // // // // // // // // // //           .content { 
// // // // // // // // // // // //             padding: 0 4px; 
// // // // // // // // // // // //           }
// // // // // // // // // // // //           .greeting {
// // // // // // // // // // // //             font-size: 16px;
// // // // // // // // // // // //             margin-bottom: 16px;
// // // // // // // // // // // //           }
// // // // // // // // // // // //           .greeting strong {
// // // // // // // // // // // //             color: #1e293b;
// // // // // // // // // // // //           }
// // // // // // // // // // // //           .task-details { 
// // // // // // // // // // // //             background: #f8fafc; 
// // // // // // // // // // // //             padding: 16px 20px; 
// // // // // // // // // // // //             border-radius: 8px; 
// // // // // // // // // // // //             border-left: 4px solid #f97316; 
// // // // // // // // // // // //             margin: 16px 0; 
// // // // // // // // // // // //           }
// // // // // // // // // // // //           .task-details p { 
// // // // // // // // // // // //             margin: 6px 0; 
// // // // // // // // // // // //             font-size: 14px; 
// // // // // // // // // // // //           }
// // // // // // // // // // // //           .task-details strong { 
// // // // // // // // // // // //             color: #1e293b; 
// // // // // // // // // // // //             display: inline-block;
// // // // // // // // // // // //             min-width: 100px;
// // // // // // // // // // // //           }
// // // // // // // // // // // //           .task-details .value {
// // // // // // // // // // // //             color: #334155;
// // // // // // // // // // // //           }
// // // // // // // // // // // //           .notes { 
// // // // // // // // // // // //             background: #fef3c7; 
// // // // // // // // // // // //             padding: 16px 20px; 
// // // // // // // // // // // //             border-radius: 8px; 
// // // // // // // // // // // //             margin: 16px 0; 
// // // // // // // // // // // //             border-left: 4px solid #f59e0b;
// // // // // // // // // // // //           }
// // // // // // // // // // // //           .notes strong { 
// // // // // // // // // // // //             color: #92400e; 
// // // // // // // // // // // //             display: block;
// // // // // // // // // // // //             margin-bottom: 6px;
// // // // // // // // // // // //           }
// // // // // // // // // // // //           .notes p { 
// // // // // // // // // // // //             margin: 0; 
// // // // // // // // // // // //             color: #78350f; 
// // // // // // // // // // // //             white-space: pre-wrap; 
// // // // // // // // // // // //             font-size: 14px;
// // // // // // // // // // // //           }
// // // // // // // // // // // //           .sender-info { 
// // // // // // // // // // // //             background: #f0fdf4; 
// // // // // // // // // // // //             padding: 14px 18px; 
// // // // // // // // // // // //             border-radius: 8px; 
// // // // // // // // // // // //             border-left: 4px solid #22c55e; 
// // // // // // // // // // // //             margin: 16px 0; 
// // // // // // // // // // // //           }
// // // // // // // // // // // //           .sender-info p { 
// // // // // // // // // // // //             margin: 4px 0; 
// // // // // // // // // // // //             font-size: 14px;
// // // // // // // // // // // //           }
// // // // // // // // // // // //           .sender-info strong {
// // // // // // // // // // // //             color: #166534;
// // // // // // // // // // // //           }
// // // // // // // // // // // //           .badge { 
// // // // // // // // // // // //             display: inline-block; 
// // // // // // // // // // // //             background: #f97316; 
// // // // // // // // // // // //             color: white; 
// // // // // // // // // // // //             padding: 3px 14px; 
// // // // // // // // // // // //             border-radius: 20px; 
// // // // // // // // // // // //             font-size: 12px; 
// // // // // // // // // // // //             font-weight: 600; 
// // // // // // // // // // // //           }
// // // // // // // // // // // //           .rework-badge { 
// // // // // // // // // // // //             display: inline-block; 
// // // // // // // // // // // //             background: #ef4444; 
// // // // // // // // // // // //             color: white; 
// // // // // // // // // // // //             padding: 3px 14px; 
// // // // // // // // // // // //             border-radius: 20px; 
// // // // // // // // // // // //             font-size: 12px; 
// // // // // // // // // // // //             font-weight: 600; 
// // // // // // // // // // // //           }
// // // // // // // // // // // //           .next-steps {
// // // // // // // // // // // //             background: #f0f9ff;
// // // // // // // // // // // //             padding: 16px 20px;
// // // // // // // // // // // //             border-radius: 8px;
// // // // // // // // // // // //             border-left: 4px solid #3b82f6;
// // // // // // // // // // // //             margin: 16px 0;
// // // // // // // // // // // //           }
// // // // // // // // // // // //           .next-steps p {
// // // // // // // // // // // //             margin: 4px 0;
// // // // // // // // // // // //             font-size: 14px;
// // // // // // // // // // // //             color: #1e40af;
// // // // // // // // // // // //           }
// // // // // // // // // // // //           .next-steps strong {
// // // // // // // // // // // //             color: #1e3a8a;
// // // // // // // // // // // //           }
// // // // // // // // // // // //           .next-steps .step {
// // // // // // // // // // // //             display: flex;
// // // // // // // // // // // //             align-items: center;
// // // // // // // // // // // //             gap: 8px;
// // // // // // // // // // // //             margin: 4px 0;
// // // // // // // // // // // //           }
// // // // // // // // // // // //           .footer { 
// // // // // // // // // // // //             margin-top: 30px; 
// // // // // // // // // // // //             font-size: 12px; 
// // // // // // // // // // // //             color: #94a3b8; 
// // // // // // // // // // // //             border-top: 1px solid #e2e8f0; 
// // // // // // // // // // // //             padding-top: 20px; 
// // // // // // // // // // // //             text-align: center; 
// // // // // // // // // // // //           }
// // // // // // // // // // // //           .footer p {
// // // // // // // // // // // //             margin: 4px 0;
// // // // // // // // // // // //           }
// // // // // // // // // // // //           .footer .email-info {
// // // // // // // // // // // //             font-size: 11px;
// // // // // // // // // // // //             color: #94a3b8;
// // // // // // // // // // // //           }
// // // // // // // // // // // //           .divider {
// // // // // // // // // // // //             border: none;
// // // // // // // // // // // //             border-top: 1px solid #e2e8f0;
// // // // // // // // // // // //             margin: 20px 0;
// // // // // // // // // // // //           }
// // // // // // // // // // // //           .reply-box {
// // // // // // // // // // // //             background: #f8fafc;
// // // // // // // // // // // //             padding: 12px 16px;
// // // // // // // // // // // //             border-radius: 6px;
// // // // // // // // // // // //             margin: 16px 0;
// // // // // // // // // // // //           }
// // // // // // // // // // // //           .reply-box p {
// // // // // // // // // // // //             margin: 0;
// // // // // // // // // // // //             font-size: 13px;
// // // // // // // // // // // //             color: #475569;
// // // // // // // // // // // //           }
// // // // // // // // // // // //           .reply-box a {
// // // // // // // // // // // //             color: #3b82f6;
// // // // // // // // // // // //             text-decoration: none;
// // // // // // // // // // // //           }
// // // // // // // // // // // //           .reply-box a:hover {
// // // // // // // // // // // //             text-decoration: underline;
// // // // // // // // // // // //           }
// // // // // // // // // // // //           @media only screen and (max-width: 480px) {
// // // // // // // // // // // //             .container {
// // // // // // // // // // // //               padding: 12px;
// // // // // // // // // // // //             }
// // // // // // // // // // // //             .header {
// // // // // // // // // // // //               padding: 20px 16px;
// // // // // // // // // // // //               margin: -12px -12px 16px -12px;
// // // // // // // // // // // //             }
// // // // // // // // // // // //             .header h2 {
// // // // // // // // // // // //               font-size: 20px;
// // // // // // // // // // // //             }
// // // // // // // // // // // //             .task-details p {
// // // // // // // // // // // //               flex-direction: column;
// // // // // // // // // // // //               align-items: flex-start;
// // // // // // // // // // // //               gap: 2px;
// // // // // // // // // // // //             }
// // // // // // // // // // // //             .task-details strong {
// // // // // // // // // // // //               min-width: auto;
// // // // // // // // // // // //             }
// // // // // // // // // // // //           }
// // // // // // // // // // // //         </style>
// // // // // // // // // // // //       </head>
// // // // // // // // // // // //       <body>
// // // // // // // // // // // //         <div class="container">
// // // // // // // // // // // //           <!-- Header -->
// // // // // // // // // // // //           <div class="header">
// // // // // // // // // // // //             <h2>⚠️ Rework Request</h2>
// // // // // // // // // // // //             <p>Task requires additional development work</p>
// // // // // // // // // // // //           </div>
          
// // // // // // // // // // // //           <!-- Content -->
// // // // // // // // // // // //           <div class="content">
// // // // // // // // // // // //             <!-- Greeting -->
// // // // // // // // // // // //             <div class="greeting">
// // // // // // // // // // // //               <p>Hi <strong>${toName}</strong>,</p>
// // // // // // // // // // // //               <p>The task below requires rework and has been returned to you for further development.</p>
// // // // // // // // // // // //             </div>

// // // // // // // // // // // //             <!-- Task Details -->
// // // // // // // // // // // //             <div class="task-details">
// // // // // // // // // // // //               <p><strong>📋 Task:</strong> <span class="value">${taskTitle}</span></p>
// // // // // // // // // // // //               ${taskId ? `<p><strong>🆔 Task ID:</strong> <span class="value">#${taskId}</span></p>` : ''}
// // // // // // // // // // // //               ${projectName ? `<p><strong>📁 Project:</strong> <span class="value">${projectName}</span></p>` : ''}
// // // // // // // // // // // //               ${reworkCount ? `<p><strong>🔄 Rework Attempt:</strong> <span class="rework-badge">#${reworkCount}</span></p>` : ''}
// // // // // // // // // // // //               <p><strong>👤 Reported by:</strong> <span class="value">${fromName}</span></p>
// // // // // // // // // // // //               <p><strong>📧 Reporter Email:</strong> <span class="value">${fromEmail}</span></p>
// // // // // // // // // // // //               <p><strong>📅 Date:</strong> <span class="value">${currentDate}</span></p>
// // // // // // // // // // // //               <p><strong>⏰ Time:</strong> <span class="value">${currentTime}</span></p>
// // // // // // // // // // // //               <p><strong>📊 Status:</strong> <span class="badge">Rework Required</span></p>
// // // // // // // // // // // //             </div>

// // // // // // // // // // // //             <!-- Sender Info -->
// // // // // // // // // // // //             <div class="sender-info">
// // // // // // // // // // // //               <p><strong>📧 From:</strong> ${fromName} (${fromEmail})</p>
// // // // // // // // // // // //               <p style="margin: 4px 0 0 0; font-size: 13px; color: #64748b;">
// // // // // // // // // // // //                 <em>Please reply directly to ${fromName} if you have any questions.</em>
// // // // // // // // // // // //               </p>
// // // // // // // // // // // //             </div>

// // // // // // // // // // // //             <!-- Rework Notes -->
// // // // // // // // // // // //             <div class="notes">
// // // // // // // // // // // //               <strong>📝 Feedback from ${fromName}:</strong>
// // // // // // // // // // // //               <p>${reworkNotes}</p>
// // // // // // // // // // // //             </div>

// // // // // // // // // // // //             <!-- Next Steps -->
// // // // // // // // // // // //             <div class="next-steps">
// // // // // // // // // // // //               <p><strong>📌 Next Steps:</strong></p>
// // // // // // // // // // // //               <div class="step">1️⃣ Review the feedback above</div>
// // // // // // // // // // // //               <div class="step">2️⃣ Make the required changes</div>
// // // // // // // // // // // //               <div class="step">3️⃣ Update task status to "In Progress"</div>
// // // // // // // // // // // //               <div class="step">4️⃣ Submit for review when done</div>
// // // // // // // // // // // //             </div>

// // // // // // // // // // // //             <p style="font-size: 14px; color: #64748b;">
// // // // // // // // // // // //               <em>Please address these issues and update the task status when ready for re-testing.</em>
// // // // // // // // // // // //             </p>

// // // // // // // // // // // //             <hr class="divider">

// // // // // // // // // // // //             <!-- Reply Box -->
// // // // // // // // // // // //             <div class="reply-box">
// // // // // // // // // // // //               <p>
// // // // // // // // // // // //                 <strong>💡 Need clarification?</strong> Reply directly to 
// // // // // // // // // // // //                 <a href="mailto:${fromEmail}">${fromName}</a> at 
// // // // // // // // // // // //                 <a href="mailto:${fromEmail}" style="color: #3b82f6; text-decoration: none;">${fromEmail}</a>
// // // // // // // // // // // //               </p>
// // // // // // // // // // // //             </div>
// // // // // // // // // // // //           </div>
          
// // // // // // // // // // // //           <!-- Footer -->
// // // // // // // // // // // //           <div class="footer">
// // // // // // // // // // // //             <p><strong>From:</strong> ${fromName} (${fromEmail})</p>
// // // // // // // // // // // //             <p><strong>To:</strong> ${toName} (${toEmail})</p>
// // // // // // // // // // // //             <p>&copy; ${new Date().getFullYear()} Business OS. All rights reserved.</p>
// // // // // // // // // // // //             <p class="email-info">This is an automated notification from the Task Board System.</p>
// // // // // // // // // // // //           </div>
// // // // // // // // // // // //         </div>
// // // // // // // // // // // //       </body>
// // // // // // // // // // // //     </html>
// // // // // // // // // // // //   `;

// // // // // // // // // // // //   try {
// // // // // // // // // // // //     const info = await transporter.sendMail({
// // // // // // // // // // // //       from: fromAddress,     // ✅ From environment variable
// // // // // // // // // // // //       to: toEmail,          // ✅ Developer email from database
// // // // // // // // // // // //       subject: `⚠️ REWORK REQUIRED: ${taskTitle} (from ${fromName})`,
// // // // // // // // // // // //       html: htmlContent,
// // // // // // // // // // // //       replyTo: fromEmail    // ✅ Tester email for replies
// // // // // // // // // // // //     });

// // // // // // // // // // // //     console.log('✅ Email sent successfully!');
// // // // // // // // // // // //     console.log('  From:', fromAddress);
// // // // // // // // // // // //     console.log('  To:', toEmail);
// // // // // // // // // // // //     console.log('  Reply-To:', fromEmail);
// // // // // // // // // // // //     console.log('  Message ID:', info.messageId);
// // // // // // // // // // // //     return true;
// // // // // // // // // // // //   } catch (error: any) {
// // // // // // // // // // // //     console.error('❌ Error sending email:', error.message);
// // // // // // // // // // // //     if (error.message.includes('Invalid credentials')) {
// // // // // // // // // // // //       console.error('💡 Your App Password is invalid or expired.');
// // // // // // // // // // // //       console.error('   Generate a new one at: https://myaccount.google.com/apppasswords');
// // // // // // // // // // // //     }
// // // // // // // // // // // //     return false;
// // // // // // // // // // // //   }
// // // // // // // // // // // // };

// // // // // // // // // // // // export default transporter;
// // // // // // // // // // // // services/emailService.ts

// // // // // // // // // // // import nodemailer from 'nodemailer';
// // // // // // // // // // // import dotenv from 'dotenv';

// // // // // // // // // // // dotenv.config();

// // // // // // // // // // // // ✅ Get SMTP from environment variables
// // // // // // // // // // // const SMTP_USER = process.env.SMTP_USER || '';
// // // // // // // // // // // const SMTP_PASS = process.env.SMTP_PASS || '';
// // // // // // // // // // // const SMTP_HOST = process.env.SMTP_HOST || 'smtp.gmail.com';
// // // // // // // // // // // const SMTP_PORT = parseInt(process.env.SMTP_PORT || '587');
// // // // // // // // // // // const SMTP_SECURE = process.env.SMTP_SECURE === 'true';
// // // // // // // // // // // const SMTP_FROM = process.env.SMTP_FROM || SMTP_USER || 'noreply@business-os.com';

// // // // // // // // // // // console.log('📧 Email Service Initialized:');
// // // // // // // // // // // console.log('  SMTP Host:', SMTP_HOST);
// // // // // // // // // // // console.log('  SMTP Port:', SMTP_PORT);
// // // // // // // // // // // console.log('  SMTP User:', SMTP_USER ? '✅ Set' : '❌ Missing');
// // // // // // // // // // // console.log('  SMTP Pass:', SMTP_PASS ? '✅ Set' : '❌ Missing');
// // // // // // // // // // // console.log('  SMTP FROM:', SMTP_FROM);

// // // // // // // // // // // let transporter: any;

// // // // // // // // // // // // ✅ Check if credentials exist
// // // // // // // // // // // if (SMTP_USER && SMTP_PASS) {
// // // // // // // // // // //   try {
// // // // // // // // // // //     transporter = nodemailer.createTransport({
// // // // // // // // // // //       host: SMTP_HOST,
// // // // // // // // // // //       port: SMTP_PORT,
// // // // // // // // // // //       secure: SMTP_SECURE,
// // // // // // // // // // //       auth: {
// // // // // // // // // // //         user: SMTP_USER,
// // // // // // // // // // //         pass: SMTP_PASS
// // // // // // // // // // //       }
// // // // // // // // // // //     });

// // // // // // // // // // //     // Verify connection
// // // // // // // // // // //     transporter.verify((error: Error | null, success: boolean) => {
// // // // // // // // // // //       if (error) {
// // // // // // // // // // //         console.error('❌ SMTP connection error:', error.message);
// // // // // // // // // // //         if (error.message.includes('Invalid credentials')) {
// // // // // // // // // // //           console.error('💡 Your App Password may be expired.');
// // // // // // // // // // //           console.error('   Generate a new one at: https://myaccount.google.com/apppasswords');
// // // // // // // // // // //         }
// // // // // // // // // // //       } else {
// // // // // // // // // // //         console.log('✅ SMTP server ready');
// // // // // // // // // // //       }
// // // // // // // // // // //     });
// // // // // // // // // // //   } catch (error: any) {
// // // // // // // // // // //     console.error('❌ SMTP setup error:', error.message);
// // // // // // // // // // //   }
// // // // // // // // // // // } else {
// // // // // // // // // // //   console.warn('⚠️ SMTP credentials missing - Email features disabled');
// // // // // // // // // // //   console.warn('   Please set SMTP_USER and SMTP_PASS in .env file');
// // // // // // // // // // //   transporter = {
// // // // // // // // // // //     sendMail: (options: any) => {
// // // // // // // // // // //       console.log('📧 [MOCK] Would send email to:', options.to);
// // // // // // // // // // //       return Promise.resolve({ messageId: 'mock-' + Date.now() });
// // // // // // // // // // //     }
// // // // // // // // // // //   };
// // // // // // // // // // // }

// // // // // // // // // // // interface EmailParams {
// // // // // // // // // // //   toEmail: string;
// // // // // // // // // // //   toName: string;
// // // // // // // // // // //   taskTitle: string;
// // // // // // // // // // //   reworkNotes: string;
// // // // // // // // // // //   fromName: string;
// // // // // // // // // // //   fromEmail: string;
// // // // // // // // // // //   taskId?: string;
// // // // // // // // // // //   projectName?: string;
// // // // // // // // // // //   reworkCount?: number;
// // // // // // // // // // // }

// // // // // // // // // // // export const sendReworkRequestEmail = async (params: EmailParams): Promise<boolean> => {
// // // // // // // // // // //   const { 
// // // // // // // // // // //     toEmail, 
// // // // // // // // // // //     toName, 
// // // // // // // // // // //     taskTitle, 
// // // // // // // // // // //     reworkNotes, 
// // // // // // // // // // //     fromName, 
// // // // // // // // // // //     fromEmail,
// // // // // // // // // // //     taskId,
// // // // // // // // // // //     projectName,
// // // // // // // // // // //     reworkCount
// // // // // // // // // // //   } = params;

// // // // // // // // // // //   if (!SMTP_USER || !SMTP_PASS) {
// // // // // // // // // // //     console.warn('⚠️ Rework email skipped - SMTP not configured');
// // // // // // // // // // //     return false;
// // // // // // // // // // //   }

// // // // // // // // // // //   if (!toEmail) {
// // // // // // // // // // //     console.error('❌ Developer email is required');
// // // // // // // // // // //     return false;
// // // // // // // // // // //   }

// // // // // // // // // // //   const fromAddress = SMTP_FROM;

// // // // // // // // // // //   console.log('📧 Sending email:');
// // // // // // // // // // //   console.log('  FROM:', fromAddress);
// // // // // // // // // // //   console.log('  TO:', toEmail);
// // // // // // // // // // //   console.log('  REPLY-TO:', fromEmail);

// // // // // // // // // // //   const currentDate = new Date().toLocaleDateString('en-US', {
// // // // // // // // // // //     weekday: 'long',
// // // // // // // // // // //     year: 'numeric',
// // // // // // // // // // //     month: 'long',
// // // // // // // // // // //     day: 'numeric'
// // // // // // // // // // //   });

// // // // // // // // // // //   const htmlContent = `
// // // // // // // // // // //     <!DOCTYPE html>
// // // // // // // // // // //     <html>
// // // // // // // // // // //       <head>
// // // // // // // // // // //         <style>
// // // // // // // // // // //           body { font-family: Arial, sans-serif; color: #333; background: #f9fafb; margin: 0; padding: 20px; }
// // // // // // // // // // //           .container { max-width: 600px; margin: 0 auto; padding: 20px; background: #fff; border-radius: 12px; box-shadow: 0 2px 10px rgba(0,0,0,0.1); }
// // // // // // // // // // //           .header { background: #f97316; padding: 20px; border-radius: 10px 10px 0 0; text-align: center; }
// // // // // // // // // // //           .header h2 { margin: 0; color: #fff; font-size: 24px; }
// // // // // // // // // // //           .header p { margin: 5px 0 0 0; color: #fef3c7; font-size: 14px; }
// // // // // // // // // // //           .content { padding: 10px; }
// // // // // // // // // // //           .task-details { background: #f8fafc; padding: 15px; border-radius: 8px; border-left: 4px solid #f97316; margin: 15px 0; }
// // // // // // // // // // //           .task-details p { margin: 6px 0; font-size: 14px; }
// // // // // // // // // // //           .task-details strong { color: #1e293b; display: inline-block; min-width: 100px; }
// // // // // // // // // // //           .notes { background: #fef3c7; padding: 15px; border-radius: 8px; margin: 15px 0; border-left: 4px solid #f59e0b; }
// // // // // // // // // // //           .notes strong { color: #92400e; }
// // // // // // // // // // //           .notes p { margin: 8px 0 0 0; color: #78350f; white-space: pre-wrap; }
// // // // // // // // // // //           .sender-info { background: #f0fdf4; padding: 12px; border-radius: 8px; border-left: 4px solid #22c55e; margin: 15px 0; }
// // // // // // // // // // //           .sender-info p { margin: 4px 0; }
// // // // // // // // // // //           .badge { display: inline-block; background: #f97316; color: white; padding: 3px 12px; border-radius: 20px; font-size: 12px; }
// // // // // // // // // // //           .footer { margin-top: 20px; font-size: 12px; color: #94a3b8; border-top: 1px solid #e2e8f0; padding-top: 15px; text-align: center; }
// // // // // // // // // // //         </style>
// // // // // // // // // // //       </head>
// // // // // // // // // // //       <body>
// // // // // // // // // // //         <div class="container">
// // // // // // // // // // //           <div class="header">
// // // // // // // // // // //             <h2>⚠️ Rework Request</h2>
// // // // // // // // // // //             <p>Task requires additional work</p>
// // // // // // // // // // //           </div>
          
// // // // // // // // // // //           <div class="content">
// // // // // // // // // // //             <p>Hi <strong>${toName}</strong>,</p>
            
// // // // // // // // // // //             <p>The task below requires rework and has been returned to you for further development.</p>
            
// // // // // // // // // // //             <div class="task-details">
// // // // // // // // // // //               <p><strong>📋 Task:</strong> ${taskTitle}</p>
// // // // // // // // // // //               ${projectName ? `<p><strong>📁 Project:</strong> ${projectName}</p>` : ''}
// // // // // // // // // // //               ${reworkCount ? `<p><strong>🔄 Rework #:</strong> ${reworkCount}</p>` : ''}
// // // // // // // // // // //               <p><strong>👤 Reported by:</strong> ${fromName}</p>
// // // // // // // // // // //               <p><strong>📅 Date:</strong> ${currentDate}</p>
// // // // // // // // // // //               <p><strong>📊 Status:</strong> <span class="badge">Rework Required</span></p>
// // // // // // // // // // //             </div>

// // // // // // // // // // //             <div class="sender-info">
// // // // // // // // // // //               <p><strong>📧 From:</strong> ${fromName} (${fromEmail})</p>
// // // // // // // // // // //             </div>
            
// // // // // // // // // // //             <div class="notes">
// // // // // // // // // // //               <strong>📝 Feedback from ${fromName}:</strong>
// // // // // // // // // // //               <p>${reworkNotes}</p>
// // // // // // // // // // //             </div>

// // // // // // // // // // //             <p>Please address these issues and update the task status when ready for re-testing.</p>
// // // // // // // // // // //           </div>
          
// // // // // // // // // // //           <div class="footer">
// // // // // // // // // // //             <p><strong>From:</strong> ${fromName} (${fromEmail})</p>
// // // // // // // // // // //             <p><strong>To:</strong> ${toName} (${toEmail})</p>
// // // // // // // // // // //             <p>&copy; ${new Date().getFullYear()} Business OS</p>
// // // // // // // // // // //           </div>
// // // // // // // // // // //         </div>
// // // // // // // // // // //       </body>
// // // // // // // // // // //     </html>
// // // // // // // // // // //   `;

// // // // // // // // // // //   try {
// // // // // // // // // // //     const info = await transporter.sendMail({
// // // // // // // // // // //       from: fromAddress,
// // // // // // // // // // //       to: toEmail,
// // // // // // // // // // //       subject: `⚠️ REWORK REQUIRED: ${taskTitle} (from ${fromName})`,
// // // // // // // // // // //       html: htmlContent,
// // // // // // // // // // //       replyTo: fromEmail
// // // // // // // // // // //     });

// // // // // // // // // // //     console.log('✅ Email sent successfully!');
// // // // // // // // // // //     console.log('  From:', fromAddress);
// // // // // // // // // // //     console.log('  To:', toEmail);
// // // // // // // // // // //     console.log('  Reply-To:', fromEmail);
// // // // // // // // // // //     return true;
// // // // // // // // // // //   } catch (error: any) {
// // // // // // // // // // //     console.error('❌ Error sending email:', error.message);
// // // // // // // // // // //     return false;
// // // // // // // // // // //   }
// // // // // // // // // // // };

// // // // // // // // // // // export default transporter;
// // // // // // // // // // // services/emailService.ts

// // // // // // // // // // import nodemailer from 'nodemailer';
// // // // // // // // // // import dotenv from 'dotenv';

// // // // // // // // // // dotenv.config();

// // // // // // // // // // // ✅ Get SMTP from environment variables
// // // // // // // // // // const SMTP_USER = process.env.SMTP_USER || '';
// // // // // // // // // // const SMTP_PASS = process.env.SMTP_PASS || '';
// // // // // // // // // // const SMTP_HOST = process.env.SMTP_HOST || 'smtp.gmail.com';
// // // // // // // // // // const SMTP_PORT = parseInt(process.env.SMTP_PORT || '587');
// // // // // // // // // // const SMTP_SECURE = process.env.SMTP_SECURE === 'true';
// // // // // // // // // // const SMTP_FROM = process.env.SMTP_FROM || SMTP_USER || 'noreply@business-os.com';

// // // // // // // // // // console.log('📧 Email Service Initialized:');
// // // // // // // // // // console.log('  SMTP Host:', SMTP_HOST);
// // // // // // // // // // console.log('  SMTP Port:', SMTP_PORT);
// // // // // // // // // // console.log('  SMTP User:', SMTP_USER ? '✅ Set' : '❌ Missing');
// // // // // // // // // // console.log('  SMTP Pass:', SMTP_PASS ? '✅ Set' : '❌ Missing');
// // // // // // // // // // console.log('  SMTP FROM:', SMTP_FROM);

// // // // // // // // // // let transporter: any;

// // // // // // // // // // // ✅ Check if credentials exist
// // // // // // // // // // if (SMTP_USER && SMTP_PASS) {
// // // // // // // // // //   try {
// // // // // // // // // //     transporter = nodemailer.createTransport({
// // // // // // // // // //       host: SMTP_HOST,
// // // // // // // // // //       port: SMTP_PORT,
// // // // // // // // // //       secure: SMTP_SECURE,
// // // // // // // // // //       auth: {
// // // // // // // // // //         user: SMTP_USER,
// // // // // // // // // //         pass: SMTP_PASS
// // // // // // // // // //       }
// // // // // // // // // //     });

// // // // // // // // // //     // Verify connection
// // // // // // // // // //     transporter.verify((error: Error | null, success: boolean) => {
// // // // // // // // // //       if (error) {
// // // // // // // // // //         console.error('❌ SMTP connection error:', error.message);
// // // // // // // // // //         if (error.message.includes('Invalid credentials')) {
// // // // // // // // // //           console.error('💡 Your App Password may be expired.');
// // // // // // // // // //           console.error('   Generate a new one at: https://myaccount.google.com/apppasswords');
// // // // // // // // // //         }
// // // // // // // // // //       } else {
// // // // // // // // // //         console.log('✅ SMTP server ready');
// // // // // // // // // //       }
// // // // // // // // // //     });
// // // // // // // // // //   } catch (error: any) {
// // // // // // // // // //     console.error('❌ SMTP setup error:', error.message);
// // // // // // // // // //   }
// // // // // // // // // // } else {
// // // // // // // // // //   console.warn('⚠️ SMTP credentials missing - Email features disabled');
// // // // // // // // // //   console.warn('   Please set SMTP_USER and SMTP_PASS in .env file');
// // // // // // // // // //   transporter = {
// // // // // // // // // //     sendMail: (options: any) => {
// // // // // // // // // //       console.log('📧 [MOCK] Would send email to:', options.to);
// // // // // // // // // //       return Promise.resolve({ messageId: 'mock-' + Date.now() });
// // // // // // // // // //     }
// // // // // // // // // //   };
// // // // // // // // // // }

// // // // // // // // // // interface EmailParams {
// // // // // // // // // //   toEmail: string;
// // // // // // // // // //   toName: string;
// // // // // // // // // //   taskTitle: string;
// // // // // // // // // //   reworkNotes: string;
// // // // // // // // // //   fromName: string;
// // // // // // // // // //   fromEmail: string;
// // // // // // // // // //   taskId?: string;
// // // // // // // // // //   projectName?: string;
// // // // // // // // // //   reworkCount?: number;
// // // // // // // // // // }

// // // // // // // // // // export const sendReworkRequestEmail = async (params: EmailParams): Promise<boolean> => {
// // // // // // // // // //   const { 
// // // // // // // // // //     toEmail, 
// // // // // // // // // //     toName, 
// // // // // // // // // //     taskTitle, 
// // // // // // // // // //     reworkNotes, 
// // // // // // // // // //     fromName, 
// // // // // // // // // //     fromEmail,
// // // // // // // // // //     taskId,
// // // // // // // // // //     projectName,
// // // // // // // // // //     reworkCount
// // // // // // // // // //   } = params;

// // // // // // // // // //   if (!SMTP_USER || !SMTP_PASS) {
// // // // // // // // // //     console.warn('⚠️ Rework email skipped - SMTP not configured');
// // // // // // // // // //     return false;
// // // // // // // // // //   }

// // // // // // // // // //   if (!toEmail) {
// // // // // // // // // //     console.error('❌ Developer email is required');
// // // // // // // // // //     return false;
// // // // // // // // // //   }

// // // // // // // // // //   const fromAddress = SMTP_FROM;

// // // // // // // // // //   console.log('📧 Sending email:');
// // // // // // // // // //   console.log('  FROM:', fromAddress);
// // // // // // // // // //   console.log('  TO:', toEmail);
// // // // // // // // // //   console.log('  REPLY-TO:', fromEmail);

// // // // // // // // // //   const currentDate = new Date().toLocaleDateString('en-US', {
// // // // // // // // // //     weekday: 'long',
// // // // // // // // // //     year: 'numeric',
// // // // // // // // // //     month: 'long',
// // // // // // // // // //     day: 'numeric'
// // // // // // // // // //   });

// // // // // // // // // //   const htmlContent = `
// // // // // // // // // //     <!DOCTYPE html>
// // // // // // // // // //     <html>
// // // // // // // // // //       <head>
// // // // // // // // // //         <style>
// // // // // // // // // //           body { font-family: Arial, sans-serif; color: #333; background: #f9fafb; margin: 0; padding: 20px; }
// // // // // // // // // //           .container { max-width: 600px; margin: 0 auto; padding: 20px; background: #fff; border-radius: 12px; box-shadow: 0 2px 10px rgba(0,0,0,0.1); }
// // // // // // // // // //           .header { background: #f97316; padding: 20px; border-radius: 10px 10px 0 0; text-align: center; }
// // // // // // // // // //           .header h2 { margin: 0; color: #fff; font-size: 24px; }
// // // // // // // // // //           .header p { margin: 5px 0 0 0; color: #fef3c7; font-size: 14px; }
// // // // // // // // // //           .content { padding: 10px; }
// // // // // // // // // //           .task-details { background: #f8fafc; padding: 15px; border-radius: 8px; border-left: 4px solid #f97316; margin: 15px 0; }
// // // // // // // // // //           .task-details p { margin: 6px 0; font-size: 14px; }
// // // // // // // // // //           .task-details strong { color: #1e293b; display: inline-block; min-width: 100px; }
// // // // // // // // // //           .notes { background: #fef3c7; padding: 15px; border-radius: 8px; margin: 15px 0; border-left: 4px solid #f59e0b; }
// // // // // // // // // //           .notes strong { color: #92400e; }
// // // // // // // // // //           .notes p { margin: 8px 0 0 0; color: #78350f; white-space: pre-wrap; }
// // // // // // // // // //           .sender-info { background: #f0fdf4; padding: 12px; border-radius: 8px; border-left: 4px solid #22c55e; margin: 15px 0; }
// // // // // // // // // //           .sender-info p { margin: 4px 0; }
// // // // // // // // // //           .badge { display: inline-block; background: #f97316; color: white; padding: 3px 12px; border-radius: 20px; font-size: 12px; }
// // // // // // // // // //           .footer { margin-top: 20px; font-size: 12px; color: #94a3b8; border-top: 1px solid #e2e8f0; padding-top: 15px; text-align: center; }
// // // // // // // // // //         </style>
// // // // // // // // // //       </head>
// // // // // // // // // //       <body>
// // // // // // // // // //         <div class="container">
// // // // // // // // // //           <div class="header">
// // // // // // // // // //             <h2>⚠️ Rework Request</h2>
// // // // // // // // // //             <p>Task requires additional work</p>
// // // // // // // // // //           </div>
          
// // // // // // // // // //           <div class="content">
// // // // // // // // // //             <p>Hi <strong>${toName}</strong>,</p>
            
// // // // // // // // // //             <p>The task below requires rework and has been returned to you for further development.</p>
            
// // // // // // // // // //             <div class="task-details">
// // // // // // // // // //               <p><strong>📋 Task:</strong> ${taskTitle}</p>
// // // // // // // // // //               ${projectName ? `<p><strong>📁 Project:</strong> ${projectName}</p>` : ''}
// // // // // // // // // //               ${reworkCount ? `<p><strong>🔄 Rework #:</strong> ${reworkCount}</p>` : ''}
// // // // // // // // // //               <p><strong>👤 Reported by:</strong> ${fromName}</p>
// // // // // // // // // //               <p><strong>📅 Date:</strong> ${currentDate}</p>
// // // // // // // // // //               <p><strong>📊 Status:</strong> <span class="badge">Rework Required</span></p>
// // // // // // // // // //             </div>

// // // // // // // // // //             <div class="sender-info">
// // // // // // // // // //               <p><strong>📧 From:</strong> ${fromName} (${fromEmail})</p>
// // // // // // // // // //             </div>
            
// // // // // // // // // //             <div class="notes">
// // // // // // // // // //               <strong>📝 Feedback from ${fromName}:</strong>
// // // // // // // // // //               <p>${reworkNotes}</p>
// // // // // // // // // //             </div>

// // // // // // // // // //             <p>Please address these issues and update the task status when ready for re-testing.</p>
// // // // // // // // // //           </div>
          
// // // // // // // // // //           <div class="footer">
// // // // // // // // // //             <p><strong>From:</strong> ${fromName} (${fromEmail})</p>
// // // // // // // // // //             <p><strong>To:</strong> ${toName} (${toEmail})</p>
// // // // // // // // // //             <p>&copy; ${new Date().getFullYear()} Business OS</p>
// // // // // // // // // //           </div>
// // // // // // // // // //         </div>
// // // // // // // // // //       </body>
// // // // // // // // // //     </html>
// // // // // // // // // //   `;

// // // // // // // // // //   try {
// // // // // // // // // //     const info = await transporter.sendMail({
// // // // // // // // // //       from: fromAddress,
// // // // // // // // // //       to: toEmail,
// // // // // // // // // //       subject: `⚠️ REWORK REQUIRED: ${taskTitle} (from ${fromName})`,
// // // // // // // // // //       html: htmlContent,
// // // // // // // // // //       replyTo: fromEmail
// // // // // // // // // //     });

// // // // // // // // // //     console.log('✅ Email sent successfully!');
// // // // // // // // // //     console.log('  From:', fromAddress);
// // // // // // // // // //     console.log('  To:', toEmail);
// // // // // // // // // //     console.log('  Reply-To:', fromEmail);
// // // // // // // // // //     return true;
// // // // // // // // // //   } catch (error: any) {
// // // // // // // // // //     console.error('❌ Error sending email:', error.message);
// // // // // // // // // //     return false;
// // // // // // // // // //   }
// // // // // // // // // // };

// // // // // // // // // // export default transporter;
// // // // // // // // // // services/emailService.ts

// // // // // // // // // import nodemailer from 'nodemailer';
// // // // // // // // // import dotenv from 'dotenv';

// // // // // // // // // dotenv.config();

// // // // // // // // // // ✅ Get SMTP from environment variables
// // // // // // // // // const SMTP_USER = process.env.SMTP_USER || '';
// // // // // // // // // const SMTP_PASS = process.env.SMTP_PASS || '';
// // // // // // // // // const SMTP_HOST = process.env.SMTP_HOST || 'smtp.gmail.com';
// // // // // // // // // const SMTP_PORT = parseInt(process.env.SMTP_PORT || '587');
// // // // // // // // // const SMTP_SECURE = process.env.SMTP_SECURE === 'true';
// // // // // // // // // const SMTP_FROM = process.env.SMTP_FROM || SMTP_USER || 'noreply@business-os.com';

// // // // // // // // // console.log('📧 Email Service Initialized:');
// // // // // // // // // console.log('  SMTP FROM:', SMTP_FROM);

// // // // // // // // // let transporter: any;

// // // // // // // // // if (SMTP_USER && SMTP_PASS) {
// // // // // // // // //   try {
// // // // // // // // //     transporter = nodemailer.createTransport({
// // // // // // // // //       host: SMTP_HOST,
// // // // // // // // //       port: SMTP_PORT,
// // // // // // // // //       secure: SMTP_SECURE,
// // // // // // // // //       auth: {
// // // // // // // // //         user: SMTP_USER,
// // // // // // // // //         pass: SMTP_PASS
// // // // // // // // //       }
// // // // // // // // //     });

// // // // // // // // //     transporter.verify((error: Error | null, success: boolean) => {
// // // // // // // // //       if (error) {
// // // // // // // // //         console.error('❌ SMTP connection error:', error.message);
// // // // // // // // //       } else {
// // // // // // // // //         console.log('✅ SMTP server ready');
// // // // // // // // //       }
// // // // // // // // //     });
// // // // // // // // //   } catch (error: any) {
// // // // // // // // //     console.error('❌ SMTP setup error:', error.message);
// // // // // // // // //   }
// // // // // // // // // } else {
// // // // // // // // //   console.warn('⚠️ SMTP credentials missing');
// // // // // // // // //   transporter = {
// // // // // // // // //     sendMail: (options: any) => {
// // // // // // // // //       console.log('📧 [MOCK] Would send email to:', options.to);
// // // // // // // // //       return Promise.resolve({ messageId: 'mock-' + Date.now() });
// // // // // // // // //     }
// // // // // // // // //   };
// // // // // // // // // }

// // // // // // // // // interface EmailParams {
// // // // // // // // //   toEmail: string;
// // // // // // // // //   toName: string;
// // // // // // // // //   taskTitle: string;
// // // // // // // // //   reworkNotes: string;
// // // // // // // // //   fromName: string;
// // // // // // // // //   fromEmail: string;
// // // // // // // // //   taskId?: string;
// // // // // // // // //   projectName?: string;
// // // // // // // // //   reworkCount?: number;
// // // // // // // // //   originalDeveloper?: string;
// // // // // // // // // }

// // // // // // // // // export const sendReworkRequestEmail = async (params: EmailParams): Promise<boolean> => {
// // // // // // // // //   const { 
// // // // // // // // //     toEmail, 
// // // // // // // // //     toName, 
// // // // // // // // //     taskTitle, 
// // // // // // // // //     reworkNotes, 
// // // // // // // // //     fromName, 
// // // // // // // // //     fromEmail,
// // // // // // // // //     taskId,
// // // // // // // // //     projectName,
// // // // // // // // //     reworkCount,
// // // // // // // // //     originalDeveloper
// // // // // // // // //   } = params;

// // // // // // // // //   if (!SMTP_USER || !SMTP_PASS) {
// // // // // // // // //     console.warn('⚠️ Rework email skipped');
// // // // // // // // //     return false;
// // // // // // // // //   }

// // // // // // // // //   if (!toEmail) {
// // // // // // // // //     console.error('❌ Developer email is required');
// // // // // // // // //     return false;
// // // // // // // // //   }

// // // // // // // // //   const fromAddress = SMTP_FROM;
// // // // // // // // //   const currentDate = new Date().toLocaleDateString('en-US', {
// // // // // // // // //     weekday: 'long',
// // // // // // // // //     year: 'numeric',
// // // // // // // // //     month: 'long',
// // // // // // // // //     day: 'numeric'
// // // // // // // // //   });

// // // // // // // // //   console.log(`📧 Sending email to: ${toEmail} (${toName})`);

// // // // // // // // //   const htmlContent = `
// // // // // // // // //     <!DOCTYPE html>
// // // // // // // // //     <html>
// // // // // // // // //       <head>
// // // // // // // // //         <style>
// // // // // // // // //           body { font-family: Arial, sans-serif; color: #333; background: #f9fafb; margin: 0; padding: 20px; }
// // // // // // // // //           .container { max-width: 600px; margin: 0 auto; padding: 20px; background: #fff; border-radius: 12px; box-shadow: 0 2px 10px rgba(0,0,0,0.1); }
// // // // // // // // //           .header { background: #f97316; padding: 20px; border-radius: 10px 10px 0 0; text-align: center; }
// // // // // // // // //           .header h2 { margin: 0; color: #fff; font-size: 24px; }
// // // // // // // // //           .header p { margin: 5px 0 0 0; color: #fef3c7; font-size: 14px; }
// // // // // // // // //           .content { padding: 10px; }
// // // // // // // // //           .task-details { background: #f8fafc; padding: 15px; border-radius: 8px; border-left: 4px solid #f97316; margin: 15px 0; }
// // // // // // // // //           .task-details p { margin: 6px 0; font-size: 14px; }
// // // // // // // // //           .task-details strong { color: #1e293b; display: inline-block; min-width: 120px; }
// // // // // // // // //           .notes { background: #fef3c7; padding: 15px; border-radius: 8px; margin: 15px 0; border-left: 4px solid #f59e0b; }
// // // // // // // // //           .notes strong { color: #92400e; }
// // // // // // // // //           .notes p { margin: 8px 0 0 0; color: #78350f; white-space: pre-wrap; }
// // // // // // // // //           .sender-info { background: #f0fdf4; padding: 12px; border-radius: 8px; border-left: 4px solid #22c55e; margin: 15px 0; }
// // // // // // // // //           .sender-info p { margin: 4px 0; }
// // // // // // // // //           .badge { display: inline-block; background: #f97316; color: white; padding: 3px 12px; border-radius: 20px; font-size: 12px; }
// // // // // // // // //           .rework-badge { display: inline-block; background: #ef4444; color: white; padding: 3px 12px; border-radius: 20px; font-size: 12px; }
// // // // // // // // //           .footer { margin-top: 20px; font-size: 12px; color: #94a3b8; border-top: 1px solid #e2e8f0; padding-top: 15px; text-align: center; }
// // // // // // // // //         </style>
// // // // // // // // //       </head>
// // // // // // // // //       <body>
// // // // // // // // //         <div class="container">
// // // // // // // // //           <div class="header">
// // // // // // // // //             <h2>⚠️ Rework Request</h2>
// // // // // // // // //             <p>Task requires additional work</p>
// // // // // // // // //           </div>
          
// // // // // // // // //           <div class="content">
// // // // // // // // //             <p>Hi <strong>${toName}</strong>,</p>
            
// // // // // // // // //             <p>The task below requires rework and has been returned to you for further development.</p>
            
// // // // // // // // //             <div class="task-details">
// // // // // // // // //               <p><strong>📋 Task:</strong> ${taskTitle}</p>
// // // // // // // // //               ${projectName ? `<p><strong>📁 Project:</strong> ${projectName}</p>` : ''}
// // // // // // // // //               ${originalDeveloper ? `<p><strong>👤 Original Developer:</strong> ${originalDeveloper}</p>` : ''}
// // // // // // // // //               ${reworkCount ? `<p><strong>🔄 Rework #:</strong> <span class="rework-badge">${reworkCount}</span></p>` : ''}
// // // // // // // // //               <p><strong>👤 Reported by:</strong> ${fromName}</p>
// // // // // // // // //               <p><strong>📧 Reporter Email:</strong> ${fromEmail}</p>
// // // // // // // // //               <p><strong>📅 Date:</strong> ${currentDate}</p>
// // // // // // // // //               <p><strong>📊 Status:</strong> <span class="badge">Rework Required</span></p>
// // // // // // // // //             </div>

// // // // // // // // //             <div class="sender-info">
// // // // // // // // //               <p><strong>📧 From:</strong> ${fromName} (${fromEmail})</p>
// // // // // // // // //               <p style="margin: 4px 0 0 0; font-size: 13px; color: #64748b;">
// // // // // // // // //                 <em>Please reply directly to ${fromName} if you have questions.</em>
// // // // // // // // //               </p>
// // // // // // // // //             </div>
            
// // // // // // // // //             <div class="notes">
// // // // // // // // //               <strong>📝 Feedback from ${fromName}:</strong>
// // // // // // // // //               <p>${reworkNotes}</p>
// // // // // // // // //             </div>

// // // // // // // // //             <div style="background: #f0f9ff; padding: 12px; border-radius: 8px; border-left: 4px solid #3b82f6; margin: 15px 0;">
// // // // // // // // //               <p style="margin: 0; font-size: 14px; color: #1e40af;">
// // // // // // // // //                 <strong>📌 Next Steps:</strong><br>
// // // // // // // // //                 1️⃣ Review the feedback above<br>
// // // // // // // // //                 2️⃣ Make the required changes<br>
// // // // // // // // //                 3️⃣ Update task status to "In Progress"<br>
// // // // // // // // //                 4️⃣ Submit for review when done
// // // // // // // // //               </p>
// // // // // // // // //             </div>

// // // // // // // // //             <p>Please address these issues and update the task status when ready for re-testing.</p>
// // // // // // // // //           </div>
          
// // // // // // // // //           <div class="footer">
// // // // // // // // //             <p><strong>From:</strong> ${fromName} (${fromEmail})</p>
// // // // // // // // //             <p><strong>To:</strong> ${toName} (${toEmail})</p>
// // // // // // // // //             <p>&copy; ${new Date().getFullYear()} Business OS</p>
// // // // // // // // //             <p style="font-size: 10px; color: #94a3b8;">This is an automated notification</p>
// // // // // // // // //           </div>
// // // // // // // // //         </div>
// // // // // // // // //       </body>
// // // // // // // // //     </html>
// // // // // // // // //   `;

// // // // // // // // //   try {
// // // // // // // // //     const info = await transporter.sendMail({
// // // // // // // // //       from: fromAddress,
// // // // // // // // //       to: toEmail,
// // // // // // // // //       subject: `⚠️ REWORK REQUIRED: ${taskTitle} (from ${fromName})`,
// // // // // // // // //       html: htmlContent,
// // // // // // // // //       replyTo: fromEmail
// // // // // // // // //     });

// // // // // // // // //     console.log(`✅ Email sent successfully to: ${toEmail}`);
// // // // // // // // //     return true;
// // // // // // // // //   } catch (error: any) {
// // // // // // // // //     console.error('❌ Error sending email:', error.message);
// // // // // // // // //     return false;
// // // // // // // // //   }
// // // // // // // // // };

// // // // // // // // // export default transporter;
// // // // // // // // // services/emailService.ts

// // // // // // // // import nodemailer from 'nodemailer';
// // // // // // // // import dotenv from 'dotenv';

// // // // // // // // dotenv.config();

// // // // // // // // // ✅ Get SMTP from environment variables
// // // // // // // // const SMTP_USER = process.env.SMTP_USER || '';
// // // // // // // // const SMTP_PASS = process.env.SMTP_PASS || '';
// // // // // // // // const SMTP_HOST = process.env.SMTP_HOST || 'smtp.gmail.com';
// // // // // // // // const SMTP_PORT = parseInt(process.env.SMTP_PORT || '587');
// // // // // // // // const SMTP_SECURE = process.env.SMTP_SECURE === 'true';
// // // // // // // // const SMTP_FROM = process.env.SMTP_FROM || SMTP_USER || 'noreply@business-os.com';

// // // // // // // // console.log('📧 Email Service Initialized:');
// // // // // // // // console.log('  SMTP FROM:', SMTP_FROM);

// // // // // // // // let transporter: any;

// // // // // // // // if (SMTP_USER && SMTP_PASS) {
// // // // // // // //   try {
// // // // // // // //     transporter = nodemailer.createTransport({
// // // // // // // //       host: SMTP_HOST,
// // // // // // // //       port: SMTP_PORT,
// // // // // // // //       secure: SMTP_SECURE,
// // // // // // // //       auth: {
// // // // // // // //         user: SMTP_USER,
// // // // // // // //         pass: SMTP_PASS
// // // // // // // //       }
// // // // // // // //     });

// // // // // // // //     transporter.verify((error: Error | null, success: boolean) => {
// // // // // // // //       if (error) {
// // // // // // // //         console.error('❌ SMTP connection error:', error.message);
// // // // // // // //       } else {
// // // // // // // //         console.log('✅ SMTP server ready');
// // // // // // // //       }
// // // // // // // //     });
// // // // // // // //   } catch (error: any) {
// // // // // // // //     console.error('❌ SMTP setup error:', error.message);
// // // // // // // //   }
// // // // // // // // } else {
// // // // // // // //   console.warn('⚠️ SMTP credentials missing');
// // // // // // // //   transporter = {
// // // // // // // //     sendMail: (options: any) => {
// // // // // // // //       console.log('📧 [MOCK] Would send email to:', options.to);
// // // // // // // //       return Promise.resolve({ messageId: 'mock-' + Date.now() });
// // // // // // // //     }
// // // // // // // //   };
// // // // // // // // }

// // // // // // // // // ✅ ADD isNewDeveloper to EmailParams interface
// // // // // // // // interface EmailParams {
// // // // // // // //   toEmail: string;
// // // // // // // //   toName: string;
// // // // // // // //   taskTitle: string;
// // // // // // // //   reworkNotes: string;
// // // // // // // //   fromName: string;
// // // // // // // //   fromEmail: string;
// // // // // // // //   taskId?: string;
// // // // // // // //   projectName?: string;
// // // // // // // //   isNewDeveloper?: boolean;  // ✅ Add this line
// // // // // // // // }

// // // // // // // // export const sendReworkRequestEmail = async (params: EmailParams): Promise<boolean> => {
// // // // // // // //   const { 
// // // // // // // //     toEmail, 
// // // // // // // //     toName, 
// // // // // // // //     taskTitle, 
// // // // // // // //     reworkNotes, 
// // // // // // // //     fromName, 
// // // // // // // //     fromEmail,
// // // // // // // //     taskId,
// // // // // // // //     projectName,
// // // // // // // //     isNewDeveloper  // ✅ Add this line
// // // // // // // //   } = params;

// // // // // // // //   if (!SMTP_USER || !SMTP_PASS) {
// // // // // // // //     console.warn('⚠️ Rework email skipped');
// // // // // // // //     return false;
// // // // // // // //   }

// // // // // // // //   if (!toEmail) {
// // // // // // // //     console.error('❌ Developer email is required');
// // // // // // // //     return false;
// // // // // // // //   }

// // // // // // // //   const fromAddress = SMTP_FROM;
// // // // // // // //   const currentDate = new Date().toLocaleDateString('en-US', {
// // // // // // // //     weekday: 'long',
// // // // // // // //     year: 'numeric',
// // // // // // // //     month: 'long',
// // // // // // // //     day: 'numeric'
// // // // // // // //   });

// // // // // // // //   console.log(`📧 Sending email to: ${toEmail} (${toName})`);

// // // // // // // //   // ✅ Add new developer notice if auto-registered
// // // // // // // //   const newDeveloperNotice = isNewDeveloper ? `
// // // // // // // //     <div style="background: #dbeafe; padding: 15px; border-radius: 8px; border-left: 4px solid #3b82f6; margin: 15px 0;">
// // // // // // // //       <p style="margin: 0; color: #1e40af;">
// // // // // // // //         <strong>📌 New Developer Account Created:</strong>
// // // // // // // //       </p>
// // // // // // // //       <p style="margin: 5px 0 0 0; color: #1e40af;">
// // // // // // // //         <strong>Email:</strong> ${toEmail}<br>
// // // // // // // //         <strong>Default Password:</strong> <code>password123</code>
// // // // // // // //       </p>
// // // // // // // //       <p style="margin: 5px 0 0 0; font-size: 12px; color: #1e40af;">
// // // // // // // //         Please change your password after first login.
// // // // // // // //       </p>
// // // // // // // //     </div>
// // // // // // // //   ` : '';

// // // // // // // //   const htmlContent = `
// // // // // // // //     <!DOCTYPE html>
// // // // // // // //     <html>
// // // // // // // //       <head>
// // // // // // // //         <style>
// // // // // // // //           body { font-family: Arial, sans-serif; color: #333; background: #f9fafb; margin: 0; padding: 20px; }
// // // // // // // //           .container { max-width: 600px; margin: 0 auto; padding: 20px; background: #fff; border-radius: 12px; box-shadow: 0 2px 10px rgba(0,0,0,0.1); }
// // // // // // // //           .header { background: #f97316; padding: 20px; border-radius: 10px 10px 0 0; text-align: center; }
// // // // // // // //           .header h2 { margin: 0; color: #fff; font-size: 24px; }
// // // // // // // //           .header p { margin: 5px 0 0 0; color: #fef3c7; font-size: 14px; }
// // // // // // // //           .content { padding: 10px; }
// // // // // // // //           .task-details { background: #f8fafc; padding: 15px; border-radius: 8px; border-left: 4px solid #f97316; margin: 15px 0; }
// // // // // // // //           .task-details p { margin: 6px 0; font-size: 14px; }
// // // // // // // //           .task-details strong { color: #1e293b; display: inline-block; min-width: 100px; }
// // // // // // // //           .notes { background: #fef3c7; padding: 15px; border-radius: 8px; margin: 15px 0; border-left: 4px solid #f59e0b; }
// // // // // // // //           .notes strong { color: #92400e; }
// // // // // // // //           .notes p { margin: 8px 0 0 0; color: #78350f; white-space: pre-wrap; }
// // // // // // // //           .sender-info { background: #f0fdf4; padding: 12px; border-radius: 8px; border-left: 4px solid #22c55e; margin: 15px 0; }
// // // // // // // //           .sender-info p { margin: 4px 0; }
// // // // // // // //           .badge { display: inline-block; background: #f97316; color: white; padding: 3px 12px; border-radius: 20px; font-size: 12px; }
// // // // // // // //           .footer { margin-top: 20px; font-size: 12px; color: #94a3b8; border-top: 1px solid #e2e8f0; padding-top: 15px; text-align: center; }
// // // // // // // //         </style>
// // // // // // // //       </head>
// // // // // // // //       <body>
// // // // // // // //         <div class="container">
// // // // // // // //           <div class="header">
// // // // // // // //             <h2>⚠️ Rework Request</h2>
// // // // // // // //             <p>Task requires additional work</p>
// // // // // // // //           </div>
          
// // // // // // // //           <div class="content">
// // // // // // // //             <p>Hi <strong>${toName}</strong>,</p>
            
// // // // // // // //             <p>The task below requires rework and has been returned to you for further development.</p>
            
// // // // // // // //             <div class="task-details">
// // // // // // // //               <p><strong>📋 Task:</strong> ${taskTitle}</p>
// // // // // // // //               ${projectName ? `<p><strong>📁 Project:</strong> ${projectName}</p>` : ''}
// // // // // // // //               ${taskId ? `<p><strong>🆔 Task ID:</strong> #${taskId}</p>` : ''}
// // // // // // // //               <p><strong>👤 Reported by:</strong> ${fromName}</p>
// // // // // // // //               <p><strong>📧 Reporter Email:</strong> ${fromEmail}</p>
// // // // // // // //               <p><strong>📅 Date:</strong> ${currentDate}</p>
// // // // // // // //               <p><strong>📊 Status:</strong> <span class="badge">Rework Required</span></p>
// // // // // // // //             </div>

// // // // // // // //             <div class="sender-info">
// // // // // // // //               <p><strong>📧 From:</strong> ${fromName} (${fromEmail})</p>
// // // // // // // //               <p style="margin: 4px 0 0 0; font-size: 13px; color: #64748b;">
// // // // // // // //                 <em>Please reply directly to ${fromName} if you have questions.</em>
// // // // // // // //               </p>
// // // // // // // //             </div>
            
// // // // // // // //             <div class="notes">
// // // // // // // //               <strong>📝 Feedback from ${fromName}:</strong>
// // // // // // // //               <p>${reworkNotes}</p>
// // // // // // // //             </div>

// // // // // // // //             ${newDeveloperNotice}

// // // // // // // //             <div style="background: #f0f9ff; padding: 12px; border-radius: 8px; border-left: 4px solid #3b82f6; margin: 15px 0;">
// // // // // // // //               <p style="margin: 0; font-size: 14px; color: #1e40af;">
// // // // // // // //                 <strong>📌 Next Steps:</strong><br>
// // // // // // // //                 1️⃣ Review the feedback above<br>
// // // // // // // //                 2️⃣ Make the required changes<br>
// // // // // // // //                 3️⃣ Update task status to "In Progress"<br>
// // // // // // // //                 4️⃣ Submit for review when done
// // // // // // // //               </p>
// // // // // // // //             </div>

// // // // // // // //             <p>Please address these issues and update the task status when ready for re-testing.</p>
// // // // // // // //           </div>
          
// // // // // // // //           <div class="footer">
// // // // // // // //             <p><strong>From:</strong> ${fromName} (${fromEmail})</p>
// // // // // // // //             <p><strong>To:</strong> ${toName} (${toEmail})</p>
// // // // // // // //             <p>&copy; ${new Date().getFullYear()} Business OS</p>
// // // // // // // //             <p style="font-size: 10px; color: #94a3b8;">This is an automated notification</p>
// // // // // // // //           </div>
// // // // // // // //         </div>
// // // // // // // //       </body>
// // // // // // // //     </html>
// // // // // // // //   `;

// // // // // // // //   try {
// // // // // // // //     const info = await transporter.sendMail({
// // // // // // // //       from: fromAddress,
// // // // // // // //       to: toEmail,
// // // // // // // //       subject: `⚠️ REWORK REQUIRED: ${taskTitle} (from ${fromName})`,
// // // // // // // //       html: htmlContent,
// // // // // // // //       replyTo: fromEmail
// // // // // // // //     });

// // // // // // // //     console.log(`✅ Email sent successfully to: ${toEmail}`);
// // // // // // // //     return true;
// // // // // // // //   } catch (error: any) {
// // // // // // // //     console.error('❌ Error sending email:', error.message);
// // // // // // // //     return false;
// // // // // // // //   }
// // // // // // // // };

// // // // // // // // export default transporter;
// // // // // // // // services/emailService.ts

// // // // // // // import nodemailer from 'nodemailer';
// // // // // // // import dotenv from 'dotenv';

// // // // // // // dotenv.config();

// // // // // // // // ✅ Get SMTP from environment variables
// // // // // // // const SMTP_USER = process.env.SMTP_USER || '';
// // // // // // // const SMTP_PASS = process.env.SMTP_PASS || '';
// // // // // // // const SMTP_HOST = process.env.SMTP_HOST || 'smtp.gmail.com';
// // // // // // // const SMTP_PORT = parseInt(process.env.SMTP_PORT || '587');
// // // // // // // const SMTP_SECURE = process.env.SMTP_SECURE === 'true';
// // // // // // // const SMTP_FROM = process.env.SMTP_FROM || SMTP_USER || 'noreply@business-os.com';

// // // // // // // console.log('📧 Email Service Initialized:');
// // // // // // // console.log('  SMTP FROM:', SMTP_FROM);

// // // // // // // let transporter: any;

// // // // // // // if (SMTP_USER && SMTP_PASS) {
// // // // // // //   try {
// // // // // // //     transporter = nodemailer.createTransport({
// // // // // // //       host: SMTP_HOST,
// // // // // // //       port: SMTP_PORT,
// // // // // // //       secure: SMTP_SECURE,
// // // // // // //       auth: {
// // // // // // //         user: SMTP_USER,
// // // // // // //         pass: SMTP_PASS
// // // // // // //       }
// // // // // // //     });

// // // // // // //     transporter.verify((error: Error | null, success: boolean) => {
// // // // // // //       if (error) {
// // // // // // //         console.error('❌ SMTP connection error:', error.message);
// // // // // // //       } else {
// // // // // // //         console.log('✅ SMTP server ready');
// // // // // // //       }
// // // // // // //     });
// // // // // // //   } catch (error: any) {
// // // // // // //     console.error('❌ SMTP setup error:', error.message);
// // // // // // //   }
// // // // // // // } else {
// // // // // // //   console.warn('⚠️ SMTP credentials missing');
// // // // // // //   transporter = {
// // // // // // //     sendMail: (options: any) => {
// // // // // // //       console.log('📧 [MOCK] Would send email to:', options.to);
// // // // // // //       return Promise.resolve({ messageId: 'mock-' + Date.now() });
// // // // // // //     }
// // // // // // //   };
// // // // // // // }

// // // // // // // // ✅ ADD reworkCount and originalDeveloper to EmailParams interface
// // // // // // // interface EmailParams {
// // // // // // //   toEmail: string;
// // // // // // //   toName: string;
// // // // // // //   taskTitle: string;
// // // // // // //   reworkNotes: string;
// // // // // // //   fromName: string;
// // // // // // //   fromEmail: string;
// // // // // // //   taskId?: string;
// // // // // // //   projectName?: string;
// // // // // // //   reworkCount?: number;        // ✅ Add this
// // // // // // //   originalDeveloper?: string;   // ✅ Add this
// // // // // // //   isNewDeveloper?: boolean;     // ✅ Add this
// // // // // // // }

// // // // // // // export const sendReworkRequestEmail = async (params: EmailParams): Promise<boolean> => {
// // // // // // //   const { 
// // // // // // //     toEmail, 
// // // // // // //     toName, 
// // // // // // //     taskTitle, 
// // // // // // //     reworkNotes, 
// // // // // // //     fromName, 
// // // // // // //     fromEmail,
// // // // // // //     taskId,
// // // // // // //     projectName,
// // // // // // //     reworkCount,        // ✅ Add this
// // // // // // //     originalDeveloper,  // ✅ Add this
// // // // // // //     isNewDeveloper      // ✅ Add this
// // // // // // //   } = params;

// // // // // // //   if (!SMTP_USER || !SMTP_PASS) {
// // // // // // //     console.warn('⚠️ Rework email skipped');
// // // // // // //     return false;
// // // // // // //   }

// // // // // // //   if (!toEmail) {
// // // // // // //     console.error('❌ Developer email is required');
// // // // // // //     return false;
// // // // // // //   }

// // // // // // //   const fromAddress = SMTP_FROM;
// // // // // // //   const currentDate = new Date().toLocaleDateString('en-US', {
// // // // // // //     weekday: 'long',
// // // // // // //     year: 'numeric',
// // // // // // //     month: 'long',
// // // // // // //     day: 'numeric'
// // // // // // //   });

// // // // // // //   console.log(`📧 Sending email to: ${toEmail} (${toName})`);

// // // // // // //   // ✅ Add new developer notice if auto-registered
// // // // // // //   const newDeveloperNotice = isNewDeveloper ? `
// // // // // // //     <div style="background: #dbeafe; padding: 15px; border-radius: 8px; border-left: 4px solid #3b82f6; margin: 15px 0;">
// // // // // // //       <p style="margin: 0; color: #1e40af;">
// // // // // // //         <strong>📌 New Developer Account Created:</strong>
// // // // // // //       </p>
// // // // // // //       <p style="margin: 5px 0 0 0; color: #1e40af;">
// // // // // // //         <strong>Email:</strong> ${toEmail}<br>
// // // // // // //         <strong>Default Password:</strong> <code>password123</code>
// // // // // // //       </p>
// // // // // // //       <p style="margin: 5px 0 0 0; font-size: 12px; color: #1e40af;">
// // // // // // //         Please change your password after first login.
// // // // // // //       </p>
// // // // // // //     </div>
// // // // // // //   ` : '';

// // // // // // //   // ✅ Add rework badge if rework count > 0
// // // // // // //   const reworkBadge = reworkCount && reworkCount > 0 ? `
// // // // // // //     <span style="display: inline-block; background: #ef4444; color: white; padding: 2px 10px; border-radius: 12px; font-size: 11px; font-weight: 600;">Rework #${reworkCount}</span>
// // // // // // //   ` : '';

// // // // // // //   const htmlContent = `
// // // // // // //     <!DOCTYPE html>
// // // // // // //     <html>
// // // // // // //       <head>
// // // // // // //         <style>
// // // // // // //           body { font-family: Arial, sans-serif; color: #333; background: #f9fafb; margin: 0; padding: 20px; }
// // // // // // //           .container { max-width: 600px; margin: 0 auto; padding: 20px; background: #fff; border-radius: 12px; box-shadow: 0 2px 10px rgba(0,0,0,0.1); }
// // // // // // //           .header { background: #f97316; padding: 20px; border-radius: 10px 10px 0 0; text-align: center; }
// // // // // // //           .header h2 { margin: 0; color: #fff; font-size: 24px; }
// // // // // // //           .header p { margin: 5px 0 0 0; color: #fef3c7; font-size: 14px; }
// // // // // // //           .content { padding: 10px; }
// // // // // // //           .task-details { background: #f8fafc; padding: 15px; border-radius: 8px; border-left: 4px solid #f97316; margin: 15px 0; }
// // // // // // //           .task-details p { margin: 6px 0; font-size: 14px; }
// // // // // // //           .task-details strong { color: #1e293b; display: inline-block; min-width: 120px; }
// // // // // // //           .notes { background: #fef3c7; padding: 15px; border-radius: 8px; margin: 15px 0; border-left: 4px solid #f59e0b; }
// // // // // // //           .notes strong { color: #92400e; }
// // // // // // //           .notes p { margin: 8px 0 0 0; color: #78350f; white-space: pre-wrap; }
// // // // // // //           .sender-info { background: #f0fdf4; padding: 12px; border-radius: 8px; border-left: 4px solid #22c55e; margin: 15px 0; }
// // // // // // //           .sender-info p { margin: 4px 0; }
// // // // // // //           .badge { display: inline-block; background: #f97316; color: white; padding: 3px 12px; border-radius: 20px; font-size: 12px; }
// // // // // // //           .rework-badge { display: inline-block; background: #ef4444; color: white; padding: 3px 12px; border-radius: 20px; font-size: 12px; }
// // // // // // //           .footer { margin-top: 20px; font-size: 12px; color: #94a3b8; border-top: 1px solid #e2e8f0; padding-top: 15px; text-align: center; }
// // // // // // //         </style>
// // // // // // //       </head>
// // // // // // //       <body>
// // // // // // //         <div class="container">
// // // // // // //           <div class="header">
// // // // // // //             <h2>⚠️ Rework Request</h2>
// // // // // // //             <p>Task requires additional work</p>
// // // // // // //           </div>
          
// // // // // // //           <div class="content">
// // // // // // //             <p>Hi <strong>${toName}</strong>,</p>
            
// // // // // // //             <p>The task below requires rework and has been returned to you for further development.</p>
            
// // // // // // //             <div class="task-details">
// // // // // // //               <p><strong>📋 Task:</strong> ${taskTitle}</p>
// // // // // // //               ${projectName ? `<p><strong>📁 Project:</strong> ${projectName}</p>` : ''}
// // // // // // //               ${taskId ? `<p><strong>🆔 Task ID:</strong> #${taskId}</p>` : ''}
// // // // // // //               ${originalDeveloper ? `<p><strong>👤 Original Developer:</strong> ${originalDeveloper}</p>` : ''}
// // // // // // //               ${reworkCount ? `<p><strong>🔄 Rework Count:</strong> <span class="rework-badge">#${reworkCount}</span></p>` : ''}
// // // // // // //               <p><strong>👤 Reported by:</strong> ${fromName}</p>
// // // // // // //               <p><strong>📧 Reporter Email:</strong> ${fromEmail}</p>
// // // // // // //               <p><strong>📅 Date:</strong> ${currentDate}</p>
// // // // // // //               <p><strong>📊 Status:</strong> <span class="badge">Rework Required</span></p>
// // // // // // //             </div>

// // // // // // //             <div class="sender-info">
// // // // // // //               <p><strong>📧 From:</strong> ${fromName} (${fromEmail})</p>
// // // // // // //               <p style="margin: 4px 0 0 0; font-size: 13px; color: #64748b;">
// // // // // // //                 <em>Please reply directly to ${fromName} if you have questions.</em>
// // // // // // //               </p>
// // // // // // //             </div>
            
// // // // // // //             <div class="notes">
// // // // // // //               <strong>📝 Feedback from ${fromName}:</strong>
// // // // // // //               <p>${reworkNotes}</p>
// // // // // // //             </div>

// // // // // // //             ${newDeveloperNotice}

// // // // // // //             <div style="background: #f0f9ff; padding: 12px; border-radius: 8px; border-left: 4px solid #3b82f6; margin: 15px 0;">
// // // // // // //               <p style="margin: 0; font-size: 14px; color: #1e40af;">
// // // // // // //                 <strong>📌 Next Steps:</strong><br>
// // // // // // //                 1️⃣ Review the feedback above<br>
// // // // // // //                 2️⃣ Make the required changes<br>
// // // // // // //                 3️⃣ Update task status to "In Progress"<br>
// // // // // // //                 4️⃣ Submit for review when done
// // // // // // //               </p>
// // // // // // //             </div>

// // // // // // //             <p>Please address these issues and update the task status when ready for re-testing.</p>
// // // // // // //           </div>
          
// // // // // // //           <div class="footer">
// // // // // // //             <p><strong>From:</strong> ${fromName} (${fromEmail})</p>
// // // // // // //             <p><strong>To:</strong> ${toName} (${toEmail})</p>
// // // // // // //             <p>&copy; ${new Date().getFullYear()} Business OS</p>
// // // // // // //             <p style="font-size: 10px; color: #94a3b8;">This is an automated notification</p>
// // // // // // //           </div>
// // // // // // //         </div>
// // // // // // //       </body>
// // // // // // //     </html>
// // // // // // //   `;

// // // // // // //   try {
// // // // // // //     const info = await transporter.sendMail({
// // // // // // //       from: fromAddress,
// // // // // // //       to: toEmail,
// // // // // // //       subject: `⚠️ REWORK REQUIRED: ${taskTitle} (from ${fromName})`,
// // // // // // //       html: htmlContent,
// // // // // // //       replyTo: fromEmail
// // // // // // //     });

// // // // // // //     console.log(`✅ Email sent successfully to: ${toEmail}`);
// // // // // // //     return true;
// // // // // // //   } catch (error: any) {
// // // // // // //     console.error('❌ Error sending email:', error.message);
// // // // // // //     return false;
// // // // // // //   }
// // // // // // // };

// // // // // // // export default transporter;
// // // // // // // services/emailService.ts

// // // // // // import nodemailer from 'nodemailer';
// // // // // // import dotenv from 'dotenv';

// // // // // // dotenv.config();

// // // // // // // ✅ Get SMTP from environment variables
// // // // // // const SMTP_USER = process.env.SMTP_USER || 'subasrimuthumanickam@gmail.com';
// // // // // // const SMTP_PASS = process.env.SMTP_PASS || '';
// // // // // // const SMTP_HOST = process.env.SMTP_HOST || 'smtp.gmail.com';
// // // // // // const SMTP_PORT = parseInt(process.env.SMTP_PORT || '587');
// // // // // // const SMTP_SECURE = process.env.SMTP_SECURE === 'true';
// // // // // // const SMTP_FROM = SMTP_USER;

// // // // // // console.log('📧 Email Service Initialized:');
// // // // // // console.log('  SMTP FROM:', SMTP_FROM);

// // // // // // let transporter: any;

// // // // // // if (SMTP_USER && SMTP_PASS) {
// // // // // //   try {
// // // // // //     transporter = nodemailer.createTransport({
// // // // // //       host: SMTP_HOST,
// // // // // //       port: SMTP_PORT,
// // // // // //       secure: SMTP_SECURE,
// // // // // //       auth: {
// // // // // //         user: SMTP_USER,
// // // // // //         pass: SMTP_PASS
// // // // // //       }
// // // // // //     });

// // // // // //     transporter.verify((error: Error | null, success: boolean) => {
// // // // // //       if (error) {
// // // // // //         console.error('❌ SMTP connection error:', error.message);
// // // // // //       } else {
// // // // // //         console.log('✅ SMTP server ready');
// // // // // //       }
// // // // // //     });
// // // // // //   } catch (error: any) {
// // // // // //     console.error('❌ SMTP setup error:', error.message);
// // // // // //   }
// // // // // // } else {
// // // // // //   console.warn('⚠️ SMTP credentials missing');
// // // // // //   transporter = {
// // // // // //     sendMail: (options: any) => {
// // // // // //       console.log('📧 [MOCK] Would send email to:', options.to);
// // // // // //       return Promise.resolve({ messageId: 'mock-' + Date.now() });
// // // // // //     }
// // // // // //   };
// // // // // // }

// // // // // // interface EmailParams {
// // // // // //   toEmail: string;        // ✅ Developer's email (TO)
// // // // // //   toName: string;         // ✅ Developer's name
// // // // // //   taskTitle: string;
// // // // // //   reworkNotes: string;
// // // // // //   fromName: string;       // ✅ Tester's name
// // // // // //   fromEmail: string;      // ✅ Tester's email (Reply-To)
// // // // // //   taskId?: string;
// // // // // //   projectName?: string;
// // // // // //   reworkCount?: number;
// // // // // //   originalDeveloper?: string;
// // // // // //   isNewDeveloper?: boolean;
// // // // // // }

// // // // // // export const sendReworkRequestEmail = async (params: EmailParams): Promise<boolean> => {
// // // // // //   const { 
// // // // // //     toEmail,           // ✅ Developer's email
// // // // // //     toName,
// // // // // //     taskTitle,
// // // // // //     reworkNotes,
// // // // // //     fromName,          // ✅ Tester's name
// // // // // //     fromEmail,         // ✅ Tester's email (Reply-To)
// // // // // //     taskId,
// // // // // //     projectName,
// // // // // //     reworkCount,
// // // // // //     originalDeveloper,
// // // // // //     isNewDeveloper
// // // // // //   } = params;

// // // // // //   if (!SMTP_USER || !SMTP_PASS) {
// // // // // //     console.warn('⚠️ Rework email skipped');
// // // // // //     return false;
// // // // // //   }

// // // // // //   if (!toEmail) {
// // // // // //     console.error('❌ Developer email is required');
// // // // // //     return false;
// // // // // //   }

// // // // // //   const currentDate = new Date().toLocaleDateString('en-US', {
// // // // // //     weekday: 'long',
// // // // // //     year: 'numeric',
// // // // // //     month: 'long',
// // // // // //     day: 'numeric'
// // // // // //   });

// // // // // //   console.log(`📧 Sending email:`);
// // // // // //   console.log(`  FROM (SMTP): ${SMTP_FROM}`);
// // // // // //   console.log(`  TO (Developer): ${toEmail}`);
// // // // // //   console.log(`  REPLY-TO: ${fromEmail}`);

// // // // // //   // ✅ New developer notice
// // // // // //   const newDeveloperNotice = isNewDeveloper ? `
// // // // // //     <div style="background: #dbeafe; padding: 15px; border-radius: 8px; border-left: 4px solid #3b82f6; margin: 15px 0;">
// // // // // //       <p style="margin: 0; color: #1e40af;">
// // // // // //         <strong>📌 New Developer Account Created:</strong>
// // // // // //       </p>
// // // // // //       <p style="margin: 5px 0 0 0; color: #1e40af;">
// // // // // //         <strong>Email:</strong> ${toEmail}<br>
// // // // // //         <strong>Default Password:</strong> <code>password123</code>
// // // // // //       </p>
// // // // // //       <p style="margin: 5px 0 0 0; font-size: 12px; color: #1e40af;">
// // // // // //         Please change your password after first login.
// // // // // //       </p>
// // // // // //     </div>
// // // // // //   ` : '';

// // // // // //   const htmlContent = `
// // // // // //     <!DOCTYPE html>
// // // // // //     <html>
// // // // // //       <head>
// // // // // //         <style>
// // // // // //           body { font-family: Arial, sans-serif; color: #333; background: #f9fafb; margin: 0; padding: 20px; }
// // // // // //           .container { max-width: 600px; margin: 0 auto; padding: 20px; background: #fff; border-radius: 12px; box-shadow: 0 2px 10px rgba(0,0,0,0.1); }
// // // // // //           .header { background: #f97316; padding: 20px; border-radius: 10px 10px 0 0; text-align: center; }
// // // // // //           .header h2 { margin: 0; color: #fff; font-size: 24px; }
// // // // // //           .header p { margin: 5px 0 0 0; color: #fef3c7; font-size: 14px; }
// // // // // //           .content { padding: 10px; }
// // // // // //           .task-details { background: #f8fafc; padding: 15px; border-radius: 8px; border-left: 4px solid #f97316; margin: 15px 0; }
// // // // // //           .task-details p { margin: 6px 0; font-size: 14px; }
// // // // // //           .task-details strong { color: #1e293b; display: inline-block; min-width: 120px; }
// // // // // //           .notes { background: #fef3c7; padding: 15px; border-radius: 8px; margin: 15px 0; border-left: 4px solid #f59e0b; }
// // // // // //           .notes strong { color: #92400e; }
// // // // // //           .notes p { margin: 8px 0 0 0; color: #78350f; white-space: pre-wrap; }
// // // // // //           .sender-info { background: #f0fdf4; padding: 12px; border-radius: 8px; border-left: 4px solid #22c55e; margin: 15px 0; }
// // // // // //           .sender-info p { margin: 4px 0; }
// // // // // //           .badge { display: inline-block; background: #f97316; color: white; padding: 3px 12px; border-radius: 20px; font-size: 12px; }
// // // // // //           .rework-badge { display: inline-block; background: #ef4444; color: white; padding: 3px 12px; border-radius: 20px; font-size: 12px; }
// // // // // //           .footer { margin-top: 20px; font-size: 12px; color: #94a3b8; border-top: 1px solid #e2e8f0; padding-top: 15px; text-align: center; }
// // // // // //         </style>
// // // // // //       </head>
// // // // // //       <body>
// // // // // //         <div class="container">
// // // // // //           <div class="header">
// // // // // //             <h2>⚠️ Rework Request</h2>
// // // // // //             <p>Task requires additional work</p>
// // // // // //           </div>
          
// // // // // //           <div class="content">
// // // // // //             <p>Hi <strong>${toName}</strong>,</p>
            
// // // // // //             <p>The task below requires rework and has been returned to you for further development.</p>
            
// // // // // //             <div class="task-details">
// // // // // //               <p><strong>📋 Task:</strong> ${taskTitle}</p>
// // // // // //               ${projectName ? `<p><strong>📁 Project:</strong> ${projectName}</p>` : ''}
// // // // // //               ${taskId ? `<p><strong>🆔 Task ID:</strong> #${taskId}</p>` : ''}
// // // // // //               ${originalDeveloper ? `<p><strong>👤 Original Developer:</strong> ${originalDeveloper}</p>` : ''}
// // // // // //               ${reworkCount ? `<p><strong>🔄 Rework #:</strong> <span class="rework-badge">${reworkCount}</span></p>` : ''}
// // // // // //               <p><strong>👤 Reported by:</strong> ${fromName}</p>
// // // // // //               <p><strong>📧 Reporter Email:</strong> ${fromEmail}</p>
// // // // // //               <p><strong>📅 Date:</strong> ${currentDate}</p>
// // // // // //               <p><strong>📊 Status:</strong> <span class="badge">Rework Required</span></p>
// // // // // //             </div>

// // // // // //             <div class="sender-info">
// // // // // //               <p><strong>📧 From:</strong> ${fromName} (${fromEmail})</p>
// // // // // //               <p style="margin: 4px 0 0 0; font-size: 13px; color: #64748b;">
// // // // // //                 <em>Please reply directly to ${fromName} if you have questions.</em>
// // // // // //               </p>
// // // // // //             </div>
            
// // // // // //             <div class="notes">
// // // // // //               <strong>📝 Feedback from ${fromName}:</strong>
// // // // // //               <p>${reworkNotes}</p>
// // // // // //             </div>

// // // // // //             ${newDeveloperNotice}

// // // // // //             <div style="background: #f0f9ff; padding: 12px; border-radius: 8px; border-left: 4px solid #3b82f6; margin: 15px 0;">
// // // // // //               <p style="margin: 0; font-size: 14px; color: #1e40af;">
// // // // // //                 <strong>📌 Next Steps:</strong><br>
// // // // // //                 1️⃣ Review the feedback above<br>
// // // // // //                 2️⃣ Make the required changes<br>
// // // // // //                 3️⃣ Update task status to "In Progress"<br>
// // // // // //                 4️⃣ Submit for review when done
// // // // // //               </p>
// // // // // //             </div>

// // // // // //             <p>Please address these issues and update the task status when ready for re-testing.</p>
// // // // // //           </div>
          
// // // // // //           <div class="footer">
// // // // // //             <p><strong>From:</strong> ${fromName} (${fromEmail})</p>
// // // // // //             <p><strong>To:</strong> ${toName} (${toEmail})</p>
// // // // // //             <p>&copy; ${new Date().getFullYear()} Business OS</p>
// // // // // //             <p style="font-size: 10px; color: #94a3b8;">This is an automated notification</p>
// // // // // //           </div>
// // // // // //         </div>
// // // // // //       </body>
// // // // // //     </html>
// // // // // //   `;

// // // // // //   try {
// // // // // //     const info = await transporter.sendMail({
// // // // // //       from: SMTP_FROM,        // ✅ SMTP user (subasrimuthumanickam@gmail.com)
// // // // // //       to: toEmail,            // ✅ Developer's email (muthu@gmail.com)
// // // // // //       subject: `⚠️ REWORK REQUIRED: ${taskTitle} (from ${fromName})`,
// // // // // //       html: htmlContent,
// // // // // //       replyTo: fromEmail      // ✅ Tester's email for replies
// // // // // //     });

// // // // // //     console.log(`✅ Email sent successfully!`);
// // // // // //     console.log(`  From: ${SMTP_FROM}`);
// // // // // //     console.log(`  To: ${toEmail}`);
// // // // // //     console.log(`  Reply-To: ${fromEmail}`);
// // // // // //     return true;
// // // // // //   } catch (error: any) {
// // // // // //     console.error('❌ Error sending email:', error.message);
// // // // // //     return false;
// // // // // //   }
// // // // // // };

// // // // // // export default transporter;
// // // // // // services/emailService.ts

// // // // // import nodemailer from 'nodemailer';
// // // // // import dotenv from 'dotenv';

// // // // // dotenv.config();

// // // // // // ✅ Get SMTP from environment variables
// // // // // const SMTP_USER = process.env.SMTP_USER || 'subasrimuthumanickam@gmail.com';
// // // // // const SMTP_PASS = process.env.SMTP_PASS || '';
// // // // // const SMTP_HOST = process.env.SMTP_HOST || 'smtp.gmail.com';
// // // // // const SMTP_PORT = parseInt(process.env.SMTP_PORT || '587');
// // // // // const SMTP_SECURE = process.env.SMTP_SECURE === 'true';
// // // // // const SMTP_FROM = SMTP_USER;

// // // // // console.log('📧 Email Service Initialized:');
// // // // // console.log('  SMTP FROM:', SMTP_FROM);

// // // // // let transporter: any;

// // // // // if (SMTP_USER && SMTP_PASS) {
// // // // //   try {
// // // // //     transporter = nodemailer.createTransport({
// // // // //       host: SMTP_HOST,
// // // // //       port: SMTP_PORT,
// // // // //       secure: SMTP_SECURE,
// // // // //       auth: {
// // // // //         user: SMTP_USER,
// // // // //         pass: SMTP_PASS
// // // // //       }
// // // // //     });

// // // // //     transporter.verify((error: Error | null, success: boolean) => {
// // // // //       if (error) {
// // // // //         console.error('❌ SMTP connection error:', error.message);
// // // // //       } else {
// // // // //         console.log('✅ SMTP server ready');
// // // // //       }
// // // // //     });
// // // // //   } catch (error: any) {
// // // // //     console.error('❌ SMTP setup error:', error.message);
// // // // //   }
// // // // // } else {
// // // // //   console.warn('⚠️ SMTP credentials missing');
// // // // //   transporter = {
// // // // //     sendMail: (options: any) => {
// // // // //       console.log('📧 [MOCK] Would send email to:', options.to);
// // // // //       return Promise.resolve({ messageId: 'mock-' + Date.now() });
// // // // //     }
// // // // //   };
// // // // // }

// // // // // interface EmailParams {
// // // // //   toEmail: string;        // ✅ Developer's email (TO)
// // // // //   toName: string;         // ✅ Developer's name
// // // // //   taskTitle: string;
// // // // //   reworkNotes: string;
// // // // //   fromName: string;       // ✅ Tester's name
// // // // //   fromEmail: string;      // ✅ Tester's email (Reply-To)
// // // // //   taskId?: string;
// // // // //   projectName?: string;
// // // // //   reworkCount?: number;
// // // // //   originalDeveloper?: string;
// // // // //   isNewDeveloper?: boolean;
// // // // // }

// // // // // export const sendReworkRequestEmail = async (params: EmailParams): Promise<boolean> => {
// // // // //   const { 
// // // // //     toEmail,           // ✅ Developer's email - THIS IS THE RECIPIENT
// // // // //     toName,
// // // // //     taskTitle,
// // // // //     reworkNotes,
// // // // //     fromName,          // ✅ Tester's name (shown as sender name)
// // // // //     fromEmail,         // ✅ Tester's email (Reply-To)
// // // // //     taskId,
// // // // //     projectName,
// // // // //     reworkCount,
// // // // //     originalDeveloper,
// // // // //     isNewDeveloper
// // // // //   } = params;

// // // // //   // ✅ CRITICAL: Validate that toEmail is the developer's email
// // // // //   if (!toEmail) {
// // // // //     console.error('❌ Developer email is required');
// // // // //     return false;
// // // // //   }

// // // // //   const currentDate = new Date().toLocaleDateString('en-US', {
// // // // //     weekday: 'long',
// // // // //     year: 'numeric',
// // // // //     month: 'long',
// // // // //     day: 'numeric'
// // // // //   });

// // // // //   console.log(`📧 Sending email:`);
// // // // //   console.log(`  FROM (SMTP): ${SMTP_FROM}`);
// // // // //   console.log(`  TO (Developer): ${toEmail}`);  // ✅ This MUST be the developer's email
// // // // //   console.log(`  REPLY-TO: ${fromEmail}`);
// // // // //   console.log(`  Sender Name: ${fromName}`);

// // // // //   // ✅ New developer notice
// // // // //   const newDeveloperNotice = isNewDeveloper ? `
// // // // //     <div style="background: #dbeafe; padding: 15px; border-radius: 8px; border-left: 4px solid #3b82f6; margin: 15px 0;">
// // // // //       <p style="margin: 0; color: #1e40af;">
// // // // //         <strong>📌 New Developer Account Created:</strong>
// // // // //       </p>
// // // // //       <p style="margin: 5px 0 0 0; color: #1e40af;">
// // // // //         <strong>Email:</strong> ${toEmail}<br>
// // // // //         <strong>Default Password:</strong> <code>password123</code>
// // // // //       </p>
// // // // //       <p style="margin: 5px 0 0 0; font-size: 12px; color: #1e40af;">
// // // // //         Please change your password after first login.
// // // // //       </p>
// // // // //     </div>
// // // // //   ` : '';

// // // // //   const htmlContent = `
// // // // //     <!DOCTYPE html>
// // // // //     <html>
// // // // //       <head>
// // // // //         <style>
// // // // //           body { font-family: Arial, sans-serif; color: #333; background: #f9fafb; margin: 0; padding: 20px; }
// // // // //           .container { max-width: 600px; margin: 0 auto; padding: 20px; background: #fff; border-radius: 12px; box-shadow: 0 2px 10px rgba(0,0,0,0.1); }
// // // // //           .header { background: #f97316; padding: 20px; border-radius: 10px 10px 0 0; text-align: center; }
// // // // //           .header h2 { margin: 0; color: #fff; font-size: 24px; }
// // // // //           .header p { margin: 5px 0 0 0; color: #fef3c7; font-size: 14px; }
// // // // //           .content { padding: 10px; }
// // // // //           .task-details { background: #f8fafc; padding: 15px; border-radius: 8px; border-left: 4px solid #f97316; margin: 15px 0; }
// // // // //           .task-details p { margin: 6px 0; font-size: 14px; }
// // // // //           .task-details strong { color: #1e293b; display: inline-block; min-width: 120px; }
// // // // //           .notes { background: #fef3c7; padding: 15px; border-radius: 8px; margin: 15px 0; border-left: 4px solid #f59e0b; }
// // // // //           .notes strong { color: #92400e; }
// // // // //           .notes p { margin: 8px 0 0 0; color: #78350f; white-space: pre-wrap; }
// // // // //           .sender-info { background: #f0fdf4; padding: 12px; border-radius: 8px; border-left: 4px solid #22c55e; margin: 15px 0; }
// // // // //           .sender-info p { margin: 4px 0; }
// // // // //           .badge { display: inline-block; background: #f97316; color: white; padding: 3px 12px; border-radius: 20px; font-size: 12px; }
// // // // //           .rework-badge { display: inline-block; background: #ef4444; color: white; padding: 3px 12px; border-radius: 20px; font-size: 12px; }
// // // // //           .footer { margin-top: 20px; font-size: 12px; color: #94a3b8; border-top: 1px solid #e2e8f0; padding-top: 15px; text-align: center; }
// // // // //         </style>
// // // // //       </head>
// // // // //       <body>
// // // // //         <div class="container">
// // // // //           <div class="header">
// // // // //             <h2>⚠️ Rework Request</h2>
// // // // //             <p>Task requires additional work</p>
// // // // //           </div>
          
// // // // //           <div class="content">
// // // // //             <p>Hi <strong>${toName}</strong>,</p>
            
// // // // //             <p>The task below requires rework and has been returned to you for further development.</p>
            
// // // // //             <div class="task-details">
// // // // //               <p><strong>📋 Task:</strong> ${taskTitle}</p>
// // // // //               ${projectName ? `<p><strong>📁 Project:</strong> ${projectName}</p>` : ''}
// // // // //               ${taskId ? `<p><strong>🆔 Task ID:</strong> #${taskId}</p>` : ''}
// // // // //               ${originalDeveloper ? `<p><strong>👤 Original Developer:</strong> ${originalDeveloper}</p>` : ''}
// // // // //               ${reworkCount ? `<p><strong>🔄 Rework #:</strong> <span class="rework-badge">${reworkCount}</span></p>` : ''}
// // // // //               <p><strong>👤 Reported by:</strong> ${fromName}</p>
// // // // //               <p><strong>📧 Reporter Email:</strong> ${fromEmail}</p>
// // // // //               <p><strong>📅 Date:</strong> ${currentDate}</p>
// // // // //               <p><strong>📊 Status:</strong> <span class="badge">Rework Required</span></p>
// // // // //             </div>

// // // // //             <div class="sender-info">
// // // // //               <p><strong>📧 From:</strong> ${fromName} (${fromEmail})</p>
// // // // //               <p style="margin: 4px 0 0 0; font-size: 13px; color: #64748b;">
// // // // //                 <em>Please reply directly to ${fromName} if you have questions.</em>
// // // // //               </p>
// // // // //             </div>
            
// // // // //             <div class="notes">
// // // // //               <strong>📝 Feedback from ${fromName}:</strong>
// // // // //               <p>${reworkNotes}</p>
// // // // //             </div>

// // // // //             ${newDeveloperNotice}

// // // // //             <div style="background: #f0f9ff; padding: 12px; border-radius: 8px; border-left: 4px solid #3b82f6; margin: 15px 0;">
// // // // //               <p style="margin: 0; font-size: 14px; color: #1e40af;">
// // // // //                 <strong>📌 Next Steps:</strong><br>
// // // // //                 1️⃣ Review the feedback above<br>
// // // // //                 2️⃣ Make the required changes<br>
// // // // //                 3️⃣ Update task status to "In Progress"<br>
// // // // //                 4️⃣ Submit for review when done
// // // // //               </p>
// // // // //             </div>

// // // // //             <p>Please address these issues and update the task status when ready for re-testing.</p>
// // // // //           </div>
          
// // // // //           <div class="footer">
// // // // //             <p><strong>From:</strong> ${fromName} (${fromEmail})</p>
// // // // //             <p><strong>To:</strong> ${toName} (${toEmail})</p>
// // // // //             <p>&copy; ${new Date().getFullYear()} Business OS</p>
// // // // //             <p style="font-size: 10px; color: #94a3b8;">This is an automated notification</p>
// // // // //           </div>
// // // // //         </div>
// // // // //       </body>
// // // // //     </html>
// // // // //   `;

// // // // //   try {
// // // // //     const info = await transporter.sendMail({
// // // // //       from: SMTP_FROM,        // ✅ SMTP user (subasrimuthumanickam@gmail.com)
// // // // //       to: toEmail,            // ✅ Developer's email (THIS IS THE RECIPIENT)
// // // // //       subject: `⚠️ REWORK REQUIRED: ${taskTitle} (from ${fromName})`,
// // // // //       html: htmlContent,
// // // // //       replyTo: fromEmail      // ✅ Tester's email for replies
// // // // //     });

// // // // //     console.log(`✅ Email sent successfully!`);
// // // // //     console.log(`  From: ${SMTP_FROM}`);
// // // // //     console.log(`  To: ${toEmail}`);
// // // // //     console.log(`  Reply-To: ${fromEmail}`);
// // // // //     return true;
// // // // //   } catch (error: any) {
// // // // //     console.error('❌ Error sending email:', error.message);
// // // // //     return false;
// // // // //   }
// // // // // };

// // // // // export default transporter;
// // // // // services/emailService.ts

// // // // import nodemailer from 'nodemailer';
// // // // import dotenv from 'dotenv';

// // // // dotenv.config();

// // // // // ✅ Get SMTP from environment variables
// // // // const SMTP_USER = process.env.SMTP_USER || 'subasrimuthumanickam@gmail.com';
// // // // const SMTP_PASS = process.env.SMTP_PASS || '';
// // // // const SMTP_HOST = process.env.SMTP_HOST || 'smtp.gmail.com';
// // // // const SMTP_PORT = parseInt(process.env.SMTP_PORT || '587');
// // // // const SMTP_SECURE = process.env.SMTP_SECURE === 'true';
// // // // const SMTP_FROM = SMTP_USER;

// // // // console.log('📧 Email Service Initialized:');
// // // // console.log('  SMTP FROM:', SMTP_FROM);

// // // // let transporter: any;

// // // // if (SMTP_USER && SMTP_PASS) {
// // // //   try {
// // // //     transporter = nodemailer.createTransport({
// // // //       host: SMTP_HOST,
// // // //       port: SMTP_PORT,
// // // //       secure: SMTP_SECURE,
// // // //       auth: {
// // // //         user: SMTP_USER,
// // // //         pass: SMTP_PASS
// // // //       }
// // // //     });

// // // //     transporter.verify((error: Error | null, success: boolean) => {
// // // //       if (error) {
// // // //         console.error('❌ SMTP connection error:', error.message);
// // // //       } else {
// // // //         console.log('✅ SMTP server ready');
// // // //       }
// // // //     });
// // // //   } catch (error: any) {
// // // //     console.error('❌ SMTP setup error:', error.message);
// // // //   }
// // // // } else {
// // // //   console.warn('⚠️ SMTP credentials missing');
// // // //   transporter = {
// // // //     sendMail: (options: any) => {
// // // //       console.log('📧 [MOCK] Would send email to:', options.to);
// // // //       return Promise.resolve({ messageId: 'mock-' + Date.now() });
// // // //     }
// // // //   };
// // // // }

// // // // interface EmailParams {
// // // //   toEmail: string;        // ✅ Developer's email (TO - RECIPIENT)
// // // //   toName: string;
// // // //   taskTitle: string;
// // // //   reworkNotes: string;
// // // //   fromName: string;       // ✅ Tester's name
// // // //   fromEmail: string;      // ✅ Tester's email (Reply-To)
// // // //   taskId?: string;
// // // //   projectName?: string;
// // // //   reworkCount?: number;
// // // //   originalDeveloper?: string;
// // // //   isNewDeveloper?: boolean;
// // // // }

// // // // export const sendReworkRequestEmail = async (params: EmailParams): Promise<boolean> => {
// // // //   const { 
// // // //     toEmail,           // ✅ Developer's email - THIS IS THE RECIPIENT
// // // //     toName,
// // // //     taskTitle,
// // // //     reworkNotes,
// // // //     fromName,          // ✅ Tester's name
// // // //     fromEmail,         // ✅ Tester's email (Reply-To)
// // // //     taskId,
// // // //     projectName,
// // // //     reworkCount,
// // // //     originalDeveloper,
// // // //     isNewDeveloper
// // // //   } = params;

// // // //   // ✅ CRITICAL: Validate that toEmail is the developer's email
// // // //   if (!toEmail) {
// // // //     console.error('❌ Developer email is required');
// // // //     return false;
// // // //   }

// // // //   // ✅ CRITICAL: Log the actual email addresses
// // // //   console.log(`📧 Sending email:`);
// // // //   console.log(`  FROM (SMTP): ${SMTP_FROM}`);
// // // //   console.log(`  TO (Developer): ${toEmail}`);  // ✅ This MUST be the developer's email
// // // //   console.log(`  REPLY-TO: ${fromEmail}`);
// // // //   console.log(`  Sender Name: ${fromName}`);

// // // //   const currentDate = new Date().toLocaleDateString('en-US', {
// // // //     weekday: 'long',
// // // //     year: 'numeric',
// // // //     month: 'long',
// // // //     day: 'numeric'
// // // //   });

// // // //   // ✅ New developer notice
// // // //   const newDeveloperNotice = isNewDeveloper ? `
// // // //     <div style="background: #dbeafe; padding: 15px; border-radius: 8px; border-left: 4px solid #3b82f6; margin: 15px 0;">
// // // //       <p style="margin: 0; color: #1e40af;">
// // // //         <strong>📌 New Developer Account Created:</strong>
// // // //       </p>
// // // //       <p style="margin: 5px 0 0 0; color: #1e40af;">
// // // //         <strong>Email:</strong> ${toEmail}<br>
// // // //         <strong>Default Password:</strong> <code>password123</code>
// // // //       </p>
// // // //       <p style="margin: 5px 0 0 0; font-size: 12px; color: #1e40af;">
// // // //         Please change your password after first login.
// // // //       </p>
// // // //     </div>
// // // //   ` : '';

// // // //   const htmlContent = `
// // // //     <!DOCTYPE html>
// // // //     <html>
// // // //       <head>
// // // //         <style>
// // // //           body { font-family: Arial, sans-serif; color: #333; background: #f9fafb; margin: 0; padding: 20px; }
// // // //           .container { max-width: 600px; margin: 0 auto; padding: 20px; background: #fff; border-radius: 12px; box-shadow: 0 2px 10px rgba(0,0,0,0.1); }
// // // //           .header { background: #f97316; padding: 20px; border-radius: 10px 10px 0 0; text-align: center; }
// // // //           .header h2 { margin: 0; color: #fff; font-size: 24px; }
// // // //           .header p { margin: 5px 0 0 0; color: #fef3c7; font-size: 14px; }
// // // //           .content { padding: 10px; }
// // // //           .task-details { background: #f8fafc; padding: 15px; border-radius: 8px; border-left: 4px solid #f97316; margin: 15px 0; }
// // // //           .task-details p { margin: 6px 0; font-size: 14px; }
// // // //           .task-details strong { color: #1e293b; display: inline-block; min-width: 120px; }
// // // //           .notes { background: #fef3c7; padding: 15px; border-radius: 8px; margin: 15px 0; border-left: 4px solid #f59e0b; }
// // // //           .notes strong { color: #92400e; }
// // // //           .notes p { margin: 8px 0 0 0; color: #78350f; white-space: pre-wrap; }
// // // //           .sender-info { background: #f0fdf4; padding: 12px; border-radius: 8px; border-left: 4px solid #22c55e; margin: 15px 0; }
// // // //           .sender-info p { margin: 4px 0; }
// // // //           .badge { display: inline-block; background: #f97316; color: white; padding: 3px 12px; border-radius: 20px; font-size: 12px; }
// // // //           .rework-badge { display: inline-block; background: #ef4444; color: white; padding: 3px 12px; border-radius: 20px; font-size: 12px; }
// // // //           .footer { margin-top: 20px; font-size: 12px; color: #94a3b8; border-top: 1px solid #e2e8f0; padding-top: 15px; text-align: center; }
// // // //         </style>
// // // //       </head>
// // // //       <body>
// // // //         <div class="container">
// // // //           <div class="header">
// // // //             <h2>⚠️ Rework Request</h2>
// // // //             <p>Task requires additional work</p>
// // // //           </div>
          
// // // //           <div class="content">
// // // //             <p>Hi <strong>${toName}</strong>,</p>
            
// // // //             <p>The task below requires rework and has been returned to you for further development.</p>
            
// // // //             <div class="task-details">
// // // //               <p><strong>📋 Task:</strong> ${taskTitle}</p>
// // // //               ${projectName ? `<p><strong>📁 Project:</strong> ${projectName}</p>` : ''}
// // // //               ${taskId ? `<p><strong>🆔 Task ID:</strong> #${taskId}</p>` : ''}
// // // //               ${originalDeveloper ? `<p><strong>👤 Original Developer:</strong> ${originalDeveloper}</p>` : ''}
// // // //               ${reworkCount ? `<p><strong>🔄 Rework #:</strong> <span class="rework-badge">${reworkCount}</span></p>` : ''}
// // // //               <p><strong>👤 Reported by:</strong> ${fromName}</p>
// // // //               <p><strong>📧 Reporter Email:</strong> ${fromEmail}</p>
// // // //               <p><strong>📅 Date:</strong> ${currentDate}</p>
// // // //               <p><strong>📊 Status:</strong> <span class="badge">Rework Required</span></p>
// // // //             </div>

// // // //             <div class="sender-info">
// // // //               <p><strong>📧 From:</strong> ${fromName} (${fromEmail})</p>
// // // //               <p style="margin: 4px 0 0 0; font-size: 13px; color: #64748b;">
// // // //                 <em>Please reply directly to ${fromName} if you have questions.</em>
// // // //               </p>
// // // //             </div>
            
// // // //             <div class="notes">
// // // //               <strong>📝 Feedback from ${fromName}:</strong>
// // // //               <p>${reworkNotes}</p>
// // // //             </div>

// // // //             ${newDeveloperNotice}

// // // //             <div style="background: #f0f9ff; padding: 12px; border-radius: 8px; border-left: 4px solid #3b82f6; margin: 15px 0;">
// // // //               <p style="margin: 0; font-size: 14px; color: #1e40af;">
// // // //                 <strong>📌 Next Steps:</strong><br>
// // // //                 1️⃣ Review the feedback above<br>
// // // //                 2️⃣ Make the required changes<br>
// // // //                 3️⃣ Update task status to "In Progress"<br>
// // // //                 4️⃣ Submit for review when done
// // // //               </p>
// // // //             </div>

// // // //             <p>Please address these issues and update the task status when ready for re-testing.</p>
// // // //           </div>
          
// // // //           <div class="footer">
// // // //             <p><strong>From:</strong> ${fromName} (${fromEmail})</p>
// // // //             <p><strong>To:</strong> ${toName} (${toEmail})</p>
// // // //             <p>&copy; ${new Date().getFullYear()} Business OS</p>
// // // //             <p style="font-size: 10px; color: #94a3b8;">This is an automated notification</p>
// // // //           </div>
// // // //         </div>
// // // //       </body>
// // // //     </html>
// // // //   `;

// // // //   try {
// // // //     const info = await transporter.sendMail({
// // // //       from: SMTP_FROM,        // ✅ SMTP user (subasrimuthumanickam@gmail.com)
// // // //       to: toEmail,            // ✅ Developer's email (THIS IS THE RECIPIENT)
// // // //       subject: `⚠️ REWORK REQUIRED: ${taskTitle} (from ${fromName})`,
// // // //       html: htmlContent,
// // // //       replyTo: fromEmail      // ✅ Tester's email for replies
// // // //     });

// // // //     console.log(`✅ Email sent successfully!`);
// // // //     console.log(`  From: ${SMTP_FROM}`);
// // // //     console.log(`  To: ${toEmail}`);
// // // //     console.log(`  Reply-To: ${fromEmail}`);
// // // //     return true;
// // // //   } catch (error: any) {
// // // //     console.error('❌ Error sending email:', error.message);
// // // //     return false;
// // // //   }
// // // // };

// // // // export default transporter;
// // // // services/emailService.ts

// // // import nodemailer from 'nodemailer';
// // // import dotenv from 'dotenv';

// // // dotenv.config();

// // // // ✅ Get SMTP from environment variables
// // // const SMTP_USER = process.env.SMTP_USER || 'subasrimuthumanickam@gmail.com';
// // // const SMTP_PASS = process.env.SMTP_PASS || '';
// // // const SMTP_HOST = process.env.SMTP_HOST || 'smtp.gmail.com';
// // // const SMTP_PORT = parseInt(process.env.SMTP_PORT || '587');
// // // const SMTP_SECURE = process.env.SMTP_SECURE === 'true';
// // // const SMTP_FROM = SMTP_USER;

// // // console.log('📧 Email Service Initialized:');
// // // console.log('  SMTP FROM:', SMTP_FROM);

// // // let transporter: any;

// // // if (SMTP_USER && SMTP_PASS) {
// // //   try {
// // //     transporter = nodemailer.createTransport({
// // //       host: SMTP_HOST,
// // //       port: SMTP_PORT,
// // //       secure: SMTP_SECURE,
// // //       auth: {
// // //         user: SMTP_USER,
// // //         pass: SMTP_PASS
// // //       }
// // //     });

// // //     transporter.verify((error: Error | null, success: boolean) => {
// // //       if (error) {
// // //         console.error('❌ SMTP connection error:', error.message);
// // //       } else {
// // //         console.log('✅ SMTP server ready');
// // //       }
// // //     });
// // //   } catch (error: any) {
// // //     console.error('❌ SMTP setup error:', error.message);
// // //   }
// // // } else {
// // //   console.warn('⚠️ SMTP credentials missing');
// // //   transporter = {
// // //     sendMail: (options: any) => {
// // //       console.log('📧 [MOCK] Would send email to:', options.to);
// // //       return Promise.resolve({ messageId: 'mock-' + Date.now() });
// // //     }
// // //   };
// // // }

// // // interface EmailParams {
// // //   toEmail: string;
// // //   toName: string;
// // //   taskTitle: string;
// // //   reworkNotes: string;
// // //   fromName: string;
// // //   fromEmail: string;
// // //   taskId?: string;
// // //   projectName?: string;
// // //   reworkCount?: number;
// // //   originalDeveloper?: string;
// // // }

// // // export const sendReworkRequestEmail = async (params: EmailParams): Promise<boolean> => {
// // //   const { 
// // //     toEmail,
// // //     toName,
// // //     taskTitle,
// // //     reworkNotes,
// // //     fromName,
// // //     fromEmail,
// // //     taskId,
// // //     projectName,
// // //     reworkCount,
// // //     originalDeveloper
// // //   } = params;

// // //   if (!toEmail) {
// // //     console.error('❌ Developer email is required');
// // //     return false;
// // //   }

// // //   console.log(`📧 Sending email:`);
// // //   console.log(`  FROM (SMTP): ${SMTP_FROM}`);
// // //   console.log(`  TO (Developer): ${toEmail}`);
// // //   console.log(`  REPLY-TO: ${fromEmail}`);

// // //   const currentDate = new Date().toLocaleDateString('en-US', {
// // //     weekday: 'long',
// // //     year: 'numeric',
// // //     month: 'long',
// // //     day: 'numeric'
// // //   });

// // //   const htmlContent = `
// // //     <!DOCTYPE html>
// // //     <html>
// // //       <head>
// // //         <style>
// // //           body { font-family: Arial, sans-serif; color: #333; background: #f9fafb; margin: 0; padding: 20px; }
// // //           .container { max-width: 600px; margin: 0 auto; padding: 20px; background: #fff; border-radius: 12px; box-shadow: 0 2px 10px rgba(0,0,0,0.1); }
// // //           .header { background: #f97316; padding: 20px; border-radius: 10px 10px 0 0; text-align: center; }
// // //           .header h2 { margin: 0; color: #fff; font-size: 24px; }
// // //           .header p { margin: 5px 0 0 0; color: #fef3c7; font-size: 14px; }
// // //           .content { padding: 10px; }
// // //           .task-details { background: #f8fafc; padding: 15px; border-radius: 8px; border-left: 4px solid #f97316; margin: 15px 0; }
// // //           .task-details p { margin: 6px 0; font-size: 14px; }
// // //           .task-details strong { color: #1e293b; display: inline-block; min-width: 120px; }
// // //           .notes { background: #fef3c7; padding: 15px; border-radius: 8px; margin: 15px 0; border-left: 4px solid #f59e0b; }
// // //           .notes strong { color: #92400e; }
// // //           .notes p { margin: 8px 0 0 0; color: #78350f; white-space: pre-wrap; }
// // //           .sender-info { background: #f0fdf4; padding: 12px; border-radius: 8px; border-left: 4px solid #22c55e; margin: 15px 0; }
// // //           .sender-info p { margin: 4px 0; }
// // //           .badge { display: inline-block; background: #f97316; color: white; padding: 3px 12px; border-radius: 20px; font-size: 12px; }
// // //           .rework-badge { display: inline-block; background: #ef4444; color: white; padding: 3px 12px; border-radius: 20px; font-size: 12px; }
// // //           .footer { margin-top: 20px; font-size: 12px; color: #94a3b8; border-top: 1px solid #e2e8f0; padding-top: 15px; text-align: center; }
// // //         </style>
// // //       </head>
// // //       <body>
// // //         <div class="container">
// // //           <div class="header">
// // //             <h2>⚠️ Rework Request</h2>
// // //             <p>Task requires additional work</p>
// // //           </div>
          
// // //           <div class="content">
// // //             <p>Hi <strong>${toName}</strong>,</p>
            
// // //             <p>The task below requires rework and has been returned to you for further development.</p>
            
// // //             <div class="task-details">
// // //               <p><strong>📋 Task:</strong> ${taskTitle}</p>
// // //               ${projectName ? `<p><strong>📁 Project:</strong> ${projectName}</p>` : ''}
// // //               ${taskId ? `<p><strong>🆔 Task ID:</strong> #${taskId}</p>` : ''}
// // //               ${originalDeveloper ? `<p><strong>👤 Original Developer:</strong> ${originalDeveloper}</p>` : ''}
// // //               ${reworkCount ? `<p><strong>🔄 Rework #:</strong> <span class="rework-badge">${reworkCount}</span></p>` : ''}
// // //               <p><strong>👤 Reported by:</strong> ${fromName}</p>
// // //               <p><strong>📧 Reporter Email:</strong> ${fromEmail}</p>
// // //               <p><strong>📅 Date:</strong> ${currentDate}</p>
// // //               <p><strong>📊 Status:</strong> <span class="badge">Rework Required</span></p>
// // //             </div>

// // //             <div class="sender-info">
// // //               <p><strong>📧 From:</strong> ${fromName} (${fromEmail})</p>
// // //               <p style="margin: 4px 0 0 0; font-size: 13px; color: #64748b;">
// // //                 <em>Please reply directly to ${fromName} if you have questions.</em>
// // //               </p>
// // //             </div>
            
// // //             <div class="notes">
// // //               <strong>📝 Feedback from ${fromName}:</strong>
// // //               <p>${reworkNotes}</p>
// // //             </div>

// // //             <div style="background: #f0f9ff; padding: 12px; border-radius: 8px; border-left: 4px solid #3b82f6; margin: 15px 0;">
// // //               <p style="margin: 0; font-size: 14px; color: #1e40af;">
// // //                 <strong>📌 Next Steps:</strong><br>
// // //                 1️⃣ Review the feedback above<br>
// // //                 2️⃣ Make the required changes<br>
// // //                 3️⃣ Update task status to "In Progress"<br>
// // //                 4️⃣ Submit for review when done
// // //               </p>
// // //             </div>

// // //             <p>Please address these issues and update the task status when ready for re-testing.</p>
// // //           </div>
          
// // //           <div class="footer">
// // //             <p><strong>From:</strong> ${fromName} (${fromEmail})</p>
// // //             <p><strong>To:</strong> ${toName} (${toEmail})</p>
// // //             <p>&copy; ${new Date().getFullYear()} Business OS</p>
// // //             <p style="font-size: 10px; color: #94a3b8;">This is an automated notification</p>
// // //           </div>
// // //         </div>
// // //       </body>
// // //     </html>
// // //   `;

// // //   try {
// // //     const info = await transporter.sendMail({
// // //       from: SMTP_FROM,
// // //       to: toEmail,
// // //       subject: `⚠️ REWORK REQUIRED: ${taskTitle} (from ${fromName})`,
// // //       html: htmlContent,
// // //       replyTo: fromEmail
// // //     });

// // //     console.log(`✅ Email sent successfully!`);
// // //     console.log(`  From: ${SMTP_FROM}`);
// // //     console.log(`  To: ${toEmail}`);
// // //     console.log(`  Reply-To: ${fromEmail}`);
// // //     return true;
// // //   } catch (error: any) {
// // //     console.error('❌ Error sending email:', error.message);
// // //     return false;
// // //   }
// // // };

// // // export default transporter;
// // // services/emailService.ts

// // import nodemailer from 'nodemailer';
// // import dotenv from 'dotenv';

// // dotenv.config();

// // // ✅ ALWAYS use this as FROM address (SMTP user)
// // const SMTP_USER = process.env.SMTP_USER || 'subasrimuthumanickam@gmail.com';
// // const SMTP_PASS = process.env.SMTP_PASS || '';
// // const SMTP_HOST = process.env.SMTP_HOST || 'smtp.gmail.com';
// // const SMTP_PORT = parseInt(process.env.SMTP_PORT || '587');
// // const SMTP_SECURE = process.env.SMTP_SECURE === 'true';
// // const SMTP_FROM = SMTP_USER; // ✅ Always this email

// // console.log('📧 Email Service Initialized:');
// // console.log('  SMTP FROM:', SMTP_FROM);

// // let transporter: any;

// // if (SMTP_USER && SMTP_PASS) {
// //   try {
// //     transporter = nodemailer.createTransport({
// //       host: SMTP_HOST,
// //       port: SMTP_PORT,
// //       secure: SMTP_SECURE,
// //       auth: {
// //         user: SMTP_USER,
// //         pass: SMTP_PASS
// //       }
// //     });

// //     transporter.verify((error: Error | null, success: boolean) => {
// //       if (error) {
// //         console.error('❌ SMTP connection error:', error.message);
// //       } else {
// //         console.log('✅ SMTP server ready');
// //       }
// //     });
// //   } catch (error: any) {
// //     console.error('❌ SMTP setup error:', error.message);
// //   }
// // } else {
// //   console.warn('⚠️ SMTP credentials missing');
// //   transporter = {
// //     sendMail: (options: any) => {
// //       console.log('📧 [MOCK] Would send email to:', options.to);
// //       return Promise.resolve({ messageId: 'mock-' + Date.now() });
// //     }
// //   };
// // }

// // interface EmailParams {
// //   toEmail: string;        // ✅ Developer's email (TO)
// //   toName: string;
// //   taskTitle: string;
// //   reworkNotes: string;
// //   fromName: string;       // ✅ Tester's name
// //   fromEmail: string;      // ✅ Tester's email (Reply-To)
// //   taskId?: string;
// //   projectName?: string;
// //   reworkCount?: number;
// //   originalDeveloper?: string;
// //   isNewDeveloper?: boolean;
// // }

// // export const sendReworkRequestEmail = async (params: EmailParams): Promise<boolean> => {
// //   const { 
// //     toEmail,           // ✅ Developer's email - THIS IS THE RECIPIENT
// //     toName,
// //     taskTitle,
// //     reworkNotes,
// //     fromName,          // ✅ Tester's name
// //     fromEmail,         // ✅ Tester's email (Reply-To)
// //     taskId,
// //     projectName,
// //     reworkCount,
// //     originalDeveloper,
// //     isNewDeveloper
// //   } = params;

// //   if (!toEmail) {
// //     console.error('❌ Developer email is required');
// //     return false;
// //   }

// //   console.log(`📧 Sending email:`);
// //   console.log(`  FROM (SMTP): ${SMTP_FROM}`);  // ✅ Always subasrimuthumanickam@gmail.com
// //   console.log(`  TO (Developer): ${toEmail}`);  // ✅ Developer's email
// //   console.log(`  REPLY-TO: ${fromEmail}`);

// //   const currentDate = new Date().toLocaleDateString('en-US', {
// //     weekday: 'long',
// //     year: 'numeric',
// //     month: 'long',
// //     day: 'numeric'
// //   });

// //   // ✅ New developer notice
// //   const newDeveloperNotice = isNewDeveloper ? `
// //     <div style="background: #dbeafe; padding: 15px; border-radius: 8px; border-left: 4px solid #3b82f6; margin: 15px 0;">
// //       <p style="margin: 0; color: #1e40af;">
// //         <strong>📌 New Developer Account Created:</strong>
// //       </p>
// //       <p style="margin: 5px 0 0 0; color: #1e40af;">
// //         <strong>Email:</strong> ${toEmail}<br>
// //         <strong>Default Password:</strong> <code>password123</code>
// //       </p>
// //       <p style="margin: 5px 0 0 0; font-size: 12px; color: #1e40af;">
// //         Please change your password after first login.
// //       </p>
// //     </div>
// //   ` : '';

// //   const htmlContent = `
// //     <!DOCTYPE html>
// //     <html>
// //       <head>
// //         <style>
// //           body { font-family: Arial, sans-serif; color: #333; background: #f9fafb; margin: 0; padding: 20px; }
// //           .container { max-width: 600px; margin: 0 auto; padding: 20px; background: #fff; border-radius: 12px; box-shadow: 0 2px 10px rgba(0,0,0,0.1); }
// //           .header { background: #f97316; padding: 20px; border-radius: 10px 10px 0 0; text-align: center; }
// //           .header h2 { margin: 0; color: #fff; font-size: 24px; }
// //           .header p { margin: 5px 0 0 0; color: #fef3c7; font-size: 14px; }
// //           .content { padding: 10px; }
// //           .task-details { background: #f8fafc; padding: 15px; border-radius: 8px; border-left: 4px solid #f97316; margin: 15px 0; }
// //           .task-details p { margin: 6px 0; font-size: 14px; }
// //           .task-details strong { color: #1e293b; display: inline-block; min-width: 120px; }
// //           .notes { background: #fef3c7; padding: 15px; border-radius: 8px; margin: 15px 0; border-left: 4px solid #f59e0b; }
// //           .notes strong { color: #92400e; }
// //           .notes p { margin: 8px 0 0 0; color: #78350f; white-space: pre-wrap; }
// //           .sender-info { background: #f0fdf4; padding: 12px; border-radius: 8px; border-left: 4px solid #22c55e; margin: 15px 0; }
// //           .sender-info p { margin: 4px 0; }
// //           .badge { display: inline-block; background: #f97316; color: white; padding: 3px 12px; border-radius: 20px; font-size: 12px; }
// //           .rework-badge { display: inline-block; background: #ef4444; color: white; padding: 3px 12px; border-radius: 20px; font-size: 12px; }
// //           .footer { margin-top: 20px; font-size: 12px; color: #94a3b8; border-top: 1px solid #e2e8f0; padding-top: 15px; text-align: center; }
// //         </style>
// //       </head>
// //       <body>
// //         <div class="container">
// //           <div class="header">
// //             <h2>⚠️ Rework Request</h2>
// //             <p>Task requires additional work</p>
// //           </div>
          
// //           <div class="content">
// //             <p>Hi <strong>${toName}</strong>,</p>
            
// //             <p>The task below requires rework and has been returned to you for further development.</p>
            
// //             <div class="task-details">
// //               <p><strong>📋 Task:</strong> ${taskTitle}</p>
// //               ${projectName ? `<p><strong>📁 Project:</strong> ${projectName}</p>` : ''}
// //               ${taskId ? `<p><strong>🆔 Task ID:</strong> #${taskId}</p>` : ''}
// //               ${originalDeveloper ? `<p><strong>👤 Original Developer:</strong> ${originalDeveloper}</p>` : ''}
// //               ${reworkCount ? `<p><strong>🔄 Rework #:</strong> <span class="rework-badge">${reworkCount}</span></p>` : ''}
// //               <p><strong>👤 Reported by:</strong> ${fromName}</p>
// //               <p><strong>📧 Reporter Email:</strong> ${fromEmail}</p>
// //               <p><strong>📅 Date:</strong> ${currentDate}</p>
// //               <p><strong>📊 Status:</strong> <span class="badge">Rework Required</span></p>
// //             </div>

// //             <div class="sender-info">
// //               <p><strong>📧 From:</strong> ${fromName} (${fromEmail})</p>
// //               <p style="margin: 4px 0 0 0; font-size: 13px; color: #64748b;">
// //                 <em>Please reply directly to ${fromName} if you have questions.</em>
// //               </p>
// //             </div>
            
// //             <div class="notes">
// //               <strong>📝 Feedback from ${fromName}:</strong>
// //               <p>${reworkNotes}</p>
// //             </div>

// //             ${newDeveloperNotice}

// //             <div style="background: #f0f9ff; padding: 12px; border-radius: 8px; border-left: 4px solid #3b82f6; margin: 15px 0;">
// //               <p style="margin: 0; font-size: 14px; color: #1e40af;">
// //                 <strong>📌 Next Steps:</strong><br>
// //                 1️⃣ Review the feedback above<br>
// //                 2️⃣ Make the required changes<br>
// //                 3️⃣ Update task status to "In Progress"<br>
// //                 4️⃣ Submit for review when done
// //               </p>
// //             </div>

// //             <p>Please address these issues and update the task status when ready for re-testing.</p>
// //           </div>
          
// //           <div class="footer">
// //             <p><strong>From:</strong> ${fromName} (${fromEmail})</p>
// //             <p><strong>To:</strong> ${toName} (${toEmail})</p>
// //             <p>&copy; ${new Date().getFullYear()} Business OS</p>
// //             <p style="font-size: 10px; color: #94a3b8;">This is an automated notification</p>
// //           </div>
// //         </div>
// //       </body>
// //     </html>
// //   `;

// //   try {
// //     const info = await transporter.sendMail({
// //       from: SMTP_FROM,        // ✅ ALWAYS subasrimuthumanickam@gmail.com
// //       to: toEmail,            // ✅ Developer's email
// //       subject: `⚠️ REWORK REQUIRED: ${taskTitle} (from ${fromName})`,
// //       html: htmlContent,
// //       replyTo: fromEmail      // ✅ Tester's email for replies
// //     });

// //     console.log(`✅ Email sent successfully!`);
// //     console.log(`  From: ${SMTP_FROM}`);
// //     console.log(`  To: ${toEmail}`);
// //     console.log(`  Reply-To: ${fromEmail}`);
// //     return true;
// //   } catch (error: any) {
// //     console.error('❌ Error sending email:', error.message);
// //     return false;
// //   }
// // };

// // export default transporter;
// // services/emailService.ts

// import nodemailer from 'nodemailer';
// import dotenv from 'dotenv';

// dotenv.config();

// // ✅ ALWAYS use this as FROM address (SMTP user)
// const SMTP_USER = process.env.SMTP_USER || 'subasrimuthumanickam@gmail.com';
// const SMTP_PASS = process.env.SMTP_PASS || '';
// const SMTP_HOST = process.env.SMTP_HOST || 'smtp.gmail.com';
// const SMTP_PORT = parseInt(process.env.SMTP_PORT || '587');
// const SMTP_SECURE = process.env.SMTP_SECURE === 'true';
// const SMTP_FROM = SMTP_USER;

// console.log('📧 Email Service Initialized:');
// console.log('  SMTP FROM:', SMTP_FROM);

// let transporter: any;

// if (SMTP_USER && SMTP_PASS) {
//   try {
//     transporter = nodemailer.createTransport({
//       host: SMTP_HOST,
//       port: SMTP_PORT,
//       secure: SMTP_SECURE,
//       auth: {
//         user: SMTP_USER,
//         pass: SMTP_PASS
//       }
//     });

//     transporter.verify((error: Error | null, success: boolean) => {
//       if (error) {
//         console.error('❌ SMTP connection error:', error.message);
//       } else {
//         console.log('✅ SMTP server ready');
//       }
//     });
//   } catch (error: any) {
//     console.error('❌ SMTP setup error:', error.message);
//   }
// } else {
//   console.warn('⚠️ SMTP credentials missing');
//   transporter = {
//     sendMail: (options: any) => {
//       console.log('📧 [MOCK] Would send email to:', options.to);
//       return Promise.resolve({ messageId: 'mock-' + Date.now() });
//     }
//   };
// }

// interface EmailParams {
//   toEmail: string;
//   toName: string;
//   taskTitle: string;
//   reworkNotes: string;
//   fromName: string;
//   fromEmail: string;
//   taskId?: string;
//   projectName?: string;
//   reworkCount?: number;
//   originalDeveloper?: string;
//   isNewDeveloper?: boolean;
// }

// export const sendReworkRequestEmail = async (params: EmailParams): Promise<boolean> => {
//   const { 
//     toEmail,
//     toName,
//     taskTitle,
//     reworkNotes,
//     fromName,
//     fromEmail,
//     taskId,
//     projectName,
//     reworkCount,
//     originalDeveloper,
//     isNewDeveloper
//   } = params;

//   if (!toEmail) {
//     console.error('❌ Developer email is required');
//     return false;
//   }

//   console.log(`📧 Sending email:`);
//   console.log(`  FROM (SMTP): ${SMTP_FROM}`);
//   console.log(`  TO (Developer): ${toEmail}`);
//   console.log(`  REPLY-TO: ${fromEmail}`);
//   console.log(`  Developer Type: ${isNewDeveloper ? 'NEWLY CREATED' : 'EXISTING DATABASE'}`);

//   const currentDate = new Date().toLocaleDateString('en-US', {
//     weekday: 'long',
//     year: 'numeric',
//     month: 'long',
//     day: 'numeric'
//   });

//   // ✅ New developer notice
//   const newDeveloperNotice = isNewDeveloper ? `
//     <div style="background: #dbeafe; padding: 15px; border-radius: 8px; border-left: 4px solid #3b82f6; margin: 15px 0;">
//       <p style="margin: 0; color: #1e40af;">
//         <strong>📌 New Developer Account Created:</strong>
//       </p>
//       <p style="margin: 5px 0 0 0; color: #1e40af;">
//         <strong>Email:</strong> ${toEmail}<br>
//         <strong>Default Password:</strong> <code>password123</code>
//       </p>
//       <p style="margin: 5px 0 0 0; font-size: 12px; color: #1e40af;">
//         Please change your password after first login.
//       </p>
//     </div>
//   ` : '';

//   const htmlContent = `
//     <!DOCTYPE html>
//     <html>
//       <head>
//         <style>
//           body { font-family: Arial, sans-serif; color: #333; background: #f9fafb; margin: 0; padding: 20px; }
//           .container { max-width: 600px; margin: 0 auto; padding: 20px; background: #fff; border-radius: 12px; box-shadow: 0 2px 10px rgba(0,0,0,0.1); }
//           .header { background: #f97316; padding: 20px; border-radius: 10px 10px 0 0; text-align: center; }
//           .header h2 { margin: 0; color: #fff; font-size: 24px; }
//           .header p { margin: 5px 0 0 0; color: #fef3c7; font-size: 14px; }
//           .content { padding: 10px; }
//           .task-details { background: #f8fafc; padding: 15px; border-radius: 8px; border-left: 4px solid #f97316; margin: 15px 0; }
//           .task-details p { margin: 6px 0; font-size: 14px; }
//           .task-details strong { color: #1e293b; display: inline-block; min-width: 120px; }
//           .notes { background: #fef3c7; padding: 15px; border-radius: 8px; margin: 15px 0; border-left: 4px solid #f59e0b; }
//           .notes strong { color: #92400e; }
//           .notes p { margin: 8px 0 0 0; color: #78350f; white-space: pre-wrap; }
//           .sender-info { background: #f0fdf4; padding: 12px; border-radius: 8px; border-left: 4px solid #22c55e; margin: 15px 0; }
//           .sender-info p { margin: 4px 0; }
//           .badge { display: inline-block; background: #f97316; color: white; padding: 3px 12px; border-radius: 20px; font-size: 12px; }
//           .rework-badge { display: inline-block; background: #ef4444; color: white; padding: 3px 12px; border-radius: 20px; font-size: 12px; }
//           .footer { margin-top: 20px; font-size: 12px; color: #94a3b8; border-top: 1px solid #e2e8f0; padding-top: 15px; text-align: center; }
//         </style>
//       </head>
//       <body>
//         <div class="container">
//           <div class="header">
//             <h2>⚠️ Rework Request</h2>
//             <p>Task requires additional work</p>
//           </div>
          
//           <div class="content">
//             <p>Hi <strong>${toName}</strong>,</p>
            
//             <p>The task below requires rework and has been returned to you for further development.</p>
            
//             <div class="task-details">
//               <p><strong>📋 Task:</strong> ${taskTitle}</p>
//               ${projectName ? `<p><strong>📁 Project:</strong> ${projectName}</p>` : ''}
//               ${taskId ? `<p><strong>🆔 Task ID:</strong> #${taskId}</p>` : ''}
//               ${originalDeveloper ? `<p><strong>👤 Original Developer:</strong> ${originalDeveloper}</p>` : ''}
//               ${reworkCount ? `<p><strong>🔄 Rework #:</strong> <span class="rework-badge">${reworkCount}</span></p>` : ''}
//               <p><strong>👤 Reported by:</strong> ${fromName}</p>
//               <p><strong>📧 Reporter Email:</strong> ${fromEmail}</p>
//               <p><strong>📅 Date:</strong> ${currentDate}</p>
//               <p><strong>📊 Status:</strong> <span class="badge">Rework Required</span></p>
//             </div>

//             <div class="sender-info">
//               <p><strong>📧 From:</strong> ${fromName} (${fromEmail})</p>
//               <p style="margin: 4px 0 0 0; font-size: 13px; color: #64748b;">
//                 <em>Please reply directly to ${fromName} if you have questions.</em>
//               </p>
//             </div>
            
//             <div class="notes">
//               <strong>📝 Feedback from ${fromName}:</strong>
//               <p>${reworkNotes}</p>
//             </div>

//             ${newDeveloperNotice}

//             <div style="background: #f0f9ff; padding: 12px; border-radius: 8px; border-left: 4px solid #3b82f6; margin: 15px 0;">
//               <p style="margin: 0; font-size: 14px; color: #1e40af;">
//                 <strong>📌 Next Steps:</strong><br>
//                 1️⃣ Review the feedback above<br>
//                 2️⃣ Make the required changes<br>
//                 3️⃣ Update task status to "In Progress"<br>
//                 4️⃣ Submit for review when done
//               </p>
//             </div>

//             <p>Please address these issues and update the task status when ready for re-testing.</p>
//           </div>
          
//           <div class="footer">
//             <p><strong>From:</strong> ${fromName} (${fromEmail})</p>
//             <p><strong>To:</strong> ${toName} (${toEmail})</p>
//             <p>&copy; ${new Date().getFullYear()} Business OS</p>
//             <p style="font-size: 10px; color: #94a3b8;">This is an automated notification</p>
//           </div>
//         </div>
//       </body>
//     </html>
//   `;

//   try {
//     const info = await transporter.sendMail({
//       from: SMTP_FROM,        // ✅ ALWAYS subasrimuthumanickam@gmail.com
//       to: toEmail,            // ✅ Developer's email
//       subject: `⚠️ REWORK REQUIRED: ${taskTitle} (from ${fromName})`,
//       html: htmlContent,
//       replyTo: fromEmail
//     });

//     console.log(`✅ Email sent successfully!`);
//     console.log(`  From: ${SMTP_FROM}`);
//     console.log(`  To: ${toEmail}`);
//     console.log(`  Reply-To: ${fromEmail}`);
//     return true;
//   } catch (error: any) {
//     console.error('❌ Error sending email:', error.message);
//     return false;
//   }
// };

// export default transporter;
// services/emailService.ts

import nodemailer from 'nodemailer';
import dotenv from 'dotenv';

dotenv.config();

// ✅ ALWAYS use this as FROM address (SMTP user)
const SMTP_USER = process.env.SMTP_USER || 'subasrimuthumanickam@gmail.com';
const SMTP_PASS = process.env.SMTP_PASS || '';
const SMTP_HOST = process.env.SMTP_HOST || 'smtp.gmail.com';
const SMTP_PORT = parseInt(process.env.SMTP_PORT || '587');
const SMTP_SECURE = process.env.SMTP_SECURE === 'true';
const SMTP_FROM = SMTP_USER;

console.log('📧 Email Service Initialized:');
console.log('  SMTP FROM:', SMTP_FROM);

let transporter: any;

if (SMTP_USER && SMTP_PASS) {
  try {
    transporter = nodemailer.createTransport({
      host: SMTP_HOST,
      port: SMTP_PORT,
      secure: SMTP_SECURE,
      auth: {
        user: SMTP_USER,
        pass: SMTP_PASS
      }
    });

    transporter.verify((error: Error | null, success: boolean) => {
      if (error) {
        console.error('❌ SMTP connection error:', error.message);
      } else {
        console.log('✅ SMTP server ready');
      }
    });
  } catch (error: any) {
    console.error('❌ SMTP setup error:', error.message);
  }
} else {
  console.warn('⚠️ SMTP credentials missing');
  transporter = {
    sendMail: (options: any) => {
      console.log('📧 [MOCK] Would send email to:', options.to);
      return Promise.resolve({ messageId: 'mock-' + Date.now() });
    }
  };
}

interface EmailParams {
  toEmail: string;        // ✅ Developer's email (TO - RECIPIENT)
  toName: string;
  taskTitle: string;
  reworkNotes: string;
  fromName: string;       // ✅ Tester's name (shown as sender)
  fromEmail: string;      // ✅ Tester's email (Reply-To)
  taskId?: string;
  projectName?: string;
  reworkCount?: number;
  originalDeveloper?: string;
  isNewDeveloper?: boolean;
}

export const sendReworkRequestEmail = async (params: EmailParams): Promise<boolean> => {
  const { 
    toEmail,           // ✅ Developer's email - THIS IS THE RECIPIENT
    toName,
    taskTitle,
    reworkNotes,
    fromName,          // ✅ Tester's name
    fromEmail,         // ✅ Tester's email (Reply-To)
    taskId,
    projectName,
    reworkCount,
    originalDeveloper,
    isNewDeveloper
  } = params;

  if (!toEmail) {
    console.error('❌ Developer email is required');
    return false;
  }

  console.log(`📧 ========== SENDING EMAIL ==========`);
  console.log(`📧 FROM (SMTP): ${SMTP_FROM}`);
  console.log(`📧 TO (Developer): ${toEmail}`);  // ✅ This is the recipient
  console.log(`📧 Developer Name: ${toName}`);
  console.log(`📧 REPLY-TO (Tester): ${fromEmail}`);
  console.log(`📧 Tester Name: ${fromName}`);
  console.log(`📧 ===================================`);

  const currentDate = new Date().toLocaleDateString('en-US', {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });

  // ✅ New developer notice
  const newDeveloperNotice = isNewDeveloper ? `
    <div style="background: #dbeafe; padding: 15px; border-radius: 8px; border-left: 4px solid #3b82f6; margin: 15px 0;">
      <p style="margin: 0; color: #1e40af;">
        <strong>📌 New Developer Account Created:</strong>
      </p>
      <p style="margin: 5px 0 0 0; color: #1e40af;">
        <strong>Email:</strong> ${toEmail}<br>
        <strong>Default Password:</strong> <code>password123</code>
      </p>
      <p style="margin: 5px 0 0 0; font-size: 12px; color: #1e40af;">
        Please change your password after first login.
      </p>
    </div>
  ` : '';

  const htmlContent = `
    <!DOCTYPE html>
    <html>
      <head>
        <style>
          body { font-family: Arial, sans-serif; color: #333; background: #f9fafb; margin: 0; padding: 20px; }
          .container { max-width: 600px; margin: 0 auto; padding: 20px; background: #fff; border-radius: 12px; box-shadow: 0 2px 10px rgba(0,0,0,0.1); }
          .header { background: #f97316; padding: 20px; border-radius: 10px 10px 0 0; text-align: center; }
          .header h2 { margin: 0; color: #fff; font-size: 24px; }
          .header p { margin: 5px 0 0 0; color: #fef3c7; font-size: 14px; }
          .content { padding: 10px; }
          .task-details { background: #f8fafc; padding: 15px; border-radius: 8px; border-left: 4px solid #f97316; margin: 15px 0; }
          .task-details p { margin: 6px 0; font-size: 14px; }
          .task-details strong { color: #1e293b; display: inline-block; min-width: 120px; }
          .notes { background: #fef3c7; padding: 15px; border-radius: 8px; margin: 15px 0; border-left: 4px solid #f59e0b; }
          .notes strong { color: #92400e; }
          .notes p { margin: 8px 0 0 0; color: #78350f; white-space: pre-wrap; }
          .sender-info { background: #f0fdf4; padding: 12px; border-radius: 8px; border-left: 4px solid #22c55e; margin: 15px 0; }
          .sender-info p { margin: 4px 0; }
          .badge { display: inline-block; background: #f97316; color: white; padding: 3px 12px; border-radius: 20px; font-size: 12px; }
          .rework-badge { display: inline-block; background: #ef4444; color: white; padding: 3px 12px; border-radius: 20px; font-size: 12px; }
          .footer { margin-top: 20px; font-size: 12px; color: #94a3b8; border-top: 1px solid #e2e8f0; padding-top: 15px; text-align: center; }
        </style>
      </head>
      <body>
        <div class="container">
          <div class="header">
            <h2>⚠️ Rework Request</h2>
            <p>Task requires additional work</p>
          </div>
          
          <div class="content">
            <p>Hi <strong>${toName}</strong>,</p>
            
            <p>The task below requires rework and has been returned to you for further development.</p>
            
            <div class="task-details">
              <p><strong>📋 Task:</strong> ${taskTitle}</p>
              ${projectName ? `<p><strong>📁 Project:</strong> ${projectName}</p>` : ''}
              ${taskId ? `<p><strong>🆔 Task ID:</strong> #${taskId}</p>` : ''}
              ${originalDeveloper ? `<p><strong>👤 Original Developer:</strong> ${originalDeveloper}</p>` : ''}
              ${reworkCount ? `<p><strong>🔄 Rework #:</strong> <span class="rework-badge">${reworkCount}</span></p>` : ''}
              <p><strong>👤 Reported by:</strong> ${fromName}</p>
              <p><strong>📧 Reporter Email:</strong> ${fromEmail}</p>
              <p><strong>📅 Date:</strong> ${currentDate}</p>
              <p><strong>📊 Status:</strong> <span class="badge">Rework Required</span></p>
            </div>

            <div class="sender-info">
              <p><strong>📧 From:</strong> ${fromName} (${fromEmail})</p>
              <p style="margin: 4px 0 0 0; font-size: 13px; color: #64748b;">
                <em>Please reply directly to ${fromName} if you have questions.</em>
              </p>
            </div>
            
            <div class="notes">
              <strong>📝 Feedback from ${fromName}:</strong>
              <p>${reworkNotes}</p>
            </div>

            ${newDeveloperNotice}

            <div style="background: #f0f9ff; padding: 12px; border-radius: 8px; border-left: 4px solid #3b82f6; margin: 15px 0;">
              <p style="margin: 0; font-size: 14px; color: #1e40af;">
                <strong>📌 Next Steps:</strong><br>
                1️⃣ Review the feedback above<br>
                2️⃣ Make the required changes<br>
                3️⃣ Update task status to "In Progress"<br>
                4️⃣ Submit for review when done
              </p>
            </div>

            <p>Please address these issues and update the task status when ready for re-testing.</p>
          </div>
          
          <div class="footer">
            <p><strong>From:</strong> ${fromName} (${fromEmail})</p>
            <p><strong>To:</strong> ${toName} (${toEmail})</p>
            <p>&copy; ${new Date().getFullYear()} Business OS</p>
            <p style="font-size: 10px; color: #94a3b8;">This is an automated notification</p>
          </div>
        </div>
      </body>
    </html>
  `;

  try {
    const info = await transporter.sendMail({
      from: SMTP_FROM,        // ✅ ALWAYS subasrimuthumanickam@gmail.com
      to: toEmail,            // ✅ Developer's email (RECIPIENT)
      subject: `⚠️ REWORK REQUIRED: ${taskTitle} (from ${fromName})`,
      html: htmlContent,
      replyTo: fromEmail      // ✅ Tester's email for replies (NOT the recipient)
    });

    console.log(`✅ Email sent successfully!`);
    console.log(`  From: ${SMTP_FROM}`);
    console.log(`  To: ${toEmail}`);
    console.log(`  Reply-To: ${fromEmail}`);
    return true;
  } catch (error: any) {
    console.error('❌ Error sending email:', error.message);
    return false;
  }
};

export default transporter;