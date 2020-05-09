// JQuery dropdown location
$.getJSON('destinasi.json', function (data) {
    let negara = data.destinasi;
    $.each(negara, function (i, data) {
        $('.dropdown-menu').append('<a class="dropdown-item" href="#"> ' + data.country + ' </a>')
    });
})


// JQuery card
$.getJSON('destinasi.json', function (data) {
    let destinasi = data.destinasi;
    $.each(destinasi, function (i, data) {
        $('#destination-list').append('<div class="col-sm"><div class="card"><img class="img-fluid" src="img/' + data.image + '" alt="Cappadocia"><div class="card-body"><h5 class="card-title"> ' + data.attraction + '</h5><p class="card-subtitle text-muted"> ' + data.location + ', ' + data.country + ' </p><br><p class="card-text"> ' + data.summary + ' </p></div><div class="card-footer"><span class="h6">Total expenses: </span><span class="h6 text-primary">US$  ' + data.price + ' </span><br><br><button type="button" class="btn btn-primary" data-toggle="modal" data-target="#exampleModalCenter">See more </button><a href="#" class="btn btn-outline-danger">Add to wishlist</a></div></div>')
    });
});