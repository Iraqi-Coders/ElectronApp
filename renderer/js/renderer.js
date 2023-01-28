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

imageForm.addEventListener('submit', (event) => {
  event.preventDefault()

  const data = new FormData(imageForm)
  const width = +data.get('width')
  const height = +data.get('height')
  const outputPath = getOutputPath(image.path, image.name)

  ipcRenderer.send('RESIZE_IMAGE', { image: image.path, output: outputPath, dimensions: { width, height } })
})

function getOutputPath(inputPath, filename) {
  const inputDir = inputPath.split(filename)[0]
  const date = new Date()
  const outputFileName = `${date.getMinutes()}_${date.getSeconds()}-resized-${filename.split('.')[0]}.${
    filename.split('.')[1]
  }`

  return `${inputDir}${outputFileName}`
}
