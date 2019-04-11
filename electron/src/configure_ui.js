
const $ = window.$ = window.jQuery = require('jquery');
window.Bootstrap = require('bootstrap');

var {ConfigureStore} = require('./configure_store');
ConfigureStore.init();

function portNoDisableCheck() {
  $('#portNo').prop('disabled', !ConfigureStore.get('fixed_port', false));
}

/* load the values initially */
ConfigureStore.keys().map((keyname) => {
  let $ele = $(`*[name="${keyname}"]`);
  let value = ConfigureStore.get(keyname);

  switch ($ele.attr('type')) {
    case 'checkbox':
      $ele.prop('checked', value);
      break;
    default:
      $ele.val(value);
      break;
  }
});

portNoDisableCheck();

/* these function are bind in html code and will be called on input change */
function onTextChange(e) {
  let $ele = $(e.currentTarget);
  ConfigureStore.set($ele.attr('name'), $ele.val());
}

function onCheckChange(e) {
  let $ele = $(e.currentTarget);
  ConfigureStore.set($ele.attr('name'), $ele.prop('checked'));

  if($ele.attr('name') == 'fixed_port') {
    portNoDisableCheck();
  }
}
/*****/

$('#btnSave').on('click', ()=> {
  ConfigureStore.save();
})
