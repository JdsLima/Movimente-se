import { NextApiRequest, NextApiResponse } from 'next';
import connect from "../../../../utils/database";

export default async (req: NextApiRequest, res: NextApiResponse) => {
    if (req.method === "POST") {
        const { db } = await connect();

        const userData = req.query;
        const [email, userName, imgUrl] = String(userData.addUser).split("_");

        const data = await db.collection("users").insertOne({
            email: email,
            userName: userName,
            imgUrl: imgUrl,
            level: 1,
            currentExperience: 0,
            challengesCompleted: 0,
            friendsName: [],
        });
        res.status(200).json(data.ops[0]);

    } else {
        res.status(400).json({ message: "Wrong request method" });
    }
}