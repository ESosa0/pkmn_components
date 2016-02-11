// Place all the behaviors and hooks related to the matching controller here.
// All this logic will automatically be available in application.js.

$(function (){
  var Pokemon = function() {
    this.name = null;
    this.attack = null;
    this.height = null;
    this.weight = null;
    this.description = null;
    this.imageUrl = null;
  };

  Pokemon.prototype.fetchPokemon = function(url) {
    $.get(url, this.processPokeInfo.bind(this));
  };

  Pokemon.prototype.processPokeInfo = function(pokeinfo) {
    this.name = pokeinfo.name;
    this.attack = pokeinfo.attack;
    this.height = pokeinfo.height;
    this.weight = pokeinfo.weight;

    var imagePromise = this.fetchImage(pokeinfo.sprites[0].resource_uri);
    var descriptionPromise = this.fetchLatestDescription(pokeinfo.descriptions);

    $.when(imagePromise, descriptionPromise).done($.proxy(function(spriteInfo, descriptionInfo){
      this.description = descriptionInfo[0].description;
      this.imageUrl = 'http://pokeapi.co' + spriteInfo[0].image;

      this.renderPokemon();
    }, this)); 
  }

  Pokemon.prototype.fetchLatestDescription = function(descriptions){
    var sortedDescriptions = descriptions.sort(function (a, b) {
      if (a.name > b.name) {
        return -1;
      }
      if (a.name < b.name) {
        return 1;
      }
      return 0;
    });
    var resourceUri = sortedDescriptions[0].resource_uri;
    return $.get(resourceUri); 
  }

  Pokemon.prototype.fetchImage = function(path) {
    return $.get(path); 
  };

  Pokemon.prototype.renderPokemon = function () {
    $('#name').text(this.name)
    $('#attack').text('#' + this.attack)
    $('#height').text(this.height);
    $('#weight').text(this.weight);
    $('#image').attr('src', this.imageUrl)
    $('#description').text(this.description)
    $('.modal').modal('show');
  };

  $('.pokedex-list').on('click', '.js-show-pokemon', function (e) {
    var target = e.currentTarget;
    var pokemon = new Pokemon();

    pokemon.fetchPokemon($(target).data("pokemon-uri"));
  });

});






