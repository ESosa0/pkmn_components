// Place all the behaviors and hooks related to the matching controller here.
// All this logic will automatically be available in application.js.

$(function (){
  var Pokemon = function() {
    this.pokemon = {};
  };

  Pokemon.prototype.fetchPokemon = function(evnt) {
  
    var target = evnt.currentTarget; 
    var url = $(target).attr("data-pokemon-uri");
    $.get(url, this.fetchImage.bind(this));
  };

  Pokemon.prototype.fetchImage = function (pokeinfo) {
    var url = pokeinfo.sprites[0].resource_uri;
    $.get(url, (function(spriteinfo){
      this.renderPokemon(spriteinfo,pokeinfo);
    }).bind(this));
  };

  Pokemon.prototype.renderPokemon = function (spriteinfo, pokeinfo) {

    $('.modal-title').empty()
    $('dd').empty()
    
    var name = $(pokeinfo).attr("name")
    var height = $(pokeinfo).attr("height")
    var weight = $(pokeinfo).attr("weight")
    var attack = $(pokeinfo).attr("attack")
    var image = 'http://pokeapi.co' + spriteinfo.image


    $('.modal-title').prepend(name)
    $('.modal-title').append('<small> #' + attack + '</small')
    $('.height').append('<dd>' + height + '</dd>')
    $('.weight').append('<dd>' + weight + '</dd>')
    $('.modal-title').append('<img src=' + '"' + image + '">')
    $('.modal').modal('show')

  };


  var poke = new Pokemon();
  $('.pokedex-list').on('click', '.js-show-pokemon', poke.fetchPokemon.bind(poke));

});


