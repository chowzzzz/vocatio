const db = require("../models");
const Employer = db.employer;
const Op = db.Sequelize.Op;

// Create and Save a new Employer
exports.create = (req, res) => {
	// Validate request
	if (!req.body.emp_name) {
		res.status(400).send({
			message: "Content can not be empty!",
		});
		return;
	}

	// Create a employer
	const employer = {
        emp_name: req.body.emp_name,
		emp_mobile: req.body.emp_mobile,
		emp_email: req.body.emp_email,
		emp_company: req.body.emp_company,
        emp_logo: req.body.emp_logo,
        emp_password: req.body.emp_password,
		emp_new_applicants: req.body.emp_new_applicants,
		emp_max_applicants: req.body.emp_max_applicants,
		emp_news_letter: req.body.emp_news_letter,
		emp_subscription: req.body.emp_subscription,
	};

	// Save Employer in the database
	Employer.create(employer)
		.then((data) => {
			res.send(data);
		})
		.catch((err) => {
			res.status(500).send({
				message:
					err.message ||
					"Some error occurred while creating the Employer.",
			});
		});
};

// Retrieve all Employers from the database.
exports.findAll = (req, res) => {
	const id = req.query.id;
	var condition = id
		? { id: { [Op.like]: `%${emp_name}%` } }
		: null;

	Employer.findAll({ where: condition })
		.then((data) => {
			res.send(data);
		})
		.catch((err) => {
			res.status(500).send({
				message:
					err.message ||
					"Some error occurred while retrieving Employer.",
			});
		});
};

// Find a single Employer with an id
exports.findOne = (req, res) => {
	const id = req.params.id;

	Employer.findByPk(id)
		.then((data) => {
			res.send(data);
		})
		.catch((err) => {
			res.status(500).send({
				message: "Error retrieving Employer with id=" + id,
			});
		});
};

// Update a Employer by the id in the request
exports.update = (req, res) => {
	const id = req.params.id;

	Employer.update(req.body, {
		where: { id: id },
	})
		.then((num) => {
			if (num == 1) {
				res.send({
					message: "Employer was updated successfully.",
				});
			} else {
				res.send({
					message: `Cannot update Employer with id=${id}. Maybe Employer was not found or req.body is empty!`,
				});
			}
		})
		.catch((err) => {
			res.status(500).send({
				message: "Error updating Employer with id=" + id,
			});
		});
};

exports.delete = (req, res) => {
	const id = req.params.id;

	Employer.destroy({
		where: { id: id },
	})
		.then((num) => {
			if (num == 1) {
				res.send({
					message: "Employer was deleted successfully!",
				});
			} else {
				res.send({
					message: `Cannot delete Employer with id=${id}. Maybe Employer was not found!`,
				});
			}
		})
		.catch((err) => {
			res.status(500).send({
				message: "Could not delete Employer with id=" + id,
			});
		});
};

exports.deleteAll = (req, res) => {
	Employer.destroy({
		where: {},
		truncate: false,
	})
		.then((nums) => {
			res.send({
				message: `${nums} Employer were deleted successfully!`,
			});
		})
		.catch((err) => {
			res.status(500).send({
				message:
					err.message ||
					"Some error occurred while removing all Employer.",
			});
		});
};

exports.findAllPublished = (req, res) => {
	Employer.findAll({ where: { published: true } })
		.then((data) => {
			res.send(data);
		})
		.catch((err) => {
			res.status(500).send({
				message:
					err.message ||
					"Some error occurred while retrieving Employer.",
			});
		});
};
