function(doc) {
	if (doc._id.substr(0,1) === "J"){
		emit(doc._id, {
			"techName": doc.techName,
			"date": doc.date,
			"notes": doc.notes
		});
  	}
};