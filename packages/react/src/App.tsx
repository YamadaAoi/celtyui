import { lazy, Suspense } from 'react'
import { Routes, Route } from 'react-router'

const Portal = lazy(() => import('./views/portal/Portal'))
const Demo = lazy(() => import('./views/demo/Demo'))

export default function App() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <Routes>
        <Route index element={<Portal />} />
        <Route path="/demo" element={<Demo />} />
      </Routes>
    </Suspense>
  )
}
