import type { NextApiHandler } from 'next';

const handler: NextApiHandler = async (req, res) => {
  if (req.method === 'GET') {
    res.status(200).json({ success: 1 });
    console.log('bridge-log:', req.query);
  } else {
    res.setHeader('Allow', ['GET']);
    res.status(405).json({ message: `Method ${req.method} Not Allowed` });
  }
};

export default handler;
