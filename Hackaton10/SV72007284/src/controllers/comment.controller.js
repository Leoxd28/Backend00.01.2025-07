const db = require('../models');
const Comment = db.Comment;
const User = db.User;

exports.addComment = async (req, res) => {
  try {
    const { lessonId } = req.params;
    let { body, userId } = req.body;

    body = body.trim();
    if (!body || body.length < 3) {
      return res.status(400).json({ message: 'Comment must have at least 3 characters' });
    }

    const comment = await Comment.create({ body, lessonId, userId });
    res.status(201).json(comment);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.listComments = async (req, res) => {
  try {
    const { lessonId } = req.params;
    const { page = 1, pageSize = 10 } = req.query;

    const { rows, count } = await Comment.findAndCountAll({
      where: { lessonId },
      include: [{ model: User, as: "author", attributes: ['id', 'firstName', 'lastName', "email"] }],
      limit: +pageSize,
      offset: (+page - 1) * +pageSize,
      order: [["createdAt", "DESC"]]
    });

    res.json({ count, rows });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};