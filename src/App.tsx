import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import { UrlShortener } from './components/url-shortener'

function App() {
  return (
    <main className="min-h-screen bg-background">
      <div className="container py-8">
        <UrlShortener />
      </div>
    </main>
  )
}

export default App
