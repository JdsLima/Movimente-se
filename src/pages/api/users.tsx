import { NextApiRequest, NextApiResponse } from 'next';
import connect from "../../../utils/database"

export default async (req: NextApiRequest, res: NextApiResponse) => {
    if (req.method === "GET") {
        const { db } = await connect();
        const data = await db.collection("users").find().toArray();
        res.status(200).json(data);

    } else {
        res.status(400).json({ message: "Wrong request method" });
    }
}
