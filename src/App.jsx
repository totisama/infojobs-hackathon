import { Route, Routes } from 'react-router-dom'
import { Logo } from './components/Logo'
import ListOffers from './components/ListOffers'
import Offer from './components/Offer'

function App () {
  return (
    <>
      <header className='flex flex-col items-center py-10'>
        <Logo size='large' />
        <h1 className='font-semibold tracking-wider text-2xl'>Road Map Generator</h1>
      </header>
      <main>
        <Routes>
          <Route path='/' element={<ListOffers />} />
          <Route path='/oferta/:id' element={<Offer />} />
        </Routes>
      </main>
    </>
  )
}

export default App
