import GoalTable from "../models/goalmodel.js";

export const createGoal = async (req, res) => {
    const {sfsuid, name, type, priority, status, tags, duration} = req.body;
    
    const newData = new GoalTable({
        sfsuid: sfsuid, 
        name: name,
        type: type,
        priority: priority,
        status: status,
        tags: tags,
        duration: duration,
    });

    try{
        newData.save();
        res.status(202).json({goal: newData});
    }

    catch(err){
        res.status(409).json({message: "data create failed"});
    }
}

export const getGoals = async (req, res) => {
     try{
        const goals = await GoalTable.find({'sfsuid' : req.params.sfsuid});
        res.json(goals);
    }

    catch(err){
        res.status(409).json({message: "data not found"});
    }
}

export const updateGoal = async (req, res) => {
  try {
    const goal = req.params.goal;
    goal.update();
    res.status(202).json({goal: goal})
  } catch (err) {
    console.log(err);
    res.status(409).json({message: "data update failed"});
  }
}