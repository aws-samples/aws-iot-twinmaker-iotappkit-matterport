'use client'
import useAuth from '@/hooks/useAuth'
import { useRouter, usePathname } from 'next/navigation'
import React, { useEffect } from 'react'

interface Props {
    children: React.ReactNode
}

const ProtectedRoutes = ({children}: Props) => {
    const { isAuthenticated, credentials } = useAuth()
    const router = useRouter()
    const pathname = usePathname()

    useEffect(() => {
      if(!pathname.startsWith('/auth/signin') && !isAuthenticated) {
        router.push('/auth/signin')
      } else if(pathname.startsWith('/auth/signin') && isAuthenticated) {
        router.push('/')

      }
    }, [router, pathname, isAuthenticated, credentials])

    return children
}

export default ProtectedRoutes