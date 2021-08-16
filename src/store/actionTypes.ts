// Save actions as constants cuz strings often get messed up
export const ADD_TASK = 'ADD_TASK'
export const UPDATE_TASK = 'UPDATE_TASK'
export const DELETE_TASK = 'DELETE_TASK'
export const GET_TASK = 'GET_TASK'
export const GET_TASKS = 'GET_TASKS'
export const GET_TASK_SUMMARY = 'GET_TASK_SUMMARY'
export const GET_BY_CREATED_ASC = 'GET_BY_CREATED_ASC'
export const GET_BY_CREATED_DESC = 'GET_BY_CREATED_DESC'
export const GET_BY_DUE_ASC = 'GET_BY_DUE_ASC'
export const GET_BY_DUE_DESC = 'GET_BY_DUE_DESC'
export const GET_BY_OVERDUE = 'GET_BY_OVERDUE'
export const GET_BY_TAGS = 'GET_BY_TAGS'
export const GET_BY_STATUS = 'GET_BY_STATUS'
export const GET_LOCAL_STATE = 'GET_LOCAL_STATE'
export const SET_LOCAL_STATE = 'SET_LOCAL_STATE'

const actionTypes = {
  ADD_TASK,
  UPDATE_TASK,
  DELETE_TASK,
  GET_TASK,
  GET_TASKS,
  GET_TASK_SUMMARY,
  GET_BY_CREATED_ASC,
  GET_BY_CREATED_DESC,
  GET_BY_DUE_ASC,
  GET_BY_DUE_DESC,
  GET_BY_OVERDUE,
  GET_BY_TAGS,
  GET_BY_STATUS,
  GET_LOCAL_STATE,
  SET_LOCAL_STATE
}

export default actionTypes
