import jwt from 'jsonwebtoken'
import { getToken } from 'next-auth/jwt'
import { NextResponse } from 'next/server'

export async function middleware (req, ev) {
  const session = await getToken({ req, secret: process.env.JWT_SECRET})
  
  if (!session) {
    const url = req.nextUrl.clone()
    url.pathname = '/auth/login'
    return NextResponse.redirect(url)
  }

  return NextResponse.next()


  // Metodo sin NextAuth
  /*
  const { token } = req.cookies
  let isValid = true

  try {
    const { user } = jwt.decode(token)
    if (!Boolean(user)) {
      isValid = false
    }

  } catch (error) {
    isValid = false
  }
  
  if (!isValid) {
    const url = req.nextUrl.clone()
    url.pathname = '/auth/login'
    return NextResponse.redirect(url)
  }

  return NextResponse.next()
  */
}

