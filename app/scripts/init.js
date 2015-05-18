$(app).on('app:dataReady', function (ev) {

	if (!app.mobile) {
		$("body").addClass("desktop");
		initDesktop();
		initGraph($("#viz"));
		// Visa slide 1
	  	$firstSlide = $("#story .item").first().next();
	  	showSlide($firstSlide);
	  	$firstSlide.addClass("selected");	
	}
	else {
		$("body").addClass("mobile");
		app.renderMobile();
	}

	app.initShareButtons();

	// Send height to parent
	var isIframe = self !== top;
	if (isIframe) {
		var pymChild = new pym.Child();
	    pymChild.sendHeight();
	}
});

app.init = function() {
	app.data = [];
	app.groupMeans = {};

	/*  Öppna tsv-fil med data och bearbeta den till array */ 
	d3.tsv(app.dataPath, function(error, resp) {
	    var groupValues = {};
	    var data;
	    // Gå igenom alla yrkeskategorier i filters-objektet
	    for (var i = 0; i < filters.length; i++ ) {
	      var filterCol = filters[i];
	      for (var j = 0; j < filterCol.length; j++) {
	        var group = filterCol[j];
	        for (var k = 0; k < group.items.length; k++) {
	          // Lägg till ett element i data-arrayen för varje yrke
	          var row = group.items[k];
	          var column = row.column;
	          row.men = resp[0][column];
	          row.women = resp[1][column];
	          row.group = group.name_short;
	          row.diffPercent =  row.men / row.women - 1;
	          row.diffAbsolute = Math.round((row.men - row.women)/100000)*100000;
	          if (column == "Akademiker_totalt") row.diffAbsolute = 2600000; // Hack för att avrundning ska stämma med rapport
	          if (row.men > 0 && row.column !== "Arkitekt") app.data.push(row); // Hoppa över yrken som saknar data
	          // Spara värden för att räkna gruppmedeltal
	          if (typeof groupValues[row.group] == "undefined") groupValues[row.group] = [];
	          groupValues[row.group].push(row.diffPercent);
	        }
	      }
	    }

	    // Räkna gruppmede
	    app.groupMeans = {};
	    for (var i in groupValues) {
	      app.groupMeans[i] = d3.mean(groupValues[i]);
	    }
	    for (var i = 0; i < app.data.length; i++) {
	      app.data[i].groupMean = app.groupMeans[app.data[i].group]; 
	    }

	    // Sortera data enligt a) gruppmedel, b) löneskillnad
	  var sortFunction = function(a,b) {
	    return d3.descending(a.groupMean, b.groupMean) || d3.descending(a.diffPercent, b.diffPercent);  
	  }
	  app.data = app.data.sort(sortFunction);
	  $(app).trigger('app:dataReady');
	})
}