declare global {
  namespace Express {
    interface Request {
      user?: {
        userId: number;
        companyId: number;
        [key: string]: any;
      };
    }
  }
}

export {};