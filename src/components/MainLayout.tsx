import React from 'react'
import TodoContextManager from './TodoContextManager'

const MainLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <TodoContextManager>
      <main className='max-w-7xl mx-auto'>
        {children}
      </main>
    </TodoContextManager>
  )
}

export default MainLayout