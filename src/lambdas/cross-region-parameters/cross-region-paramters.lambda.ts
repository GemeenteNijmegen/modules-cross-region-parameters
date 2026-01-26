import { SSMClient, GetParametersByPathCommand, Parameter } from '@aws-sdk/client-ssm';
import { CdkCustomResourceEvent, CdkCustomResourceResponse } from 'aws-lambda';

export async function handler(event: CdkCustomResourceEvent): Promise<CdkCustomResourceResponse> {
  if (event.RequestType === 'Delete') {
    return on_delete(event);
  }
  if (event.RequestType === 'Create') {
    return on_create(event);
  }
  if (event.RequestType === 'Update') {
    return on_update(event);
  }
  throw new Error('Unsupported request type');
};

async function on_create(event: CdkCustomResourceEvent) {
  const props = event.ResourceProperties;
  console.log('create new resource with props ', props);
  const output = get_parameters(props.RegionName, props.parameterPath);
  return { Data: output };
}

async function on_update(event: CdkCustomResourceEvent) {
  const props = event.ResourceProperties;
  console.log('update resource with props ', props);
  const output = get_parameters(props.RegionName, props.parameterPath);
  return { PhysicalResourceId: props.PhysicalResourceId, Data: output };
}

async function on_delete(event: CdkCustomResourceEvent) {
  const props = event.ResourceProperties;
  console.log('delete resource with props ', props);
  return { PhysicalResourceId: props.PhysicalResourceId };
}

async function get_parameters(regionName: string, parameterPath: string) {
  const client = new SSMClient({ region: regionName });
  const response = await client.send(new GetParametersByPathCommand({ Path: parameterPath }));
  return response.Parameters?.reduce((output: { [key: string]: string }, x: Parameter) => {
    if (!x.Name || !x.Value) {
      return output;
    }
    output[x.Name] = x.Value;
    return output;
  }, {});
}
