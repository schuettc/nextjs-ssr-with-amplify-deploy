import { EC2Client, DescribeInstancesCommand } from '@aws-sdk/client-ec2';
const config = {
  region: 'us-east-1',
  credentials: {
    accessKeyId: process.env.ACCESS_KEY_ID,
    secretAccessKey: process.env.SECRET_ACCESS_KEY,
  },
};

const client = new EC2Client(config);

export default async function handler(req, res) {
  console.log('In instances function');
  try {
    const response = await client.send(new DescribeInstancesCommand({}));

    let instances = [];
    response.Reservations.forEach((instance) => {
      // console.log(instance);
      instances.push({
        id: instance.Instances[0].InstanceId,
        type: instance.Instances[0].InstanceType,
        imageId: instance.Instances[0].ImageId,
      });
    });
    console.log(instances);
    res.status(200).json({ data: instances });
  } catch (err) {
    console.log(err);
    res.status(503).json({ data: 'Error getting instances' });
  }
}
