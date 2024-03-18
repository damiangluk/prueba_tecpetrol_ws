const express = require("express");
const cors = require("cors");
const { PORT } = require("./config/config");
const app = express();
const { loadConfiguration } = require('./app/helpers/configurationHelper');


require("./app/models");

/*const corsOptions ={
  origin:'http://localhost:3000', 
  credentials:true,
  optionSuccessStatus:200
}

app.use(cors(corsOptions));*/
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// simple route
app.get("/", (req, res) => {
  res.json({ message: "Welcome to tecpetrol web service." });
});

(async function () {
  await loadConfiguration();

  // Las routes se inicializan aca para poder utilizar los parametros de configuracion en las validaciones
  require('./app/routes/certificationRoutes')(app);
  require('./app/routes/orderRoutes')(app);
})();


// set port, listen for requests
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});