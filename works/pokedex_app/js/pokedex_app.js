'use strict';
var limit = 12;
var url = 'http://pokeapi.co/api/v1/pokemon/?limit=12';
var offset_url = 'http://pokeapi.co/api/v1/pokemon/?limit=12&offset=';
var filterList = {
  "all": [],
  "normal": [],
  "fighting": [],
  "flying": [],
  "poison": [],
  "ground": [],
  "rock": [],
  "bug": [],
  "ghost": [],
  "steel": [],
  "fire": [],
  "water": [],
  "grass": [],
  "electric": [],
  "ice": [],
  "dragon": [],
  "dark": [],
  "fairy": [],
  "unknown": [],
  "shadow": [],
  "psychic": []
};

function _(el) {
  return document.querySelector(el);
}

function _All(el) {
  return document.querySelectorAll(el);
}

function _Id(el) {
  return document.getElementById(el);
}

function _cr(el) {
  return document.createElement(el);
}

function init() {
  createPokemonList();
  setTypeColor('.label');
  typeFilter();
}

function createPokemonList() {
  var request = new XMLHttpRequest();
  request.open('GET', url, true);
  request.onload = function() {
    if (request.status >= 200 && request.status < 400) {
      var data = JSON.parse(request.responseText);
      console.log(data);
      template('.items-wrap', data.objects);
      setTypeColor('.label');
      getBackgroundColor();
    };
  };
  request.onerror = function(e) {
    self._('.items-wrap').innerHTML = '<h1>Sorry the request file could not loaded</h1>';
  };
  request.send();
}

function template(elem, obj) {
  for (var i = 0; i < obj.length; i++) {

    var link_name = '#' + obj[i].name,
      img_src = 'http://pokeapi.co/media/img/' + obj[i].pkdx_id + '.png',
      img_alt = obj[i].name,
      id = '#' + obj[i].pkdx_id,
      type = getType(obj[i]);

    var pokeType = obj[i].types[0].name;
    filterList.all.push(obj[i].pkdx_id);
    filterList[pokeType].push(obj[i].pkdx_id);
    if (obj[i].types[1]) {
      pokeType = obj[i].types[1].name;
      filterList[pokeType].push(obj[i].pkdx_id);
    }

    var items = _('.items-wrap');
    var pokemon = _cr('div');
    pokemon.className = 'poke-item';
    pokemon.id = obj[i].pkdx_id;
    items.appendChild(pokemon);

    var card_icon = _cr('div');
    card_icon.className = 'card-icon img-wrap';
    var link = _cr('a');
    link.href = link_name;
    card_icon.appendChild(link);
    var img = _cr('img');
    img.src = img_src;
    img.alt = img_alt;
    link.appendChild(img);
    pokemon.appendChild(card_icon);

    var poke_id = _cr('span');
    poke_id.className = 'poke-id';
    poke_id.innerHTML = id;
    pokemon.appendChild(poke_id);

    var name = _cr('h4');
    name.innerHTML = obj[i].name;
    pokemon.appendChild(name);

    var label_cont = _cr('div');
    label_cont.className = 'label-wrap';
    pokemon.appendChild(label_cont);
    label_cont.innerHTML = type;

    link.onclick = ((function(e) {
      var dataObj = obj[i];
      return function() {
        var item = _Id('item');
        var imgElem = _Id('img-info');
        var name = _Id('name');
        var idElem = _Id('poke-id');
        var type = _Id('type');
        var attack = _Id('attack');
        var defense = _Id('defense');
        var hp = _Id('hp');
        var spAttack = _Id('sp-attack');
        var spDefence = _Id('sp-defence');
        var speed = _Id('speed');
        var weight = _Id('weight');
        var totalMoves = _Id('total-moves');
        item.style.display = 'inline-block';
        imgElem.src = 'http://pokeapi.co/media/img/' + dataObj.pkdx_id + '.png';
        name.innerHTML = dataObj.name + ' #' + dataObj.pkdx_id;
        type.innerHTML = getTypeList(dataObj);
        attack.innerHTML = dataObj.attack;
        defense.innerHTML = dataObj.defense;
        hp.innerHTML = dataObj.hp;
        spAttack.innerHTML = dataObj.sp_atk;
        spDefence.innerHTML = dataObj.sp_def;
        speed.innerHTML = dataObj.speed;
        weight.innerHTML = dataObj.weight;
        totalMoves.innerHTML = dataObj.moves.length;

        return false;
      }
    })());

  }

  _('.btn').style.display = 'inline-block';

}

function loadMore() {
  var item = _Id('item');
  var request = new XMLHttpRequest();
  request.open('GET', offset_url + limit, true);
  request.onload = function() {
    if (request.status >= 200 && request.status < 400) {
      var data_offset = JSON.parse(request.responseText);
      console.log(data_offset);
      template('.items-wrap', data_offset.objects);
      setTypeColor('.label');
    };
  };
  request.onerror = function(e) {
    self._('.items-wrap').innerHTML = '<h1>Sorry the request file could not loaded</h1>';
  };
  request.send();
  limit += 12;
  item.style.display = 'none';
}

function typeFilter() {
  _('.pokedex-type').addEventListener('click', function(event) {
    if (event.target.matches('.label')) {
      var key = event.target.textContent.toLowerCase();
      var arr = filterList[key];
      var all = filterList.all;
      var hide = all.filter(function(elem) {
        return arr.indexOf(elem) == -1;
      });
      all.forEach(function(id) {
        _Id('' + id + '').style.display = '';
      });
      hide.forEach(function(id) {
        _Id('' + id + '').style.display = 'none';
      });
      event.preventDefault();
    }
    _Id('item').style.display = 'none';
  });
}

function getType(obj) {
  var type = '';
  for (var i = 0; i < obj.types.length; i++) {
    type += '<span class="label">' + obj.types[i].name + '</span>';
  }
  return type;
}

function getTypeList(obj) {
  var type = '';
  for (var i = 0; i < obj.types.length; i++) {
    type += obj.types[i].name + ' ';
  }
  return type;
}

function setTypeColor(elem) {
  var typeElem = _All('.label');
  var type;
  var color;
  for (var i = 0; i < typeElem.length; i++) {
    type = typeElem[i].innerHTML.toLowerCase();
    color = getBackgroundColor(type);
    typeElem[i].style.backgroundColor = color;
  }
}

function getBackgroundColor(type) {
  if (type === 'fire') return "#fd7d24";
  if (type === 'grass') return "#9bcc50";
  if (type === 'water') return "#4592c4";
  if (type === 'rock') return "#a38c21";
  if (type === 'ground') return "#ab9842";
  if (type === 'ice') return "#51c4e7";
  if (type === 'electric') return "#eed535";
  if (type === 'dragon') return "#f16e57";
  if (type === 'poison') return "#b97fc9";
  if (type === 'fairy') return "#fdb9e9";
  if (type === 'psychic') return "#f366b9";
  if (type === 'ghost') return "#7b62a3";
  if (type === 'flying') return "#3dc7ef";
  if (type === 'normal') return "#a4acaf";
  if (type === 'bug') return "#729f3f";
  if (type === 'fighting') return "#d56723";
  return "#668DF8";
}

_('.btn').addEventListener('click', loadMore);

init();