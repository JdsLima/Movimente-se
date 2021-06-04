import { NextApiRequest, NextApiResponse } from 'next';
import connect from "../../../../utils/database";

export default async (req: NextApiRequest, res: NextApiResponse) => {
    if (req.method === "PUT") {
        const userData = req.query;
        const [userName, updateCamp, value] = String(userData.update).split("_");

        const { db } = await connect();

        if (updateCamp == "level") {
            const data = await db.collection("users")
                .updateOne({ userName: userName }, { $set: { level: Number(value) } });
            res.status(200).json(data);

        } else if (updateCamp == "currentExperience") {
            const data = await db.collection("users")
                .updateOne({ userName: userName }, { $set: { currentExperience: Number(value) } });
            res.status(200).json(data);

        } else if (updateCamp == "challengesCompleted") {
            const data = await db.collection("users")
                .updateOne({ userName: userName }, { $set: { challengesCompleted: Number(value) } });
            res.status(200).json(data);

        } else {
            res.status(400).json({ message: "invalid field" });
        }

    } else {
        res.status(400).json({ message: "Wrong request method" });
    }
}
