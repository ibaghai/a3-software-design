function chart() {
    var width = 960,
        height = 600,
        nodeSize = "r",
        nodeSizeMultiplier = 10,
        linkSize = "weight",
        linkSizeMultiplier = 1.5,
        linkStrengthMultiplier = 100,
        nodeAttraction = -4;

    function my(selection) {

        selection.each(function(data) {

            var simulation = d3.forceSimulation()
                .force("link", d3.forceLink().id(function (d) {
                    return d.id;
                }))
                .force("linkStrength",  function(d) { return d[linkSize] * linkStrengthMultiplier; } )
                .force("charge", d3.forceManyBody().strength(nodeAttraction * 100))
                .force("center", d3.forceCenter(width / 2, height / 2));

            var svg = d3.select(this).selectAll("svg").data([data]);

            var gEnter = svg.enter().append("svg").attr("width", width)
                .attr("height", height);

            svg.attr("width", width)
                .attr("height", height);

            data.links.forEach(function (d) {
                d.source = d.source_id;
                d.target = d.target_id;
            });

            console.log(linkSizeMultiplier);
            console.log(nodeAttraction);

            var link = gEnter.append("g")
                .style("stroke", "#aaa")
                .selectAll("line")
                .data(data.links)
                .enter().append("line")
                    .attr("stroke-width", function(d) { return d[linkSize] * linkSizeMultiplier; });

            var node = gEnter.append("g")
                .attr("class", "nodes")
                .selectAll("circle")
                .data(data.nodes)
                .enter().append("circle")
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
                simulation
                    .force("charge", d3.forceManyBody().strength(nodeAttraction * 100))
                    .force("linkStrength",  function(d) { return d[linkSize] * linkStrengthMultiplier; } );

                link
                    .attr("x1", function(d) { return d.source.x; })
                    .attr("y1", function(d) { return d.source.y; })
                    .attr("x2", function(d) { return d.target.x; })
                    .attr("y2", function(d) { return d.target.y; })
                    .attr("stroke-width", function(d) { return d[linkSize] * linkSizeMultiplier; });

                node
                    .attr("r", function(d) { return d[nodeSize] * nodeSizeMultiplier; })
                    .style("fill", "#d9d9d9")
                    .style("stroke", "#969696")
                    .style("stroke-width", "1px")
                    .attr("transform", function(d) { return "translate(" + d.x + "," + d.y + ")"; });

                label
                    .attr("x", function(d) { return d.x - (((nodeSizeMultiplier / 2) - (nodeSizeMultiplier / 10)) * d[nodeSize]); })
                    .attr("y", function(d) { return d.y + (((nodeSizeMultiplier / 2) - (nodeSizeMultiplier / 10)) * d[nodeSize]); })
                    .style("font-size", function(d) { return d[nodeSize] * nodeSizeMultiplier + "px"; })
                    .style("fill", "#4393c3");
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

    my.nodeSize = function(value) {
        if (!arguments.length) return nodeSize;
        nodeSize = value;
        return my;
    };

    my.nodeSizeMultiplier = function(value) {
        if (!arguments.length) return nodeSizeMultiplier;
        nodeSizeMultiplier = value;
        return my;
    };

    my.linkSize = function(value) {
        if (!arguments.length) return linkSize;
        linkSize = value;
        return my;
    };

    my.linkSizeMultiplier = function(value) {
        if (!arguments.length) return linkSizeMultiplier;
        linkSizeMultiplier = value;
        return my;
    };

    my.linkStrengthMultiplier = function(value) {
        if (!arguments.length) return linkStrengthMultiplier;
        linkStrengthMultiplier = value;
        return my;
    };

    my.nodeAttraction = function(value) {
        if (!arguments.length) return nodeAttraction;
        nodeAttraction = value;
        return my;
    };

    return my;
}