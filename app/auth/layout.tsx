import { ThemeSwitcher } from '@/components/layout/theme-switcher'
import React from 'react'

function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div>
      <ThemeSwitcher />
      {children}
    </div>
  )
}

export default Layout