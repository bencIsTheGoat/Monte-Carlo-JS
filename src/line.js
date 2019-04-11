class Line {

    constructor(data) {
        this.data = data;

        this.line = d3.line()
        .x(data => data.date)
        .y(data => data.price)

        x.domain(d3.extend(this.data, d => d.date));
        y.domain([0, d3.max(this.data, d => Math.max(d.price))])

        svg.append("path")
        .data([this.data])
        .attr("class", 'line')
        .style('stroke', 'red')
        .attr('d', this.line)

        svg.append('g')
        .attr("transform", "translate(0," + height + ")")
        .call(d3.axisBottom(this.x));

        svg.append("g")
        .call(d3.axisLeft(this.y));
    }

}

module.export = Line;