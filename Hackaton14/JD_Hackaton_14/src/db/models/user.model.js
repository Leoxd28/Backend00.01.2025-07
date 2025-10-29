const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema(
  {
    email: { type: String, required: true, unique: true, index: true, lowercase: true, trim: true },
    passwordHash: { type: String, required: true },
    role: { type: String, enum: ['admin', 'user'], default: 'user', index: true },
    failedLoginCount: { type: Number, default: 0 },
    lockUntil: { type: Date, default: null }
  },
  { timestamps: true }
);

UserSchema.methods.toSafeJSON = function () {
  return { id: this._id.toString(), email: this.email, role: this.role };
};

module.exports = mongoose.model('User', UserSchema);