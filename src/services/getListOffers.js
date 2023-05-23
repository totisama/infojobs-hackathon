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
  const offers = items.map((item) => {
    const {
      id, author, province, city, title, workDay, teleworking,
      experienceMin, salaryMin, salaryMax, salaryPeriod
    } = item

    return {
      id,
      city,
      title,
      logo: author.logoUrl,
      authorName: author?.name ?? '',
      province: province?.value ?? '',
      workday: workDay?.value ?? '',
      teleworking: teleworking?.value ?? '',
      experience: experienceMin?.value ?? '',
      minSalary: salaryMin?.value ?? '',
      maxSalary: salaryMax?.value ?? '',
      salaryPeriod: salaryPeriod?.value ?? ''
    }
  })

  return offers
}

export default getListOffers
