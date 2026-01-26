import { GemeenteNijmegenCdkLib } from '@gemeentenijmegen/projen-project-type';
const project = new GemeenteNijmegenCdkLib({
  cdkVersion: '2.1.0',
  defaultReleaseBranch: 'main',
  devDeps: ['@gemeentenijmegen/projen-project-type', 'aws-sdk-client-mock', 'aws-sdk-client-mock-jest'],
  bundledDeps: ['@types/aws-lambda', '@aws-sdk/client-ssm', 'zod'],
  name: '@gemeentenijmegen/cross-region-parameteres',
  projenrcTs: true,
  author: 'Gemeente Nijmegen',
  authorAddress: 'devops@nijmegen.nl',
  repositoryUrl: 'https://github.com/GemeenteNijmegen/modules-cross-region-parameteres',
  repository: 'https://github.com/GemeenteNijmegen/modules-cross-region-parameteres',
  npmTrustedPublishing: true,
  jestOptions: {
    jestConfig: {
      roots: ['src/', 'test/'],
    },
  },
  // deps: [],                /* Runtime dependencies of this module. */
  // description: undefined,  /* The description is just a string that helps people understand the purpose of the package. */
  // packageName: undefined,  /* The "name" in package.json. */
});
project.synth();