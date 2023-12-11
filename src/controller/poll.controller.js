const {
  insertQuestion,
  insertOptions,
  removeQuestion,
  removeOption,
  addVotes,
  getQuestionDetails,
} = require("../subscriber/db.subscriber");

/** Cotroller to create question*/
const createQuestion = async (req, res, next) => {
  try {
    const { qid, title } = req.body;

    const result = await insertQuestion(qid, title);
    if (result.error) {
      res.status(200).json({
        data: null,
        error: true,
        errorMessage: "Technical Error",
      });
      return next();
    }

    if (!result.data) {
      res.status(200).json({
        data: null,
        error: true,
        errorMessage: "Unable to create question",
      });
      return next();
    }
    res.status(200).json({
      data: { ID: result.data.insertedId },
      error: false,
      errorMessage: "Question created successfully",
    });
    return next();
  } catch (error) {
    console.log(error);
    res.status(200).json({
      data: null,
      error: true,
      errorMessage: "Technical Error",
    });
    return next();
  }
};

/** Cotroller to add option*/
const addOption = async (req, res, next) => {
  try {
    const { oid, qid, title } = req.body;

    const result = await insertOptions(oid, qid, title);
    if (result.error) {
      res.status(200).json({
        data: null,
        error: true,
        errorMessage: "Technical error",
      });
    }

    if (!result.data) {
      res.status(200).json({
        data: null,
        error: true,
        errorMessage: "Unable to create option",
      });
    }
    res.status(200).json({
      data: { ID: result.data.insertedId },
      error: false,
      errorMessage: "Option created successfully",
    });
  } catch (error) {
    console.log(error);
    res.status(200).json({
      data: null,
      error: true,
      errorMessage: "Technical error",
    });
  }
};

/** Cotroller to delete question*/
const deleteQuestion = async (req, res, next) => {
  try {
    const questionId = req.params.id;

    const result = await removeQuestion(questionId);
    if (result.error) {
      res.status(200).json({
        data: null,
        error: true,
        errorMessage: "Technical Error",
      });
      return next();
    }

    if (!result.data) {
      res.status(200).json({
        data: null,
        error: true,
        errorMessage: "Unable to delete question",
      });
      return next();
    }

    res.status(200).json({
      data: { ID: questionId },
      error: false,
      errorMessage: "Question deleted successfully",
    });
    return next();
  } catch (error) {
    console.log(error);
    res.status(200).json({
      data: null,
      error: true,
      errorMessage: "Unable to delete question",
    });
    return next();
  }
};

/** Cotroller to delete option*/
const deleteOption = async (req, res, next) => {
  try {
    const optionId = req.params.id;

    const result = await removeOption(optionId);
    if (result.error) {
      res.status(200).json({
        data: null,
        error: true,
        errorMessage: "Technical Error",
      });
      return next();
    }

    if (!result.data) {
      res.status(200).json({
        data: null,
        error: true,
        errorMessage: "Unable to delete option",
      });
      return next();
    }

    res.status(200).json({
      data: { ID: optionId },
      error: false,
      errorMessage: "Option deleted successfully",
    });
    return next();
  } catch (error) {
    console.log(error);
    res.status(200).json({
      data: null,
      error: true,
      errorMessage: "Unable to delete question",
    });
    return next();
  }
};

/** Cotroller to add votes*/
const incrementVotes = async (req, res, next) => {
  try {
    const optionId = req.params.id;

    const result = await addVotes(optionId);
    if (result.error) {
      res.status(200).json({
        data: null,
        error: true,
        errorMessage: "Technical error",
      });
    }

    if (!result.data) {
      res.status(200).json({
        data: null,
        error: true,
        errorMessage: "Unable to add Votes",
      });
    }
    res.status(200).json({
      data: { ID: optionId },
      error: false,
      errorMessage: "Votes added successfully",
    });
  } catch (error) {
    console.log(error);
    res.status(200).json({
      data: null,
      error: true,
      errorMessage: "Technical error",
    });
  }
};

/** Cotroller to get question*/
const viewQuestion = async (req, res, next) => {
  try {
    const questionId = req.params.id;

    const result = await getQuestionDetails(questionId);
    if (result.error) {
      res.status(200).json({
        data: null,
        error: true,
        errorMessage: "Technical error",
      });
    }

    if (!result.data) {
      res.status(200).json({
        data: null,
        error: true,
        errorMessage: "Unable to add Votes",
      });
    }
    res.status(200).json({
      data: result.data,
      error: false,
      errorMessage: "data fetch successfully",
    });
  } catch (error) {
    console.log(error);
    res.status(200).json({
      data: null,
      error: true,
      errorMessage: "Technical error",
    });
  }
};

module.exports = {
  createQuestion,
  addOption,
  deleteQuestion,
  deleteOption,
  incrementVotes,
  viewQuestion,
};
