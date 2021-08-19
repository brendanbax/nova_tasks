import TaskList from '@/classes/TaskList'
import Task from '@/classes/Task'
import { ITask } from '@/interfaces/ITask'
import { ISummary } from '@/interfaces/ISummary'

describe('TaskList', () => {
  let tasks: Array<ITask> = []
  beforeEach(() => {
    tasks = [
      {
        id: '1',
        title: 'Foo',
        body: '',
        creationDate: new Date('January 1, 2001 00:00:00'),
        dueDate: new Date('January 10, 2001 00:00:00'),
        tags: ['foo'],
        status: 'to do'
      },
      {
        id: '2',
        title: 'Foo',
        body: '',
        creationDate: new Date('January 1, 2001 10:00:00'),
        dueDate: new Date('January 10, 2001 00:00:00'),
        tags: ['bar'],
        status: 'in progress'
      },
      {
        id: '3',
        title: 'Foo',
        body: '',
        creationDate: new Date('January 2, 2001 00:00:00'),
        dueDate: new Date('January 9, 2001 00:00:00'),
        tags: ['foo', 'bar'],
        status: 'done'
      },
      {
        id: '4',
        title: 'Foo',
        body: '',
        creationDate: new Date('January 3, 2001 00:00:00'),
        dueDate: new Date('January 8, 2001 00:00:00'),
        tags: ['foo'],
        status: 'archive'
      },
      {
        id: '5',
        title: 'Foo',
        body: '',
        creationDate: new Date('January 4, 2001 00:00:00'),
        dueDate: new Date('January 7, 2001 00:00:00'),
        tags: ['bar'],
        status: 'backlog'
      },
      {
        id: '6',
        title: 'Foo',
        body: '',
        creationDate: new Date('January 4, 2001 10:00:00'),
        dueDate: new Date('January 6, 2001 00:00:00'),
        tags: ['foo', 'bar'],
        status: 'backlog'
      }
    ]
  })

  it('getTaskIndex returns an index for a task', () => {
    expect(TaskList.getTaskIndex(tasks, '1')).toBe(0)
    expect(TaskList.getTaskIndex(tasks, '5')).toBe(4)
  })
  it('getTaskIndex does not return a missing task', () => {
    expect(TaskList.getTaskIndex(tasks, '7')).toBe(-1)
  })

  it('compareTaskDates returns oldest created tasks first when ascending', () => {
    const sortedList: Array<ITask> = tasks.slice().sort(TaskList.compareTaskDates('creationDate', 'asc'))
    expect(sortedList[0]).toStrictEqual(tasks[0])
  })
  it('compareTaskDates returns newest created tasks first when descending', () => {
    const sortedList: Array<ITask> = tasks.slice().sort(TaskList.compareTaskDates('creationDate', 'desc'))
    expect(sortedList[0]).toStrictEqual(tasks[5])
  })
  it('compareTaskDates returns oldest due tasks first when ascending', () => {
    const sortedList: Array<ITask> = tasks.slice().sort(TaskList.compareTaskDates('dueDate', 'asc'))
    expect(sortedList[0]).toStrictEqual(tasks[5])
  })
  it('compareTaskDates returns newest due tasks first when descending', () => {
    const sortedList: Array<ITask> = tasks.slice().sort(TaskList.compareTaskDates('dueDate', 'desc'))
    expect(sortedList[0]).toStrictEqual(tasks[0])
  })

  it('sortDateFirst returns tasks with dates before tasks without', () => {
    const orphan: ITask = {
      id: '0',
      title: 'Foo',
      body: '',
      creationDate: new Date('January 4, 2001 10:00:00'),
      dueDate: null,
      tags: ['foo', 'bar', 'baz'],
      status: 'to do'
    }
    const expandedList: Array<ITask> = [orphan, ...tasks]
    const sortedList: Array<ITask> = TaskList.sortDateFirst(expandedList, 'dueDate')
    expect(sortedList[0]).toStrictEqual(tasks[0])
  })

  it('getTaskById returns a task when given an id', () => {
    expect(TaskList.getTaskById(tasks, '6')).toStrictEqual(tasks[5])
  })

  it('getStatusSummary returns a summary object for each status type', () => {
    const taskStatuses = Task.statusOptions()
    expect(TaskList.getStatusSummary(tasks)).toHaveLength(taskStatuses.length)
  })
  it('getStatusSummary returns the correct total per status', () => {
    const target: Array<ISummary> = [
      { total: 1, status: 'to do' },
      { total: 1, status: 'in progress' },
      { total: 1, status: 'done' },
      { total: 1, status: 'archive' },
      { total: 2, status: 'backlog' }
    ]
    const test: Array<ISummary> = TaskList.getStatusSummary(tasks)
    for (let i = 0; i < target.length; i++) {
      expect(target[i].total).toBe(test[i].total)
    }
  })

  it('updateTasks correctly updates a task', () => {
    const replacementTask: ITask = {
      id: '3',
      title: 'Bar',
      body: 'Updated task',
      creationDate: new Date('January 2, 2001 00:00:00'),
      dueDate: null,
      tags: ['zip', 'zap', 'pow'],
      status: 'archive'
    }
    const updatedTaskList: Array<ITask> = TaskList.updateTasks(tasks, replacementTask)
    expect(updatedTaskList[2]).toStrictEqual(replacementTask)
  })

  it('deleteTask correctly deletes a task', () => {
    const updatedTaskList: Array<ITask> = TaskList.deleteTask(tasks, '1')
    expect(updatedTaskList.length).toBe(tasks.length - 1)
  })

  it('filterByStatus correctly returns a list of tasks for a given status', () => {
    const filteredList: Array<ITask> = TaskList.filterByStatus(tasks, 'to do')
    expect(filteredList.length).toBe(1)
    expect(filteredList[0]['status']).toBe('to do')
  })

  it('filterByTags correctly returns a list of tasks for a given tag', () => {
    const filteredList: Array<ITask> = TaskList.filterByTags(tasks, ['foo'])
    expect(filteredList.length).toBe(4)
    expect(filteredList[0]['tags']).toContain('foo')
  })
  it('filterByTags correctly returns a list of tasks for a list of tags', () => {
    const filteredList: Array<ITask> = TaskList.filterByTags(tasks, ['foo', 'bar'])
    expect(filteredList.length).toBe(2)
    expect(filteredList[0]['tags']).toContain('foo')
    expect(filteredList[0]['tags']).toContain('bar')
  })

  it('sortByCreated returns oldest created tasks first when ascending', () => {
    const sortedList: Array<ITask> = TaskList.sortByCreated(tasks, 'asc')
    expect(sortedList[0]).toStrictEqual(tasks[0])
  })
  it('sortByCreated returns newest created tasks first when descending', () => {
    const sortedList: Array<ITask> = TaskList.sortByCreated(tasks, 'desc')
    expect(sortedList[0]).toStrictEqual(tasks[5])
  })

  it('sortByDue returns oldest due tasks first when ascending', () => {
    const sortedList: Array<ITask> = TaskList.sortByDue(tasks, 'asc')
    expect(sortedList[0]).toStrictEqual(tasks[5])
  })
  it('sortByDue returns newest due tasks first when descending', () => {
    const sortedList: Array<ITask> = TaskList.sortByDue(tasks, 'desc')
    expect(sortedList[0]).toStrictEqual(tasks[0])
  })

  it('getByOverdue returns a list of tasks with due dates before today and a status of backlog, todo, or in progress', () => {
    const noDue: ITask = {
      id: '3',
      title: 'Bar',
      body: 'Updated task',
      creationDate: new Date('January 2, 2001 00:00:00'),
      dueDate: null,
      tags: ['zip', 'zap', 'pow'],
      status: 'to do'
    }
    const sortedList: Array<ITask> = TaskList.getByOverdue([noDue, ...tasks])
    expect(sortedList).toHaveLength(4)
  })
})
