const hash = require('hash-sum')

/**
 * 基于样式选择器格式 (div.root>div.item:1) 生成 hash Id
 * @param  {Object} node
 * @return {String} hashId
 */
const genVusionId = (node) => {
  const selectors = []

  while (node) {
    const index = node.parent && node.parent.children.indexOf(node)
    const selector = node.tag + (node.classBinding ? node.classBinding.replace(/^\$style/, '') : '') + (index !== undefined ? ':' + index : '')
    selectors.push(selector)
    node = node.parent
  }

  return hash(selectors.reverse().join('>'))
}

module.exports = () => ({
  postTransformNode: (node) => {
    const vusionId = genVusionId(node)
    const attrs = [
        { name: 'vusion-id', value: `"${vusionId}"` }
    ]

    node.events && (node.events = null)
    node.attrs = node.hasOwnProperty('attrs') ? node.attrs.concat(attrs) : attrs
  }
})

module.exports.genVusionId = genVusionId
