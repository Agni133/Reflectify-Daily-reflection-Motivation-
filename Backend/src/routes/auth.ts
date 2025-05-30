import express from "express";

import * as authController from "../controller/authController"

const router = express.Router();

router.post('/signup',authController.signup);
router.post('/signin',authController.login);

export default  router

