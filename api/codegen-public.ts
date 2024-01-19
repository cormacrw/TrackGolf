
import type { CodegenConfig } from '@graphql-codegen/cli';

const config: CodegenConfig = {
  overwrite: true,
  schema: "src/schema/public/gql/schema.gql",
  generates: {
    "src/schema/public/types/schema.ts": {
      plugins: ["typescript", "typescript-resolvers"]
    },
    // "./graphql.public.schema.json": {
    //   plugins: ["introspection"]
    // }
  }
};

export default config;
