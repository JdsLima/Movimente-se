import { NextApiRequest, NextApiResponse } from 'next';
import connect from "../../../../utils/database";

export default async (req: NextApiRequest, res: NextApiResponse) => {
    if (req.method === "GET") {
        const { db } = await connect();
        const user = req.query;
        const [camp, userSession] = String(user.user).split("_");

        if (camp == "email") {
            const data = await db.collection("users").find({ email: userSession }).toArray();
            res.status(200).json(data);

        } else if (camp == "name") {
            const data = await db.collection("users").find({ userName: userSession }).toArray();
            res.status(200).json(data);
        }

    } else {
        res.status(400).json({ message: "Wrong request method" });
    }
}