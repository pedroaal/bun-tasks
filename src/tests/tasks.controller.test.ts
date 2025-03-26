import { describe, it, expect, mock } from "bun:test"
import { testClient } from "hono/testing"
import { Database } from "bun:sqlite"
import { drizzle } from "drizzle-orm/bun-sqlite"

import TaskRouter from "../controllers/tasks.controller"
import { TasksTable } from "../database/tasks.schema"

const testDb = new Database(":memory:")
mock.module("../config/db.ts", () => {
  return drizzle(testDb, { schema: { TasksTable } })
})

describe("TaskRouter", () => {
  it.only("should return created task", async () => {
    const data = {
      title: "Test",
      description: "Test",
    }
    const res = await testClient(TaskRouter).task.$post(
      {
        json: data,
      },
      {},
    )
    console.log(res)
    expect(res.status).toBe(200)
  })

  it("should return all tasks", async () => {
    const res = await testClient(TaskRouter).task.$get()
    expect(res.status).toBe(200)
  })

  it("should return a tasks", async () => {
    const res = await testClient(TaskRouter).task.$get()
    expect(res.status).toBe(200)
  })

  it("should return updated task", async () => {
    const res = await testClient(TaskRouter).task.$patch()
    expect(res.status).toBe(200)
  })

  it("should return deleted task", async () => {
    const res = await testClient(TaskRouter).task.$delete()
    expect(res.status).toBe(200)
  })
})
