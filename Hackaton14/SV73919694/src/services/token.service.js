const refreshStore = new Map(); // jti -> { jti, userId, revoked, expiresAt }

export function persistRefresh({ jti, userId, expiresAt }) {
refreshStore.set(jti, { jti, userId, revoked: false, expiresAt });
}

export function revokeRefresh(jti) {
const row = refreshStore.get(jti);
if (row) row.revoked = true;
}

export function isRefreshValid(jti) {
const row = refreshStore.get(jti);
return !!row && !row.revoked && (!row.expiresAt || row.expiresAt > Date.now());
}