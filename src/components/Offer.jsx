import { useCallback, useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { getOfferById } from '../services/getOfferById'

const Offer = () => {
  const { id } = useParams()
  const navigate = useNavigate()
  const [offer, setOffer] = useState({})

  const getOffer = useCallback(async () => {
    const oferta = await getOfferById(id)
    console.log(oferta)

    if (oferta === '') {
      navigate('/')

      return
    }
    setOffer(oferta)
  }, [id, navigate])

  const getPostedAgo = (date) => {
    const now = new Date()
    const createdDate = new Date(date)
    const diffDays = parseInt((now - createdDate) / (1000 * 60 * 60 * 24), 10)
    let postedAgo = ''

    if (diffDays > 0) {
      postedAgo = `${diffDays}d`
    } else {
      const diffMinutes = parseInt((now - createdDate) / (1000 * 60), 10)
      postedAgo = `${diffMinutes}m`

      if (diffMinutes >= 60) {
        postedAgo = `${parseInt(diffMinutes / 60, 10)}h`
      }
    }

    return postedAgo
  }

  useEffect(() => {
    getOffer()
  }, [getOffer])

  return (
    <div className='mb-20 mx-10 lg:mx-32 '>
      <div className='bg-white w-11/12 p-10 rounded-lg lg:w-4/5'>
        <div className='flex flex-col md:flex-row'>
          <img src={offer.profile?.logoUrl} className='w-32 h-32' />
          <div className='ml-5 flex flex-col justify-center'>
            <h1 className='text-3xl'>{offer.title}</h1>
            <a href={offer.profile?.web} target='_blank' rel='noreferrer' className='text-xl text-[#167DB7] hover:underline'>
              {offer.profile?.name}
            </a>
          </div>
        </div>
        <div className='flex flex-col mt-5 lg:flex-row '>
          <div className='flex flex-col w-2/3 lg:flex-row'>
            <div>
              <ul
                role='list'
                className='list-disc list-outside ml-0 text-md text-[#797A7A] lg:ml-12'
              >
                <li key='1'>
                  {offer.city}
                </li>
                <li key='2'>
                  Publicada hace {getPostedAgo(offer.creationDate)}
                </li>
                <li key='3'>
                  {offer.salaryDescription}
                </li>
                <li key='4'>
                  {offer.teleworking?.value}
                </li>
              </ul>
            </div>
            <div className='mt-2 lg:mt-0'>
              <ul
                role='list'
                className='list-disc list-outside ml-0 text-md text-[#797A7A] lg:ml-12'
              >
                {offer.experienceMin
                  ? (
                    <li key='1'>
                      Experiencia mínima: {offer.experienceMin?.value}
                    </li>)
                  : null}
                <li key='2'>
                  Tipo de contrato: {offer.contractType?.value}, jornada {offer.journey?.value}
                </li>
              </ul>
            </div>
          </div>
          <div className='flex flex-col items-center mt-5 gap-3 lg:items-end lg:mt-0 lg:w-1/3'>
            <a
              className='text-white text-sm uppercase w-2/3 bg-[#FF6340] p-2.5 text-center rounded-[4px] lg:w-4/5'
              href={offer.link}
              target='_blank'
              rel='noreferrer'
            >
              Ver oferta en InfoJobs
            </a>
            <button className='text-white text-sm uppercase w-2/3 bg-[#00A550] p-2.5 rounded-[4px] lg:w-4/5'>Generar roadmap técnico</button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Offer
