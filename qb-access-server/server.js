import dotenv from "dotenv";
import cors from "cors";
import express from "express";
import path from "path";
import OAuthClient from "intuit-oauth";
import bodyParser from "body-parser";
import ngrok from "ngrok";

const app = express();
const ngrokServer = process.env.NGROK_ENABLED === "true" ? ngrok : null;
const allowedOrigins = ["http://localhost:5173/", "http://localhost:5174/"];
dotenv.config();
app.use(
  cors({
    origin: function (origin, callback) {
      if (!origin) {
        return callback(null, true);
      }

      if (allowedOrigins.includes(origin)) {
        const msg =
          "The CORS policy for this site does not allow access from the specified Origin.";
        return callback(new Error(msg), false);
      }
      return callback(null, true);
    },
  })
);
app.use(bodyParser.json());

const urlencodedParser = bodyParser.urlencoded({ extended: false });

/**
 * App Variables
 * @type {null}
 */
let oauth2_token_json = null;
let redirectUri = "";

/**
 * Instantiate new Client
 * @type {OAuthClient}
 */

let oauthClient = null;

/**
 * Home Route
 */
app.get("/", function (req, res) {
  res.render("index");
});

/**
 * Get the AuthorizeUri
 */
app.get("/authorize", urlencodedParser, function (req, res) {
  console.log({
    clientId: process.env.CLIENT_ID,
    clientSecret: process.env.CLIENT_SECRET,
    environment: process.env.ENVIRONMENT,
    redirectUri: process.env.REDIRECT_URL,
  });
  oauthClient = new OAuthClient({
    clientId: process.env.CLIENT_ID,
    clientSecret: process.env.CLIENT_SECRET,
    environment: process.env.ENVIRONMENT,
    redirectUri: process.env.REDIRECT_URL,
  });

  console.log(oauthClient);

  const authUri = oauthClient.authorizeUri({
    scope: [OAuthClient.scopes.Accounting],
    state: "intuit-test",
  });
  console.log(authUri);
  res.json(authUri);
});

app.get("logged-id", (req, res) => {
  return oauthClient.isAccessTokenValid;
});

/**
 * Handle the callback to extract the `Auth Code` and exchange them for `Bearer-Tokens`
 */
app.get("/callback", function (req, res) {
  console.log("hello!");
  console.log(req);
  console.log(req.url);
  oauthClient
    .createToken(req.url)
    .then(function (authResponse) {
      oauth2_token_json = JSON.stringify(authResponse.getJson(), null, 2);
    })
    .catch(function (e) {
      console.error(e);
    });

  res.send("");
});

/**
 * Display the token : CAUTION : JUST for sample purposes
 */
app.get("/retrieveToken", function (req, res) {
  res.send(oauth2_token_json);
});

/**
 * Refresh the access-token
 */
app.get("/refreshAccessToken", function (req, res) {
  oauthClient
    .refresh()
    .then(function (authResponse) {
      console.log(
        `The Refresh Token is  ${JSON.stringify(authResponse.getJson())}`
      );
      oauth2_token_json = JSON.stringify(authResponse.getJson(), null, 2);
      res.send(oauth2_token_json);
    })
    .catch(function (e) {
      console.error(e);
    });
});

/**
 * getCompanyInfo ()
 */
app.get("/getCompanyInfo", function (req, res) {
  const companyID = oauthClient.getToken().realmId;

  const url =
    oauthClient.environment == "sandbox"
      ? OAuthClient.environment.sandbox
      : OAuthClient.environment.production;

  oauthClient
    .makeApiCall({
      url: `${url}v3/company/${companyID}/companyinfo/${companyID}`,
    })
    .then(function (authResponse) {
      console.log(
        `The response for API call is :${JSON.stringify(authResponse)}`
      );
      res.send(JSON.parse(authResponse.text()));
    })
    .catch(function (e) {
      console.error(e);
    });
});

/**
 * disconnect ()
 */
app.get("/disconnect", function (req, res) {
  console.log("The disconnect called ");
  const authUri = oauthClient.authorizeUri({
    scope: [OAuthClient.scopes.OpenId, OAuthClient.scopes.Email],
    state: "intuit-test",
  });
  res.redirect(authUri);
});

/**
 * Start server on HTTP (will use ngrok for HTTPS forwarding)
 */
const server = app.listen(process.env.PORT || 8000, () => {
  console.log(`💻 Server listening on port ${server.address().port}`);
  if (!ngrokServer) {
    redirectUri = `${server.address().port}` + "/callback";
    console.log(
      `💳  Step 1 : Paste this URL in your browser : ` +
        "http://localhost:" +
        `${server.address().port}`
    );
    console.log(
      "💳  Step 2 : Copy and Paste the clientId and clientSecret from : https://developer.intuit.com"
    );
    console.log(
      `💳  Step 3 : Copy Paste this callback URL into redirectURI :` +
        "http://localhost:" +
        `${server.address().port}` +
        "/callback"
    );
    console.log(
      `💻  Step 4 : Make Sure this redirect URI is also listed under the Redirect URIs on your app in : https://developer.intuit.com`
    );
  }
});

/**
 * Optional : If NGROK is enabled
 */
if (ngrokServer) {
  console.log("NGROK Enabled");
  ngrok
    .connect({ addr: process.env.PORT || 8000 })
    .then((url) => {
      redirectUri = `${url}/callback`;
      console.log(`💳 Step 1 : Paste this URL in your browser :  ${url}`);
      console.log(
        "💳 Step 2 : Copy and Paste the clientId and clientSecret from : https://developer.intuit.com"
      );
      console.log(
        `💳 Step 3 : Copy Paste this callback URL into redirectURI :  ${redirectUri}`
      );
      console.log(
        `💻 Step 4 : Make Sure this redirect URI is also listed under the Redirect URIs on your app in : https://developer.intuit.com`
      );
    })
    .catch(() => {
      process.exit(1);
    });
}
