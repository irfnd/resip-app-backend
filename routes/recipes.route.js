const router = require("express").Router();
const { recipesController } = require("../controllers");

router
	.route("/")
	.get(recipesController.select.selectAll)
	.post(recipesController.insert.insertOne);

router
	.route("/:id")
	.get(recipesController.select.selectById)
	.patch(recipesController.update.updateOne)
	.delete(recipesController.delete.deleteOne);

module.exports = router;
