import fs from 'fs'
import type { NextApiHandler } from 'next';
import path from 'path'

const tokens = fs.readFileSync(path.resolve(process.cwd(), './src/pages/api/allTokens2.json'), 'utf8')
const tokenObj = JSON.parse(tokens)
// Object.values(tokenObj.tokens).forEach((value: any) => {
//   value.splice(30)
// })


const handler: NextApiHandler = (req, res) => {
  if (req.method === 'GET') {
    res.status(200).json(tokenObj);
  } else {
    res.setHeader('Allow', ['GET']);
    res.status(405).json({ message: `Method ${req.method} Not Allowed` });
  }
};
 
export default handler;