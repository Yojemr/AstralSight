export const demoPassword = 'atlas2026'

export const demoAccounts = [
  { id: 'demo-observer', name: 'Observador', email: 'observador@atlas.test', role: 'user' },
  { id: 'demo-admin', name: 'Administrador', email: 'admin@atlas.test', role: 'admin' },
]

export function dashboardFor(user) {
  return user.role === 'admin' ? '/moderacion' : '/mis-fotos'
}

export async function demoPasswordDigest(password) {
  const bytes = new TextEncoder().encode(password)
  const digest = await crypto.subtle.digest('SHA-256', bytes)
  return Array.from(new Uint8Array(digest), (byte) => byte.toString(16).padStart(2, '0')).join('')
}
