import Joi, { ValidationError } from 'joi'
import jwt from 'jsonwebtoken'
export const usersSignUpSchema = Joi.object({
    name: Joi.string()
        .min(3)
        .max(30)
        .required(),

    password: Joi.string()
        .min(8)
        .pattern(new RegExp('^[a-zA-Z0-9]{3,30}$'))
        .required(),

    confirm_password: Joi.ref('password'),

    access_token: Joi.string(),

    email: Joi.string()
        .email({ minDomainSegments: 2, tlds: { allow: ['com', 'net', 'dev'] } })
        .required(),
})

export const usersLoginSchema = Joi.object({
    email: Joi.string()
        .email({ minDomainSegments: 2, tlds: { allow: ['com', 'net', 'dev'] } })
        .required(),

    password: Joi.string()
        .min(8)
        .pattern(new RegExp('^[a-zA-Z0-9]{3,30}$'))
        .required(),

    confirm_password: Joi.ref('password'),

    access_token: Joi.string(),

})

// export const loginSchema = Joi.object().keys({
//     email: Joi.string().trim().lowercase().required(),
//     password: Joi.string()
//       .regex(/^[a-zA-Z0-9]{3,30}$/)
//       .required(),
//   });

export const generateToken = function(_id: string){
    if(process.env.JWT_SECRET ){
        return jwt.sign({_id}, process.env.JWT_SECRET, {
          expiresIn: '30d',
      })
    }
      
  }

export const options = {
    abortEarly: false,
    errors: {
        wrap: {
            label: "",
        },
    },
};