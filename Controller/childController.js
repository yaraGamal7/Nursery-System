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

exports.getChild = (request, response, next) => {
	ChildSchema.findById(request.params.id)
		.then((data) => {
			if (data == null) {
				next(new Error("Child Not Found"));
			} else {
				response.status(200).json({ data });
			}
		})
		.catch((error) => {
			next(error);
		});
};


exports.addChild = async (req, res, next) => {
    try {
        const { fullName, age, level, address } = req.body;
        const image = req.file; // Access uploaded image

        // Assuming your Child schema has an image field
        const newChild = new ChildSchema({
            fullName,
            age,
            level,
            address,
            image: image ? image.filename : null // Save the filename in the database
        });

        const savedChild = await newChild.save();
        res.status(201).json({ child: savedChild });
    } catch (error) {
        next(error);
    }
};

exports.updateChild = async (req, res, next) => {
    try {
        const { id, fullName, age, level, address } = req.body;
        const image = req.file; 


        const updateFields = {
            fullName,
            age,
            level,
            address
        };

       
        if (image) {
            updateFields.image = image.filename; 
        }

       
        const updatedChild = await Child.findByIdAndUpdate(id, { $set: updateFields }, { new: true });

        
        if (!updatedChild) {
            throw new Error("Child Not Found");
        }

        res.status(200).json({ message: "Updated", child: updatedChild });
    } catch (error) {
        next(error);
    }
};

exports.deleteChild = (request, response, next) => {
	ChildSchema.deleteOne({ _id: request.body.id })
		.then((data) => {
			if (data.deletedCount != 1) {
				next(new Error("Child Not Found"));
			} else {
				response.status(200).json({ data: "Deleted" });
			}
		})
		.catch((error) => {
			next(error);
		});
};
