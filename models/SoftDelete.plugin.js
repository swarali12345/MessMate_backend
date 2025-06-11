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

  schema.statics.restoreById = async function (id) {
    const doc = this.findById(id);

    if (!doc) {
      throw new Error(
        `${this.modelName} could not find the document by ID: ${id}`
      );
    }

    await doc.restore();
    return doc;
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
