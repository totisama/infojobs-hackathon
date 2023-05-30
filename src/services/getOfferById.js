const infoJobsToken = import.meta.env.VITE_INFOJOBS_TOKEN

export const getOfferById = async (id) => {
  const response = await fetch(`api/9/offer/${id}`, {
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Basic ${infoJobsToken}`
    }
  })

  if (!response.ok) {
    return ''
  }

  const offer = await response.json()

  return offer
}
