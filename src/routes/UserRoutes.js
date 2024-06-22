import { Router } from "express";
import UserController from "../controller/UserController.js";
import { verifyJWT } from "../helpers/managerJwt.js";
import imageUpload from "../helpers/imageUpload.js";

const router = Router();

router.post("/register", UserController.register);
router.post("/login", UserController.login);
router.get("/myuser", verifyJWT, UserController.getMyUser);
router.put(
  "/myuser",
  verifyJWT,
  imageUpload.single("image"),
  UserController.updateMyUser
);

export default router;
