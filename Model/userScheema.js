import mongoose from "mongoose"

const userSchema = new mongoose.Schema({
    name :{
        type : String,
        required : true
    },

    age : {
        type : Number,
    },

    email : {
        type : String,
        required : true,
        unique : true

    },

    password : {
        type : String,
        required : true
    },

    usage : {
        tokenUsed : {
            type : Number,
            default : 0

        }
    },

    tokenLimit : {
        type : Number,
        default : process.env.TOKEN_LIMIT

    },

    resetAt : {
        type : Date,
        default : ()=> new Date(Date.now() + 5 * 60 * 60 * 1000) 

    },

    totalTokenUsed : {
        type : Number,
        default : 0

    }


},{timestamps : true})

export const User = mongoose.model("User",userSchema)