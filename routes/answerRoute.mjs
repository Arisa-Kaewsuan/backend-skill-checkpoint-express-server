import {Router} from 'express';
import connectionPool from "../utils/db.mjs";

const answerRoute = Router();

// answer vote not pass
answerRoute.post("/:answerId/vote", async (req, res) => {
    const answerId = req.params.answerId;
    const newAnswer = { 
        ...req.body,
        created_at: new Date(),
        updated_at: new Date(),
        published_at: new Date(),
    };

    try{
        await connectionPool.query(
            `insert into answers (question_id, content, created_at, updated_at, published_at) 
            values ($1, $2, $3, $4, $5)`,
            [
                answerId,
                newAnswer.content,
                newAnswer.created_at,
                newAnswer.updated_at,
                newAnswer.published_at
            ]
        );
        return res.status(200).json({"message": "Vote on the question has been recorded successfully."});
    }
    catch{
        if(res.status === 400){
            return res.status(400).json({message: "Invalid vote value."});
        }
        else if(res.status === 404){
            return res.status(404).json({message: "Answer not found."});
        }
        else if(res.status === 500){
            return res.status(500).json({message: "Unable to vote answer."});
        }
    }
});

export default answerRoute;