import express from "express";
import personRoutes from "./peopleRoutes.js";

const routes = (app) => {
  app.use(express.json());
  app.use("/api", personRoutes);
  app
    .route("/")
    .get((req, res) => res.status(200).send("Express with Sequelize"));
};

export default routes;
