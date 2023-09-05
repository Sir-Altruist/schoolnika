import Joi from "joi";

const blogSchema: Joi.ObjectSchema = Joi.object({
    title: Joi.string().min(3).label("Title is required and not less than three characters").required(),
    story: Joi.string().label("Story is required").required(),
    tag: Joi.string().label("Tag is required").required()
});

export default blogSchema;