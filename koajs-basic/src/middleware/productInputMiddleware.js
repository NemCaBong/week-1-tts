const yup = require("yup");

async function productInputMiddleware(ctx, next) {
  try {
    const postData = ctx.request.body;
    const schema = yup.object().shape({
      name: yup.string().required(),
      price: yup.number().positive().required(),
      description: yup.string().required(),
      product: yup.string().required(),
      color: yup.string().required(),
      image: yup.string().required(),
    });

    await schema.validate(postData);

    next();
  } catch (err) {
    ctx.status = 400;
    ctx.body = {
      success: false,
      errorName: err.name,
    };
  }
}
module.exports = productInputMiddleware;
