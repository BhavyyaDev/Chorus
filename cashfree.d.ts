declare module '@cashfreepayments/cashfree-js' {
  export interface CashfreeConfig {
    mode: 'sandbox' | 'production';
  }

  export interface CheckoutOptions {
    paymentSessionId: string;
    redirectTarget?: '_self' | '_blank' | '_top' | '_modal' | string;
  }

  export interface CheckoutResult {
    error?: {
      message: string;
      code?: string;
      type?: string;
    } | null;
    redirect?: boolean;
    paymentDetails?: {
      paymentId: string;
      orderId: string;
      paymentStatus?: string;
      paymentAmount?: number;
      paymentCurrency?: string;
    };
  }

  export interface CashfreeInstance {
    checkout: (options: CheckoutOptions) => Promise<CheckoutResult>;
  }

  export function load(config: CashfreeConfig): Promise<CashfreeInstance>;
}
