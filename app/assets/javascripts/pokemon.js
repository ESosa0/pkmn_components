// Place all the behaviors and hooks related to the matching controller here.
// All this logic will automatically be available in application.js.

$(function (){
  var Pokemon = function() {
    this.pokemon = {};
  };

  Pokemon.prototype.fetchPokemon = function(evnt) {
  
    var target = evnt.currentTarget; 
    var url = $(target).attr("data-pokemon-uri")
    $.get(url, this.renderPokemon);
  };

  Pokemon.prototype.renderPokemon = function (response) {
    $('.modal-title').empty()
    $('dd').empty()
    
    var name = $(response).attr("name")
    var height = $(response).attr("height")
    var weight = $(response).attr("weight")
    var attack = $(response).attr("attack")

    $('.modal-title').prepend(name)
    $('.modal-title').append('<small> #' + attack + '</small')
    $('.height').append('<dd>' + height + '</dd>')
    $('.weight').append('<dd>' + weight + '</dd>')
    $('.modal').modal('show')

  }


  var poke = new Pokemon();
  $('.pokedex-list').on('click', '.js-show-pokemon', poke.fetchPokemon.bind(poke));

});


