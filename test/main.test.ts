import { App, Stack } from 'aws-cdk-lib';
import { Template } from 'aws-cdk-lib/assertions';
import { RemoteParameters } from '../src/index';

// test cross region parameters lambda function
it('test cross region parameters lambda function', () => {
  const app = new App();
  const stack = new Stack(app, 'TestStack');

  new RemoteParameters(stack, 'MyRemoteParameters', {
    region: 'us-west-2',
    path: '/my/parameter/path',
  });

  const template = Template.fromStack(stack);
  template.hasResourceProperties('AWS::Lambda::Function', {
    Description: 'Handles remote CDK parameters retrieval',
    Runtime: 'nodejs24.x',
  });
});
