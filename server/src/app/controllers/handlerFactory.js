exports.updateOne = (Model) => async (req) => {
  const doc = await Model.findByIdAndUpdate(req.params._id, req.body, {
    new: true,
    runValidators: true,
  });

  return doc;
};
