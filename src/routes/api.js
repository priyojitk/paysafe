import express from "express";
import * as PaymentContoller from "../controllers/paymentController";

const router = express.Router();

router.get("/", (req, res) => {
  res.json({ status: "OK", msg: "API Home : GET Request received" });
});

router.get("/check", PaymentContoller.checkStatus);

/*
@METHOD POST
@desc card payment
*/
router.post("/cardpayment", PaymentContoller.cardpayment);

export default router;
