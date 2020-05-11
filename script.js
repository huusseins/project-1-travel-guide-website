// Show all cards
function showAllCard() {
    $.getJSON('destinasi.json', function (data) {
        let destinasi = data.destinasi;
        $.each(destinasi, function (i, data) {
            $('#destination-list').append('<div class="col-sm"><div class="card"><img class="img-fluid" src="img/' + data.image + '" alt=""><div class="card-body"><h5 class="card-title"> ' + data.attraction + '</h5><p class="card-subtitle text-muted"> ' + data.location + ', ' + data.country + ' </p><br><p class="card-text"> ' + data.summary + ' </p></div><div class="card-footer"><span class="h6">Total expenses: </span><span class="h6 text-primary">US$  ' + data.price + ' </span><br><br><button type="button" class="btn btn-primary" id="btn-modal" data-toggle="modal" data-target="#exampleModalCenter">See more </button><a href="#" class="btn btn-outline-danger">Add to wishlist</a></div></div>')
        });
    });
}

showAllCard();

// Filter dropdown
$('.dropdown-item').on('click', function () {
    let negara = $(this).html();

    if (negara == 'All location') {

        $("#destination-list").html("");
        showAllCard();
        $('.dropdown-toggle').html('All location');
        return;
    };
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


// $('#btn-modal').on('click', function () {
//     let contentCard = $(this).html();
//     console.log(contentCard);
// $.getJSON('destinasi.json', function (data) {
//     let destinasi = data.destinasi;

//     $.each(destinasi, function (i, data) {
//         if (data.attraction == contentCard) {
//             $('.modal-content').append('<div class="modal-header"><h5 class="modal-title" id="exampleModalCenterTitle"> ' + data.attraction + ' </h5><button type="button" class="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button></div><div class="modal-body"><img class="img-fluid" src="img/ ' + data.image + ' " alt=" ' + data.attraction + ' "><br><br><h5 class="card-subtitle"> ' + data.location + ', ' + data.country + ' </h5><br><p class="card-text"> ' + data.description + ' </p></div><div class="modal-footer"><div class="ket-expenses-modal"><span class="h6">Total expenses: </span><span class="h6 text-primary">US$ ' + data.price + ' </span></div><button type="button" class="btn btn-outline-danger btn-add-wish">Add to wishlist</button></div>')
//         }
//     });
// });
// });

// Search bar
$("#searchButton").on("click", function () {
    $("#destination-list").html("");
    var textValue = $("#searchText").val();
    var res = textValue.toLowerCase();

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
                $('#destination-list').append('<div class="col-sm"><div class="card"><img class="img-fluid" src="img/' + data.image + '" alt=""><div class="card-body"><h5 class="card-title"> ' + data.attraction + '</h5><p class="card-subtitle text-muted"> ' + data.location + ', ' + data.country + ' </p><br><p class="card-text"> ' + data.summary + ' </p></div><div class="card-footer"><span class="h6">Total expenses: </span><span class="h6 text-primary">US$  ' + data.price + ' </span><br><br><button type="button" class="btn btn-primary" id="btn-modal" data-toggle="modal" data-target="#exampleModalCenter">See more </button><a href="#" class="btn btn-outline-danger">Add to wishlist</a></div></div>')
            } else {
                //filter
                if (country.includes(res) || attraction.includes(res) || location.includes(res) || summary.includes(res) || price == res) {
                    state = true;
                    $('#destination-list').append('<div class="col-sm"><div class="card"><img class="img-fluid" src="img/' + data.image + '" alt=""><div class="card-body"><h5 class="card-title"> ' + data.attraction + '</h5><p class="card-subtitle text-muted"> ' + data.location + ', ' + data.country + ' </p><br><p class="card-text"> ' + data.summary + ' </p></div><div class="card-footer"><span class="h6">Total expenses: </span><span class="h6 text-primary">US$  ' + data.price + ' </span><br><br><button type="button" class="btn btn-primary" id="btn-modal" data-toggle="modal" data-target="#exampleModalCenter">See more </button><a href="#" class="btn btn-outline-danger">Add to wishlist</a></div></div>')
                }
            }
        });
        if (state == false) {
            $('#destination-list').append('<h5 class="text-center"> Oops, the destination you were looking for doesn\'t exist.</h5>')
        }
    });
});

var input = document.getElementById("searchText");
input.addEventListener("keyup", function (event) {
    if (event.keyCode === 13) {
        event.preventDefault();
        document.getElementById("searchButton").click();
    }
});