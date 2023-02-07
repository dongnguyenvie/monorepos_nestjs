import Handsontable from 'handsontable'
import moment from 'moment'

export const dateRenderer: Handsontable.renderers.Base = function (this, instance, TD, row, col, prop, value, cellProperties) {
  Handsontable.renderers.TextRenderer.apply(this, arguments as any)
  TD.innerHTML = moment(value).format('HH:mm DD-MM-YYYY')
  return TD
}

export const imageRenderer = function (this, instance, TD, row, col, prop, value, cellProperties) {
  var escaped = Handsontable.helper.stringify(value),
    img

  if (escaped.indexOf('http') === 0) {
    img = document.createElement('IMG')
    img.style = 'width: 100%'
    img.src = value

    Handsontable.dom.addEvent(img, 'mousedown', function (e) {
      e.preventDefault() // prevent selection quirk
    })

    Handsontable.dom.empty(TD)
    TD.appendChild(img)
  } else {
    // render as text
    Handsontable.renderers.TextRenderer.apply(this, [instance, TD, row, col, prop, value, cellProperties])
  }

  return TD
}
