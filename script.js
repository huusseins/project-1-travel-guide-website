// Show all cards
function showAllCard() {
    $.getJSON('destinasi.json', function (data) {
        let destinasi = data.destinasi;
        $.each(destinasi, function (i, data) {
            $('#destination-list').append('<div class="col-sm"><div class="card"><img class="img-fluid" src="img/' + data.image + '" alt=""><div class="card-body"><h5 class="card-title"> ' + data.attraction + '</h5><p class="card-subtitle text-muted"> ' + data.location + ', ' + data.country + ' </p><br><p class="card-text"> ' + data.summary + ' </p></div><div class="card-footer"><span class="h6">Total expenses: </span><span class="h6 text-primary totalExpenses">US$  ' + data.price + ' </span><br><br><button type="button" class="btn btn-primary button-modal-detail" data-toggle="modal" data-target="#destinationDetailModal" data-destinationid="' + data.attraction + '">See more </button><button type="button" class="btn btn-outline-danger btn-wishlist">Add to wishlist</button></div></div>')
        })
    })
}

showAllCard()

$(document).ready(function () {

    // Search bar
    const searchDestination = () => {
        let searchTextValue = document.querySelector('#searchText').value
        let cardDeck = document.querySelector('#destination-list').children

        for (let i = 0; i < cardDeck.length; i++) {

            const title = cardDeck[i].children[0].children[1].children[0];
            let valueTitle = title.innerHTML;
            const subtitle = cardDeck[i].children[0].children[1].children[1];
            let valueSubtitle = subtitle.innerHTML;

            if (valueTitle.toLowerCase().indexOf(searchTextValue.toLowerCase()) > -1 || valueSubtitle.toLowerCase().indexOf(searchTextValue.toLowerCase()) > -1) {
                title.parentElement.parentElement.parentElement.style.display = ''
            } else {
                title.parentElement.parentElement.parentElement.style.display = 'none'
            }
        }
    }

    let searchText = document.querySelector('#searchText')
    searchText.addEventListener('keyup', searchDestination)

    // Filter dropdown
    $('.dropdown-item').on('click', function () {
        let negara = $(this).html()

        if (negara == 'All location') {

            $('#destination-list').html('')
            showAllCard()
            $('.dropdown-toggle').html('All location')
            return;
        };
        $.getJSON('destinasi.json', function (data) {
            let destinasi = data.destinasi
            let content = '';

            $.each(destinasi, function (i, data) {
                if (data.country == negara) {
                    content += '<div class="col-sm"><div class="card"><img class="img-fluid" src="img/' + data.image + '" alt=""><div class="card-body"><h5 class="card-title"> ' + data.attraction + '</h5><p class="card-subtitle text-muted"> ' + data.location + ', ' + data.country + ' </p><br><p class="card-text"> ' + data.summary + ' </p></div><div class="card-footer"><span class="h6">Total expenses: </span><span class="h6 text-primary totalExpenses">US$  ' + data.price + ' </span><br><br><button type="button" class="btn btn-primary button-modal-detail" data-toggle="modal" data-target="#destinationDetailModal" data-destinationid="' + data.attraction + '">See more </button><button type="button" class="btn btn-outline-danger btn-wishlist">Add to wishlist</button></div></div></div>';
                }
            })
            $('#destination-list').html(content)
            $('.dropdown-toggle').html(negara)
        })
    })

    // Modal
    $('#destination-list').on('click', '.button-modal-detail', function () {
        let modalId = ($(this).data('destinationid'))

        $.getJSON('destinasi.json', function (data) {
            let destinasi = data.destinasi;
            $.each(destinasi, function (i, data) {
                if (data.attraction == modalId) {
                    $('.modal-dialog').html('<div class="modal-content"><div class="modal-header"><h5 class="modal-title" id="destinationDetailModalTitle">' + data.attraction + '</h5><button type="button" class="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button></div><div class="modal-body"><img class="img-fluid" src="img/' + data.image + '" alt="' + data.attraction + '"><br><br><h5 class="card-subtitle">' + data.location + ', ' + data.country + '</h5><br><p class="card-text">' + data.description + '</p></div><div class="modal-footer"><span class="h6">Total expenses: </span><span class="h6 text-primary totalExpenses">US$ ' + data.price + '</span><button type="button" class="btn btn-outline-danger btn-wishlist">Add to wishlist</button></div></div></div>')
                }
            })
        })
    })

    // Update total price
    function updatePrice() {
        let updatePrice = document.querySelector('.totalPrice')
        let hiddenDiv = document.querySelector('.hiddenDiv').children
        let total = 0;

        for (let i = 0; i < hiddenDiv.length; i++) {
            const cost = hiddenDiv[i].innerHTML
            total = total + parseInt(cost)
        }
        if (updatePrice.value != '0') {
            updatePrice.value = 'Total price: US$ ' + total;
        }
    }

    // Add wishlist
    $('#destination-list, .modal-dialog').on('click', '.btn-wishlist', function () {
        let totalExpenses = parseInt($(this).siblings('.totalExpenses').html().slice(4))
        $(this).removeClass('btn-outline-danger btn-wishlist').addClass('btn-danger wishlist-active').html('Remove from wishlist')
        $('.hiddenDiv').append('<div></div>')
        $('.hiddenDiv').children().last().append(totalExpenses)
        updatePrice()
    })

    // Remove wishlist
    $('#destination-list, .modal-dialog').on('click', '.wishlist-active', function () {
        let totalExpenses = parseInt($(this).siblings('.totalExpenses').html().slice(4))
        $(this).removeClass('btn-danger wishlist-active').addClass('btn-outline-danger btn-wishlist').html('Add to wishlist')
        let hiddenDiv = document.querySelector('.hiddenDiv').children
        for (let i = 0; i < hiddenDiv.length; i++) {
            if (hiddenDiv[i].innerHTML == totalExpenses) {
                hiddenDiv[i].remove()
                break;
            }
        }
        updatePrice();
    })
})