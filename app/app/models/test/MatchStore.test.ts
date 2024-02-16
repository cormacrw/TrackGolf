import { MatchStoreModel } from "../MatchStore"

test("can be created", () => {
  const instance = MatchStoreModel.create({})

  expect(instance).toBeTruthy()
})
