const {
  AwsCdkTypeScriptApp,
} = require('projen');

const project = new AwsCdkTypeScriptApp({
  cdkVersion: '1.81.0',
  name: 'eks-demo',
  cdkDependencies: [
    '@aws-cdk/aws-ec2',
    '@aws-cdk/aws-eks',
  ],
  deps: [
    'cdk8s',
    'cdk8s-plus',
    'constructs',
    'awscdk-81-patch',
  ],
});


const common_exclude = ['cdk.out', 'cdk.context.json', 'yarn-error.log'];
project.npmignore.exclude(...common_exclude);
project.gitignore.exclude(...common_exclude);

project.synth();
