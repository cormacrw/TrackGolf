import { SearchUserStoreModel } from "../SearchUserStore"

test("can be created", () => {
  const instance = SearchUserStoreModel.create({})

  expect(instance).toBeTruthy()
})
