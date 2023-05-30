const token = import.meta.env.VITE_INFOJOBS_TOKEN

const getSkills = async () => {
  const response = await fetch('/api/1/dictionary/type/skills', {
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Basic ${token}`
    }
  })
  const data = await response.json()

  return data
}

export default getSkills
