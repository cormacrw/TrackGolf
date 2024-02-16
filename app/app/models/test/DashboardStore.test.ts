import { DashboardStoreModel } from "../DashboardStore"

test("can be created", () => {
  const instance = DashboardStoreModel.create({})

  expect(instance).toBeTruthy()
})
