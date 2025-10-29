const metrics={}

function recordRequest(route){
if(!metrics[route]){
    metrics[route]={request:0,errors:0}
}
metrics[route].request++
}

function recordError(route){
if(!metrics[route]){
   metrics[route]={request:0,errors:0} 
}
metrics[route].errors++
}

function getMetrics(){
    return metrics
}

module.exports={recordRequest,recordError,getMetrics}
