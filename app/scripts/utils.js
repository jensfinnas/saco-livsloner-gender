/* Variabler och funktioner som defineras för alla */ 
// Definiera filter-grupper
var filters = [
	[
		{
			name: 'Rensa alla val',
			name_short: 'Rensa alla val',
			cssClass: 'Rensa',
			items: []
		},
		{
			name: 'Pedagogik och lärarutbildning',
			name_short: 'Lärare',
			cssClass: 'sort',
			items: [
				{ label: "Låg- och mellanstadielärare", column: 'lagmellanstdlr', baseline: 'GymnSamhv' },
				{ label: "Högstadie- och gymnasielärare", column: 'amneslarare', baseline: 'GymnSamhv' },
				{ label: "Lärare i praktiskt-estetiskt ämne", column: 'lararePrakEstet', baseline: 'GymnSamhv' },
				{ label: "Yrkeslärare", column: 'yrkeslarare', baseline: 'GymnSamhv' }
			]
		},
		{
			name: 'Humaniora och konst',
			name_short: 'Humaniora, konst',
			cssClass: 'sort',
			items: [
				{ label: "Bibliotekarie och informationsvetare", column: 'Biblinfo', baseline: 'GymnSamhv' },
				{ label: "Humanist", column: 'Humanist', baseline: 'GymnSamhv' },
				{ label: "Konstvetare", column: 'Konstutb', baseline: 'GymnSamhv' },
				{ label: "Teolog", column: 'Teolog', baseline: 'GymnSamhv' }
			]
		},
	],
	[
		{
			name: 'Samhällsvetenskap, juridik, handel och administration',
			name_short: 'Samhällsvetenskap m.m.',
			cssClass: 'sort',
			items: [
				{ label: "Ekonom", column: 'Ekonom', baseline: 'GymnSamhv' },
				{ label: "Organisation, administration och förvaltning", column: 'Org_adm', baseline: 'GymnSamhv' },
				{ label: "Jurist", column: 'Jurist', baseline: 'GymnSamhv' },
				{ label: "Journalist", column: 'Journalist', baseline: 'GymnSamhv' },
				{ label: "Psykolog", column: 'Psykolog', baseline: 'GymnSamhv' },
				{ label: "Samhälls- och beteendevetare", column: 'Samhbetvet', baseline: 'GymnSamhv' }
			]
		}
	],
	[
		{
			name: 'Teknik och tillverkning',
			name_short: 'Teknik',
			cssClass: 'sort',
			items: [
				{ label: "Arkitekt", column: 'Arkitekt', baseline: 'GymnNatv' },
				{ label: "Civilingenjör", column: 'Civ_ing', baseline: 'GymnNatv' },
				{ label: "Högskoleingenjör", column: 'Hgsk_ing', baseline: 'GymnNatv' }
			]
		},
		{
			name: 'Lant- och skogsbruk samt djursjukvård',
			name_short: 'Lantbruk, djursjukvård',
			cssClass: 'sort',
			items: [
				{ label: "Agronom", column: 'Agronom', baseline: 'GymnNatv' },
				{ label: "Veterinär", column: 'Veterinar', baseline: 'GymnNatv' }
			]
		},
		{
			name: 'Social omsorg',
			name_short: 'Social omsorg',
			cssClass: 'sort',
			items: [
				{ label: "Social omsorg ", column: 'Soc_omsorg', baseline: 'GymnSamhv' },
				{ label: "Socionom", column: 'Socionom', baseline: 'GymnSamhv' }
			]
		}
	],
	[
		{
			name: 'Hälso- och sjukvård',
			name_short: 'Hälso- och sjukvård',
			cssClass: 'sort',
			items: [
				{ label: "Apotekare", column: 'Apotekare', baseline: 'GymnNatv' },
				{ label: "Arbetsterapeut", column: 'Arbterap', baseline: 'GymnSamhv' },
				{ label: "Biomedicinsk analytiker", column: 'Biomed_analyt', baseline: 'GymnSamhv' },
				{ label: "Läkare", column: 'Lakare', baseline: 'GymnNatv' },
				{ label: "Receptarie", column: 'Receptarie', baseline: 'GymnNatv' },
				{ label: "Fysioterapeut/sjukgymnast", column: 'Sjukgymn', baseline: 'GymnNatv' },
				{ label: "Sjuksköterska", column: 'Sjukskoterska', baseline: 'GymnSamhv' },
				{ label: "Tandhygienist", column: 'Tandhyg', baseline: 'GymnSamhv' },
				{ label: "Tandläkare", column: 'Tandlakare', baseline: 'GymnNatv' }
			]
		}
	],
	[
		{
			name: 'Naturvetenskap, matematik, data',
			name_short: 'Naturvetenskap',
			cssClass: 'sort',
			items: [
				{ label: "Systemvetare", column: 'Systvet', baseline: 'GymnSamhv' },
				{ label: "Geovetare", column: 'Geovet', baseline: 'GymnNatv' },
				{ label: "Kemist", column: 'Kemist', baseline: 'GymnNatv' },
				{ label: "Matematiker och statistiker", column: 'Matstat', baseline: 'GymnNatv' },
				{ label: "Datavetare", column: 'Datavet', baseline: 'GymnNatv' },
				{ label: "Biolog", column: 'Biolog', baseline: 'GymnNatv' }
			]
		},
		{
			name: 'Övriga',
			name_short: 'Sammanräknade',
			cssClass: 'sort',
			items: [
				{ label: "Akademiker, totalt", column: 'Akademiker_totalt', baseline: 'GymnSamhNatv' }
			]
		}
	]


]

