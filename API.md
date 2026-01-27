# API Reference <a name="API Reference" id="api-reference"></a>

## Constructs <a name="Constructs" id="Constructs"></a>

### RemoteParameters <a name="RemoteParameters" id="@gemeentenijmegen/cross-region-parameters.RemoteParameters"></a>

Represents the RemoteParameters of the remote CDK stack.

#### Initializers <a name="Initializers" id="@gemeentenijmegen/cross-region-parameters.RemoteParameters.Initializer"></a>

```typescript
import { RemoteParameters } from '@gemeentenijmegen/cross-region-parameters'

new RemoteParameters(scope: Construct, id: string, props: RemoteParametersProps)
```

| **Name** | **Type** | **Description** |
| --- | --- | --- |
| <code><a href="#@gemeentenijmegen/cross-region-parameters.RemoteParameters.Initializer.parameter.scope">scope</a></code> | <code>constructs.Construct</code> | *No description.* |
| <code><a href="#@gemeentenijmegen/cross-region-parameters.RemoteParameters.Initializer.parameter.id">id</a></code> | <code>string</code> | *No description.* |
| <code><a href="#@gemeentenijmegen/cross-region-parameters.RemoteParameters.Initializer.parameter.props">props</a></code> | <code><a href="#@gemeentenijmegen/cross-region-parameters.RemoteParametersProps">RemoteParametersProps</a></code> | *No description.* |

---

##### `scope`<sup>Required</sup> <a name="scope" id="@gemeentenijmegen/cross-region-parameters.RemoteParameters.Initializer.parameter.scope"></a>

- *Type:* constructs.Construct

---

##### `id`<sup>Required</sup> <a name="id" id="@gemeentenijmegen/cross-region-parameters.RemoteParameters.Initializer.parameter.id"></a>

- *Type:* string

---

##### `props`<sup>Required</sup> <a name="props" id="@gemeentenijmegen/cross-region-parameters.RemoteParameters.Initializer.parameter.props"></a>

- *Type:* <a href="#@gemeentenijmegen/cross-region-parameters.RemoteParametersProps">RemoteParametersProps</a>

---

#### Methods <a name="Methods" id="Methods"></a>

| **Name** | **Description** |
| --- | --- |
| <code><a href="#@gemeentenijmegen/cross-region-parameters.RemoteParameters.toString">toString</a></code> | Returns a string representation of this construct. |
| <code><a href="#@gemeentenijmegen/cross-region-parameters.RemoteParameters.get">get</a></code> | Get the parameter. |

---

##### `toString` <a name="toString" id="@gemeentenijmegen/cross-region-parameters.RemoteParameters.toString"></a>

```typescript
public toString(): string
```

Returns a string representation of this construct.

##### `get` <a name="get" id="@gemeentenijmegen/cross-region-parameters.RemoteParameters.get"></a>

```typescript
public get(key: string): string
```

Get the parameter.

###### `key`<sup>Required</sup> <a name="key" id="@gemeentenijmegen/cross-region-parameters.RemoteParameters.get.parameter.key"></a>

- *Type:* string

output key.

---

#### Static Functions <a name="Static Functions" id="Static Functions"></a>

| **Name** | **Description** |
| --- | --- |
| <code><a href="#@gemeentenijmegen/cross-region-parameters.RemoteParameters.isConstruct">isConstruct</a></code> | Checks if `x` is a construct. |

---

##### `isConstruct` <a name="isConstruct" id="@gemeentenijmegen/cross-region-parameters.RemoteParameters.isConstruct"></a>

```typescript
import { RemoteParameters } from '@gemeentenijmegen/cross-region-parameters'

RemoteParameters.isConstruct(x: any)
```

Checks if `x` is a construct.

Use this method instead of `instanceof` to properly detect `Construct`
instances, even when the construct library is symlinked.

Explanation: in JavaScript, multiple copies of the `constructs` library on
disk are seen as independent, completely different libraries. As a
consequence, the class `Construct` in each copy of the `constructs` library
is seen as a different class, and an instance of one class will not test as
`instanceof` the other class. `npm install` will not create installations
like this, but users may manually symlink construct libraries together or
use a monorepo tool: in those cases, multiple copies of the `constructs`
library can be accidentally installed, and `instanceof` will behave
unpredictably. It is safest to avoid using `instanceof`, and using
this type-testing method instead.

