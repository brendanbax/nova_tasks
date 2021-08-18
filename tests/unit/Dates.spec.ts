import Dates from '@/classes/Dates'

describe('Dates', () => {
  it('returns a formatted date string', () => {
    const date1 = new Date('January 17, 2001 03:24:00')
    const date2 = new Date('February 29, 2001 03:24:00')
    const date3 = new Date('November 28, 2001 03:24:00')
    expect(Dates.dateToPretty(date1)).toBe('Jan 17, 2001')
    expect(Dates.dateToPretty(date2)).toBe('Mar 01, 2001')
    expect(Dates.dateToPretty(date3)).toBe('Nov 28, 2001')
  })

  it('returns a date object', () => {
    const date1 = '01-01-2001'
    const date2 = '02-29-2001'
    const date3 = '11-28-2001'
    expect(Dates.stringToObject(date1)).toStrictEqual(new Date('January 1, 2001 00:00:00'))
    expect(Dates.stringToObject(date2)).toStrictEqual(new Date('March 1, 2001 00:00:00'))
    expect(Dates.stringToObject(date3)).toStrictEqual(new Date('November 28, 2001 00:00:00'))
  })

  it('returns a date string', () => {
    const date1 = new Date('January 1, 2001 00:00:00')
    const date2 = new Date('February 29, 2001 00:00:00')
    const date3 = new Date('November 28, 2001 00:00:00')
    expect(Dates.objectToString(date1)).toBe('2001-01-01')
    expect(Dates.objectToString(date2)).toBe('2001-01-03')
    expect(Dates.objectToString(date3)).toBe('2001-28-11')
  })
})
