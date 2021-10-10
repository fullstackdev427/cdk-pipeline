import * as cdk from '@aws-cdk/core';
import * as apigw from '@aws-cdk/aws-apigateway';
import * as lambda from '@aws-cdk/aws-lambda';
import * as path from 'path';
import { CfnOutput } from '@aws-cdk/core';

export class CdkpipelinesDemoStack extends cdk.Stack {
  public readonly urlOutput: CfnOutput;

  constructor(scope: cdk.Construct, id: string, props?: cdk.StackProps) {
    super(scope, id, props);

    // The Lambda function that contains the functionality
    const handler = new lambda.Function(this, 'Lambda', {
      runtime: lambda.Runtime.NODEJS_12_X,
      handler: 'handler.handler',
      code: lambda.Code.fromAsset(path.resolve(__dirname, 'lambda')),
    });

    // An API Gateway to make the Lambda web-accessible
    const gw = new apigw.LambdaRestApi(this, 'Gateway', {
      description: 'Endpoint for a simple Lambda-powered web service',
      handler,
    });

    this.urlOutput = new CfnOutput(this, 'Url', {
      value: gw.url,
    });
  }
}
