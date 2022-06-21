const {
  responseSuccess,
  responseError,
} = require("../../libs/responseFormat/response");
const { recipesVideosModel } = require("../../models");
const { deleteFile } = require("../../libs/deleteFile/deleteFile");

exports.deleteOne = async (req, res) => {
  const { id } = req.params;
  try {
    if (Number(id)) {
      const results = await recipesVideosModel.delete.deleteOneModel(id);
      await deleteFile("recipes", results.request[0].photo_profile);
      res
        .status(200)
        .json(responseSuccess("Successfully deleted data.", results));
    } else {
      throw { code: 400, message: "Parameter must be a number!" };
    }
  } catch (err) {
    res.status(err.code).json(responseError(err.message));
  }
};