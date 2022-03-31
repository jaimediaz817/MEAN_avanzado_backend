const { Schema, model } = require('mongoose');

const DoctorSchema = Schema({
    name: {
        type: String,
        require: true,
    },
    image: {
        type: String,
    },
    email: {
        type: String,
        require: false,
        unique: true,
    },    
    user: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        require: true
    },
    hospital: {
        type: Schema.Types.ObjectId,
        ref: 'Hospital',
        require: true
    },    
    status_deleted: {
        type: String,
        default: 'A'
    }
}
//, { collection: 'hospitales' }
);

DoctorSchema.method('toJSON', function() {
    const { __v, ...object } = this.toObject();
    return object;
});

module.exports = model('Doctor', DoctorSchema);