import 'zx/globals'

// functions
async function load(path = "") {
    const content = fs.readFileSync(path, { encoding: 'utf-8' })
    return content
}
async function parseToc(list = []) {
    const items = await Promise.all(list)
    return items.join('')
}
async function parseContents(list = []) {
    const items = await Promise.all(list)
    return items.join('\n')
}

// main
const readme = await load('README.md.stub')

// load toc
const toc = await parseToc([
    await load('schema/TOC.md'),
    await load('developments/TOC.md'),
    await load('platforms/TOC.md'),
    await load('applications/TOC.md'),
    await load('games/TOC.md'),
    await load('others/TOC.md'),
    await load('see-also/TOC.md')
])

// load contents
const contents = await parseContents([
    await load('schema/README.md'),
    await load('developments/README.md'),
    await load('platforms/README.md'),
    await load('applications/README.md'),
    await load('games/README.md'),
    await load('others/README.md'),
    await load('see-also/README.md')
])

// build
let build = readme
build = build.replace('<!--build toc-->', toc)
build = build.replace('<!--build contents-->', contents)

// output
console.log(build)
fs.writeFileSync('README.md', build, { encoding: 'utf-8' })
