import { SSMClient, GetParametersByPathCommandOutput, GetParametersByPathCommand } from '@aws-sdk/client-ssm';
import { CdkCustomResourceEvent } from 'aws-lambda/trigger/cdk-custom-resource';
import { mockClient } from 'aws-sdk-client-mock';
import { get_parameters, handler } from '../cross-region-paramters.lambda';
import 'aws-sdk-client-mock-jest';

it('should get all parameters matching a path', async () => {
  const ssmClientMock = mockClient(SSMClient);
  const output: Partial<GetParametersByPathCommandOutput> = {
    Parameters: [
      {
        Name: '/my/parameter1',
        Value: 'value1',
      },
      {
        Name: '/my/parameter2',
        Value: 'value2',
      },
    ],
  };
  ssmClientMock.on(GetParametersByPathCommand).resolves(output);

  const result = await get_parameters('us-east-1', '/my/');
  expect(result).toEqual({
    '/my/parameter1': 'value1',
    '/my/parameter2': 'value2',
  });
});

it('should handle undefined name or value', async () => {
  const ssmClientMock = mockClient(SSMClient);
  const output: Partial<GetParametersByPathCommandOutput> = {
    Parameters: [
      {
        Name: undefined,
        Value: 'value1',
      },
      {
        Name: '/my/parameter2',
        Value: undefined,
      },
    ],
  };
  ssmClientMock.on(GetParametersByPathCommand).resolves(output);

  const result = await get_parameters('us-east-1', '/my/');
  expect(result).toEqual({});
});

it('should handle missing parameters', async () => {
  const ssmClientMock = mockClient(SSMClient);
  const output: Partial<GetParametersByPathCommandOutput> = {
    Parameters: undefined,
  };
  ssmClientMock.on(GetParametersByPathCommand).resolves(output);

  const result = await get_parameters('us-east-1', '/my/');
  expect(result).toEqual({});
});


it('should update a parameter', async () => {
  const ssmClientMock = mockClient(SSMClient);
  const output: Partial<GetParametersByPathCommandOutput> = {
    Parameters: [
      {
        Name: '/my/parameter1',
        Value: 'value1',
      },
      {
        Name: '/my/parameter2',
        Value: 'value2',
      },
    ],
  };
  ssmClientMock.on(GetParametersByPathCommand).resolves(output);
  const event: Partial<CdkCustomResourceEvent> = {
    RequestType: 'Update',
    ResourceProperties: {
      regionName: 'us-east-1',
      parameterPath: '/my/parameter1',
      PhysicalResourceId: 'my-physical-id',
      ServiceToken: 'my-service-token',
    },
  };
  const result = await handler(event as CdkCustomResourceEvent);
  expect(result).toEqual({
    PhysicalResourceId: 'my-physical-id',
    Data: {
      '/my/parameter1': 'value1',
      '/my/parameter2': 'value2',
    },
  });
});

it('should call the ssmClient with correct parameters on create', async () => {
  const ssmClientMock = mockClient(SSMClient);
  const output: Partial<GetParametersByPathCommandOutput> = {
    Parameters: [],
  };
  ssmClientMock.on(GetParametersByPathCommand).resolves(output);
  const event: Partial<CdkCustomResourceEvent> = {
    RequestType: 'Create',
    ResourceProperties: {
      regionName: 'us-east-1',
      parameterPath: '/my/parameter1',
      PhysicalResourceId: 'my-physical-id',
      ServiceToken: 'my-service-token',
    },
  };
  await handler(event as CdkCustomResourceEvent);
  expect(ssmClientMock).toHaveReceivedCommandWith(GetParametersByPathCommand, {
    Path: '/my/parameter1',
  });
});
