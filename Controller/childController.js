const mongoose = require("mongoose");
require("./../Model/childModel");

const ChildSchema = mongoose.model("childrens");

exports.getAllChilds = (request, response, next) => {
	ChildSchema.find({})
		.then((data) => {
			response.status(200).json({ data });
		})
		.catch((error) => {
			next(error);
		});
};


exports.getChild = (req, res, next) => {
    const childId = parseInt(req.params.id); 
    ChildSchema.findOne({ id: childId })
        .then((child) => {
            if (!child) {
                return res.status(404).json({ message: "Child not found" });
            }
            res.status(200).json({ child });
        })
        .catch((error) => next(error));
};


exports.addChild = async (req, res, next) => {
    try {
        const { fullName, age, level, address } = req.body;
        const image = req.file; 
     
        const newChild = new ChildSchema({
            fullName,
            age,
            level,
            address,
            image: image ? image.filename : null 
        });

        const savedChild = await newChild.save();
        res.status(201).json({ child: savedChild });
    } catch (error) {
        next(error);
    }
};

exports.updateChild = (req, res, next) => {
    const childId = req.params.id;

    const image = req.file ? req.file.path.replace(/\\/g, '/') : null;

    const updateData = {
        ...req.body,
        ...(image && { image })
    };

    ChildSchema.findOneAndUpdate({ id: childId }, updateData, { new: true })
        .then((updatedChild) => {
            if (!updatedChild) {
                return res.status(404).json({ message: "Child not found" });
            }
            res.status(200).json({ message: "Child updated successfully", data: updatedChild });
        })
        .catch((error) => next(error));
};


exports.deleteChild = (req, res, next) => {
    const childId = req.params.id;

    ChildSchema.findOneAndDelete({ id: childId })
        .then((deletedChild) => {
            if (!deletedChild) {
                return res.status(404).json({ message: "Child not found" });
            }
            res.status(200).json({ message: "Child deleted successfully", data: deletedChild });
        })
        .catch((error) => next(error));
};
