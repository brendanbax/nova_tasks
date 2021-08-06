export interface ITask {
  id?: string
  title: string
  body?: string
  creationDate?: Date
  dueDate?: Date | null
  tags?: Array<string>
  status?: string
}
