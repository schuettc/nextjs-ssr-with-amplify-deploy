import { EC2Client, DescribeInstancesCommand } from "@aws-sdk/client-ec2";
const config = {
  region: "us-east-1",
  credentials: {
    accessKeyId: process.env.ACCESS_KEY_ID,
    secretAccessKey: process.env.SECRET_ACCESS_KEY,
  },
};

const client = new EC2Client(config);

export default async function handler(req, res) {
  try {
    const response = await client.send(new DescribeInstancesCommand({}));
    let instancesInfo = [];
    response.Reservations.forEach((instances) => {
      instances.Instances.forEach((instance) => {
        instancesInfo.push({
          id: instance.InstanceId,
          type: instance.InstanceType,
          imageId: instance.ImageId,
        });
      });
    });
    res.status(200).json({ data: instancesInfo });
  } catch (err) {
    console.log(err);
    res.status(503).json({ data: "Error getting instances" });
  }
}
