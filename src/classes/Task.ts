import { v4 as uuidv4 } from 'uuid'
import { ITask } from '@/interfaces/ITask'

export class Task implements ITask {
  id: string
  title: string
  body: string
  creationDate: Date
  dueDate: unknown
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
}
