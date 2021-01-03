const CODES = {
  A: 65,
  Z: 90,
}

function createCol(col, index) {
  return `
    <div class="column" data-type="resizable" data-col="${index}">
      ${col}
      <div class="col-resize" data-resize="col"></div>
    </div>
  `
}

function createCell(_, index) {
  return `<div class="cell" data-col="${index}" contenteditable></div>`
}

function createRow(content, rowNum = '') {
  const resize = rowNum
    ? `<div class="row-resize" data-resize="row"></div>`
    : ''
  return `
    <div class="row" data-type="resizable">
      <div class="row-info">
        ${rowNum}
        ${resize}
      </div>
      <div class="row-data">${content}</div>
    </div>
  `
}

export function createTable(rowsCount = 30) {
  const colsCount = CODES.Z - CODES.A + 1
  const rows = []

  const cols = new Array(colsCount)
      .fill('')
      .map((el, index) => {
        return String.fromCharCode(CODES.A + index)
      })
      .map(createCol)
      .join('')

  rows.push(createRow(cols))

  for (let i = 0; i < rowsCount; i++) {
    const cells = new Array(colsCount)
        .fill('')
        .map(createCell)
        .join('')
    rows.push(createRow(cells, (i + 1).toString()))
  }

  return rows.join('')
}