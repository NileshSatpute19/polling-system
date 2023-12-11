const express = require("express");

const app = express();

require("./src/database/mongo.database");

app.use((req, res, next) => {
  express.json()(req, res, (err) => {
    if (err) {
      return res.status(400).send({
        data: null,
        error: false,
        errorMessage: "Malformed Request",
      });
    }
    next();
  });
});

// app.use((req, res, next) => {
//   if (!req.is("application/json")) {
//     return res.status(400).send({
//       data: null,
//       error: false,
//       errorMessage: "Invalid content type",
//     });
//   }
//   next();
// });

/**HealthCheck URL for API to check if API working */
app.get("/healthcheck", (req, res) => {
  res.send("Polling system working fine");
});

/**Router entry point */
app.use("/", require("./src/router/poll.routes"));

/**In case of unknown errors */
process.on("uncaughtException", (err) => {
  console.error("uncaughtException", err);
});

process.on("unhandledRejection", (err) => {
  console.error("unhandledRejection", err);
});

/**Started the server */
app.listen(4001, () => {
  console.log("Server started on port 4001");
});
