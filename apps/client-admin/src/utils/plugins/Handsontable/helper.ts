import Handsontable from 'handsontable'

export const defaultSettings: Handsontable.GridSettings = {
  licenseKey: 'non-commercial-and-evaluation',
  rowHeaders: true,
  rowHeights: 30,
  stretchH: 'last',
  selectionMode: 'single',
  className: 'handsontableCustom',
  currentColClassName: 'currentColumn',
  currentRowClassName: 'currentRow',
  activeHeaderClassName: 'activeHeader',
  wordWrap: false,
  readOnly: true,
  colWidths: 100, // refs https://handsontable.com/docs/7.1.1/Options.html#colWidths
}
