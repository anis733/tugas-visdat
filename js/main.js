/**
 * Load data from CSV file asynchronously and render chart
 */
d3.csv('data/all_drinking.csv').then(data => {

    // Fungsi untuk mengambil status filter dari tombol di index.html
    const getFilters = () => {
        let s = {
            "sex": "female",
            "type": "any",
        };
        $('.btn-group .active input').each(function (d, i) {
            $(this).hasClass('sex') ? s.sex = $(this).attr('value') : s.type = $(this).attr('value')
        });
        return s;
    };

    // Fungsi untuk memfilter data berdasarkan pilihan user
    const filterData = (data) => {
        let filters = getFilters();
        return data.filter((d) => d.sex == filters.sex && d.type == filters.type);
    }

    // TO DO: Transformasi data (Konversi kolom 'percent' menjadi tipe Number)
    data.forEach(d => {
        d.percent = +d.percent; 
    });

    // Inisialisasi instance Barchart
    let barchart = new Barchart({ parentElement: '#vis'}, filterData(data));
    
    // Tampilkan chart pertama kali
    barchart.updateVis();

    // Event listener: Update data saat tombol filter diklik
    $('input').change(() => {
        barchart.data = filterData(data);
        barchart.updateVis();
    });
})
.catch(error => console.error("Error loading CSV:", error));
