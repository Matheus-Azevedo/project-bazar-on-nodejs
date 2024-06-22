import { Router } from "express";
import ProductController from "../controller/ProductController.js";
import { verifyJWT } from "../helpers/managerJwt.js";
import imageUpload from "../helpers/imageUpload.js";

const router = Router();

router.post(
  "/",
  verifyJWT,
  imageUpload.array("images"),
  ProductController.create
);

router.get("/", ProductController.index);

router.get("/showUserProducts", verifyJWT, ProductController.showUserProducts);

router.get(
  "/showReceiverProducts",
  verifyJWT,
  ProductController.showReceiverProducts
);

router.get("/:id", ProductController.show);

router.put(
  "/:id",
  verifyJWT,
  imageUpload.array("images"),
  ProductController.update
);

router.delete("/:id", verifyJWT, ProductController.delete);

router.patch("/schedule/:id", verifyJWT, ProductController.schedule);

router.patch(
  "/concludeDonation/:id",
  verifyJWT,
  ProductController.concludeDonation
);

export default router;
