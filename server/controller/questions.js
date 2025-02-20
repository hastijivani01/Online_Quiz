const Question = require('../model/questions');

exports.create = async (req, res) => {
  try {
    const newQuestion = await Question.create(req.body);
    res.status(200).json ({ 
      status: 'Success', 
      message: 'Question added', 
      data: newQuestion 
    });
  } catch (error) {
    res.status(400).json({ 
      status: 'Fail', 
      message: error.message 
    });
  }
};

exports.show = async (req, res) => {
  try {
    const questions = await Question.find();
    res.status(200).json({ 
      status: 'Success', 
      message: 'Questions fetched', 
      data: questions 
    });
  } catch (error) {
    res.status(400).json({ 
      status: 'Fail', 
      message: error.message });
  }
};

exports.delete = async (req, res) => {
  try {
    await Question.findByIdAndDelete(req.params.id);
    res.status(200).json({ status: 'Success', 
      message: 'Question deleted' 
    });
  } catch (error) {
    res.status(400).json({ 
      status: 'Fail',
       message: error.message });
  }
};

exports.update = async (req, res) => {
  try {
    const update = await Question.findByIdAndUpdate(req.params.id, req.body, { new: true });

    if (!update) throw new Error("Question not found!");
    
    res.status(200).json({
      status: 'Success',
      message: "Question updated successfully",
      data: update
    });
  } catch (error) {
    res.status(400).json({
      status: 'Fail',
      message: error.message,
    });
  }
};
