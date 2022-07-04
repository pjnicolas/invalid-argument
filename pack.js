const fs = require('fs');
const moment = require('moment')

const loadFolder = (folder, type) => {
  const files = fs.readdirSync(folder).map(file => ({
    text: fs.readFileSync(`${folder}/${file}`, { encoding: 'utf-8' }),
    date: moment(file.split('_')[0],  'YYYYMMDDHHmm').toISOString(),
  }));

  const parsedFiles = files.map(({ text, date }) => {
    const sections = text
      .trim()
      .split(/(\n|^)# /)
      .filter((e) => !!e)
        .map((e) => e.trim().split('\n').map((e2) => e2.trim()))
        .map((e) => ({
          section: e[0],
          value: e.slice(1, e.length).join('\n').trim(),
        }))

        const { section: title, value: description } = sections.shift()

        const examples = sections.filter((e) => e.section === 'Example').map((e) => e.value)
        const quiz = sections.find((e) => e.section === 'Quiz')?.value.split('\n').map((e) => {
        const isCorrect = e[0] === '+';
        const value = e.substring(1, e.length).trim()
        return { isCorrect, value }
      })

    return {
      type,
      title,
      date,
      description,
      examples: examples.length > 0 ? examples : undefined,
      quiz,
    }
  })

  return parsedFiles;
}

const loadedFallacies = loadFolder('./src/_fallacies', 'fallacy')
const loadedBiases = loadFolder('./src/_biases', 'bias')
const loadedGedankenexperiments = loadFolder('./src/_gedankenexperiments', 'gedankenexperiment')

console.log(JSON.stringify([...loadedFallacies, ...loadedBiases, ...loadedGedankenexperiments], null, 2))
