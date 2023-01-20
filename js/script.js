//naimportované proměnné, potřebné ke kódu, pomocí $ ukazující na id pořípadně třídy
var basket = $('#basket'),
    container = $('#container'),
    hen = $('.hen'),
    vajicko = $('.egg'),
    vajicko1 = $('#egg1'),
    vajicko2= $('#egg2'),
    vajicko3= $('#egg3'),
    restart = $('#restart'),
    score_span = $('#score'),
    score_1 = $('#score_1'),
    zivot_span = $('#zivot'),
    floor = $('#floor'),
    kos_top = basket.height(),
    container_height = container.height(),
    vajicko_height = vajicko.height(),
    vajickoPocatecniPozice = parseInt(vajicko.css('top')),
    skore = 0,
    zivot = 7,
    speed = 2,
    max_speed = 10,
    counter = 0,
    score_updated = false,
    the_game = 0,
    anim_id = 0,
    poziceVejce = 0,
    vajicko_top = 0,
    kos_vyska = container_height - kos_top,
    bullseye_num = 0;
    zivot_span.text(zivot);

    //funkce, která určí zda dva divy kolizovali či ne
    function collision($div1, $div2) {
      var x1 = $div1.offset().left;
      var y1 = $div1.offset().top;
      var h1 = $div1.outerHeight(true);
      var w1 = $div1.outerWidth(true);
      var b1 = y1 + h1;
      var r1 = x1 + w1;
      var x2 = $div2.offset().left;
      var y2 = $div2.offset().top;
      var h2 = $div2.outerHeight(true);
      var w2 = $div2.outerWidth(true);
      var b2 = y2 + h2;
      var r2 = x2 + w2;
  
      if (b1 < y2 || y1 > b2 || r1 < x2 || x1 > r2) return false;
      return true;
  }


//na pohnutí myši se začne hýbat koš
  $(document).on('mousemove', function (e) {
    //pageX = vajíčko se pohybuje pouze vertikálně
  basket.css('left', e.pageX);
});


//vejce padající z vrchu
function padajiciVejce(vajicko) {
  poziceVejce = parseInt(vajicko.css('top'));
  vajicko.css('top', poziceVejce + speed);
}
//pokud vejce spadne, tak se ukáže jiný obrázek (pomocí funkce) a odecte se zivot taktez pomoci funkce
function rozplacleVejce(vajicko) {
  if (collision(vajicko, floor)) {
      ukazaniVejce(vajicko);
      odecistZivot();
      return true;
  }
  return false;
}

function poziceZacatkuVajec(vajicko) {
  vajicko.css('top', vajickoPocatecniPozice);
}
//pokud vejce doleti az na zem, ukáže se rozplacle
function ukazaniVejce(vajicko) {
  bullseye_num = vajicko.attr('data-bullseye');
  $('#bullseye' + bullseye_num).show();
  odstraneniVejce(bullseye_num);
}

//jak dlouho bude vejce na "zemi" lezet dokut se neodstrani
function odstraneniVejce(bullseye_num) {
  setTimeout(function () {
      $('#bullseye' + bullseye_num).hide();
  }, 800);
}
//funkce po spadnuti vejce odečte život z proměnné zivot
function odecistZivot() {
  zivot--;
  zivot_span.text(zivot);
}
//pokud vejce strefí koš, vyvolá se funkce prectení skore
function chyceniVajecDoKose(vajicko) {
  if (collision(vajicko, basket)) {
      vajicko_top = parseInt(vajicko.css('top'));
      if (vajicko_top < kos_vyska) {
          pricteniScore();
          return true;
      }
  }
  return false;
}
//pripisovani skore funguje na principu čím více skore, tim se pricte vyssi rychlost
function pricteniScore() {
  skore++;
  if (skore % 10 === 0 && speed <= max_speed) {
      speed++;
  }
  score_span.text(skore);
  score_1.text(skore);
}
//pokud se proměnná život dostane na nulu, hra se ukončí
function zastaveniHry() {
  cancelAnimationFrame(anim_id);
  restart.slideDown();
}
//pokud se klikne na tlacitko restart, hra začne znova
restart.click(function () {
  location.reload();
});


//funce, pomocí níž pokud je vejce rozbité, či se chytí do koše, tak začne padat další
$(function () {

  the_game = function () {

      if (rozplacleVejce(vajicko1) || chyceniVajecDoKose(vajicko1)) {
          poziceZacatkuVajec(vajicko1);
      } else {
          padajiciVejce(vajicko1);
      }

      if (rozplacleVejce(vajicko2) || chyceniVajecDoKose(vajicko2)) {
          poziceZacatkuVajec(vajicko2);
      } else {
          padajiciVejce(vajicko2);
      }

      if (rozplacleVejce(vajicko3) || chyceniVajecDoKose(vajicko3)) {
          poziceZacatkuVajec(vajicko3);
      } else {
          padajiciVejce(vajicko3);
      }

      if (zivot > 0) {
          anim_id = requestAnimationFrame(the_game);
      } else {
          zastaveniHry();
      }
  };

  anim_id = requestAnimationFrame(the_game);

});
