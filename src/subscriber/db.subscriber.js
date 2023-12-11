const { getDBConn } = require("../database/mongo.database.js");
const environmet = "http://localhost:4001";

const insertQuestion = async (qid, title) => {
  try {
    const database = await getDBConn();
    const question = database.collection("Questions");
    const mongoRes = await question.insertOne({ qid, title });
    if (mongoRes.acknowledged) {
      console.log(mongoRes, "This is res from mongo");
      return { error: false, data: mongoRes };
    }
    return { error: false, data: null };
  } catch (error) {
    console.log(error);
    return { error: true, data: null };
  }
};

const insertOptions = async (oid, qid, title) => {
  try {
    const database = await getDBConn();
    const options = database.collection("Options");
    const mongoRes = await options.insertOne({ oid, qid, title, votes: 0 });
    if (mongoRes.acknowledged) {
      console.log(mongoRes, "This is res from mongo");
      return { error: false, data: mongoRes };
    }
    return { error: false, data: null };
  } catch (error) {
    console.log(error);
    return { error: true, data: null };
  }
};

const removeQuestion = async (qid) => {
  try {
    const database = await getDBConn();
    const question = database.collection("Questions");
    const mongoRes = await question.deleteOne({ qid });
    if (mongoRes.deletedCount > 0) {
      console.log(mongoRes, "This is res from mongo");
      return { error: false, data: mongoRes };
    }
    return { error: false, data: null };
  } catch (error) {
    console.log(error);
    return { error: true, data: null };
  }
};

const removeOption = async (oid) => {
  try {
    const database = await getDBConn();
    const options = database.collection("Options");
    const mongoRes = await options.deleteOne({ oid });
    if (mongoRes.deletedCount > 0) {
      console.log(mongoRes, "This is res from mongo");
      return { error: false, data: mongoRes };
    }
    return { error: false, data: null };
  } catch (error) {
    console.log(error);
    return { error: true, data: null };
  }
};

const addVotes = async (oid) => {
  try {
    const database = await getDBConn();
    const options = database.collection("Options");
    const option = await options.find({ oid }).toArray();
    if (option.length > 0) {
      const mongoRes = await options.updateOne(
        { oid },
        { $set: { votes: Number(option[0].votes) + 1 } }
      );
      if (mongoRes.modifiedCount > 0) {
        console.log(mongoRes, "This is res from mongo");
        return { error: false, data: mongoRes };
      }
    }
    return { error: false, data: null };
  } catch (error) {
    console.log(error);
    return { error: true, data: null };
  }
};

const getQuestionDetails = async (qid) => {
  try {
    const database = await getDBConn();
    const questions = database.collection("Questions");
    const questionDetails = await questions
      .aggregate([
        {
          $lookup: {
            from: "Options",
            localField: "qid",
            foreignField: "qid",
            as: "optionData",
          },
        },
        {
          $unwind: "$optionData",
        },
        {
          $match: {
            "optionData.qid": qid,
          },
        },
        {
          $project: {
            _id: 0,
            qid: 1,
            Options: "$optionData",
            title: 1,
          },
        },
      ])
      .toArray();

    console.log(questionDetails, "questionDetails");
    if (questionDetails.length > 0) {
      const result = formatResponse(questionDetails);
      if (!result.error && result.data)
        return { error: false, data: result.data };
    }
    return { error: false, data: null };
  } catch (error) {
    console.log(error);
    return { error: true, data: null };
  }
};

const formatResponse = (qData) => {
  try {
    const optionData = qData.map((item) => item.Options);
    const obj = {
      id: qData[0].qid,
      title: qData[0].title,
      options: optionData.map((itm) => {
        return {
          id: itm.oid,
          text: itm.title,
          votes: itm.votes,
          link_to_vote: `${environmet}/options/${itm.oid}/add_vote`,
        };
      }),
    };
    return { error: false, data: obj };
  } catch (error) {
    console.log(error);
    return { error: true, data: null };
  }
};

module.exports = {
  insertQuestion,
  insertOptions,
  removeQuestion,
  removeOption,
  addVotes,
  getQuestionDetails,
};
