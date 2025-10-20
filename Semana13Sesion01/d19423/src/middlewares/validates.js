const dtoCreateOrder = function(req,res,next){

    if(!req.body)return res.status(400).json({error: 'data required'});
    const {items, customerId} = req.body;

    if(!Array.isArray(items) || items.length === 0) return res.status(400).json({error: 'items required'});
    if(!customerId) return res.status(400).json({error: 'customerId required'});
    next();
}



module.exports={
    dtoCreateOrder
}