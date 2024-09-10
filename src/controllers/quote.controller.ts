import { Request, Response } from "express";
import QuoteDataModel from "../models/quote.model";
import ServiceModel from "../models/service.model";


// return the quote data according to user selected service
export const getQuote = async (req: Request, res: Response) => {
    const { selectedServices, questions_answer } = req.body;

    // we can also give the quote data according to the user answer. 
    console.log(questions_answer);

    try {
        // Fetch the quotes from the database based on selected services
        const data = await QuoteDataModel.find({
            service_id: { $in: selectedServices }
        }).exec();

        // Transform the fetched data to match the into good format
        const responseData = data.map(service => ({
            service_id: service.service_id,
            service_name: service.service_name,
            description: service.description,
            quote: service.quote
        }));

        // Return the success response with fetched data
        return res.status(200).json({
            message: 'Fetched quotes successfully',
            status: true,
            success: true,
            data: responseData
        });

    } catch (err: any) {
        return res.status(500).json({
            message: err.message,
            status: false,
            success: false,
        })
    }
}

// For ** admin purpose **
// add the quote data for new service for 
export const addQuote = async (req: Request, res: Response) => {
    const serviceId = req.params.serviceId;

    const {
        service_name,
        description,
        quote
    } = req.body;

    try {
        // Check if the service exists
        const serviceData = await ServiceModel.findById(serviceId);

        if (!serviceData) {
            return res.status(404).json({
                message: 'Service not found!',
                success: false
            });
        }

        // Create a new quote entry
        const newQuote = new QuoteDataModel({
            service_id: serviceId,
            service_name,
            description,
            quote
        });

        // Save the quote data to the database
        await newQuote.save();

        return res.status(201).json({
            message: 'Quote added successfully.',
            status: true,
            success: true,
            data: newQuote
        });

    } catch (err: any) {
        console.error(err.message);
        return res.status(500).json({
            message: 'Server error. Could not add quote.',
            status: false,
            success: false
        });
    }
};
