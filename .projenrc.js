const { AwsCdkTypeScriptApp } = require('projen');
const { Automation } = require('projen-automate-it');

const AUTOMATION_TOKEN = 'PROJEN_GITHUB_TOKEN';

const project = new AwsCdkTypeScriptApp({
  cdkVersion: '1.82.0',
  name: 'eks-demo',
  cdkDependencies: [
    '@aws-cdk/aws-ec2',
    '@aws-cdk/aws-eks',
  ],
  deps: [
    'cdk8s',
    'cdk8s-plus',
    'constructs',
    'projen-automate-it',
  ],
  dependabot: false,
  defaultReleaseBranch: 'master',
});


const automation = new Automation(project, {
  automationToken: AUTOMATION_TOKEN,
});
automation.autoApprove();
automation.autoMerge();
automation.projenYarnUpgrade();


const common_exclude = ['cdk.out', 'cdk.context.json', 'yarn-error.log'];
project.npmignore.exclude(...common_exclude);
project.gitignore.exclude(...common_exclude);

project.synth();
