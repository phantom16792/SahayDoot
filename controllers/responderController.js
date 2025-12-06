const Responder = require("./../models/responderModel");

// 1) To get all responders ->
exports.getAllResponders = async (req,res) => {
    
    try {

        const responders = await Responder.find();
        res.status(200).json({
            status : "success",
             result : responders.length,
            data : {
                responders : responders,
            }
        });

    } catch (error) {
        res.status(404).json({
            status : "Fail",
            message : "responders not found",
        });
    }  
}

// 2) to get one responder ->
exports.getResponder = async (req,res) => {
    try {

        const responder = await Responder.findById(req.params.id);
        res.status(200).json({
            status : "success",
            data : {
                responders : responder,
            }
        });

    } catch (error) {
        res.status(404).json({
            status : "Fail",
            message : "Not Found",
        });
    }
}

    // 3) to create new responder ->
    exports.createResponder = async (req,res) => {
        try {
            
            const newResponder = await Responder.create(req.body);
            res.status(200).json({
                status : "success",
                message : "new user created",
                data : {
                    responders : newResponder,
                }
            });

        } catch (error) {
            res.status(400).json({
            status : "Fail",
            message : error,
           });
        }
        
        
    }
    
