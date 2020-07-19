var config = require("../config");
import axios from "axios";
import { response } from "express";
var PaysafeApiClient = require("../lib/PaysafeApiClient");
//var PaysafeApiClient;
var paysafeApiClient = new PaysafeApiClient(
  config.paysafeApiKeyId,
  config.paysafeApiKeySecret,
  config.paysafeEnvironment,
  config.paysafeAccountNumber
);

export const checkStatus = (req, res) => {
  paysafeApiClient
    .cardServiceHandler(paysafeApiClient)
    .monitor(function (error, response) {
      if (error) {
        res.send(JSON.stringify(error));
      } else {
        res.send(JSON.stringify(response));
      }
    });
};
export const cardpayment = (req, res) => {
  console.log(req.body);
  const { amount, token } = req.body;
  const access_token = config.SERVERAPI_KEY;
  const url = `${config.API_URL}/cardpayments/v1/accounts/${config.paysafeAccountNumber}/auths`;
  console.log("url ", url);
  var merchantRefNumber = Math.random().toString(36).slice(2);

  axios
    .post(
      url,
      {
        merchantRefNum: merchantRefNumber,
        amount: amount,
        settleWithAuth: true,
        card: {
          paymentToken: token,
        },
        billingDetails: {
          street: "100 Queen Street West",
          city: "Toronto",
          state: "ON",
          country: "CA",
          zip: "M5H 2N2",
        },
      },
      {
        headers: {
          Authorization: `Basic ${access_token}`,
        },
      }
    )
    .then((response) => {
      // console.log(response.data);
      res.send(JSON.stringify(response.data));
    })
    .catch((error) => {
      console.log(error);
      res.send(JSON.stringify(error));
    });
};
