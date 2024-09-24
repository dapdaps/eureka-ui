import type { NextApiHandler } from 'next';
import fetch from 'node-fetch';

async function getBlastStatus(queryString: string) {
  let res;
  try {
    const fecthRes = await fetch(
      process.env.IS_DEV
        ? `https://app.dapdap.net/api/blast?${queryString}`
        : `https://waitlist-api.prod.blast.io/v1/withdrawal/status?${queryString}`,
      {
        headers: {
          Connection: 'keep-alive',
          'Keep-Alive': 'timeout=5'
        }
      }
    );
    res = fecthRes.json();
  } catch (e) {
    return getBlastStatus(queryString);
  }

  return res;
}

const handler: NextApiHandler = async (req, res) => {
  if (req.method === 'GET') {
    const queryString = Object.keys(req.query)
      .map((key) => `${key}=${req.query[key]}`)
      .join('&');
    const val = await getBlastStatus(queryString);
    res.status(200).json(val);
  } else {
    res.setHeader('Allow', ['GET']);
    res.status(405).json({ message: `Method ${req.method} Not Allowed` });
  }
};

export default handler;
