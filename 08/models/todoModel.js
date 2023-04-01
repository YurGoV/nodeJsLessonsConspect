const { model, Schema } = require('mongoose');

const todoSchema = new Schema(
  {
    title: { type: String, required: true, maxLength: 30 },
    decs: { type: String, maxLength: 400 },
    due: {
      type: Date,
      required: true,
    },
    owner: {
      // eslint-disable-next-line no-undef
      type: Types.ObjectId,
      ref: 'User',
      requires: [true, 'must have an owner'],
    },
  },
  {
    timestamps: true,
  }
);

const Todo = model('Todo', todoSchema);

module.exports = { Todo };
