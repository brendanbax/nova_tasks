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

  static getTaskById(tasks: Array<ITask>, id: string): ITask {
    return tasks[this.getTaskIndex(tasks, id)]
  }

  static getStatusSummary(tasks: Array<ITask>): Array<ISummary> {
    const statusList = [...new Set(tasks.map((task) => task.status))]
    const results = []
    for (const status of statusList) {
      const filtered = tasks.filter((task) => {
        return task.status === status
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
    if (index !== -1) {
      tasks.splice(index, 1)
    }
    return tasks
  }

  static filterByStatus(tasks: Array<ITask>, status: string): Array<ITask> {
    return tasks.filter((el: ITask) => {
      return el.status === status
    })
  }

  static filterByTags(tasks: Array<ITask>, tags: Array<string>): Array<ITask> {
    const matches: Array<ITask> = []
    for (const tag of tags) {
      matches.push(
        ...tasks.filter((el: ITask) => {
          return el.tags?.includes(tag)
        })
      )
    }
    return matches
  }

  static sortByCreated(tasks: Array<ITask>, order: string): Array<ITask> {
    const options = ['asc', 'desc']
    if (!options.includes(order)) {
      return tasks
    }
    return tasks.slice().sort(this.compareTaskDates('creationDate', order))
  }

  static sortByDue(tasks: Array<ITask>, order: string): Array<ITask> {
    const options = ['asc', 'desc']
    if (!options.includes(order)) {
      return tasks
    }
    return tasks.slice().sort(this.compareTaskDates('dueDate', order))
  }
}

export default TaskList
