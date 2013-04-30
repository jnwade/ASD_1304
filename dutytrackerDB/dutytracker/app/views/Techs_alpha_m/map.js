function(doc) {
	if (doc._id.substr(0,1) === "M"){
	emit(doc._id);
	}
};