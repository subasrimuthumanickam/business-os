declare module 'nodemailer' {
  export interface TransportOptions {
    host?: string;
    port?: number;
    secure?: boolean;
    auth?: {
      user?: string;
      pass?: string;
    };
  }

  export interface Transporter {
    verify(callback: (error: Error | null, success: boolean) => void): void;
    sendMail(options: any, callback?: (err: Error | null, info: any) => void): Promise<any>;
  }

  export function createTransport(options: TransportOptions): Transporter;

  const nodemailer: {
    createTransport(options: TransportOptions): Transporter;
  };
  export default nodemailer;
}
