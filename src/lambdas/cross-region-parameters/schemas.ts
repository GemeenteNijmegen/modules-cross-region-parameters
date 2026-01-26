import * as z from 'zod';

export const ResourcePropertiesSchema = z.object({
  regionName: z.string(),
  parameterPath: z.string(),
  randomString: z.string().optional(),
  stackName: z.string().optional(),
  PhysicalResourceId: z.string().optional().describe('Provided by CloudFormation'),
});

export type ResourceProperties = z.infer<typeof ResourcePropertiesSchema>;
