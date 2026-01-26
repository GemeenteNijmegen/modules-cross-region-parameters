import { SSMClient, GetParametersByPathCommand, Parameter } from '@aws-sdk/client-ssm';
import { CdkCustomResourceEvent, CdkCustomResourceResponse } from 'aws-lambda';
import { ResourcePropertiesSchema } from './schemas';
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
  const props = ResourcePropertiesSchema.parse(event.ResourceProperties);
  console.log('create new resource with props ', props);
  const output = await get_parameters(props.regionName, props.parameterPath);
  return { Data: output };
}

async function on_update(event: CdkCustomResourceEvent) {
  const props = ResourcePropertiesSchema.parse(event.ResourceProperties);
  console.log('update resource with props ', props);
  const output = await get_parameters(props.regionName, props.parameterPath);
  return { PhysicalResourceId: props.PhysicalResourceId, Data: output };
}

async function on_delete(event: CdkCustomResourceEvent) {
  const props = ResourcePropertiesSchema.parse(event.ResourceProperties);
  console.log('delete resource with props ', props);
  return { PhysicalResourceId: props.PhysicalResourceId };
}

export async function get_parameters(regionName: string, parameterPath: string) {
  const client = new SSMClient({ region: regionName });
  const response = await client.send(new GetParametersByPathCommand({ Path: parameterPath }));
  if (!response.Parameters) {
    console.log(`No parameters found for path ${parameterPath}`);
    return {};
  }
  return response.Parameters.reduce((output: { [key: string]: string }, x: Parameter) => {
    if (!x.Name || !x.Value) {
      return output;
    }
    console.log(`Found parameter ${x.Name}`);
    output[x.Name] = x.Value;
    return output;
  }, {});
}
