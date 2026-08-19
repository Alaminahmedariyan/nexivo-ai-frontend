export type ChatRole = "user" | "assistant";

export type ChatMessage = {
  role: ChatRole;
  content: string;
  timestamp: string;
};

export type AIConversation = {
  id: string;
  userId: string | null;
  leadId: string | null;
  title: string | null;
  messages: ChatMessage[];
  createdAt: string;
  updatedAt: string;
};

export type StartConversationInput = {
  leadId?: string;
  title?: string;
  message: string;
};

export type AddMessageInput = {
  role: ChatRole;
  content: string;
};

export type ProposalStatus = "DRAFT" | "SENT" | "ACCEPTED" | "REJECTED";
export type ProposalCurrency = "USD" | "EUR" | "BDT";

export type AIProposal = {
  id: string;
  leadId: string | null;
  clientId: string | null;
  title: string;
  content: string;
  amount: string | null;
  currency: ProposalCurrency;
  status: ProposalStatus;
  generatedById: string;
  createdAt: string;
  updatedAt: string;
  lead?: { id: string; name: string; email: string } | null;
  client?: { id: string; companyName: string | null } | null;
  generatedBy?: { id: string; name: string; email: string };
};

export type CreateProposalInput = {
  leadId?: string;
  clientId?: string;
  title: string;
  content: string;
  amount: number;
  currency?: ProposalCurrency;
};

// Note: "ACCEPTED" intentionally excluded — accepting goes through a
// dedicated endpoint that also generates an invoice (see acceptProposal).
export type UpdatableProposalStatus = "DRAFT" | "SENT" | "REJECTED";

export type AIFeature = "AI_CHAT" | "PROPOSAL_GENERATOR" | "WORKFLOW_AUTOMATION" | "QUOTE_ESTIMATOR";
export type AIUsageStatus = "SUCCESS" | "FAILED";

export type AIUsageLog = {
  id: string;
  userId: string | null;
  feature: AIFeature;
  promptTokens: number;
  outputTokens: number;
  cost: string | null;
  status: AIUsageStatus;
  createdAt: string;
};

export type TriggerType = "MANUAL" | "SCHEDULE" | "WEBHOOK";
export type AutomationExecutionStatus = "RUNNING" | "SUCCESS" | "FAILED";

export type AutomationExecution = {
  id: string;
  workflowName: string;
  triggerType: TriggerType;
  status: AutomationExecutionStatus;
  executionTime: number | null;
  startedAt: string;
  completedAt: string | null;
  error: string | null;
  userId: string | null;
};