import { FilterStoreModel } from "../FilterStore"

test("can be created", () => {
  const instance = FilterStoreModel.create({})

  expect(instance).toBeTruthy()
})
