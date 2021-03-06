module.exports = {
  find: async (req, res) => {
    try {
      res.ok({
        message: 'Create post success.',
        data: {
          items: await Post.findAll({ include: Tag }),
        }
      });
    } catch (e) {
      sails.log.error(e);
      res.serverError(e);
    }
  },

  create: async (req, res) => {
    try {
      const { TagsArray } = req.body;
      const data = req.body;
      const user = AuthService.getSessionUser(req);
      data.UserId = user ? user.id : null;
      let newPost = await PostService.create(data);
      await TagService.updateOrCreate({
        postId: newPost.id,
        datas: TagsArray
      });
      res.ok({
        message: 'Create post success.',
        data: newPost,
      });
    } catch (e) {
      sails.log.error(e);
      res.serverError(e);
    }
  },

  findOne: async (req, res) => {
    try {
      const { id } = req.params;
      res.ok({
        message: 'find post success.',
        data: await Post.findByIdHasJoin(id),
      });
    } catch (e) {
      sails.log.error(e);
      res.serverError(e);
    }
  },

  update: async (req, res) => {
    try {
      const { id } = req.params;
      res.ok({
        message: 'update post success.',
        data: await PostService.update(id, req.body),
      });
    } catch (e) {
      sails.log.error(e);
      res.serverError(e);
    }
  },

  destroy: async (req, res) => {
    try {
      const { id } = req.params;
      res.ok({
        message: 'delete post success.',
        data: await Post.deleteById(id),
      });
    } catch (e) {
      sails.log.error(e);
      res.serverError(e);
    }
  }
}
