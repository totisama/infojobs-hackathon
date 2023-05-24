import { useCallback, useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { getOfferById } from '../services/getOfferById'

const Offer = () => {
  const { id } = useParams()
  const navigate = useNavigate()
  const [offer, setOffer] = useState({})

  const getOffer = useCallback(async () => {
    const oferta = await getOfferById(id)

    if (oferta === '') {
      navigate('/')

      return
    }
    setOffer(oferta)
  }, [id, navigate])

  useEffect(() => {
    getOffer()
  }, [getOffer])

  return <h1>Offer {offer?.title}</h1>
}

export default Offer
