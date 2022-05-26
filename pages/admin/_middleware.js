import { getToken } from 'next-auth/jwt'
import { NextResponse } from 'next/server'

export async function middleware (req, ev) {
  const session = await getToken({ req, secret: process.env.JWT_SECRET})
  
  if (!session) {
    const url = req.nextUrl.clone()
    url.pathname = '/auth/login'
    return NextResponse.redirect(url)    
  }

  if (!session.user.roles.includes('admin'))  {
    const url = req.nextUrl.clone()
    url.pathname = '/'
    return NextResponse.redirect(url)    
  }

  return NextResponse.next()
}