###### `x`<sup>Required</sup> <a name="x" id="@gemeentenijmegen/cross-region-parameters.RemoteParameters.isConstruct.parameter.x"></a>

- *Type:* any

Any object.

---

#### Properties <a name="Properties" id="Properties"></a>

| **Name** | **Type** | **Description** |
| --- | --- | --- |
| <code><a href="#@gemeentenijmegen/cross-region-parameters.RemoteParameters.property.node">node</a></code> | <code>constructs.Node</code> | The tree node. |
| <code><a href="#@gemeentenijmegen/cross-region-parameters.RemoteParameters.property.parameters">parameters</a></code> | <code>aws-cdk-lib.CustomResource</code> | The parameters in the SSM parameter store for the remote stack. |

---

##### `node`<sup>Required</sup> <a name="node" id="@gemeentenijmegen/cross-region-parameters.RemoteParameters.property.node"></a>

```typescript
public readonly node: Node;
```

- *Type:* constructs.Node

The tree node.

---

##### `parameters`<sup>Required</sup> <a name="parameters" id="@gemeentenijmegen/cross-region-parameters.RemoteParameters.property.parameters"></a>

```typescript
public readonly parameters: CustomResource;
```

- *Type:* aws-cdk-lib.CustomResource

The parameters in the SSM parameter store for the remote stack.

---


## Structs <a name="Structs" id="Structs"></a>

### RemoteParametersProps <a name="RemoteParametersProps" id="@gemeentenijmegen/cross-region-parameters.RemoteParametersProps"></a>

Properties of the RemoteParameters.

#### Initializer <a name="Initializer" id="@gemeentenijmegen/cross-region-parameters.RemoteParametersProps.Initializer"></a>

```typescript
import { RemoteParametersProps } from '@gemeentenijmegen/cross-region-parameters'

const remoteParametersProps: RemoteParametersProps = { ... }
```

#### Properties <a name="Properties" id="Properties"></a>

| **Name** | **Type** | **Description** |
| --- | --- | --- |
| <code><a href="#@gemeentenijmegen/cross-region-parameters.RemoteParametersProps.property.path">path</a></code> | <code>string</code> | The parameter path. |
| <code><a href="#@gemeentenijmegen/cross-region-parameters.RemoteParametersProps.property.region">region</a></code> | <code>string</code> | The region code of the remote stack. |
| <code><a href="#@gemeentenijmegen/cross-region-parameters.RemoteParametersProps.property.alwaysUpdate">alwaysUpdate</a></code> | <code>boolean</code> | Indicate whether always update the custom resource to get the new stack output. |
| <code><a href="#@gemeentenijmegen/cross-region-parameters.RemoteParametersProps.property.timeout">timeout</a></code> | <code>aws-cdk-lib.Duration</code> | timeout for custom resource handler. |

---

##### `path`<sup>Required</sup> <a name="path" id="@gemeentenijmegen/cross-region-parameters.RemoteParametersProps.property.path"></a>

```typescript
public readonly path: string;
```

- *Type:* string

The parameter path.

---

##### `region`<sup>Required</sup> <a name="region" id="@gemeentenijmegen/cross-region-parameters.RemoteParametersProps.property.region"></a>

```typescript
public readonly region: string;
```

- *Type:* string

The region code of the remote stack.

---

##### `alwaysUpdate`<sup>Optional</sup> <a name="alwaysUpdate" id="@gemeentenijmegen/cross-region-parameters.RemoteParametersProps.property.alwaysUpdate"></a>

```typescript
public readonly alwaysUpdate: boolean;
```

- *Type:* boolean
- *Default:* true

Indicate whether always update the custom resource to get the new stack output.

---

##### `timeout`<sup>Optional</sup> <a name="timeout" id="@gemeentenijmegen/cross-region-parameters.RemoteParametersProps.property.timeout"></a>

```typescript
public readonly timeout: Duration;
```

- *Type:* aws-cdk-lib.Duration
- *Default:* no timeout specified.

timeout for custom resource handler.

---



