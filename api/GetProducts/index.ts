import { AzureFunction, Context, HttpRequest } from "@azure/functions"
import productService from "../services/productsService";

const httpTrigger: AzureFunction = async function (context: Context, req: HttpRequest): Promise<void> {
    context.log('HTTP trigger function processed a request.');

    let response;

    try{
        let products = await productService.read();
        response = {body: products, status: 200};
    }catch(err){
        response = {body: err.message, status: 500};
    }

    context.res = response;

    /*
    const name = (req.query.name || (req.body && req.body.name));
    const responseMessage = name
        ? "Hello, " + name + ". This HTTP triggered function executed successfully."
        : "This HTTP triggered function executed successfully. Pass a name in the query string or in the request body for a personalized response.";

    context.res = {
        // status: 200, // Defaults to 200 
        body: responseMessage

        };
    */
};

export default httpTrigger;