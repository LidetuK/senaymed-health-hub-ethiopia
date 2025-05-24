import { Module } from '@nestjs/common';
import { MailerModule } from '@nestjs-modules/mailer';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { EmailService } from './email.service';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    MailerModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: async (configService: ConfigService) => {
        const smtpHost = configService.get('SMTP_HOST');
        const smtpPort = configService.get('SMTP_PORT');
        const smtpUser = configService.get('SMTP_USER');
        const smtpPass = configService.get('SMTP_PASS');

        // For development, use a mock transport if SMTP is not configured
        if (!smtpHost || !smtpPort || !smtpUser || !smtpPass) {
          console.warn('SMTP configuration not found. Using mock transport for development.');
          return {
            transport: {
              host: 'localhost',
              port: 1025,
              secure: false,
              auth: {
                user: 'test',
                pass: 'test',
              },
            },
            defaults: {
              from: '"SenayMed" <noreply@senaymed.com>',
            },
          };
        }

        const config = {
          transport: {
            host: smtpHost,
            port: parseInt(smtpPort, 10),
            secure: false,
            auth: {
              user: smtpUser,
              pass: smtpPass,
            },
            debug: true,
            logger: true,
          },
          defaults: {
            from: `"SenayMed" <${smtpUser}>`,
          },
        };
        
        console.log('Email configuration:', {
          host: config.transport.host,
          port: config.transport.port,
          user: config.transport.auth.user,
        });
        
        return config;
      },
      inject: [ConfigService],
    }),
  ],
  providers: [EmailService],
  exports: [EmailService],
})
export class EmailModule {} 