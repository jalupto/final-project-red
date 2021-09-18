require("dotenv").config();
const Express = require("express");
const app = Express();
// const { sequelize } = require("./db");
const port = 3000;

;(async () => {
    app.use(require("./middleware/headers"));

    const controllers = require("./controllers");
    app.use(Express.json());

    app.use("/users", controllers.userController);
    app.use("/favs", controllers.favController);
    app.use("/votes", controllers.voteController);

    app.listen(port, () => {
        console.log(`Project listening at http://localhost:${port}`);
    })
})();