export function softDeletePlugin(schema) {
  if (!schema.path("deletedAt")) {
    schema.add({ deletedAt: { type: Date, default: null } });
  }
  schema.methods.softDelete = function () {
    this.deletedAt = new Date();
    return this.save();
  };

  schema.methods.restore = function () {
    this.deletedAt = null;
    return this.save();
  };

  schema.statics.softDeleteById = function (id) {
    return this.findByIdAndUpdate(id, { deletedAt: new Date() });
  };

  function excludeDeletedMiddleware(next) {
    if (!this.getOptions().includeDeleted) {
      this.where({ deletedAt: null });
    }
    next();
  }

  schema.pre("find", excludeDeletedMiddleware);
  schema.pre("findOne", excludeDeletedMiddleware);
  schema.pre("count", excludeDeletedMiddleware);
  schema.pre("countDocuments", excludeDeletedMiddleware);
}
