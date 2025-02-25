import { useState } from 'react'
import { Input } from './ui/input'
import { Button } from './ui/button'
import axios from 'axios'
import { Link } from 'lucide-react'

export function UrlShortener() {
  const [url, setUrl] = useState('')
  const [shortUrl, setShortUrl] = useState('')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!url.trim()) {
      setError('Please enter a URL')
      return
    }

    try {
      const urlObj = new URL(url)
      if (!['http:', 'https:'].includes(urlObj.protocol)) {
        throw new Error('Invalid URL protocol')
      }
    } catch {
      setError('Please enter a valid URL')
      return
    }

    setError('')
    setShortUrl('')
    setLoading(true)

    try {
      const response = await axios.post('http://localhost:3333/shorten', { url })
      setShortUrl(response.data.shortUrl)
      setUrl('')
    } catch (err: unknown) {
      if (axios.isAxiosError(err)) {
        const errorMessage = err.response?.data?.message || 'Failed to shorten URL. Please try again.'
        setError(errorMessage)
      } else {
        const errorMessage = 'An unexpected error occurred. Please try again.'
        setError(errorMessage)
      }
    } finally {
      setLoading(false)
    }
  }

  return (
    <>
      <h1 className="text-4xl font-bold text-white mb-4">
        URL Shortener
      </h1>
      <p className="text-gray-400 mb-8">
        Make your long URLs short and easy to share
      </p>
      
      <form onSubmit={handleSubmit} className="mb-6 w-full">
        <div className="flex w-full gap-3">
          <Input
            type="url"
            placeholder="Enter your URL (e.g., https://example.com)"
            value={url}
            onChange={(e) => setUrl(e.target.value)}
            error={error}
            aria-invalid={error ? "true" : undefined}
            aria-describedby={error ? "url-error" : undefined}
            className="flex-1"
          />
          <Button
            type="submit"
            disabled={loading}
            isLoading={loading}
            className="px-6 min-w-[120px]"
          >
            <Link className="w-4 h-4 mr-2" />
            Shorten
          </Button>
        </div>
        
        {error && (
          <p id="url-error" className="text-sm text-red-400 mt-2 text-left" role="alert">
            {error}
          </p>
        )}

        {shortUrl && (
          <div className="mt-4 text-left">
            <p className="text-sm text-gray-400">Your shortened URL:</p>
            <a
              href={shortUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-400 hover:text-blue-300 break-all"
            >
              {shortUrl}
            </a>
          </div>
        )}
      </form>

      <p className="text-sm text-gray-400">
        Need to track clicks?{' '}
        <a href="#" className="text-blue-400 hover:text-blue-300">
          Sign up
        </a>
        {' '}for analytics.
      </p>
    </>
  )
}
