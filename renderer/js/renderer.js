const { ipcRenderer } = require('electron')

const imageFileInput = document.querySelector('#img-select')
const imageForm = document.querySelector('#img-form')
const fileNameLabel = document.querySelector('#filename')
const outputPath = document.querySelector('#output-path')
let image = null

imageFileInput.addEventListener('change', () => {
  image = imageFileInput.files[0]
  // show the form
  imageForm.classList.toggle('hidden')

  // set the filename and output path
  fileNameLabel.textContent = image.name
  outputPath.textContent = getOutputPath(image.path, image.name)
})

imageForm.addEventListener('submit', async (event) => {
  event.preventDefault()

  const data = new FormData(imageForm)
  const width = +data.get('width')
  const height = +data.get('height')
  const outputPath = getOutputPath(image.path, image.name)

  await ipcRenderer.send('RESIZE_IMAGE', { image: image.path, output: outputPath, dimensions: { width, height } })
  alert(`new image was saved at ${outputPath}`)
})

function getOutputPath(inputPath, filename) {
  const inputDir = inputPath.split(filename)[0]
  const date = new Date()
  const extension = getExtension(inputPath)
  const outputFileName = `${date.getMinutes()}_${date.getSeconds()}-resized-${filename.split(extension)[0]}${extension}`

  return `${inputDir}${outputFileName}`
}

function getExtension(path) {
  var basename = path.split(/[\\/]/).pop(), // extract file name from full path ...
    // (supports `\\` and `/` separators)
    pos = basename.lastIndexOf('.') // get last position of `.`

  if (basename === '' || pos < 1)
    // if file name is empty or ...
    return '' //  `.` not found (-1) or comes first (0)

  return basename.slice(pos + 1) // extract extension ignoring `.`
}
