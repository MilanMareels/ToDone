import { NextApiRequest, NextApiResponse } from "next";
import { MongoClient, ObjectId } from "mongodb";

const uri = process.env.MONGODB_URI!;
const client = new MongoClient(uri);
const database = client.db("Todos");
const collection = database.collection("Todos");

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  try {
    await client.connect();

    if (req.method === "GET") {
      const todos = await collection.find({}).toArray();
      return res.status(200).json(todos);
    }

    if (req.method === "PUT") {
      // body = {_id: {id}}
      await updateTodo(req, res);
      return res.status(200).json({ message: "Todo succesvol geüpdatet" });
    }

    if (req.method === "DELETE") {
      //?id={id}
      await deleteTodo(req, res);
      return res.status(200).json({ message: "Todo succesvol verwijderd" });
    }

    return res.status(405).json({ error: "Methode niet toegestaan" });
  } catch (error) {
    return res.status(500).json({ error: "Interne serverfout" });
  } finally {
    await client.close();
  }
}

const updateTodo = async (req: NextApiRequest, res: NextApiResponse) => {
  const { _id, completed } = req.body;

  if (!_id) {
    return res.status(400).json({ error: "ID is vereist" });
  }

  try {
    await client.connect();

    const updateResult = await collection.updateOne({ _id: new ObjectId(_id) }, { $set: { completed } });
    if (updateResult.matchedCount === 0) {
      return res.status(404).json({ error: "Todo niet gevonden" });
    }
  } catch (error) {
    console.error("Fout bij het verwerken van de request:", error);
    return res.status(500).json({ error: "Interne serverfout" });
  } finally {
    await client.close();
  }
};

const deleteTodo = async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    const { id } = req.query;

    if (!id) {
      return res.status(400).json({ error: "ID is vereist" });
    }

    const deleteResult = await collection.deleteOne({ _id: new ObjectId(id.toString()) });

    if (deleteResult.deletedCount === 0) {
      return res.status(404).json({ error: "Todo niet gevonden" });
    }
  } catch (error) {
    console.error("Fout bij het verwerken van de request:", error);
    return res.status(500).json({ error: "Interne serverfout" });
  } finally {
    await client.close();
  }
};
