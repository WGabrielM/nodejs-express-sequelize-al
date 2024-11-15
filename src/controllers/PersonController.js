import db from "../models/index.js";

export default class PersonController {
  static async getAll(req, res) {
    try {
      console.log(db.Person);

      const listPeople = await db.Person.findAll();
      return res.status(200).json(listPeople);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }
}
