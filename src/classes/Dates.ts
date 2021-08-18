class Dates {
  static dateToPretty(date: Date): string {
    const dateArr = date.toString().split(' ').slice(1, 4)
    const month = dateArr[0]
    const day = dateArr[1]
    const year = dateArr[2]
    return `${month} ${day}, ${year}`
  }

  static stringToObject(date: string): Date | null {
    if (date.length < 10) return null
    const dueFormat: string = date.split('-').join('/')
    return new Date(`${dueFormat} 00:00:00`)
  }

  static objectToString(date: Date): string {
    if (date === null) return ''
    const dateArr = date.toLocaleString().split(',')[0].split('/')
    const year = dateArr[2]
    const day = dateArr[1].length < 2 ? '0' + dateArr[1] : dateArr[1]
    const month = dateArr[0].length < 2 ? '0' + dateArr[0] : dateArr[0]
    return `${year}-${day}-${month}`
  }
}

export default Dates
