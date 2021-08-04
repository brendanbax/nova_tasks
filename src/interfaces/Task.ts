// In TS, an interface defines the shape of an object for TYPE CHECKING ONLY
// These can only define PUBLIC properties for your object
// Interfaces let you perform type checks when destructuring or 

export default interface ITask {
  id?: string,
  title: string,
  body?: string,
  creationDate?: Date,
  dueDate?: unknown,
  // can also do tags: string[]
  tags?: Array<string>,
  status?: string,
}
