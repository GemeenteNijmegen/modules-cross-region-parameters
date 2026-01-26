import { randomUUID } from 'node:crypto';
import {
  Stack, CustomResource, Duration,
  aws_iam as iam,
  aws_logs as logs,
  custom_resources as cr,
} from 'aws-cdk-lib';
import { Construct } from 'constructs';
import { CrossRegionParamtersFunction } from './lambdas/cross-region-parameters/cross-region-paramters-function';
import { ResourceProperties } from './lambdas/cross-region-parameters/schemas';
/**
 * Properties of the RemoteParameters
 */
export interface RemoteParametersProps {
  /**
     * The region code of the remote stack.
     */
  readonly region: string;
  /**
     * The parameter path.
     */
  readonly path: string;
  /**
     * Indicate whether always update the custom resource to get the new stack output
     * @default true
     */
  readonly alwaysUpdate?: boolean;
  /**
     * timeout for custom resource handler
     * @default - no timeout specified.
     */
  readonly timeout?: Duration;
}

/**
 * Represents the RemoteParameters of the remote CDK stack
 */
export class RemoteParameters extends Construct {
  /**
     * The parameters in the SSM parameter store for the remote stack.
     */
  readonly parameters: CustomResource;

  constructor(scope: Construct, id: string, props: RemoteParametersProps) {
    super(scope, id);
    const onEvent = new CrossRegionParamtersFunction(this, 'CrossRegionParamtersFunction', {
      description: 'Handles remote CDK parameters retrieval',
      timeout: props.timeout ?? Duration.seconds(10),
    });

    const myProvider = new cr.Provider(this, 'MyProvider', {
      onEventHandler: onEvent,
      logRetention: logs.RetentionDays.ONE_DAY,
    });

    onEvent.addToRolePolicy(new iam.PolicyStatement({
      actions: ['ssm:GetParametersByPath'],
      resources: ['*'],
    }));

    this.parameters = new CustomResource(this, 'SsmParameters', {
      serviceToken: myProvider.serviceToken,
      properties: {
        stackName: Stack.of(this).stackName,
        regionName: props.region,
        parameterPath: props.path,
        randomString: props.alwaysUpdate == false ? undefined : randomUUID(),
      } as ResourceProperties,
    });
  }

  /**
     * Get the parameter.
     * @param key output key
     */
  public get(key: string) {
    return this.parameters.getAttString(key);
  }
}
