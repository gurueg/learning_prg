function fontsStyle(params) {

    let file_content = fs.readFileSync(source_folder + '/scss/fonts.scss');
    if (file_content == '') {
    fs.writeFile(source_folder + '/scss/fonts.scss', '', cb);
    return fs.readdir(path.build.fonts, function (err, items) {
        if (items) {
            let c_fontname;
            for (var i = 0; i < items.length; i++) {
                let fontname = items[i].split('.');
                fontname = fontname[0];
                if (c_fontname != fontname) {
                    fs.appendFile(source_folder + '/scss/fonts.scss', '@include font("' + fontname + '", "' + fontname + '", "400", "normal");\r\n', cb);
                }
                c_fontname = fontname;
                }
            }
        })
    }
}

//toggle compressed menu list
let compressed_list = document.querySelectorAll( ".menu__item-compressed" );
for( let item of compressed_list ){

    if ( item.hasAttribute( 'menu_type' ) ){
        item.addEventListener( 'click', function (){

            let className = ".submenu-" + item.getAttribute('menu_type');
            let compressed_menu = document.querySelector(className);

            compressed_menu.classList.toggle( "_active" );

        } )
    }

}

//toggle mobile menu
let menu_icons = document.querySelectorAll(".burger__text");
for( let icon of menu_icons ){

    icon.addEventListener( 'click', function (){
        let menu_obj = document.querySelector('.menu');
        menu_obj.classList.toggle('menu__active');
    } );
}

//Validate
let phone_fields = document.querySelectorAll("input[type=tel]"); 
for( let field of phone_fields ){

    field.addEventListener( 'change', function (event){
        if (field.validity.patternMismatch) {
            if (field.value.length > 0) {
                field.setCustomValidity("Введите номер телефона в формате 8xxxxxxxxxx");
            }else{
                field.setCustomValidity("Поле должно быть заполнено");
            }
        }else{
            field.setCustomValidity("");
        }
    } );

}

function changeParentCompressedMenu(){
    for( let item of compressed_list ){
        console.log( item );
        if ( item.hasAttribute( 'menu_type' ) ){

            let menu_list_object = document.querySelector(".menu__list");

            let className = ".submenu-" + item.getAttribute('menu_type');
            let compressed_menu = document.querySelector(className);

            if ( document.documentElement.clientWidth <= 765  ){
                console.log( "<" )
                menu_list_object.insertBefore(compressed_menu, item.parentElement.nextSibling);
            }else{
                console.log( ">" )
                item.parentElement.appendChild(compressed_menu);
            }
        }
    }
    
}

const popup_links = document.querySelectorAll('.popup-link');
const body = document.querySelector('body');
const lock_paddings = document.querySelectorAll('.lock-padding');

let unlock = true;
const timeout = 800;

if ( popup_links.length>0 ){
    for ( let i = 0; i<popup_links.length; i++ ){
        const current_link = popup_links[i];
        console.log( current_link );
        current_link.addEventListener( 'click', function(e){

            const popupName = current_link.getAttribute( 'href' ).replace( '#', '' );
            const currrentPopup = document.getElementById( popupName );
            popupOpen( currrentPopup );
            e.preventDefault();

        } );
    }
}  

const popupCloseIcons = document.querySelectorAll( '.close-popup' );
if ( popupCloseIcons.length > 0 ){
    for ( let i = 0; i<popupCloseIcons.length; i++ ){
        const currentCloseIcon = popupCloseIcons[i];
        currentCloseIcon.addEventListener( 'click', function (e) {

            const closestPopup = currentCloseIcon.closest( '.popup' );
            popupClose( closestPopup );
            e.preventDefault();

        } );
    }
}

function popupOpen( popupObject ){
    if ( popupObject && unlock ){

        let alreadyOpened = document.querySelector( '.popup.open' );
        if ( alreadyOpened ){
            popupClose( alreadyOpened, false );
        }else{
            bodyLock();
        }

        popupObject.classList.add( 'open' );
        popupObject.addEventListener( 'click', function (e){
            if ( !e.target.closest( '.popup__content' ) ){
                popupClose( e.target.closest('.popup') );
            }
        } );
    }
}

function popupClose( popupObject, doUnlock = true ){

    if ( unlock ){
        popupObject.classList.remove('open');
        if ( doUnlock ){
            bodyUnlock();
        }
    }

}

function bodyLock(){
    const lockPaddingValue = window.innerWidth - document.querySelector('.block').offsetWidth + 'px';
    
    if ( lock_paddings.length > 0 ){
        for( let i = 0; i<lock_paddings.length; i++ ){
            const element = lock_paddings[i];
            element.style.paddingRight = lockPaddingValue;
        }
    }
    body.style.paddingRight = lockPaddingValue;
    body.classList.add( 'lock' );

    unlock = false;
    setTimeout( ()=>{unlock=true}, timeout );
}

function bodyUnlock(){

    setTimeout( function (){

        if ( lock_paddings.length > 0 ){
            for( let i = 0; i<lock_paddings.length; i++ ){
                const element = lock_paddings[i];
                element.style.paddingRight = '0px';
            }
        }
        body.style.paddingRight = '0px';
        body.classList.remove( 'lock' );     
        
        unlock = true;  

    }, timeout )

    unlock = false;
}

document.addEventListener( 'keydown', function (e){
    if ( e.which === 27 ){
        let alreadyOpened = document.querySelector( '.popup.open' );
        if ( alreadyOpened ){
            popupClose( alreadyOpened );
        }
    }
} );

(function() {

    // проверяем поддержку
    if (!Element.prototype.closest) {
  
      // реализуем
      Element.prototype.closest = function(css) {
        var node = this;
  
        while (node) {
          if (node.matches(css)) return node;
          else node = node.parentElement;
        }
        return null;
      };
    }
  
  })();
  (function() {

    // проверяем поддержку
    if (!Element.prototype.matches) {
  
      // определяем свойство
      Element.prototype.matches = Element.prototype.matchesSelector ||
        Element.prototype.webkitMatchesSelector ||
        Element.prototype.mozMatchesSelector ||
        Element.prototype.msMatchesSelector;
  
    }
  
  })();