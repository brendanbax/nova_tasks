import Task from '@/classes/Task'

describe('Task', () => {
  it('expandTags returns a list of strings', () => {
    const tags: string = 'Foo, Bar, Baz'
    const result: Array<string> = ['Foo', 'Bar', 'Baz']
    expect(Task.expandTags(tags)).toStrictEqual(result)
  })
  it('expandTags ignores extra spaces', () => {
    const tags: string = ' Foo ,    Bar       ,     Baz       '
    const result: Array<string> = ['Foo', 'Bar', 'Baz']
    expect(Task.expandTags(tags)).toStrictEqual(result)
  })
  it('expandTags ignores empty strings', () => {
    const tags: string = 'Foo, , , Bar, Baz'
    const result: Array<string> = ['Foo', 'Bar', 'Baz']
    expect(Task.expandTags(tags)).toStrictEqual(result)
  })
})
