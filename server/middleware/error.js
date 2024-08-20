const errorHandler = (err, req, res, next) => {
	console.error(err.stack);

	// Check if error has a status code, if not, set it 500(Internal Server Error)
	const statusCode = err.statusCode || 500;

	res.status(statusCode).json({
		success: false,
		error: {
			message: err.message || 'An unexpected error occured!',
			...(process.env.NODE_ENV === 'development' ? { stack: err.stack } : {})
		}
	});
};

export default errorHandler;
