import * as cdk from '@aws-cdk/core';
const apigw = require('@aws-cdk/aws-apigateway');
import * as lambda from '@aws-cdk/aws-lambda';

export class AwsStack extends cdk.Stack {
  constructor(scope: cdk.Construct, id: string, props?: cdk.StackProps) {
    super(scope, id, props);

    const fn = new lambda.Function(this, 'helloWorldFunction', {
      code: new lambda.AssetCode('lib/lambda-handler'),
      handler: 'index.handler',
      runtime: lambda.Runtime.NODEJS_12_X
    });

    const helloWorldLambdaRestApi = new apigw.LambdaRestApi(this, 'helloWorldLambdaRestApi', {
      restApiName: 'Hello World API',
      handler: fn,
      defaultCorsPreflightOptions: {
          allowOrigins: apigw.Cors.ALL_ORIGINS
      }
    });
  }
}

