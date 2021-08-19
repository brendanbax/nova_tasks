import Task from '@/classes/Task'
import { ITask } from '@/interfaces/ITask'
import { ISummary } from '@/interfaces/ISummary'

class TaskList {
  static getTaskIndex(tasks: Array<ITask>, id: string): number {
    return tasks.findIndex((el: ITask) => {
      return el.id === id
    })
  }

  static compareTaskDates(key: string, order = 'asc') {
    return function innerSort(a: ITask, b: ITask): number {
      if (!Object.hasOwnProperty.call(a, key) || !Object.hasOwnProperty.call(b, key)) {
        return 0
      }

      const varA: unknown = a[key as keyof Task]
      const varB: unknown = b[key as keyof Task]

      let comparison = 0
      if (Number(varA) > Number(varB)) {
        comparison = 1
      } else if (Number(varA) < Number(varB)) {
        comparison = -1
      }
      return order === 'desc' ? comparison * -1 : comparison
    }
  }

  static sortDateFirst(tasks: Array<ITask>, key: string): Array<ITask> {
    const orphans: Array<ITask> = []
    const sorted: Array<ITask> = []
    tasks.forEach((task) => {
      if (!task[key as keyof ITask]) {
        orphans.push(task)
      } else {
        sorted.push(task)
      }
    })

    return [...sorted, ...orphans]
  }

  static getTaskById(tasks: Array<ITask>, id: string): ITask {
    return tasks[this.getTaskIndex(tasks, id)]
  }

  static getStatusSummary(tasks: Array<ITask>): Array<ISummary> {
    const statusList = [...new Set(tasks.map((task) => task.status))]
    const results = []
    for (const status of statusList) {
      const filtered = tasks.filter((task) => {
        return task.status?.toLowerCase() === status?.toLowerCase()
      })
      results.push({
        total: filtered.length,
        status: status || 'unclassified'
      })
    }
    return results
  }

  static updateTasks(tasks: Array<ITask>, task: ITask): Array<ITask> {
    if (!task.id) return tasks

    const index: number = this.getTaskIndex(tasks, task.id)
    const replacement = Object.assign({}, tasks[index], task)
    tasks.splice(index, 1, replacement)
    return tasks
  }

  static deleteTask(tasks: Array<ITask>, id: string): Array<ITask> {
    const index: number = this.getTaskIndex(tasks, id)
    const arr: Array<ITask> = [...tasks]
    if (index !== -1) {
      arr.splice(index, 1)
    }
    return arr
  }

  static filterByStatus(tasks: Array<ITask>, status: string): Array<ITask> {
    return tasks.filter((el: ITask) => {
      return el.status === status
    })
  }

  static filterByTags(tasks: Array<ITask>, tags: Array<string>): Array<ITask> {
    const matches: Array<ITask> = []

    for (const task of tasks) {
      let match = 0
      for (const tag of tags) {
        if (task.tags?.includes(tag)) {
          match += 1
        }
      }
      if (match === tags.length) {
        matches.push(task)
      }
    }

    return matches
  }

  static sortByCreated(tasks: Array<ITask>, order: string): Array<ITask> {
    const options = ['asc', 'desc']
    if (!options.includes(order)) {
      return tasks
    }
    const sortedList = tasks.slice().sort(this.compareTaskDates('creationDate', order))
    return this.sortDateFirst(sortedList, 'creationDate')
  }

  static sortByDue(tasks: Array<ITask>, order: string): Array<ITask> {
    const options = ['asc', 'desc']
    if (!options.includes(order)) {
      return tasks
    }
    const sortedList = tasks.slice().sort(this.compareTaskDates('dueDate', order))
    return this.sortDateFirst(sortedList, 'dueDate')
  }

  static getByOverdue(tasks: Array<ITask>): Array<ITask> {
    const now = new Date()
    const overdue = tasks.filter((task) => {
      return task.status?.toLowerCase() !== 'done' && task.status?.toLowerCase() !== 'archive' && task.dueDate && task.dueDate < now
    })
    return overdue.sort(this.compareTaskDates('dueDate', 'asc'))
  }
}

export default TaskList
