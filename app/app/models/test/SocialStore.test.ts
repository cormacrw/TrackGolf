import { SocialStoreModel } from "../SocialStore"

test("can be created", () => {
  const instance = SocialStoreModel.create({})

  expect(instance).toBeTruthy()
})
