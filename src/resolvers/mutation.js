const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { AuthenticationError } = require('apollo-server-express');
require('dotenv').config();
const gravatar = require('../util/gravatar');

module.exports = {
  newNote: async (parent, { content }, { models }) => {
    return await models.Note.create({
      content: content,
      author: 'Adam Scott',
    });
  },
  deleteNote: async (parent, { id }, { models }) => {
    try {
      await models.Note.findOneAndRemove({ _id: id });
      return true;
    } catch {
      return false;
    }
  },
  updateNote: async (parent, { id, content }, { models }) => {
    return await models.Note.findOneAndUpdate(
      {
        _id: id,
      },
      {
        $set: {
          content,
        },
      },
      {
        new: true,
      }
    );
  },
  singUp: async (parent, { username, email, password }, { models }) => {
    email = email.trim().toLowerCase();
    const hashed = await bcrypt.hash(password, 10);
    const avatar = gravatar(email);

    try {
      const user = await models.User.create({
        username,
        email,
        avatar,
        password: hashed,
      });
      return jwt.sign({ id: user._id }, process.env.JWT_SECRET);
    } catch (err) {
      console.log(err);
      throw new Error('Error creating account!');
    }
  },
  singIn: async (parent, { username, email, password }, { models }) => {
    if (email) {
      email = email.trim().toLowerCase();
    }

    const user = await models.User.findOne({
      $or: [{ email }, { username }],
    });

    if (!user) {
      throw new AuthenticationError('Error singing in');
    }

    const valid = await bcrypt.compare(password, user.password);

    if (!valid) {
      throw new AuthenticationError('Error signing in');
    }

    return jwt.sign({ id: user._id }, process.env.JWT_SECRET);
  },
};
