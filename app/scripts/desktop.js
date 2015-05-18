var x,y,xAxis,yAxis;

function initGraph($container) {
  // Ange mariginaler, storlek hämtas från #viz css
  margin = {top: 0, right: 30, bottom: 40, left: 180};
    width = $container.width() - margin.left - margin.right;
    height = $container.height() - margin.top - margin.bottom - 65;

  
  // Definiera x- och y-axel
  x = d3.scale.linear()
      .range([0, width]);
  
  y = d3.scale.ordinal()
      .rangeRoundBands([0, height], .1, 1);

  xAxis = d3.svg.axis()
      .scale(x)
      .ticks(6)
      .tickSize(height)
      .tickFormat(formatPercent)
      .orient("bottom")

  yAxis = d3.svg.axis()
      .scale(y)
      .tickSize(0)
      .orient("left");

    y.domain(app.data.map(function(d) { return d.label; }));
    x.domain([
      d3.min(app.data, function(d)  { return d.diffPercent; }), 
      d3.max(app.data, function(d) { return d.diffPercent; })
      ]);

    // Skapa svg
    svg = d3.select("svg")
      .attr("width", width + margin.left + margin.right)
        .attr("height", height + margin.top + margin.bottom)
      .append("g")
          .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

    // Rita ut x- och y-axlarna
    xTicks = svg.append("g")
      .attr("class", "x axis")
      .call(xAxis)
     .append("text")
      .attr("class", "title")
      .attr("x", width/2)
      .attr("y", 25)
      .attr("dy", ".71em")
      .style("text-anchor", "middle")
      .text("Så mycket mera tjänar män under en livstid (efter skatt)")
      .attr("transform", "translate(0," + height + ")");

    var yTitle = svg
      .append("text")
      .attr("class", "title")
      .attr("x", 0)
      .attr("y", 0)
      .attr("dy", ".71em")
      .style("text-anchor", "middle")
      .text("Utbildningsinriktning")
      .attr("transform", "translate("+(-margin.left+2)+"," + height/2 + ") rotate(-90)")
//      .attr("transform", "translate(0," + height + ")");
 
    /*svg.append("g")
        .attr("class", "y axis")
        .call(yAxis);*/

/*  xTicks.selectAll("g").filter(function(d) { return d == 0 ; })
      .classed("hidden", true);*/

    // Rita ut staplarna
    var barGroup = svg.selectAll(".bar")
      .data(app.data)
    .enter().append("g")
      .attr("class", function(d) { return d.column + " bar" } )
      .attr("transform", function(d) {
        var _x = Math.min(x(0), x(d.diffPercent));
        var _y = y(d.label);
        return "translate("+[_x, _y].join(',')+")"
      });
//      .attr("x", function(d) { return d.diffPercent >= 0 ? x(0) : x(d.diffPercent); })
//      .attr("y", function(d) { return y(d.label); })
     
     barGroup.append("rect") 
      .attr("width", function(d) { return Math.abs( x(d.diffPercent) - x(0)); })
      .attr("height", y.rangeBand())
      .attr("fill", function(d) { return color(d.group) });

     barGroup.append("text")
      .attr("class", "label")
      .attr("x", -5)
      .attr("y", y.rangeBand() / 2)
        .attr("dy", ".35em")
        .style("text-anchor", "end")
        .text(function(d) { 
          switch (d.column) {
            case ("Org_adm"): 
              return "Org., adm. och förvaltning"; 
              break;
            case ("Akademiker_totalt"): 
              return "Akademiker totalt *)";
              break;
            default: 
              return d.label;
              break;
          }
        });

     barGroup.append("text")
      .attr("class", "value")
      .attr("x", function(d) { return Math.abs( x(d.diffPercent) - x(0)) + 5; })
      .attr("y", y.rangeBand() / 2)
        .attr("dy", ".35em")
        .style("text-anchor", "start")
        .text(function(d) { return d.diffPercent >= 0.01 ? formatPercent(d.diffPercent) : formatPercentSmall(d.diffPercent); })

    barGroup.on('mouseover', function(bar){
      // If selected => hide temporarily
      d3.selectAll(".bar:not(.fade)")
        .classed("fade", function(d) { return bar !== d })
        .classed("inSelection",true);
      // Show hovered bar
      d3.select(this).classed("fade", false).classed("hover", true);
      svg.classed("show-all", false);
    }).on('mouseout', function() {
      var $this = d3.select(this);
      // Hide hovered bar unless in selection
      $this.classed("fade", function() { return !$this.classed("inSelection"); });
      d3.selectAll(".bar.inSelection").classed("fade", false).classed("inSelection", false);
      // Hack to not show numbers when first slide selected
      svg.classed("show-all", d3.select(".story-text").classed("selected")); 
    }).each(function(d,i){
        var title = d.column == "Org_adm" || "Soc_omsorg"
        var tooltipText = getTooltipText(d);

           $(this).tooltip({
            'container': 'body',
            'placement': 'right',
            'html': true,
            'title' : tooltipText

           });
      });
}
function updateGraph() {
  var sortFunction = function(a,b) {
    return d3.descending(a.groupMean, b.groupMean) || d3.descending(a.diffPercent, b.diffPercent);  
  } 

    // Copy-on-write since tweens are evaluated after a delay.
    var y0 = y.domain(app.data.sort(sortFunction)
        .map(function(d) { return d.label; }))
        .copy();

    var transition = svg.transition().duration(750),
        delay = function(d, i) { return i * 20; };

    transition.selectAll(".bar")
        .delay(delay)
        .attr("y", function(d) { return y0(d.label); });

    transition.select(".y.axis")
        .call(yAxis)
      .selectAll("g")
        .delay(delay);
  }

function showSlide(obj) {
    // Update graph after slide
    var filter = obj.attr('data-columns') == "" ? d3.set() : d3.set(obj.attr('data-columns').split(","));
    svg.classed("show-all", d3.select(".story-text").classed("selected")); 
    d3.selectAll(".bar").classed("fade", function(d) { return (!filter.has(d.column) && filter.size() !== 0); });
}
function initAudio() {
  $("#track").html('<source src="audio/gender.ogg" type="audio/ogg"><source src="audio/gender.mp3" type="audio/mpeg">');
}
function initDesktop() {
      initStorySlider(story, ["sort"]);
      initAudio();

      // Click events for story
      $storyItems = $("#story .item");
      $storyItems.click(function() {
        $el = $(this);
        selectAndUpdate($el);
      }).addClass("shadow");
      //
      function selectAndUpdate($storyItem) {
        $storyItems.removeClass("selected");
        $storyItem.addClass("selected");
        showSlide($storyItem);
      } 


      // Init audio
      var track = document.getElementById("track");
      var current_slide = 1;

      // Audio track: Events
      var findSlide = function(currentTime) {
        loop:
          for (var i = story.length - 1; i >= 0; i--) {
            if (story[i].time <= currentTime) {
              if (i == current_slide) break loop;
              current_slide = i;
              selectAndUpdate($($storyItems[i]));
              break loop;
            }
          }
      }

      // Playing
      track.addEventListener("timeupdate", function() {
        if (track.paused) return;
        findSlide(this.currentTime);              
      }, false);

      // Move on timeline
      track.addEventListener("seeked", function() {
        findSlide(this.currentTime);
      }, false);

      // Press play
      track.addEventListener("play", function() {
        $("#play").hide();
      }, false);
      track.addEventListener("ended", function() {
      }, false);
}

