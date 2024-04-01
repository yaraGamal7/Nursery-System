
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
});

schema.plugin(AutoIncrement, { inc_field: 'id' });

module.exports = mongoose.model("childrens", schema);



