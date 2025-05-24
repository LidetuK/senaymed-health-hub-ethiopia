import { Injectable, Logger } from '@nestjs/common';
import { MailerService } from '@nestjs-modules/mailer';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class EmailService {
  private readonly logger = new Logger(EmailService.name);
  private readonly isDevelopment: boolean;

  constructor(
    private readonly mailerService: MailerService,
    private readonly configService: ConfigService,
  ) {
    this.isDevelopment = process.env.NODE_ENV !== 'production';
  }

  async sendVerificationEmail(email: string, token: string) {
    try {
      const verificationUrl = `${this.configService.get('FRONTEND_URL')}/verify-email?token=${token}`;
      
      this.logger.log(`Sending verification email to ${email}`);
      
      if (this.isDevelopment) {
        this.logger.log(`[DEV] Verification URL: ${verificationUrl}`);
        return;
      }

      await this.mailerService.sendMail({
        to: email,
        subject: 'Verify your SenayMed account',
        html: `
          <h1>Welcome to SenayMed!</h1>
          <p>Thank you for signing up. Please verify your email address by clicking the link below:</p>
          <p>
            <a href="${verificationUrl}" style="
              display: inline-block;
              padding: 12px 24px;
              background-color: #4F46E5;
              color: white;
              text-decoration: none;
              border-radius: 4px;
              font-weight: bold;
            ">Verify Email Address</a>
          </p>
          <p>If you did not create an account, you can safely ignore this email.</p>
          <p>This link will expire in 24 hours.</p>
          <p>Best regards,<br>The SenayMed Team</p>
        `,
      });
      
      this.logger.log(`Verification email sent successfully to ${email}`);
    } catch (error) {
      this.logger.error(`Failed to send verification email to ${email}:`, error);
      if (this.isDevelopment) {
        this.logger.log(`[DEV] Continuing despite email error`);
        return;
      }
      throw error;
    }
  }

  async sendPasswordResetEmail(email: string, token: string) {
    try {
      const resetUrl = `${this.configService.get('FRONTEND_URL')}/reset-password?token=${token}`;
      
      this.logger.log(`Sending password reset email to ${email}`);
      
      if (this.isDevelopment) {
        this.logger.log(`[DEV] Password reset URL: ${resetUrl}`);
        return;
      }

      await this.mailerService.sendMail({
        to: email,
        subject: 'Reset your SenayMed password',
        html: `
          <h1>Password Reset Request</h1>
          <p>You have requested to reset your password. Click the link below to proceed:</p>
          <p>
            <a href="${resetUrl}" style="
              display: inline-block;
              padding: 12px 24px;
              background-color: #4F46E5;
              color: white;
              text-decoration: none;
              border-radius: 4px;
              font-weight: bold;
            ">Reset Password</a>
          </p>
          <p>If you did not request a password reset, you can safely ignore this email.</p>
          <p>This link will expire in 1 hour.</p>
          <p>Best regards,<br>The SenayMed Team</p>
        `,
      });
      
      this.logger.log(`Password reset email sent successfully to ${email}`);
    } catch (error) {
      this.logger.error(`Failed to send password reset email to ${email}:`, error);
      if (this.isDevelopment) {
        this.logger.log(`[DEV] Continuing despite email error`);
        return;
      }
      throw error;
    }
  }
} 