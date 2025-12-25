const ping = (req, res) => {
  res.status(200).json({
    msg: "Successful",
    data: "Pong",
  });
};

export { ping };
