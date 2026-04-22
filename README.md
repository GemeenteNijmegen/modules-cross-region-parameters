# modules-cross-region-parameters

A CDK construct that retrieves AWS SSM Parameter Store values from a 
different AWS region at deploy time, using a CloudFormation Custom Resource.

## Why this module?

AWS CloudFormation (and CDK) cannot natively read SSM parameters from a 
region other than the stack's own region. This construct solves that by 
deploying a Lambda-backed Custom Resource that fetches parameters 
cross-region using the AWS SDK.

## How it works

1. You specify a **region** and a **parameter path prefix**.
2. A Lambda function is invoked by CloudFormation during deploy.
3. The Lambda calls `GetParametersByPath` on the SSM service in the 
   target region.
4. The retrieved parameters are returned as key/value pairs and are 
   available in your CDK stack as Custom Resource outputs.

## Usage Example

```
import { RemoteParameters } from '@gemeentenijmegen/cross-region-parameters';

const parameters = new RemoteParameters(this, 'params', {
      path: `${Statics.certificatePath}/`,
      region: 'us-east-1',
      timeout: Duration.seconds(10),
    });
const certificateArn = parameters.get(Statics.certificateArn);

```