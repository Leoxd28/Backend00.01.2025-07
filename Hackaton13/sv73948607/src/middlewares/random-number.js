function cryptoRandom(){
    return Math.random().toString(36).substring(2,12)
}

module.exports=cryptoRandom