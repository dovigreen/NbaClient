var apiUrl='http://localhost/nbaserver/api/default'
$(document).ready(function () {	 
    $('#sendButton').click(function () {                
        sendClick();		        
    });

    $('#year').on('keyup', function() {
        let empty = $('#year').val().length===0               
        if (empty)
          $('#sendButton').attr('disabled', 'disabled');
        else
          $('#sendButton').attr('disabled', false);
      });

      
})




function sendClick(){
    $('#loader').show();
    $('#sendButton').hide();
    $('#cardBox').empty();
    var year=$('#year').val();    
    getTop10Players(year);
}

function getTop10Players(year){
    $('#sendButton').attr('disabled', 'disabled');
    $.ajax({
        type: "GET",
        url: apiUrl + "/GetTop10/"+year,        
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: getTop10Players_ajax_success,
        error:getTop10Players_ajax_error
    });
}


function getTop10Players_ajax_success(json){
    $('#sendButton').attr('disabled', false);        
    console.log(json)
    initCards(json);
    $('#loader').hide();
    $('#sendButton').show();
}

function getTop10Players_ajax_error(xhr, textStatus, errorThrown){
    $('#sendButton').attr('disabled', false);
    $('#loader').hide();
    $('#sendButton').show();
    console.log(xhr);
    alert('There was an Error')
}

function initCards(data){  
    var cards = $();                
    data.forEach(function(item, i) {
        cards = cards.add(createCard(item.Player));
    });    
    $('#cardBox').append(cards);
}


function createCard(player) {
    var cardTemplate = [
        '<div id="card" class="card">',
            '<div id="dotDiv">',
                '<span id="dot" style="background-color:'+player.Team.Color+'" ></span>',
            '</div>',
            '<div id="playerDiv">',
                '<div>',
                    '<span id="name">'+player.FirstName+' '+player.LastName+'</span>',
                    '<span id="hight">('+player.Height+')</span>',
                '</div>',
                '<div>',
                    '<span id="pos">'+player.Position+'</span>',
                '</div>',
            '</div>',
            '<div id="detailsDiv">',
                '<div class="warrper">',
                    '<div id="left">',
                        '<ul>',
                            '<li class="text">'+player.Team.Name+'</li>',
                            '<li class="text">'+player.Team.Conf+'</li>',
                            '<li class="text">'+player.Country+'</li>',
                        '</ul>',  
                    '</div>',
                    '<div id="right">',
                        '<span class="text">'+player.BirthDate+'</span>',
                    '</div>',
                '</div>',              
            '</div>',                      
        '</div>'


     
    ];
  
    // a jQuery node
    return $(cardTemplate.join(''));
  }
