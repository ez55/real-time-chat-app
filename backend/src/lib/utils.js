import jwt from "jsonwebtoken"

export const generateToken = (userId, res) => {

    const token = jwt.sign({userId}, process.env.JWT_SHUSH, {
        expiresIn:"7d"
    })

    res.cookie("jwt", token, {
        maxAge: 7*24*60*60*1000,
        httpOnly: true, //XSS
        sameSite: "strict", // CSRF
        secure: process.env.NODE_ENV !== "development",
    });

    return token
}