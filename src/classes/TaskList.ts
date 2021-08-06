import { TaskModel, Task } from './Task'

interface SummaryModel {
  total: number
  status: string
}

class TaskList {
  static getTaskIndex(tasks: Array<TaskModel>, id: string): number {
    return tasks.findIndex((el: TaskModel) => {
      return el.id === id
    })
  }

  static compareTaskDates(key: string, order = 'asc') {
    return function innerSort(a: TaskModel, b: TaskModel): number {
      if (!Object.hasOwnProperty.call(a, key) || !Object.hasOwnProperty.call(b, key)) {
        return 0
      }

      const varA: Date | any = a[key as keyof Task]
      const varB: Date | any = b[key as keyof Task]

      let comparison = 0
      if (varA > varB) {
        comparison = 1
      } else if (varA < varB) {
        comparison = -1
      }
      return order === 'desc' ? comparison * -1 : comparison
    }
  }

  static getTaskById(tasks: Array<TaskModel>, id: string): TaskModel {
    return tasks[this.getTaskIndex(tasks, id)]
  }

  static getStatusSummary(tasks: Array<TaskModel>): Array<SummaryModel> {
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

  static updateTasks(tasks: Array<TaskModel>, task: TaskModel): Array<TaskModel> {
    if (!task.id) return tasks

    const index: number = this.getTaskIndex(tasks, task.id)
    const replacement = Object.assign({}, tasks[index], task)
    tasks.splice(index, 1, replacement)
    return tasks
  }

  static filterByStatus(tasks: Array<TaskModel>, status: string): Array<TaskModel> {
    return tasks.filter((el: TaskModel) => {
      return el.status === status
    })
  }

  static filterByTags(tasks: Array<TaskModel>, tags: Array<string>): Array<TaskModel> {
    const matches: Array<TaskModel> = []
    for (const tag of tags) {
      matches.push(
        ...tasks.filter((el: TaskModel) => {
          return el.tags?.includes(tag)
        })
      )
    }
    return matches
  }

  static sortByCreated(tasks: Array<TaskModel>, direction: string): Array<TaskModel> {
    const options = ['asc', 'desc']
    if (!options.includes(direction)) {
      return tasks
    }
    return tasks.slice().sort(this.compareTaskDates('creationDate', direction))
  }

  static sortByDue(tasks: Array<TaskModel>, direction: string): Array<TaskModel> {
    const options = ['asc', 'desc']
    if (!options.includes(direction)) {
      return tasks
    }
    return tasks.slice().sort(this.compareTaskDates('dueDate', direction))
  }
}

export default TaskList
