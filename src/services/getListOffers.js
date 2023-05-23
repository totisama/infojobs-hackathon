const token = import.meta.env.VITE_TOKEN

const getListOffers = async () => {
  const response = await fetch('/api/api/9/offer?category=informatica-telecomunicaciones', {
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Basic ${token}`
    }
  })
  const data = await response.json()
  const { items } = data

  return items
}

export default getListOffers
