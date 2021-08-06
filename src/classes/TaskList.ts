import { TaskModel } from './Task'

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
    return tasks
  }

  static filterByTags(tasks: Array<TaskModel>, tags: Array<string>): Array<TaskModel> {
    return tasks
  }

  static sortByCreated(tasks: Array<TaskModel>, direction: string): Array<TaskModel> {
    return tasks
  }

  static sortByDue(tasks: Array<TaskModel>, direction: string): Array<TaskModel> {
    return tasks
  }
}

export default TaskList
