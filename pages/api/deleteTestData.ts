import type { NextApiRequest, NextApiResponse } from "next";
import { generateClient } from "aws-amplify/api";
import { Schema } from "@/amplify/data/resource";

type ResponseData = {
  message: string;
  deletedCount?: number;
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<ResponseData>
) {
  if (req.method !== 'DELETE') {
    return res.status(405).json({ message: 'Method not allowed' });
  }

  try {
    const client = generateClient<Schema>();
    
    // 获取所有测试数据
    const response = await client.models.StroopTest.list({
      filter: {
        username: {
          eq: 'test'
        }
      }
    });

    // 删除找到的所有测试数据
    const deletePromises = response.data.map(item => 
      client.models.StroopTest.delete({
        id: item.id
      })
    );

    await Promise.all(deletePromises);

    return res.status(200).json({ 
      message: 'Test data deleted successfully',
      deletedCount: response.data.length 
    });
    
  } catch (error) {
    console.error('Error deleting test data:', error);
    return res.status(500).json({ message: 'Error deleting test data' });
  }
}