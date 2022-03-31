const { Schema, model } = require('mongoose');

const HospitalSchema = Schema({
    name: {
        type: String,
        require: true,
    },
    image: {
        type: String,
    },
    user: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        require: true
    },
    status_deleted: {
        type: String,
        default: 'A'
    }
}
//, { collection: 'hospitales' }
);

HospitalSchema.method('toJSON', function() {
    const { __v, ...object } = this.toObject();
    return object;
});

module.exports = model('Hospital', HospitalSchema);