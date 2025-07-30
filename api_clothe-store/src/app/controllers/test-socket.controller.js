
import testSocketService from "../services/test-socket.service.js";


class TestSocketController {

    async getAllMessages(req, res){
        
        try{
            const row = await testSocketService.getMessages();
            res.status(200).json(row);

        }catch(err){
            console.error("Error fetching messages:", err.message);
            res.status(500).json({error: "Internal server error"});
        }
    }

    async savingNewService(req, res){
        try{
            const data = req.body 

            if (!data) {
                return res.status(400).json({error: "Message content is required"});
            }

            const row = await testSocketService.postService(data);
            res.status(201).json({message: "Message posted successfully", data: row});

        }
        catch(err){
            console.error("Error posting new messages:", err.message);
            res.status(500).json({error: "Internal server error"});
        }
    }

    async updatingService(req, res){
        try{
            const { id } = req.params;
            const data = req.body;

            if (!data) {
                return res.status(400).json({error: "Service data is required"});
            }

            await testSocketService.updateService(id, data);
            res.status(200).json({message: "Service updated successfully"});

        }catch(err){
            console.error("Error: ", err);
            res.status(500).json({error: err});
        }
    }


    async deletingService(req, res){
        try{
            const { id } = req.params;

            if (!id) {
                return res.status(400).json({error: "Service ID is required"});
            }

            await testSocketService.deleteService(id);
            res.status(200).json({message: "Service deleted successfully"});

        }catch(err){
            console.error("Error: ", err);
            res.status(500).json({error: err});
        }
    }

}

export default new TestSocketController();
