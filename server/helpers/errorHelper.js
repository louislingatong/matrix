module.exports = {
  responseError: (res, status, error) => {
    switch (status) {
      case 422:
        const name = Object.keys(error)[0];
        const message = error[name];
        res.status(422).json({name, message});
        break;
      default:
        break;
    }
    res.status(422).send(error);
  }
}