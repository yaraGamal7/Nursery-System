// const mongoose = require("mongoose");
// const AutoIncrement = require("mongoose-sequence")(mongoose);

// const addressSchema = new mongoose.Schema({
//     city: { type: String, required: true },
//     street: { type: String, required: true },
//     building: { type: Number, required: true },
//     _id: false,
// });

// const schema = new mongoose.Schema({
//     _id: Number,
//     fullName: { type: String, required: true },
//     age: { type: Number, required: true },
//     level: { type: String, required: true },
//     address: { type: addressSchema, required: true },
//     image: { type: String }, 
// });

// schema.plugin(AutoIncrement, { id: "child_id", inc_field: "_id" });

// mongoose.model("childrens", schema);

// module.exports = mongoose.model("childrens");

const mongoose = require("mongoose");
const AutoIncrement = require("mongoose-sequence")(mongoose);

const schema = new mongoose.Schema({
    fullName: {
        type: String,
        required: true,
    },
    age: {
        type: Number,
        required: true
    },
    level: {
        type: String,
        enum: ['PreKG', 'KG1', 'KG2'],
        required: true
    },
    address: {
        city: {
            type: String,
            required: true
        },
        street: {
            type: String,
            required: true
        },
        building: {
            type: String,
            required: true
        }
    },
    image: {
        type: String,
        default:'uploads/profile.jpg'
    }
}, { timestamps: true });

schema.plugin(AutoIncrement, { inc_field: 'id' });

module.exports = mongoose.model("childrens", schema);
