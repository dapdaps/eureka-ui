import type { NextApiHandler } from 'next';
import fetch from 'node-fetch';

async function getLidoApr() {
  let res;
  try {
    const fecthRes = await fetch(`https://stake.lido.fi/api/sma-steth-apr`, {
      headers: {
        Host: 'stake.lido.fi',
        Origin: 'https://stake.lido.fi',
        Referer: 'https://stake.lido.fi/api/sma-steth-apr',
        Referrer: 'https://stake.lido.fi/api/sma-steth-apr',
        'User-Agent':
          'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/123.0.0.0 Safari/537.36'
      }
    });
    res = fecthRes.text();
  } catch (e) {}

  return res;
}

const handler: NextApiHandler = async (req, res) => {
  if (req.method === 'GET') {
    const val = await getLidoApr();
    console.log('val:', val);
    res.status(200).json({});
  } else {
    res.setHeader('Allow', ['GET']);
    res.status(405).json({ message: `Method ${req.method} Not Allowed` });
  }
};

export default handler;
