export type ApiKeyRecord = {
  id: string;
  name: string;
  prefix: string;
  lastUsedAt: string | null;
  expiresAt: string | null;
  isActive: boolean;
  createdById: string | null;
  createdAt: string;
};

export type CreatedApiKey = ApiKeyRecord & { key: string };
export type CreateApiKeyInput = { name: string; expiresAt?: string };