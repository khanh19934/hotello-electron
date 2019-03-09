import { curry } from 'ramda'

interface IPattern {
  // tslint:disable-next-line:no-any
  [branch: string]: any
}

const match = curry((pattern: IPattern, value: string) => {
  const hasKey = (key: string) => String(value) === key
  const matchingCase = Object.keys(pattern).find(hasKey) || '_'
  const result = pattern[matchingCase]

  if (result === null || typeof result === 'undefined') {
    throw new Error('Match error')
  }

  return result
})

export { match }
