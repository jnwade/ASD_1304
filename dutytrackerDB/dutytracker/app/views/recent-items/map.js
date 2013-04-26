function(doc) {
  if (doc._id.substr(0,2) === "Jon") {
    emit(doc._id);
  }
};