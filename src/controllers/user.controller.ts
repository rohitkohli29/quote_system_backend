import { Request, Response } from "express";
import UserModel from "../models/userSchema.model";

// add the user in database
export const addUser = async (req: Request, res: Response) => {
    const {
        firstname,
        lastname,
        address,
        company_name,
        city,
        zip_code,
        primary_phone,
        alternate_phone,
        email,
    } = req.body;
    try {

        const isUserPersent = await UserModel.findOne({
            email: email
        });

        if(isUserPersent){
            return res.status(401).json({
                message: 'User already exist',
                success: false,
                status: true
            })
        }

        // add the user if not persent

        const newUser = await new UserModel({
            firstname: firstname,
            lastname: lastname,
            address: address,
            company_name: company_name,
            city: city,
            zip_code: zip_code,
            primary_phone: primary_phone,
            alternate_phone: alternate_phone,
            email: email
        })

        await newUser.save();

        return res.status(200).json({
            message: 'User added Successfully',
            status: true,
            success: true
        })

    } catch (err: any) {
        res.status(501).json({
            message: 'Internal server error',
            status: false,
            success: false
        })
    }
}