export interface ITask {
  id?: string
  title: string
  body?: string
  creationDate?: Date
  dueDate?: unknown
  tags?: Array<string>
  status?: string
}
