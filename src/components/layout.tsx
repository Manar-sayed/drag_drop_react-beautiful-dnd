import React from 'react'

function layout({children}:any) {
  return (

    <div className="min-w-full min-h-screen  h-screen overflow-hidden bg-blue-100">
    <main className="pl-40 pt-16">
        {children}
    </main>
</div>

  )
}

export default layout