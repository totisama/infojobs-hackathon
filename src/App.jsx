import ListOffers from './components/ListOffers'
import { Logo } from './components/Logo'

function App () {
  return (
    <>
      <header className='flex flex-col items-center py-10'>
        <Logo />
        <h1 className='font-semibold tracking-wider text-2xl'>Road Map Generator</h1>
      </header>
      <main>
        <ListOffers />
      </main>
    </>
  )
}

export default App
