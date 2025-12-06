import type { CodegenConfig } from '@graphql-codegen/cli';

const config: CodegenConfig = {
  overwrite: true,
  schema: "c:/Project/BucketInterview/bucketHomework/src/graphQL/**/*.graphql",
  documents: ['src/**/*.graphql'],
  generates: {
    "c:/Project/BucketInterview/bucketHomework/src/generated/graphql.ts": {
      plugins: [
        'typescript',
        'typescript-operations',
        'typed-document-node',
      ],
      config: {
        withMutationFn: true,
        useTypeImports: true,
      },
    },
  },
};

export default config;
