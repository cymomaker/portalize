import Link from 'next/link'
import { Torus } from 'lucide-react'

export function Logo() {
  return (
    <Link href="/" className="flex items-center space-x-2">
      <Torus className="h-8 w-8 text-white" />
      <span className="text-2xl font-bold text-white">Portalize</span>
    </Link>
  )
} 