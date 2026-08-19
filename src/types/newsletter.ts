export type NewsletterSubscriber = {
  id: string;
  email: string;
  isActive: boolean;
  createdAt: string;
};

export type SubscribeInput = { email: string };