// Definiera kategorier och färger
var categories = d3.merge(
	filters.map(
		function(group) { return group.map(
			function(d) { return d.name_short; }
			) 
		})
	);
/*var columns = d3.merge(
	filters.map(
		function(group) { return d3.merge( 
			group.map(function(d) { 
				return d.items.map(function(col) {return col.column}); 
			}) 
		)
		}
	)
);*/
var color = d3.scale.category10()
	.domain(categories);

// Formatera stora tal korrekt
function numFormat(x) {
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, "&nbsp;");
}

function getInternetExplorerVersion()
// Returns the version of Internet Explorer or a -1
// (indicating the use of another browser).
{
  var rv = -1; // Return value assumes failure.
  if (navigator.appName == 'Microsoft Internet Explorer')
  {
    var ua = navigator.userAgent;
    var re  = new RegExp("MSIE ([0-9]{1,}[\.0-9]{0,})");
    if (re.exec(ua) != null)
      rv = parseFloat( RegExp.$1 );
  }
  return rv;
}
function checkVersion() {
  var ver = getInternetExplorerVersion();

  if ( ver > -1 )
  {
    if ( ver <= 8.0 ) {
      $("body").empty();
      $("body").html('<div style="position:absolute; top:0; left:0; width: 940px; height: 100%; z-index: 100; background-color: #0aaeb1; color: #fff; padding: 20px; "><h3><p style="width: 300px;">Du använder Internet Explorer 8</h3>Den här webbläsaren är för gammal för att visa grafiken. Att använda en gammal browser innebär dessutom stora säkerhetsrisker för din dator. Vi rekommenderar att du uppgraderar din webbläsare på <a href="http://windows.microsoft.com/sv-se/internet-explorer/download-ie" style="color: #fff; text-decoration: underline;">Microsofts hemsida</a>.</p></div>');
   	}
  }
}

checkVersion(); 


// Funktion för att hämta url-parametrar
function getParameterByName(name) {
    name = name.replace(/[\[]/, "\\\[").replace(/[\]]/, "\\\]");
    var regex = new RegExp("[\\?&]" + name + "=([^&#]*)"),
        results = regex.exec(location.search);
    return results == null ? "" : decodeURIComponent(results[1].replace(/\+/g, " "));
}

