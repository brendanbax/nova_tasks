import { v4 as uuidv4 } from 'uuid'

export interface TaskModel {
  id?: string
  title: string
  body?: string
  creationDate?: Date
  dueDate?: unknown
  tags?: Array<string>
  status?: string
}

export class Task implements TaskModel {
  id: string
  title: string
  body: string
  creationDate: Date
  dueDate: unknown
  tags: Array<string>
  status: string

  constructor({ title, body, dueDate, status, tags }: TaskModel) {
    this.id = uuidv4()
    this.title = title
    this.body = body || ''
    this.creationDate = new Date()
    this.dueDate = dueDate || null
    this.status = status || ''
    this.tags = tags || []
  }
}
