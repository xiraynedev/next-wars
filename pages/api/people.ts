import { NextApiRequest, NextApiResponse } from 'next'
import { PeopleProps } from '../../interfaces'

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const response = await fetch('https://swapi.py4e.com/api/people/')
  const data: PeopleProps = await response.json()

  const dataCopy = { ...data }

  while (dataCopy.next) {
    await fetch(dataCopy.next)
      .then((result) => result.json())
      .then((resultData) => {
        dataCopy.next = resultData.next
        dataCopy.results.push(resultData.results)
      })
  }

  const sortedCopy = dataCopy.results.flat().sort((a, b): number => {
    switch (req.query.sort) {
      case 'name':
        const nameA = a.name.toLowerCase()
        const nameB = b.name.toLowerCase()
        if (nameA < nameB) return -1
        if (nameA > nameB) return 1
        return 0
      case 'height':
        return Number.parseInt(a.height) - Number.parseInt(b.height)
      case 'mass':
        let replaceA = a.mass
        let replaceB = b.mass

        if (a.mass.includes('unknown'))
          replaceA = a.mass.replace('unknown', '0')
        if (a.mass.includes(',')) replaceA = a.mass.replace(',', '')

        if (b.mass.includes('unknown'))
          replaceB = b.mass.replace('unknown', '0')
        if (b.mass.includes(',')) replaceB = b.mass.replace(',', '')

        return Number.parseInt(replaceA) - Number.parseInt(replaceB)
      default:
        return 0
    }
  })

  res.json(sortedCopy)
}
