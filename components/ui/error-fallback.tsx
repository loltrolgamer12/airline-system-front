"use client"

import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { AlertTriangle, RefreshCw } from "lucide-react"

interface ErrorFallbackProps {
  error?: Error
  resetError?: () => void
  title?: string
  description?: string
}

export function ErrorFallback({
  error,
  resetError,
  title = "Something went wrong",
  description = "This component failed to load. This may be normal if the backend is not running.",
}: ErrorFallbackProps) {
  return (
    <Card>
      <CardContent className="p-6 text-center">
        <AlertTriangle className="h-8 w-8 mx-auto text-yellow-500 mb-4" />
        <h3 className="text-lg font-semibold mb-2">{title}</h3>
        <p className="text-sm text-muted-foreground mb-4">{description}</p>

        {error && (
          <details className="text-xs text-left bg-gray-100 dark:bg-gray-800 p-2 rounded mb-4">
            <summary className="cursor-pointer font-medium">Error Details</summary>
            <pre className="mt-2 whitespace-pre-wrap">{error.message}</pre>
          </details>
        )}

        {resetError && (
          <Button onClick={resetError} variant="outline" size="sm">
            <RefreshCw className="h-4 w-4 mr-2" />
            Try Again
          </Button>
        )}
      </CardContent>
    </Card>
  )
}
