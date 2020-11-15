const CODES = {
  A: 65,
  Z: 90,
}

function createCol(col) {
  return `
    <div class="column">
      ${col}
    </div>
  `
}

function createCell() {
  return `<div class="cell" contenteditable></div>`
}

function createRow(content, rowNum = '') {
  return `
    <div class="row">
      <div class="row-info">${rowNum}</div>
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
    rows.push(createRow(cells, (i+1).toString()))
  }

  return rows.join('')
}