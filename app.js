const express = require('express');
const app = express();
const port = 3000;
const Validator=require('./validator.js');
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.listen(port, (err) => {
    if (err) {
        return console.log('Something bad happened', err);
    }
    console.log(`Server is listening on ${port}`);
});

const fs=require('fs');
const taskData=require('./task.json');
// const Validator=require('./helper/validator');
app.delete('/tasks/:taskId',(req,res)=>{
    console.log('Received DELETE request for taskId:');
    if(Validator.checkId(re.params.id)){
    const id = parseInt(req.params.taskId);
    let taskModified=taskData;
    const index=taskModified.tasks.findIndex((task)=>task.id===id);
    if(index==-1){
        res.status(400).send("task not found");
    }else{
    taskModified.tasks.splice(index,1);
    fs.writeFile('./task.json',JSON.stringify(taskModified),err=>{
        if(err){
            res.send(500).send("Error in writing file");
            console.log("error occured in writing file");
        }else{
            res.status(200).send("file written successfully");
        }
    })
   }}else{
    res.status(200).send("input invalid");
   }
})
app.get('/',(req,res)=>{
    return res.status(200).send("hello World");
})
app.get('/tasks',(req,res)=>{
return res.status(200).send(taskData);
})

app.get('/tasks/:taskId',(req,res)=>{
    if(Validator.checkId(req.params.taskId)){
    const data=taskData.tasks;
    const taskId=parseInt(req.params.taskId);
    console.log(taskId);
    let filteredTask = data.find((task)=>task.id===taskId);
    if(filteredTask){
        return res.status(200).json(filteredTask);
    }else{
    return res.status(400).json({message:"task not found"});
    }}else{
        return res.status(400).send("Invalid Input");
    }
    
});
app.post('/tasks',(req,res)=>{
    let userProvidedDetails=req.body;
    if(!userProvidedDetails.hasOwnProperty("completed")){
        userProvidedDetails["completed"]=false;
        if(!req.body.hasOwnProperty("id")||!req.body.hasOwnProperty("title")||!req.body.hasOwnProperty("description")||!req.body.hasOwnProperty("completed")){
            return res.status(400).send("Parameters missing in body");
            }
    }
    if(Validator.checkTitle(userProvidedDetails.title)&&Validator.checkDescription(userProvidedDetails.description)&&Validator.checkStatus(userProvidedDetails.completed)){

    
    let ind=taskData.tasks.length-1;
    const newIndex=taskData.tasks[ind].id+1;
    console.log("Last task's ID:", ind);
    console.log("Calculated new index:", newIndex);
    let taskModified=taskData;
    taskModified.tasks.push({
        id:newIndex,
        title:userProvidedDetails.title,
        description:userProvidedDetails.description,
        completed:userProvidedDetails.completed
    });
    fs.writeFile('./task.json',JSON.stringify(taskModified),err=>{
        if(err){
            return res.status(500).send("error occured in writing file");

        }else{
            return res.status(200).send("file written successfully");
        }
    })
}else{
    return res.status(400).send("Wrong  input");
}

});
app.put("/tasks/:taskId",(req,res)=>{
     if(Validator.checkId(req.params.taskId)){
                               if(!req.body.hasOwnProperty("id")||!req.body.hasOwnProperty("title")||!req.body.hasOwnProperty("description")||!req.body.hasOwnProperty("completed")){
                               return res.status(400).send("Parameters missing in body");
                               }
                                                if(Validator.checkTitle(req.body.title)&&Validator.checkDescription(req.body.description)&&Validator.checkStatus(req.body.completed)){

     
                                                                const id =parseInt(req.params.taskId);

                                                                const ind=taskData.tasks.findIndex((task)=>id===task.id);
                                                                if(ind<0){
                                                                return res.status(400).send("record not found");
                                                                }else{
                                                                let newdata=taskData;
                                                                newdata.tasks[ind].title=req.body.title;
                                                                newdata.tasks[ind].description=req.body.description;
                                                                newdata.tasks[ind].completed=req.body.completed;
                                                                fs.writeFile('./task.json',JSON.stringify(newdata),err=>{
                                                                if(err){
                                                                return res.status(500).send("Unable to write file");
                                                                }else{
                                                                return res.status(500).send("File written successfully")
                                                                }
                                                                })

                                                                }
                                                 }else{
                                                    return res.status(400).send("wrong input");
                                                 }    
                                            }else{
                                                return res.status(400).send("wrong input id");

    }

})


module.exports = app