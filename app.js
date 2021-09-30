require("dotenv").config();
const Express = require("express");
const app = Express();

;(async () => {
    app.use(require("./middleware/headers"));

    const controllers = require("./controllers");
    app.use(Express.json());

    app.use("/users", controllers.userController);
    app.use("/favs", controllers.favController);
    app.use("/votes", controllers.voteController);

    app.listen(process.env.PORT, () => {
        console.log(`server is listening on port ${process.env.PORT}`);
    })
})();