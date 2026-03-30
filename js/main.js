d3.csv("Data/sandwiches.csv").then(function(data) {

    console.log("Data dari CSV:", data);

    // =========================
    // KONVERSI TIPE DATA
    // =========================
    data.forEach(d => {
        d.price = +d.price;
    });

    // =========================
    // MEMBUAT SVG
    // =========================
    const svg = d3.select("#chart")
        .append("svg")
        .attr("width", 500)
        .attr("height", 500);

    // =========================
    // FUNGSI RADIUS
    // =========================
    function getRadius(size){
        return size === "large" ? 40 : 20;
    }

    // =========================
    // FUNGSI WARNA
    // =========================
    function getColor(price){
        return price < 7.00 ? "orange" : "steelblue";
    }

    // =========================
    // DRAW CIRCLE
    // =========================
    svg.selectAll("circle")
        .data(data)
        .enter()
        .append("circle")

        .attr("cx", (d,i) => 80 + i * 70)
        .attr("cy", 250)

        .attr("r", d => getRadius(d.size))

        .attr("fill", d => getColor(d.price))

        .attr("stroke", "black")
        .attr("stroke-width", 2);

});
