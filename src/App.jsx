import { lazy, startTransition, Suspense, useEffect, useRef, useState } from 'react'
import LinearProgress from '@mui/material/LinearProgress'
import { Navigate, Outlet, Route, Routes, useLocation, useNavigate } from 'react-router-dom'
import { dashboardFor, demoAccounts, demoPassword, demoPasswordDigest } from './features/auth/demoAccounts'
import ExplorerPage from './features/explorer/pages/ExplorerPage'
import SiteHeader from './shared/components/SiteHeader'
import ViewErrorBoundary from './shared/components/ViewErrorBoundary'

const AuthPage = lazy(() => import('./features/auth/pages/AuthPage'))
const ObservationsPage = lazy(() => import('./features/observations/pages/ObservationsPage'))
const ModerationPage = lazy(() => import('./features/moderation/pages/ModerationPage'))
const TonightPage = lazy(() => import('./features/tonight/pages/TonightPage'))

function RoleRoute({ user, role }) {
  if (!user) return <Navigate to="/ingresar" replace />
  return user.role === role ? <Outlet /> : <Navigate to={dashboardFor(user)} replace />
}

export default function App() {
  const [user, setUser] = useState(null)
  const [accounts, setAccounts] = useState([])
  const [observations, setObservations] = useState([])
  const photoUrls = useRef(new Set())
  const { pathname } = useLocation()
  const navigate = useNavigate()

  useEffect(() => {
    window.scrollTo(0, 0)
  }, [pathname])

  useEffect(() => {
    const urls = photoUrls.current
    return () => {
      for (const url of urls) URL.revokeObjectURL(url)
      urls.clear()
    }
  }, [])

  async function signIn(email, password) {
    const normalizedEmail = email.trim().toLowerCase()
    const demo = demoAccounts.find((entry) => entry.email === normalizedEmail)
    const account = accounts.find((entry) => entry.email === normalizedEmail)
    if (demo && demoPassword === password) {
      setUser(demo)
      return demo
    }
    if (account && await demoPasswordDigest(password) === account.digest) {
      const { id, name, role } = account
      const session = { id, name, email: normalizedEmail, role }
      setUser(session)
      return session
    }
    throw new Error('El correo o la contraseña son incorrectos.')
  }

  async function register(name, email, password) {
    const normalizedEmail = email.trim().toLowerCase()
    if (name.length < 2) throw new Error('Escribe un nombre de al menos dos caracteres.')
    if ([...demoAccounts, ...accounts].some((entry) => entry.email === normalizedEmail)) {
      throw new Error('Ya existe una cuenta con ese correo.')
    }
    const digest = await demoPasswordDigest(password)
    const account = { id: crypto.randomUUID(), name, email: normalizedEmail, role: 'user' }
    setAccounts((entries) => [...entries, { ...account, digest }])
    setUser(account)
    return account
  }

  function addObservation({ file, ...entry }) {
    const image = URL.createObjectURL(file)
    photoUrls.current.add(image)
    const observation = {
      ...entry, image, id: crypto.randomUUID(), authorId: user.id, authorName: user.name, status: 'pending',
    }
    setObservations((entries) => [observation, ...entries])
  }

  function reviewObservation(id, status, reason) {
    setObservations((entries) => entries.map((entry) => (
      entry.id === id && entry.status === 'pending' ? { ...entry, status, reason } : entry
    )))
  }

  function signOut() {
    startTransition(() => {
      setUser(null)
      navigate('/', { replace: true })
    })
  }

  const authProps = { user, onSignIn: signIn, onRegister: register }
  return (
    <>
      <SiteHeader immersive={pathname === '/'} user={user} dashboardPath={user ? dashboardFor(user) : null} onSignOut={signOut} />
      <ViewErrorBoundary key={pathname}>
        <Suspense fallback={<LinearProgress aria-label="Cargando vista" />}>
          <Routes>
            <Route index element={<ExplorerPage observations={observations} user={user} />} />
            <Route path="esta-noche" element={<TonightPage observations={observations} user={user} />} />
            <Route path="ingresar" element={<AuthPage key="login" mode="login" {...authProps} />} />
            <Route path="registro" element={<AuthPage key="register" mode="register" {...authProps} />} />
            <Route path="recuperar" element={<AuthPage key="recover" mode="recover" {...authProps} />} />
            <Route element={<RoleRoute user={user} role="user" />}>
              <Route path="mis-fotos" element={<ObservationsPage user={user} observations={observations} onSubmit={addObservation} />} />
            </Route>
            <Route element={<RoleRoute user={user} role="admin" />}>
              <Route path="moderacion" element={<ModerationPage observations={observations} onReview={reviewObservation} />} />
            </Route>
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </Suspense>
      </ViewErrorBoundary>
    </>
  )
}
