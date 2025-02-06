import BaseDao from "./base.dao"
import {
  TasksTable,
  type ITaskSelect,
  type ITaskInsert,
} from "../database/tasks.schema"

class TaskDao extends BaseDao<typeof TasksTable, ITaskSelect, ITaskInsert> {
  constructor() {
    super(TasksTable, TasksTable.id)
  }
}

export default TaskDao
