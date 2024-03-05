const yup = require("yup");

async function bookInputMiddleware(ctx, next) {
  try {
    const postData = ctx.request.body;
    const schema = yup.object().shape({
      id: yup.number().positive().integer().required(),
      name: yup.string().required(),
      author: yup.string().required(),
    });

    await schema.validate(postData);

    next();
  } catch (err) {
    ctx.status(400);
    ctx.body = {
      success: false,
      errorName: err.name,
    };
  }
}
module.exports = bookInputMiddleware;
