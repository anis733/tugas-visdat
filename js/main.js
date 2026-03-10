const sandwiches = [
 { name: "Thesis", price: 7.95, size: "large" },
 { name: "Dissertation", price: 8.95, size: "large" },
 { name: "Highlander", price: 6.50, size: "small" },
 { name: "Just Tuna", price: 6.50, size: "small" },
 { name: "So-La", price: 7.95, size: "large" },
 { name: "Special", price: 12.50, size: "small" }
];

// Membuat SVG
const svg = d3.select("#chart")
    .append("svg")
    .attr("width", 500)
    .attr("height", 500);

// Fungsi radius
function getRadius(size){
    return size === "large" ? 40 : 20;
}

// Fungsi warna
function getColor(price){
    return price < 7.00 ? "orange" : "steelblue";
}

// Membuat lingkaran untuk setiap data
svg.selectAll("circle")
    .data(sandwiches)
    .enter()
    .append("circle")

    .attr("cx", (d,i) => 80 + i * 70)
    .attr("cy", 250)

    .attr("r", d => getRadius(d.size))

    .attr("fill", d => getColor(d.price))

    .attr("stroke", "black")
    .attr("stroke-width", 2);
