import { UrlShortener } from './components/url-shortener'

export default function App() {
  return (
    <div className="w-full min-h-screen bg-[#2D2D2D] flex items-center justify-center">
      <main className="w-full max-w-lg px-4 text-center">
        <UrlShortener />
      </main>
    </div>
  )
}
