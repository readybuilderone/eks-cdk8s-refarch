import * as cdk8s from 'cdk8s';
import * as kplus from 'cdk8s-plus';
import * as constructs from 'constructs';

export interface MyChartProps {
  readonly image: string;
  readonly region: string;
}

export class MyChart extends cdk8s.Chart {
  readonly service: kplus.Service;
  constructor(scope: constructs.Construct, id: string, props: MyChartProps) {
    super(scope, id);

    const deploy = new kplus.Deployment(this, 'Deployment', {
      spec: {
        podSpecTemplate: {
          containers: [
            new kplus.Container({
              image: props.image,
              env: {
                PLATFORM: { value: props.region },
              },
            }),
          ],
        },
      },
    });
    this.service = deploy.expose({
      port: 80,
      serviceType: kplus.ServiceType.LOAD_BALANCER,
    });
  }
}
