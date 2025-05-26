import { NextResponse } from 'next/server'

export async function GET() {
  try {
    // Verificar conectividad con backend
    const backendHealth = await fetch('http://localhost:8000/health', {
      method: 'GET',
      headers: { 'Content-Type': 'application/json' },
    }).then(res => res.json()).catch(() => ({ status: 'unhealthy' }))

    return NextResponse.json({
      status: 'healthy',
      timestamp: new Date().toISOString(),
      frontend: {
        status: 'healthy',
        version: process.env.npm_package_version || '1.0.0',
        environment: process.env.NODE_ENV || 'development'
      },
      backend: {
        status: backendHealth.status || 'unknown',
        gateway: backendHealth.status === 'active' ? 'connected' : 'disconnected',
        services: backendHealth.services || {}
      }
    })
  } catch (error) {
    return NextResponse.json({
      status: 'unhealthy',
      error: error.message,
      timestamp: new Date().toISOString()
    }, { status: 500 })
  }
}
