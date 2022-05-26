import { getToken } from 'next-auth/jwt'
import { NextResponse } from 'next/server'

export async function middleware (req, ev) {
  const session = await getToken({ req, secret: process.env.JWT_SECRET})
  
  if (!session) {
    return new Response( JSON.stringify({ message: 'No autorizado' }), {
      status: 401,
      headers: {
          'Content-Type':'application/json'
      }
    });
  }

  if (!session.user.roles.includes('admin'))  {
    return new Response( JSON.stringify({ message: 'No autorizado' }), {
      status: 401,
      headers: {
          'Content-Type':'application/json'
      }
  });
  }

  return NextResponse.next()
}