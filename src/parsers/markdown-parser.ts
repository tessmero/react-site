// hacky fix for dates
// https://stackoverflow.com/questions/7556591/is-the-javascript-date-object-always-one-day-off

import matter from 'gray-matter' // eslint-disable-line no-restricted-imports

interface ParsedMarkdown {
  data: { [key: string]: any } // eslint-disable-line @typescript-eslint/no-explicit-any
  content: string
}

export function parseMarkdown(fileContent: string): ParsedMarkdown {
  const { data, content } = matter(fileContent)

  for (const key in data) {
    if (data[key] instanceof Date) {
      data[key] = fixDate(data[key])
    }
  }

  return { data, content }
}

// parse date YYYY-MM-DD, used to parse changelogs inside markdown values
export function parseDate(value: string, description: string) {
  if (typeof value !== 'string')
    throw new Error(`date value is not string: ${description}`)
  const d = new Date(value.split(' ')[0])
  if (isNaN(d.getTime()))
    throw new Error(`could not parse date from ${description}: ${value}`)
  return fixDate(d)
}

// workaround dates being off by one day
function fixDate(d: Date) {
  return new Date(d.getUTCFullYear(), d.getUTCMonth(), d.getUTCDate())
}
