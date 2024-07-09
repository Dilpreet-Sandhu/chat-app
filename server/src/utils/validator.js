import {body, validationResult} from 'express-validator'

export const registerValidator = () => {
    return [
        body(["name","email","password","bio"]).notEmpty(),
    ]
}

export const validation = (req,res,next) => {
    const errors = validationResult(req);

    console.log(errors)

    if (errors.isEmpty()) {
        return next()
    }
}
