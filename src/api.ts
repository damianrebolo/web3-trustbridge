/**
 * TrustBridge API Client
 *
 * Talks to the full-api backend.
 * All calls return typed responses.
 */

// In production, this would come from an env variable.
// For the hackathon, we use the Render deployment or localhost.
const API_BASE =
  import.meta.env?.VITE_API_URL ||
  (window.location.hostname === 'localhost'
    ? 'http://localhost:3001'
    : 'https://trustbridge-api-by76.onrender.com');

async function api<T>(path: string, options?: RequestInit): Promise<T> {
  const res = await fetch(`${API_BASE}${path}`, {
    headers: { 'Content-Type': 'application/json' },
    ...options,
  });
  const data = await res.json();
  if (!res.ok) throw new Error(data.error || `HTTP ${res.status}`);
  return data;
}

// ── Types ──

export interface DemoDID {
  success: boolean;
  did: string;
  objectId: string;
  senderAddress: string;
  explorerUrl: string;
  companyName: string;
  createdAt: string;
  document: {
    doc: {
      id: string;
      verificationMethod: Array<{
        id: string;
        controller: string;
        type: string;
        publicKeyJwk: Record<string, string>;
      }>;
    };
    meta: { created: string; updated: string };
  };
}

export interface TrustProfile {
  id: string;
  companyName: string;
  domain: string;
  did: string;
  trustStars: number;
  isVerified: boolean;
  isStaked: boolean;
  isProven: boolean;
  isVouched: boolean;
  completedDeals: number;
  createdAt: number;
  isSlashed: boolean;
}

export interface AuditEntry {
  id: string;
  eventType: string;
  subjectProfileId: string;
  actorDid: string;
  timestamp: string;
  dataHash: string;
  details: Record<string, unknown>;
}

export interface TrustChain {
  profile: TrustProfile;
  auditTrail: AuditEntry[];
  stars: {
    verified: boolean;
    staked: boolean;
    proven: boolean;
    vouched: boolean;
    total: number;
  };
}

export interface StakePool {
  id: string;
  minStake: number;
  totalStaked: number;
  totalStakers: number;
  slashedFundsAmount: number;
}

// ── Identity ──

export const identity = {
  demo: () => api<DemoDID>('/api/identity/demo'),

  createDid: (companyName: string) =>
    api<DemoDID>('/api/identity/create-did', {
      method: 'POST',
      body: JSON.stringify({ companyName }),
    }),

  resolve: (did: string) =>
    api<{ success: boolean; did: string; document: unknown }>(`/api/identity/resolve/${did}`),

  issueCredential: (issuerDid: string, subjectDid: string, credentialType: string, claims: Record<string, string>) =>
    api<{ success: boolean; jwt: string; credentialHash: string }>('/api/identity/issue-credential', {
      method: 'POST',
      body: JSON.stringify({ issuerDid, subjectDid, credentialType, claims }),
    }),

  verifyCredential: (jwt: string) =>
    api<{ success: boolean; verification: { isValid: boolean; issuerDid: string; credentialType: string } }>('/api/identity/verify-credential', {
      method: 'POST',
      body: JSON.stringify({ jwt }),
    }),
};

// ── Profiles ──

export const profiles = {
  create: (companyName: string, domain: string, did: string) =>
    api<{ success: boolean; profileId: string; transactionDigest: string }>('/api/profile/create', {
      method: 'POST',
      body: JSON.stringify({ companyName, domain, did }),
    }),

  get: (id: string) =>
    api<{ success: boolean; profile: TrustProfile }>(`/api/profile/${id}`),

  trustChain: (id: string) =>
    api<{ success: boolean; trustChain: TrustChain }>(`/api/profile/${id}/trust-chain`),

  verify: (id: string) =>
    api<{ success: boolean; transactionDigest: string }>(`/api/profile/${id}/verify`, {
      method: 'POST',
      body: JSON.stringify({}),
    }),

  recordDeal: (id: string) =>
    api<{ success: boolean; transactionDigest: string }>(`/api/profile/${id}/record-deal`, {
      method: 'POST',
      body: JSON.stringify({}),
    }),

  vouch: (id: string) =>
    api<{ success: boolean; transactionDigest: string }>(`/api/profile/${id}/vouch`, {
      method: 'POST',
      body: JSON.stringify({}),
    }),

  slash: (id: string) =>
    api<{ success: boolean; transactionDigest: string }>(`/api/profile/${id}/slash`, {
      method: 'POST',
      body: JSON.stringify({}),
    }),

  list: () =>
    api<{ success: boolean; profiles: TrustProfile[] }>('/api/profiles'),
};

// ── Staking ──

export const staking = {
  stake: (profileId: string, amount: number) =>
    api<{ success: boolean; transactionDigest: string }>('/api/staking/stake', {
      method: 'POST',
      body: JSON.stringify({ profileId, amount }),
    }),

  unstake: (profileId: string) =>
    api<{ success: boolean; transactionDigest: string }>('/api/staking/unstake', {
      method: 'POST',
      body: JSON.stringify({ profileId }),
    }),

  pool: () =>
    api<{ success: boolean; pool: StakePool }>('/api/staking/pool'),
};

// ── Attestation ──

export const attestation = {
  register: (companyProfileId: string, attesterDid: string, credentialHash: string, credentialType: string) =>
    api<{ success: boolean; recordId: string; transactionDigest: string }>('/api/attestation/register', {
      method: 'POST',
      body: JSON.stringify({ companyProfileId, attesterDid, credentialHash, credentialType }),
    }),

  revoke: (attestationRecordId: string) =>
    api<{ success: boolean; transactionDigest: string }>('/api/attestation/revoke', {
      method: 'POST',
      body: JSON.stringify({ attestationRecordId }),
    }),

  get: (id: string) =>
    api<{ success: boolean; record: { id: string; credentialType: string; revoked: boolean } }>(`/api/attestation/${id}`),
};

// ── Audit ──

export const audit = {
  trail: (profileId: string) =>
    api<{ success: boolean; trail: AuditEntry[] }>(`/api/audit/trail/${profileId}`),

  log: () =>
    api<{ success: boolean; log: AuditEntry[] }>('/api/audit/log'),

  verify: () =>
    api<{ success: boolean; isValid: boolean }>('/api/audit/verify'),
};

// ── Health ──

export const health = () =>
  api<{ status: string; mode: string; network: string }>('/api/health');

export default { identity, profiles, staking, attestation, audit, health };
