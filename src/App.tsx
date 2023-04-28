import React from 'react'
import Canvas from '../components/Canvas'

const App: React.FC = (): JSX.Element =>  {
  return (
    <>  
    <div className = "w-full h-screen flex justify-center items-center">
      <Canvas/>
    </div>
    </>
  )
}

export default App
