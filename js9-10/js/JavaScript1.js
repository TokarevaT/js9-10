$('section.awSlider .carousel').carousel({
    pause: "hover",
    interval: 2000
});

var startImage = $('section.awSlider .item.active > img').attr('src');
$('section.awSlider').append('<img src="' + startImage + '">');

$('section.awSlider .carousel').on('slid.bs.carousel', function () {
    var bscn = $(this).find('.item.active > img').attr('src');
    $('section.awSlider > img').attr('src', bscn);
});

$(function () {
    $('<div id="blob"></div>').css({
        width: 0,
        height: $('#navigation li:first a').height() + 15
    }).appendTo('#navigation');

    $('#navigation').hover(function () {
        // Действия для события onMouseOver
    }, function () {
        // Действия для события onMOuseOut
    });
    $('#navigation a').hover(
      function () {
          $('#blob').animate(
            {
                width: $(this).width() + 20,
                left: $(this).position().left
            },
            {
                duration: 'slow',
                easing: 'easeOutElastic',
                queue: false
            }
          )
      });
    $('#blob').animate(
  {
      left: $('#navigation li:first a').position().left,
      width: $('#navigation li:first a').width() + 20,
  }, 'fast'
);

    var site = function() {
	this.navLi = $('#nav li').children('ul').hide().end();
	this.init();
};
site.prototype = {
 	init : function() {
 		this.setMenu();
 	},
 	// Enables the slidedown menu, and adds support for IE6
 	setMenu : function() {
 	$.each(this.navLi, function() {
 		if ( $(this).children('ul')[0] ) {
 			$(this)
 				.append('<span />')
 				.children('span')
 					.addClass('hasChildren')
 		}
 	});
 		this.navLi.hover(function() {
 			// mouseover
			$(this).find('> ul').stop(true, true).slideDown('slow', 'easeOutBounce');
 		}, function() {
 			// mouseout
 			$(this).find('> ul').stop(true, true).hide(); 		
		});
 	}
}
new site();


    jQuery(".niceCheck").each(
    /* при загрузке страницы меняем обычные на стильные checkbox */
    function () {
        changeCheckStart(jQuery(this));
    });
    $("#default-usage-select").selectbox();
});


function changeCheck(el)
    /* 
        функция смены вида и значения чекбокса при клике на контейнер чекбокса (тот, который отвечает за новый вид)
        el - span контейнер для обычного чекбокса
        input - чекбокс
    */ {

    var el = el,
		input = el.find("input").eq(0);

    if (el.attr("class").indexOf("niceCheckDisabled") == -1) {
        if (!input.attr("checked")) {
            el.addClass("niceChecked");
            input.attr("checked", true);
        } else {
            el.removeClass("niceChecked");
            input.attr("checked", false).focus();
        }
    }
    return true;
}

function changeVisualCheck(input) {
    /*
        меняем вид чекбокса при смене значения
    */

    var wrapInput = input.parent();
    if (!input.attr("checked")) {
        wrapInput.removeClass("niceChecked");
    }
    else {
        wrapInput.addClass("niceChecked");
    }
}

function changeCheckStart(el)
    /* 
        новый чекбокс выглядит так <span class="niceCheck"><input type="checkbox" name="[name check]" id="[id check]" [checked="checked"] /></span>
        новый чекбокс получает теже name, id и другие атрибуты что и были у обычного
    */ {

    try {
        var el = el,
            checkName = el.attr("name"),
            checkId = el.attr("id"),
            checkChecked = el.attr("checked"),
            checkDisabled = el.attr("disabled"),
            checkTab = el.attr("tabindex"),
            checkValue = el.attr("value");
        if (checkChecked)
            el.after("<span class='niceCheck niceChecked'>" +
                "<input type='checkbox'" +
                "name='" + checkName + "'" +
                "id='" + checkId + "'" +
                "checked='" + checkChecked + "'" +
                "value='" + checkValue + "'" +
                "tabindex='" + checkTab + "' /></span>");
        else
            el.after("<span class='niceCheck'>" +
                "<input type='checkbox'" +
                "name='" + checkName + "'" +
                "id='" + checkId + "'" +
                 "value='" + checkValue + "'" +
                "tabindex='" + checkTab + "' /></span>");

        /* если checkbox disabled - добавляем соотвсмтвующи класс для нужного вида и добавляем атрибут disabled для вложенного chekcbox */
        if (checkDisabled) {
            el.next().addClass("niceCheckDisabled");
            el.next().find("input").eq(0).attr("disabled", "disabled");
        }

        /* цепляем обработчики стилизированным checkbox */
        el.next().bind("mousedown", function (e) { changeCheck(jQuery(this)) });
        el.next().find("input").eq(0).bind("change", function (e) { changeVisualCheck(jQuery(this)) });
        if (jQuery.browser.msie) {
            el.next().find("input").eq(0).bind("click", function (e) { changeVisualCheck(jQuery(this)) });
        }
        el.remove();
    }
    catch (e) {
        // если ошибка, ничего не делаем
    }
    return true;
}






