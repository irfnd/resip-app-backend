const { responseSuccess } = require("../../libs/response");
const { recipesModel, commentsModel, recipesVideosModel } = require("../../models");

exports.selectAll = async (req, res, next) => {
	const { page, size } = req.query;
	try {
		if (page && size) {
			const totalRecipes = await recipesModel.select.selectTotalModel();
			const recipes = await recipesModel.select.selectAllPaginationModel(page, size);
			const results = {
				recipes,
				total_recipes: parseInt(totalRecipes[0].count, 10),
				total_page: Math.ceil(totalRecipes[0].count / size),
				current_page: parseInt(page, 10),
				current_size: parseInt(size, 10),
			};
			res.status(200).json(responseSuccess("retrieved", results));
		} else {
			const results = await recipesModel.select.selectAllModel();
			res.status(200).json(responseSuccess("retrieved", results));
		}
	} catch (err) {
		next(err);
	}
};

exports.selectById = async (req, res, next) => {
	const { id } = req.params;
	try {
		if (!Number(id)) throw new Error(JSON.stringify({ code: 400, message: "Parameter must be a number!" }));
		const results = await recipesModel.select.selectByIdModel(id);
		res.status(200).json(responseSuccess("retrieved", results));
	} catch (err) {
		next(err);
	}
};

exports.selectByOwner = async (req, res, next) => {
	const { id } = req.params;
	try {
		if (!Number(id)) throw new Error(JSON.stringify({ code: 400, message: "Parameter must be a number!" }));
		const results = await recipesModel.select.selectByOwnerModel(id);
		res.status(200).json(responseSuccess("retrieved", results));
	} catch (err) {
		next(err);
	}
};

exports.selectByOwnerUser = async (req, res, next) => {
	const { id } = req.decoded;
	try {
		const results = await recipesModel.select.selectByOwnerModel(id);
		res.status(200).json(responseSuccess("retrieved", results));
	} catch (err) {
		next(err);
	}
};

exports.selectByName = async (req, res, next) => {
	const { search } = req.query;
	try {
		const results = await recipesModel.select.selectByNameModel(search);
		res.status(200).json(responseSuccess("retrieved", results));
	} catch (err) {
		next(err);
	}
};

exports.selectLatest = async (req, res, next) => {
	try {
		const results = await recipesModel.select.selectLatestModel();
		res.status(200).json(responseSuccess("retrieved", results));
	} catch (err) {
		next(err);
	}
};
