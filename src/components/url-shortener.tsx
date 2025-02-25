import { useState } from 'react'
import { Button } from './ui/button'
import { Input } from './ui/input'
import axios from 'axios'

export function UrlShortener() {
  const [url, setUrl] = useState('')
  const [shortUrl, setShortUrl] = useState('')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError('')
    setShortUrl('')
    setLoading(true)

    try {
      const response = await axios.post('http://localhost:3333/shorten', { url })
      setShortUrl(response.data.shortUrl)
    } catch (err: unknown) {
      if (axios.isAxiosError(err)) {
        setError(err.response?.data?.message || 'Failed to shorten URL. Please try again.')
      } else {
        setError('An unexpected error occurred. Please try again.')
      }
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="max-w-md mx-auto p-6">
      <h1 className="text-2xl font-bold mb-6">URL Shortener</h1>
      
      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="flex gap-2">
          <Input
            type="url"
            placeholder="Enter your URL"
            value={url}
            onChange={(e) => setUrl(e.target.value)}
            required
            className="flex-1"
          />
          <Button type="submit" disabled={loading}>
            {loading ? 'Shortening...' : 'Shorten'}
          </Button>
        </div>

        {error && (
          <p className="text-red-500 text-sm">{error}</p>
        )}

        {shortUrl && (
          <div className="mt-4 p-4 bg-green-50 rounded-md">
            <p className="text-sm text-green-800">Your shortened URL:</p>
            <a
              href={shortUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-600 hover:underline break-all"
            >
              {shortUrl}
            </a>
          </div>
        )}
      </form>
    </div>
  )
}
