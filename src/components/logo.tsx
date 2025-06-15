import { Torus } from 'lucide-react'

export function Logo() {
  return (
    <div className="flex items-center space-x-2">
      <Torus className="h-8 w-8 text-white" />
      <span className="text-2xl font-bold text-white">Portalize</span>
    </div>
  )
} 