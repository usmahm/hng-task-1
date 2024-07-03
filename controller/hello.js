const SEND_ERROR_RESPONSE = (errorCode, errorMsg, res) => {
  console.log(errorCode, errorMsg);
  res.status(errorCode).json({
    message: errorMsg,
  });

  res.end();
};

const getHello = (req, res) => {
  try {
    const visitor_name = req.query.visitor_name;

    const user_ip = req.ip;

    if (visitor_name) {
      fetch(
        `http://api.weatherapi.com/v1/current.json?key=${process.env.WEATHER_API_KEY}&q=${user_ip}`
      )
        .then((response) => response.json())
        .then((response) => {
          if (!response.error) {
            const city = response.location.name;
            const temperature = response.current.temp_c;

            res.status(200).json({
              client_ip: user_ip,
              location: city,
              greeting: `Hello, ${visitor_name}!, the temperature is ${temperature} degrees Celcius in ${city}`,
            });
          } else {
            if (response.error.code === 1006) {
              SEND_ERROR_RESPONSE(
                400,
                `Unable to fetch temperature and location for ${user_ip}!`,
                res
              );
            } else {
              SEND_ERROR_RESPONSE(500, "An unknown error occured", res);
            }
          }
        })
        .catch((err) => {
          throw err;
        });
    } else {
      SEND_ERROR_RESPONSE(400, "Please send a valid visitor's name", res);
    }
  } catch (err) {
    SEND_ERROR_RESPONSE(500, "Internal server error", res);
  }
};

module.exports = {
  getHello,
};
