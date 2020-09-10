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