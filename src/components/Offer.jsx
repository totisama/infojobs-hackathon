import { useCallback, useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { getOfferById } from '../services/getOfferById'
import RoadMapModal from './RoadMapModal'

const Offer = () => {
  const { id } = useParams()
  const navigate = useNavigate()
  const [offer, setOffer] = useState({})
  const [open, setOpen] = useState(false)

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

  const newLineText = (text) => {
    const newText = text.split('\n').map((value, index) =>
      <p key={index} className='text-lg font-light mb-2.5'>{value}</p>
    )

    return newText
  }

  useEffect(() => {
    getOffer()
  }, [getOffer])

  return (
    <div className='mb-20 mx-10 lg:mx-32 '>
      <div className='bg-white w-11/12 p-5 rounded-lg lg:w-4/5'>
        <div className='flex flex-col md:flex-row'>
          {offer.profile?.logoUrl
            ? <img src={offer.profile?.logoUrl} alt='Logo de la empresa' className='w-32 h-32' />
            : null}
          <div className='ml-0 flex flex-col justify-center md:ml-5'>
            <h1 className='text-3xl'>{offer.title}</h1>
            <a href={offer.profile?.web} target='_blank' rel='noreferrer' className='text-xl text-[#167DB7] hover:underline'>
              {offer.profile?.name}
            </a>
          </div>
        </div>
        <div className='flex flex-col mt-5 lg:flex-row '>
          <div className='flex flex-col ml-4 w-2/3 lg:ml-0 lg:flex-row'>
            <div>
              <ul
                role='list'
                className='list-disc list-outside ml-0 text-md text-[#797A7A] lg:ml-10'
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
          <div className='flex flex-col items-start mt-5 gap-3 lg:items-end lg:mt-0 lg:w-1/3'>
            <button onClick={() => setOpen(true)} className='text-white text-sm uppercase w-2/3 bg-[#00A550] p-2.5 rounded-[4px] lg:w-4/5 hover:bg-[#00994a]'>
              Generar roadmap técnico
            </button>
            <a
              className='text-white text-sm uppercase w-2/3 bg-[rgb(255,99,64)] p-2.5 text-center rounded-[4px] lg:w-4/5 hover:bg-[#ff5833]'
              href={offer.link}
              target='_blank'
              rel='noreferrer'
            >
              Ver oferta en InfoJobs
            </a>
          </div>
        </div>
      </div>
      <div className='mt-1 bg-white w-4/5 p-5 rounded-lg lg:w-3/5'>
        <h1 className='text-2xl font-semibold'>Requisitos</h1>
        <ul
          role='list'
          className='list-none list-outside text-md text-[#797A7A]'
        >
          {offer.studiesMin
            ? (
              <li key='1' className='mt-2 text-black'>
                <h3 className='text-lg'>Estudios mínimos</h3>
                <span className='text-md font-light'>{offer.studiesMin.value}</span>
              </li>)
            : null}
          {offer.experienceMin
            ? (
              <li key='2' className='mt-2 text-black'>
                <h3 className='text-lg'>Experiencia mínima</h3>
                <span className='text-md font-light'>{offer.experienceMin.value}</span>
              </li>)
            : null}
          {offer.languages && offer.languages.length > 0
            ? (
              <li key='3' className='mt-2 text-black'>
                <h3 className='text-lg'>Idiomas requeridos</h3>
                <ul
                  role='list'
                  className='list-none list-outside text-md text-[#797A7A]'
                >
                  {offer.languages.map((language, index) => (
                    <li key={index} className='text-black'>
                      <span className='text-md font-light'>{language.name} - {language.level}</span>
                    </li>
                  ))}
                </ul>
              </li>)
            : null}
          {offer.skillsList && offer.skillsList.length > 0
            ? (
              <li key='4' className='mt-2 text-black'>
                <h3 className='text-lg'>Conocimientos necesarios</h3>
                <ul className='flex gap-2 flex-wrap'>
                  {offer.skillsList.map((skill, index) => (
                    <li key={index} className='bg-[#d0e5f1] text-sm py-1 px-3 font-light rounded-[100px]'>{skill.skill}</li>
                  ))}
                </ul>
              </li>)
            : null}
          {offer.minRequirements && offer.minRequirements.length > 0
            ? (
              <li key='5' className='mt-2 text-black'>
                <h3 className='text-lg'>Requisitos mínimos</h3>
                {newLineText(offer.minRequirements)}
              </li>)
            : null}
          {offer.desiredRequirements && offer.desiredRequirements.length > 0
            ? (
              <li key='6' className='mt-2 text-black'>
                <h3 className='text-lg'>Requisitos deseados</h3>
                {newLineText(offer.desiredRequirements)}
              </li>)
            : null}
        </ul>
        <div className='flex justify-center my-3'>
          <div className='h-[1px] flex justify-center w-11/12 bg-gray-200' />
        </div>
        {offer.description && offer.description.length > 0
          ? (
            <div>
              <h1 className='text-2xl font-semibold'>Descripción</h1>
              <div className='mt-2 text-black'>
                {newLineText(offer.description)}
              </div>
            </div>)
          : null}
      </div>
      {open
        ? <RoadMapModal open={open} setOpen={setOpen} name={offer.title} />
        : null}
    </div>
  )
}

export default Offer
