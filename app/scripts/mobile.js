app.renderMobile = function() {
	var groupedData = d3.nest()
		.key(function(d) { return d.group; })
		.entries(app.data);

	/*	Chart: Compile html with handlebars and render
	*/
	var templateElement = d3.select("#mobile-chart-template");
	var source   = templateElement.html();
	var template = Handlebars.compile(source);
	d3.select("#mobile-chart").html(template({
		groupedData: groupedData,
		sortedData: app.data.sort(function(a,b) { 
			return d3.descending(a.diffPercent, b.diffPercent) 
		})
	}));


	/*	Story: Compile html with handlebars and render
	*/
	var templateElement = d3.select("#mobile-story-template");
	var source   = templateElement.html();
	var template = Handlebars.compile(source);
	d3.select("#mobile-story").html(template(storyMobile));

	/*	Add active class to clicked elements to allow styling
	*/
	$('.toggle-collapse').click(function() {
		$(this).toggleClass('active');
	})

	/*	Toggle between group view and value sorted view
	*/
	$('.sort').click(function() {
		$('.sort').toggleClass('active');
		$('.sort-by-group, .sort-by-value').toggleClass('hidden');
	})

	/*	Init count-ups
	*/
	$('.count-up').each(function() {
		var $el = $(this);
		var id = $el.attr('id');
		var value = +$el.attr('data-value');
		var suffix = $el.attr('data-suffix');
		var counter = new countUp(id, 0, value, 0, 3, {
			useEasing : true, 
			useGrouping : true, 
			separator : ' ', 
			decimal : ',', 
			prefix : '', 
			suffix : suffix 
		});
		$.data(this, "counter", counter);

		new Waypoint({
		  element: document.getElementById(id),
		  handler: function(direction) {
		    $(this.element).data().counter.start();
		  },
		  offset: '85%'
		})
	})
};