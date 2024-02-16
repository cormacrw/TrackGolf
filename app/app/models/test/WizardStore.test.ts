import { WizardStoreModel } from "../WizardStore"

test("can be created", () => {
  const instance = WizardStoreModel.create({})

  expect(instance).toBeTruthy()
})
