// =================
// 1. DATA SANDWICH 
// =================
const data = [
    { name: "Thesis", price: 7.95, size: "large" },
    { name: "Dissertation", price: 8.95, size: "large" },
    { name: "Highlander", price: 6.50, size: "small" },
    { name: "Just Tuna", price: 6.50, size: "small" },
    { name: "So-La", price: 7.95, size: "large" },
    { name: "Special", price: 12.50, size: "small" }
];

// ==========================================
// 2. PENGATURAN CANVAS SVG
// ==========================================
const width = 700;
const height = 400;

const svg = d3.select("#chart")
    .append("svg")
    .attr("width", width)
    .attr("height", height);

// ==========================================
// 3. FUNGSI LOGIKA VISUAL
// ==========================================

// Fungsi untuk menentukan ukuran radius
function getRadius(size) {
    return size.toLowerCase() === "large" ? 35 : 18;
}

// Fungsi untuk menentukan warna berdasarkan harga
function getColor(price) {
    return price < 7.00 ? "#ffa500" : "#4682b4"; // Orange jika < 7, Steelblue jika >= 7
}

// ==========================================
// 4. MENGGAMBAR ELEMEN (CIRCLES & TEXT)
// ==========================================

// --- Gambar Lingkaran ---
svg.selectAll("circle")
    .data(data)
    .enter()
    .append("circle")
    .attr("cx", (d, i) => 80 + i * 95) 
    .attr("cy", 180)                  
    .attr("r", d => getRadius(d.size))
    .attr("fill", d => getColor(d.price))
    .attr("stroke", "#333")
    .attr("stroke-width", 2)
    .style("cursor", "pointer");

// --- Gambar Nama Sandwich ---
svg.selectAll(".sandwich-name")
    .data(data)
    .enter()
    .append("text")
    .attr("class", "sandwich-name")
    .text(d => d.name)
    .attr("x", (d, i) => 80 + i * 95)
    .attr("y", 250)                   
    .attr("font-size", "14px")
    .attr("font-weight", "bold")
    .attr("text-anchor", "middle")    
    .attr("fill", "#333");

// --- Gambar Label Harga ---
svg.selectAll(".price-label")
    .data(data)
    .enter()
    .append("text")
    .attr("class", "price-label")
    .text(d => "$" + d.price.toFixed(2))
    .attr("x", (d, i) => 80 + i * 95)
    .attr("y", 275)                   
    .attr("font-size", "12px")
    .attr("text-anchor", "middle")
    .attr("fill", "gray");

console.log("Visualisasi berhasil dimuat langsung dari array data!");
