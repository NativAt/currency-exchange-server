module.exports = {
  InternalError: () => {
    const response = {
      statusCode: 500,
      error: 'Internal Server Error',
      message: 'Internal server error has occurred',
    };
    return response;
  },
};
