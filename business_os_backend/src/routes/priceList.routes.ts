import express from "express";
import { getAllPriceLists } from "../controllers/priceList.controller.js";

const router = express.Router();

router.get("/", getAllPriceLists);

export default router;