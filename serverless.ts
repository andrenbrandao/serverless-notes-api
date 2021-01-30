/* eslint-disable no-template-curly-in-string */
import type { AWS } from '@serverless/typescript';

import { hello, create, get, list, update } from './src/functions';

const serverlessConfiguration: AWS = {
  service: 'notes-api',
  frameworkVersion: '2',
  custom: {
    webpack: {
      webpackConfig: './webpack.config.js',
      includeModules: true,
    },
    stages: ['dev', 'qa', 'prod'],
  },
  plugins: [
    'serverless-webpack',
    'serverless-offline',
    'serverless-stage-manager',
    'serverless-dotenv-plugin',
  ],
  provider: {
    name: 'aws',
    runtime: 'nodejs12.x',
    stage: '${opt:stage, "dev"}',
    region: 'us-east-1',
    apiGateway: {
      minimumCompressionSize: 1024,
      shouldStartNameWithService: true,
    },
    environment: {
      AWS_NODEJS_CONNECTION_REUSE_ENABLED: '1',
      tableName: 'notes',
    },
    lambdaHashingVersion: '20201221',
    iamRoleStatements: [
      {
        Effect: 'Allow',
        Action: [
          'dynamodb:Scan',
          'dynamodb:Query',
          'dynamodb:GetItem',
          'dynamodb:PutItem',
          'dynamodb:UpdateItem',
          'dynamodb:DeleteItem',
          'dynamodb:DescribeTable',
        ],
        Resource: 'arn:aws:dynamodb:us-east-1:*:*',
      },
    ],
  },
  package: {
    individually: true,
  },
  functions: { hello, create, get, list, update },
};

module.exports = serverlessConfiguration;
