import { Router } from "express";
import connectionPool from "../utils/db.mjs";

const questionRoute = Router();

questionRoute.post("/", async (req, res) => {
  const newQuestion = {
    ...req.body,
  };

  try {
    await connectionPool.query(
      `insert into questions (title, description, category)
      values ($1, $2, $3)`,
      [newQuestion.title, newQuestion.description, newQuestion.category]
    );

    return res.status(201).json({ message: "Question created successfully." });
  } catch (err) {
    console.error(err);
    if (err.code === "23505") {
      return res.status(400).json({ message: "Invalid request data." });
    } else if (err.code === "23502") {
      return res.status(500).json({ message: "Unable to create question." });
    }
  }
});


questionRoute.get("/", async (req, res) => {
  let results;
  try {
    results = await connectionPool.query(`select * from questions`);
    return res.status(200).json({ data: results.rows });
  } catch {
    return res.status(500).json({ message: "Unable to fetch questions." });
  }
});


questionRoute.get("/:questionId", async (req, res) => {
  try {
    const questionId = req.params.questionId;
    const results = await connectionPool.query(
      `select * from questions where id = $1`,
      [questionId]
    );
    return res.status(200).json({ data: results.rows });
  } catch {
    if (err.code === "23502") {
      return res.status(404).json({ message: "Question not found." });
    } else if (err.code === "23503") {
      return res.status(500).json({ message: "Unable to fetch questions." });
    }
  }
});


questionRoute.put("/:questionId", async (req, res) => {
  try {
    const questionId = req.params.questionId;
    const updatedQuestion = { ...req.body };

    await connectionPool.query(
      `    
      update questions 
      set title = $1,
          description = $2,
          category = $3
      where id = $4
     `,
      [
        updatedQuestion.title,
        updatedQuestion.description,
        updatedQuestion.category,
        questionId,
      ]
    );
    return res.status(200).json({ message: "Question updated successfully." });
  } catch (err) {
    if (err.code === "23505") {
      return res.status(400).json({ message: "Invalid request data." });
    } else if (err.code === "23502") {
      return res.status(404).json({ message: "Question not found." });
    } else if (err.code === "23503") {
      return res.status(500).json({ message: "Unable to update question." });
    }
  }
});


questionRoute.delete("/:questionId", async (req, res) => {
  try {
    const questionId = req.params.questionId;
    await connectionPool.query(`delete from questions where id = $1`, [
      questionId,
    ]);
    return res
      .status(200)
      .json({ message: "Question post has been deleted successfully." });
  } catch {
    if (err.code === "23502") {
      return res.status(404).json({ message: "Question not found." });
    } else if (err.code === "23503") {
      return res.status(500).json({ message: "Unable to delete question." });
    }
  }
});


// ----- API เส้นที่ 6 : Search questions by title or category
// http://localhost:4000/questions?title=science&category=math
questionRoute.get("/search", async (req, res) => {
  try {
    let { title, category } = req.query;

    let results = await connectionPool.query(
      `SELECT * FROM questions WHERE title ILIKE $1 OR category = $2`,
      [`%${title}`, category]
    );

    return res.status(200).json({ data: results.rows });
  } catch (err) {
    if (err.code === "23505") {
      return res.status(400).json({ message: "Invalid search parameters." });
    } else if (err.code === "23503") {
      return res.status(500).json({ message: "Unable to fetch a question." });
    }
  }
});


questionRoute.post("/:questionId/answers", async (req, res) => {
  const newAnswer = { ...req.body };

  try {
    await connectionPool.query(
      `insert into answers (content) 
          values ($1)`,
      [newAnswer.content]
    );
    return res.status(201).json({ message: "Answer created successfully." });
  } catch (err) {
    if (err.code === "23505") {
      return res.status(400).json({ message: "Invalid request data." });
    } else if (err.code === "23502") {
      return res.status(404).json({ message: "Question not found." });
    } else if (err.code === "23503") {
      return res.status(500).json({ message: "Unable to create answer." });
    }
  }
});


questionRoute.get("/:questionId/answers", async (req, res) => {
  let results;
  const questionId = req.params.questionId;

  try {
    results = await connectionPool.query(
      `select * from answers where question_id = $1`,
      [questionId]
    );
    return res.status(200).json({ data: results.rows });
  } catch (err) {
    if (err.code === "23502") {
      return res.status(404).json({ message: "Question not found." });
    } else if (err.code === "23503") {
      return res.status(500).json({ message: "Unable to fetch answers." });
    }
  }
});


questionRoute.delete("/:questionId/answers", async (req, res) => {
  const questionId = req.params.questionId;

  try {
    await connectionPool.query(`delete from questions where id = $1`, [
      questionId,
    ]);
    return res.status(200).json({
      message: "All answers for the question have been deleted successfully.",
    });
  } catch (err) {
    if (err.code === "23502") {
      return res.status(404).json({ message: "Question not found." });
    } else if (err.code === "23503") {
      return res.status(500).json({ message: "Unable to delete answer." });
    }
  }
});


// ----- API เส้นที่ 10 : Vote on a question
questionRoute.post("/:questionId/vote", async (req, res) => {
  //console.log("Vote endpoint hit!");
  const { vote } = req.body;
  const { questionId } = req.params;

  try {
    await connectionPool.query(
      "UPDATE question_votes SET vote = vote + $1 WHERE question_id = $2",
      [vote, questionId]
    );

    return res.status(200).json({ message: "Voted successfully." });
  } catch (err) {
    console.error("Vote query error:", err);

    if (err.code === "23505") {
      return res.status(400).json({ message: "Invalid vote value." });
    } else if (err.code === "23502") {
      return res.status(404).json({ message: "Question not found." });
    } else if (err.code === "23503") {
      return res.status(500).json({ message: "Unable to vote question." });
    }
  }
});

export default questionRoute;
