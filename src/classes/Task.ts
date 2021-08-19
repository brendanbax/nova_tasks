import { v4 as uuidv4 } from 'uuid'
import { ITask } from '@/interfaces/ITask'

class Task implements ITask {
  id: string
  title: string
  body: string
  creationDate: Date
  dueDate: Date | null
  tags: Array<string>
  status: string

  constructor({ title, body, dueDate, status, tags }: ITask) {
    this.id = uuidv4()
    this.title = title
    this.body = body || ''
    this.creationDate = new Date()
    this.dueDate = dueDate || null
    this.status = status || ''
    this.tags = tags || []
  }

  static statusOptions(): Array<string> {
    return ['backlog', 'to do', 'in progress', 'done', 'archive']
  }

  static expandTags(tags: string): Array<string> {
    const statusList = [...new Set(tags.split(',').map((el) => el.trim()))]
    return statusList.filter((tag) => tag !== '')
  }
}

export default Task
