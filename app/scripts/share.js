app.initShareButtons = function() {
	var urlToShare = app.urlToShare;
	var message = "Manliga akademiker tjänar 2,6 miljoner mer än kvinnliga under en livstid";
	var fbTitle = encodeURIComponent("Saco: " + message);
	var fbSummary = encodeURIComponent("Kolla hur stora löneskillnaderna är mellan män och kvinnor är i just din utbildningsgrupp.");
	var facebookUrl = "http://www.facebook.com/sharer.php?s=100&p[title]="+fbTitle+"&p[summary]="+fbSummary+"&p[url]="+urlToShare+"&p[images][0]=http://jplusplus.se/u/saco_livslon/images/logo.png";
	var twitterUrl =  'http://twitter.com/share?url='+urlToShare+'&text='+encodeURIComponent(message + " @akademikerna #livslön ");
	$('.facebook-link').click(function() {
	  window.open(facebookUrl, 'facebook-share-dialog', 'width=626,height=436');
	  return false;
	});
	$('.twitter-link').attr({
		"data-url": urlToShare
	});
	if (!app.mobile) {
		$('.twitter-link').attr({
	      "href": twitterUrl
	    }).click(function(event) {
	      var width  = 575,
	          height = 400,
	          left   = ($(window).width()  - width)  / 2,
	          top    = ($(window).height() - height) / 2,
	          url    = urlToShare,
	          opts   = 'status=1' +
	                   ',width='  + width  +
	                   ',height=' + height +
	                   ',top='    + top    +
	                   ',left='   + left;

	      window.open(twitterUrl, 'twitter', opts);

	      return false;
	    });	
	}
	
}