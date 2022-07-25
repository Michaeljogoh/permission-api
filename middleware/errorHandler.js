const errorHandler = (fn) =>{
    return async( req , res)  =>{
        try {
           await fn (req , res , next);
        } catch (error) {
           next(error) 
        }
    }

}

module.exports = errorHandler;