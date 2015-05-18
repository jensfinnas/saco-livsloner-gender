Handlebars.registerHelper('slugify', function (component, options) {
    var slug = component
    	.replace(/[^\w\s]+/gi, '')
    	.replace(/ +/gi, '-')
    	.replace('åä','a')
    	.replace('ö','o');
    return slug.toLowerCase();
  });
Handlebars.registerHelper("inc", function(value, options) {
    return parseInt(value) + 1;
});
Handlebars.registerHelper('getSentence', function (column, options) {
    var d = app.data.filter(function(d) {
    	return d.column == column;
    })[0];
    return getTooltipText(d);
});
Handlebars.registerHelper('getTweet', function (column, options) {
    var d = app.data.filter(function(d) {
    	return d.column == column;
    })[0];
    var tweetText = getTooltipText(d, { 'short': true });
    return encodeURIComponent(tweetText);
});

Handlebars.registerHelper('formatPercentDiff', function (value, options) {
    var prefix = "";
    var percent = value >= 0.01 ? formatPercent(value) : formatPercentSmall(value);
    if (value > 0) prefix = "+";
    if (Math.abs(value) < 0.001) prefix = "+-";
    return prefix + percent;
});

// Style bars based on unemployment difference () 
Handlebars.registerHelper('getBarStyle', function (value, options) {
    var maxValue = 0.2;
    var percent = Math.abs(Math.round(value / maxValue * 100));
    var style = "width: " + percent + "%;";
    if (value < 0) {
    	style += "margin-left:-" + percent +"%;";
        style += "background-color:rgb(178, 50, 50);";
    }
    return style;
});

Handlebars.registerPartial("chartItem", $("#mobile-chart-item-template").html());


 
