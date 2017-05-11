function chart() {
    var width = 960,
        height = 600;

    function my(selection) {

        selection.each(function(data) {
            var simulation = d3.forceSimulation()
                .force("link", d3.forceLink().id(function (d) {
                    return d.id;
                }))
                .force("charge", d3.forceManyBody().strength(-400))
                .force("y", d3.forceY(height / 2))
                .force("x", d3.forceX(width / 2));

            var svg = d3.select(this).selectAll("svg").data([data]);

            var gEnter = svg.enter().append("svg").attr("width", width)
                .attr("height", height);

            svg.attr("width", width)
                .attr("height", height);

            data.links.forEach(function (d) {
                d.source = d.source_id;
                d.target = d.target_id;
            });

            var link = gEnter.append("g")
                .style("stroke", "#aaa")
                .selectAll("line")
                .data(data.links)
                .enter().append("line");

            var node = gEnter.append("g")
                .attr("class", "nodes")
                .selectAll("circle")
                .data(data.nodes)
                .enter().append("circle")
                .attr("r", 6)
                .call(d3.drag()
                    .on("start", dragstarted)
                    .on("drag", dragged)
                    .on("end", dragended));

            var label = gEnter.append("g")
                .attr("class", "labels")
                .selectAll("text")
                .data(data.nodes)
                .enter().append("text")
                .attr("class", "label")
                .text(function (d) {
                    return d.name;
                });


            simulation
                .nodes(data.nodes)
                .on("tick", ticked);

            simulation
                .force("link")
                .links(data.links);

            function ticked() {
                link
                    .attr("x1", function(d) { return d.source.x - 20; })
                    .attr("y1", function(d) { return d.source.y - 20; })
                    .attr("x2", function(d) { return d.target.x - 20; })
                    .attr("y2", function(d) { return d.target.y - 20; });

                node
                    .attr("r", 20)
                    .style("fill", "#d9d9d9")
                    .style("stroke", "#969696")
                    .style("stroke-width", "1px")
                    .attr("cx", function (d) { return d.x - 20; })
                    .attr("cy", function(d) { return d.y - 20; });

                label
                    .attr("x", function(d) { return d.x - 28; })
                    .attr("y", function(d) { return d.y - 12; })
                    .style("font-size", "20px").style("fill", "#4393c3");
            }

            function dragstarted(d) {
                if (!d3.event.active) simulation.alphaTarget(0.3).restart();
                d.fx = d.x;
                d.fy = d.y;
            }

            function dragged(d) {
                d.fx = d3.event.x;
                d.fy = d3.event.y;
            }

            function dragended(d) {
                if (!d3.event.active) simulation.alphaTarget(0);
                d.fx = null;
                d.fy = null;
            }
        });
    }

    my.width = function(value) {
        if (!arguments.length) return width;
        width = value;
        return my;
    };

    my.height = function(value) {
        if (!arguments.length) return height;
        height = value;
        return my;
    };

    return my;
}