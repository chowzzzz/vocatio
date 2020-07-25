const db = require("../models");
const fs = require("fs");
const bcrypt = require("bcrypt");
const Student = db.student;
const Application = db.application;
const Op = db.Sequelize.Op;

// Create and Save a new Student
exports.createStudent = (req, res) => {
    // Validate request
    if (!req.body.stu_name) {
        res.status(400).send({
            message: "Content can not be empty!"
        });
        return;
    }

    let stu_resume, stu_resume_name, stu_picture, stu_picture_name;
    req.files.forEach((object) => {
        if (object.fieldname == "stu_resume") {
            stu_resume_name = object.originalname;
            stu_resume = fs.readFileSync(
                __basedir + "/assets/uploads/" + object.filename
            );
        } else if (object.fieldname == "stu_picture") {
            stu_picture_name = object.originalname;
            stu_picture = fs.readFileSync(
                __basedir + "/assets/uploads/" + object.filename
            );
        }
    });

    // Create a student
    const student = {
        stu_id: req.body.stu_id,
        stu_name: req.body.stu_name,
        stu_dob: req.body.stu_dob,
        stu_picture: stu_picture,
        stu_mobile: req.body.stu_mobile,
        stu_email: req.body.stu_email,
        stu_faculty: req.body.stu_faculty,
        stu_degree: req.body.stu_degree,
        stu_year: req.body.stu_year,
        stu_linkedin: req.body.stu_linkedin,
        stu_resume: stu_resume,
        stu_password: bcrypt.hashSync(req.body.stu_password, 8),
        stu_status_change: 1,
        stu_new_jobs: 1,
        stu_news_letter: 1,
        stu_subscription: 1
    };

    console.log(student);

    // Save Student in the database
    Student.create(student)
        .then((data) => {
            fs.writeFileSync(
                __basedir + "/assets/tmp/" + stu_resume_name,
                stu_resume
            );
            fs.writeFileSync(
                __basedir + "/assets/tmp/" + stu_picture_name,
                stu_picture
            );
            res.send(data);

            /*  console.log(data.toJSON());
            const id = data.toJSON().id;
            Student.findByPk(id)
                .then((user) => {
                    let token = jwt.sign({ id: user.id }, config.secret, {
                        expiresIn: 86400
                    });
                    res.status(200).send({
                        auth: true,
                        token: token,
                        user: user
                    });
                })
                .catch((err) => {
                    res.status(500).send({
                        message: "Error retrieving Student with id=" + id
                    });
                }); */
        })
        .catch((err) => {
            console.log("error");
            res.status(500).send({
                message:
                    err.message || "There was a problem registering the user."
            });
        });
};

// Retrieve all Students from the database.
exports.findAll = (req, res) => {
    const stu_name = req.query.stu_name;
    var condition = stu_name
        ? { stu_name: { [Op.like]: `%${stu_name}%` } }
        : null;

    Student.findAll({ where: condition })
        .then((data) => {
            res.send(data);
        })
        .catch((err) => {
            res.status(500).send({
                message:
                    err.message ||
                    "Some error occurred while retrieving Student."
            });
        });
};

//Create an application
exports.createApplication = (req, res) => {
    // Validate request
    if (!req.body.adm_user) {
        res.status(400).send({
            message: "Content can not be empty!"
        });
        return;
    }

    // Create a application
    const Application = {
        status: 2,
        studentId: studentId,
        jobpostId: jobpostId
    };

    // Save Application in the database
    Application.create(application)
        .then((data) => {
            res.send(data);
        })
        .catch((err) => {
            res.status(500).send({
                message:
                    err.message ||
                    "Some error occurred while creating the Application."
            });
        });
};

// Find a single Student with an id
exports.findOne = (req, res) => {
    const id = req.params.id;

    Student.findByPk(id)
        .then((data) => {
            res.send(data);
        })
        .catch((err) => {
            res.status(500).send({
                message: "Error retrieving Student with id=" + id
            });
        });
};

// Update a Student by the id in the request
exports.update = (req, res) => {
    const id = req.params.id;

    Student.update(req.body, {
        where: { id: id }
    })
        .then((num) => {
            if (num == 1) {
                Student.findByPk(id).then((data) => {
                    res.send(data);
                });
            } else {
                res.send({
                    message: `Cannot update Student with id=${id}. Maybe Student was not found or req.body is empty!`
                });
            }
        })
        .catch((err) => {
            res.status(500).send({
                message: "Error updating Student with id=" + id
            });
        });
};

exports.delete = (req, res) => {
    const id = req.params.id;

    Student.destroy({
        where: { id: id }
    })
        .then((num) => {
            if (num == 1) {
                res.send({
                    message: "Student was deleted successfully!"
                });
            } else {
                res.send({
                    message: `Cannot delete Student with id=${id}. Maybe Student was not found!`
                });
            }
        })
        .catch((err) => {
            res.status(500).send({
                message: "Could not delete Student with id=" + id
            });
        });
};

exports.deleteAll = (req, res) => {
    Student.destroy({
        where: {},
        truncate: false
    })
        .then((nums) => {
            res.send({ message: `${nums} Student were deleted successfully!` });
        })
        .catch((err) => {
            res.status(500).send({
                message:
                    err.message ||
                    "Some error occurred while removing all Student."
            });
        });
};

exports.findAllPublished = (req, res) => {
    Student.findAll({ where: { published: true } })
        .then((data) => {
            res.send(data);
        })
        .catch((err) => {
            res.status(500).send({
                message:
                    err.message ||
                    "Some error occurred while retrieving Student."
            });
        });
};

//Get students by application ID
exports.findStudentById = (studentId) => {
    return Student.findByPk(studentId, { include: ["applications"] })
        .then((student) => {
            return student;
        })
        .catch((err) => {
            console.log(">> Error while finding Students: ", err);
        });
};

//Find all applications from Student ID
exports.findApplicationByStuId = (id) => {
    return Application.findByPk(id, { include: ["student"] })
        .then((application) => {
            return application;
        })
        .catch((err) => {
            console.log(">> Error while finding application: ", err);
        });
};
