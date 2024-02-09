class Input{
  static checkId(data){
    const dt=parseInt(data);
    if(dt>=0){
    return true;
    }else{
        console.log("wrong id");
        return false;
    }
  };
  static checkTitle(data){
    if(typeof data==="string"){
    return true;
    }else{
        console.log("wrong title");
        return false;
    }
  }
  static checkDescription(data){
    if(typeof(data)==="string"){
    return true;
    }else{
        console.log("wrong description");
        return false;
    }
  }
  static checkStatus(data){
    data=Boolean(data);
    if(typeof data==="boolean"){

    return true;
    }else{
        console.log("wrong completed");
        return false
    }
  }
}
module.exports=Input;