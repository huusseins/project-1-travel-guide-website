// Show all cards
function showAllCard() {
    $.getJSON('destinasi.json', function (data) {
        let destinasi = data.destinasi;
        $.each(destinasi, function (i, data) {
            $('#destination-list').append('<div class="col-sm"><div class="card"><img class="img-fluid" src="img/' + data.image + '" alt=""><div class="card-body"><h5 class="card-title"> ' + data.attraction + '</h5><p class="card-subtitle text-muted"> ' + data.location + ', ' + data.country + ' </p><br><p class="card-text"> ' + data.summary + ' </p></div><div class="card-footer"><span class="h6">Total expenses: </span><span class="h6 text-primary">US$  ' + data.price + ' </span><br><br><button type="button" class="btn btn-primary" data-toggle="modal" data-target="#exampleModalCenter">See more </button><a href="#" class="btn btn-outline-danger">Add to wishlist</a></div></div>')
        });
    });
}

showAllCard();

// Filter dropdown
$('.dropdown-item').on('click', function () {
    let negara = $(this).html();

    if (negara == 'All location') {
        showAllCard();
        $('.dropdown-toggle').html('All location');
        return;
    };
    console.log(negara);
    $.getJSON('destinasi.json', function (data) {
        let destinasi = data.destinasi;
        let content = '';

        $.each(destinasi, function (i, data) {
            if (data.country == negara) {
                content += '<div class="col-sm"><div class="card"><img class="img-fluid" src="img/' + data.image + '" alt=""><div class="card-body"><h5 class="card-title"> ' + data.attraction + '</h5><p class="card-subtitle text-muted"> ' + data.location + ', ' + data.country + ' </p><br><p class="card-text"> ' + data.summary + ' </p></div><div class="card-footer"><span class="h6">Total expenses: </span><span class="h6 text-primary">US$  ' + data.price + ' </span><br><br><button type="button" class="btn btn-primary" id="btn-modal" data-toggle="modal" data-target="#exampleModalCenter">See more </button><a href="#" class="btn btn-outline-danger">Add to wishlist</a></div></div></div>';
            }
        });
        $('#destination-list').html(content);
        $('.dropdown-toggle').html(negara);
    });
});

$('#btn-modal').on('click', function () {

    $.getJSON('destinasi.json', function (data) {
        let destinasi = data.destinasi;
        let contentCard = $('.')
        let content = '';

        $.each(destinasi, function (i, data) {
            if ()
                $('.modal-content')
        })

    });
});
// $(document).ready(function () {
// Fungsi pake event on click
$("#searchButton").on("click", function () {
    $("#destination-list").html("");
    var textValue = $("#searchText").val(); // ambil value dari search bar
    var res = textValue.toLowerCase(); // string nya di kecilin semua hurufnya biar engga case sensitive pas nyari
    //console.log(textValue); // ini buat ngecek value kalo di js

    var state = false;
    $.getJSON('destinasi.json', function (data) {
        let destinasi = data.destinasi;
        $.each(destinasi, function (i, data) {
            var country = data.country.toLowerCase();
            var attraction = data.attraction.toLowerCase();
            var location = data.location.toLowerCase();
            var summary = data.summary.toLowerCase();
            var price = data.price;

            if (res == null) {
                state = true;
                $('#destination-list').append('<div class="col-sm"><div class="card"><img class="img-fluid" src="img/' + data.image + '" alt=""><div class="card-body"><h5 class="card-title"> ' + data.attraction + '</h5><p class="card-subtitle text-muted"> ' + data.location + ', ' + data.country + ' </p><br><p class="card-text"> ' + data.summary + ' </p></div><div class="card-footer"><span class="h6">Total expenses: </span><span class="h6 text-primary">US$  ' + data.price + ' </span><br><br><button type="button" class="btn btn-primary" data-toggle="modal" data-target="#exampleModalCenter">See more </button><a href="#" class="btn btn-outline-danger">Add to wishlist</a></div></div>')
            } else {
                //filter
                if (country.includes(res) || attraction.includes(res) || location.includes(res) || summary.includes(res) || price == res) {
                    state = true;
                    $('#destination-list').append('<div class="col-sm"><div class="card"><img class="img-fluid" src="img/' + data.image + '" alt=""><div class="card-body"><h5 class="card-title"> ' + data.attraction + '</h5><p class="card-subtitle text-muted"> ' + data.location + ', ' + data.country + ' </p><br><p class="card-text"> ' + data.summary + ' </p></div><div class="card-footer"><span class="h6">Total expenses: </span><span class="h6 text-primary">US$  ' + data.price + ' </span><br><br><button type="button" class="btn btn-primary" data-toggle="modal" data-target="#exampleModalCenter">See more </button><a href="#" class="btn btn-outline-danger">Add to wishlist</a></div></div>')
                }
            }
        });
        if (state == false) {
            $('#destination-list').append('<h5 class="text-center"> Oops, the destination you were looking for doesn\'t exist.</h5>')
        }
    });
});

// fungsi biar kalo di searchbar teken enter sama aja kayak click tombol search
var input = document.getElementById("searchText");
input.addEventListener("keyup", function (event) {
    if (event.keyCode === 13) {
        event.preventDefault();
        document.getElementById("searchButton").click();
    }
});
// });