// Rita karusell
function initStorySlider(story, attrCats) {
  // JQuery elements to variables
  var divFilters = $("#filters");

  if (!attrCats) attrCats = ["baseline"];
  var attrs = {
  	"class": "story-text item"
  };

  // Rita story-karusell
  for (var i=0; i<story.length; i++) {
    var d = story[i];
    $('.carousel-indicators').append('<li data-target="#story-carousel" data-slide-to="'+i+'"></li>');

    for (var j=0; j<attrs.length; j++) {
    	var attr = attrCats[j];
    	attrs["data-" + attr] = d[attr];
    }
    attrs["data-columns"] = d.columns.join(",");
    $(".carousel-inner").append($("<div/>").attr(attrs).html(d.text));
    $("#story").append($("<div/>").attr(attrs).html(d.text));
    //    $(".carousel-inner").append('<div class="story-text item" data-baseline="'+d.baseline+'" data-columns="'+d.columns.join(",")+'">'+d.text+'</div>');
  }
  $('#story-carousel .item').first().addClass("active");
  $('#story-carousel .carousel-indicators li').first().addClass("active");


  // Initera karusell
  $('.carousel').carousel({
    interval: false
  }).on('slide.bs.carousel', function (e) {
    // Uppdatera filter vid ny slide och rita om graff
    showSlide($(e.relatedTarget));
  }) 
}

var locale = d3.locale({
  "decimal": ",",
  "thousands": "\xa0",
  "grouping": [3],
  "currency": ["", " kr"],
  "dateTime": "%A %e %B %Y kl. %X",
  "date": "%d.%m.%Y",
  "time": "%H:%M:%S",
  "periods": ["AM", "PM"],
  "days": ["måndag", "tisdag", "onsdag", "torsdag", "fredag", "lördag", "söndag"],
  "shortDays": ["må", "ti", "ons", "to", "fre", "lö", "sö"],
  "months": ["januari", "februari", "mars", "april", "maj", "juni", "juli", "augusti", "september", "oktober", "november", "december"],
  "shortMonths": ["jan", "feb", "mars", "apr", "maj", "jun", "jul", "aug", "sept", "okt", "nov", "dec"]
})
var formatMillionSEK = function(d) {
	return locale.numberFormat(".2s")(d)
		.replace('k', ' tKr')
		.replace('M', ' Mkr'); 
}
var formatPercent = locale.numberFormat(".0%");
var formatPercentSmall = locale.numberFormat(".1%");

function getTooltipText(d, opts) {
	var opts = $.extend({ 'short': false }, opts);
	var men = d.men;
	var women = d.women;
	var textMore = +men > +women ? "manlig" : "kvinnlig";
	var textLess = +men > +women ? "kvinnlig" : "manlig";
	var textSubject;
	switch (d.column) {
	  case ("Org_adm" || "Soc_omsorg"):
	    textMore = textMore == "manlig" ? "man" : "kvinna";
	    textLess = textLess == "manlig" ? "man" : "kvinna";
	    textSubject = textMore + " inom " + d.label.toLowerCase();
	    break;
	  case ("Akademiker_totalt"):
	    textSubject = "genomsnittlig "+ textMore +" akademiker";
	    break;
	  default:
	    textSubject = textMore + " " + d.label.toLowerCase();

	}
	// Return tweet length
	if (opts.short) {
		return d.diffAbsolute == 0 ?
          "Manliga och kvinnliga " + textSubject + " har ungefär samma livslön." :
          "Livslönen för en "+textSubject +" är " + formatMillionSEK(Math.abs(d.diffAbsolute)) + " högre än för en " + textLess + ".";
	}
	else {
		return d.diffAbsolute == 0 ?
          "I den här yrkesgruppen finns det inga större skillnader i livslön." :
          "Livslönen för en "+textSubject +" är i genomsnitt cirka <strong>" + numFormat(Math.abs(d.diffAbsolute)) + " kronor</strong> högre än för en " + textLess + ".";
	}
	
}