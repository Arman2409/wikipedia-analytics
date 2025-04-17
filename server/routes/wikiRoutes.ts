import express from "express";

import { getView } from "../controllers/wikiControllers";


const wikiRoutes = express.Router();

wikiRoutes.get("/get_views", getView);


export default wikiRoutes;
