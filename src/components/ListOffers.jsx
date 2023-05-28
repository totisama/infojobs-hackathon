import { useEffect, useState } from 'react'
import getListOffers from '../services/getListOffers'
import { useNavigate } from 'react-router-dom'
// import { getRoadMap } from '../services/getRoadMap'

const ListOffers = () => {
  const navigate = useNavigate()
  const [offers, setOffers] = useState([])

  const getOffers = async () => {
    const offers = await getListOffers()
    setOffers(offers)
  }

  useEffect(() => {
    getOffers()
  }, [])

  return (
    <div className='px-4 sm:px-6 lg:px-8 mt-5 mb-20'>
      <div className='sm:flex sm:items-center'>
        <div className='sm:flex-auto'>
          <h1 className='text-2xl font-semibold text-gray-900'>Ofertas</h1>
        </div>
      </div>
      <div className='flow-root'>
        <div className='-mx-4 -my-2 overflow-x-auto sm:-mx-6 lg:-mx-8'>
          <div className='inline-block min-w-full py-2 align-middle sm:px-6 lg:px-8'>
            <table className='min-w-full divide-y divide-gray-300'>
              <thead>
                <tr>
                  <th scope='col' className='pl-0 py-3.5 text-left text-md font-semibold text-gray-900'>
                    Empresa
                  </th>
                  <th scope='col' className='px-3 py-3.5 text-left text-md font-semibold text-gray-900'>
                    Puesto
                  </th>
                  <th scope='col' className='px-3 py-3.5 text-left text-md font-semibold text-gray-900'>
                    Jornada
                  </th>
                  <th scope='col' className='px-3 py-3.5 text-left text-md font-semibold text-gray-900'>
                    Experiencia
                  </th>
                  <th scope='col' className='px-3 py-3.5 text-left text-md font-semibold text-gray-900'>
                    Salario
                  </th>
                </tr>
              </thead>
              <tbody className='divide-y divide-gray-200 bg-white'>
                {offers.map((offer) => (
                  <tr key={offer.id} className='transition-colors cursor-pointer hover:bg-[#8BBEDB]' onClick={() => { navigate(`/oferta/${offer.id}`) }}>
                    <td className='whitespace-nowrap py-5 pl-4 pr-3 text-sm sm:pl-0'>
                      <div className='pl-5 flex items-center'>
                        <div className='h-11 w-11 flex-shrink-0'>
                          <img className='h-11 w-11 rounded-full' src={offer.logo} alt='' />
                        </div>
                        <div className='ml-4'>
                          <div className='font-medium text-gray-900'>{offer.authorName}</div>
                          <div className='mt-1 text-gray-500'>
                            {offer.province !== offer.city ? offer.city + ' - ' + offer.province : offer.city}
                          </div>
                        </div>
                      </div>
                    </td>
                    <td className='whitespace-nowrap px-3 py-5 text-sm text-gray-500'>
                      <div className='text-gray-900'>{offer.title}</div>
                    </td>
                    <td className='whitespace-nowrap px-3 py-5 text-sm text-gray-500'>
                      <div className='text-gray-900'>{offer.workday}</div>
                      {offer.teleworking
                        ? <div className='mt-1 text-gray-600'>{offer.teleworking}</div>
                        : null}
                    </td>
                    <td className='whitespace-nowrap px-3 py-5 text-sm text-gray-900'>
                      <div className='text-gray-900'>{offer.experience}</div>
                    </td>
                    <td className='whitespace-nowrap px-3 py-5 text-sm text-gray-900'>
                      {offer.minSalary
                        ? (
                          <div className=' text-gray-900 flex flex-col'>
                            {offer.minSalary} - {offer.maxSalary}
                            <span>
                              {offer.salaryPeriod}
                            </span>
                          </div>)
                        : 'No especifica'}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ListOffers
