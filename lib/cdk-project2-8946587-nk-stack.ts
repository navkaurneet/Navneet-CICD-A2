import * as cdk from 'aws-cdk-lib';
import * as s3 from 'aws-cdk-lib/aws-s3';
import * as lambda from 'aws-cdk-lib/aws-lambda';
import * as dynamodb from 'aws-cdk-lib/aws-dynamodb';

export class CdkProject28946587NkStack extends cdk.Stack {
  constructor(scope: cdk.App, id: string, props?: cdk.StackProps) {
    super(scope, id, props);

    // S3 Bucket
    const bucket = new s3.Bucket(this, 'S3Bucket8946587', {
      versioned: true,
      removalPolicy: cdk.RemovalPolicy.DESTROY,
    });

    // Lambda Function
    const lambdaFn = new lambda.Function(this, 'Lambda8946587', {
      runtime: lambda.Runtime.NODEJS_18_X,
      handler: 'index.handler',
      code: lambda.Code.fromInline(`
        exports.handler = async (event) => {
          console.log('Event:', event);
          return { statusCode: 200, body: 'Hello from Lambda!' };
        };
      `),
      environment: {
        BUCKET_NAME: bucket.bucketName,
      },
    });

    // DynamoDB Table
    const table = new dynamodb.Table(this, 'DynamoDBTable8946587', {
      partitionKey: { name: 'id', type: dynamodb.AttributeType.STRING },
      removalPolicy: cdk.RemovalPolicy.DESTROY,
    });

    // Grant permissions
    bucket.grantReadWrite(lambdaFn);
  }
}