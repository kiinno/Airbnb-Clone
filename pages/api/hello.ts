import { NextApiRequest, NextApiResponse } from "next";

type ResponseBody = {
  message: string;
};
export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<ResponseBody>
) {
  res.json({ message: "OK" });
}
