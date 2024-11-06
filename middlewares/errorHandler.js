const notFound = (req, res, next) => {
    const error =new Eroor ('Not Found : $ {req.originalUrl}');
    res.status(404);
    next(error);
};


//error handler
 const errorHandler = (err, req, res,next) => {
    const statuscode = res.statusCode ==200 ? 500 : res.statusCode;
    res.statuscode(statuscode);
    res.json ({
        message: err?.message,
        stack: err?.stack,
    });

 };

 module.exports= {errorHandler, notFound};
