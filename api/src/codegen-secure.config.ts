import type { CodegenConfig } from '@graphql-codegen/cli';

const config: CodegenConfig = {
  overwrite: true,
  schema: "src/schema/secure/gql/schema.gql",
  generates: {
    "src/schema/secure/types/schema.ts": {
      plugins: ["typescript", "typescript-resolvers"]
    },
    // "./graphql.schema.json": {
    //   plugins: ["introspection"]
    // }
  }
};

export default config;
