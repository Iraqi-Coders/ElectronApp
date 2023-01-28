const fs = require('fs/promises')
const sharp = require('sharp')

module.exports = async function (input, output, { width, height }) {
  const file = await fs.readFile(input)

  await sharp(file).resize({ width, height }).toFile(output)
}
