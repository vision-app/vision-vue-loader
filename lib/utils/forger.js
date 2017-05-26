var hash = require('hash-sum')
var vueTemplateCompiler = require('vue-template-compiler')

const VNodeMap = new Map()

/**
 * 通过重铸后的 AST (将原组件绑定的事件移除) 生成可编辑的 VNode render 函数
 * @param  {Object} AST
 * @return {Function} renderFunc 返回 render 函数
 */
const forgeRenderFunc = (ast) => {
  const code = forgeCompileFunc(ast).render
  try {
    return new Function(code)
  } catch (err) {
    return console.error(err)
  }
}

const forgeCompileFunc = (ast) => vueTemplateCompiler.compile.fromAST(ast)

/**
 * 基于样式选择器格式 (ie.「.root>.head>h1」) 生成 hash ID
 * @param  {Object} ASTNode
 * @return {String} hashID
 */
const genVusionID = (ASTNode) => {
  const selectors = []

  while (ASTNode) {
    const selector = ASTNode.classBinding ? ASTNode.classBinding.replace(/^\$style/, '') : ASTNode.tag
    selectors.push(selector)
    ASTNode = ASTNode.parent
  }
  return hash(selectors.reverse().join('>'))
}

/**
 * 重铸 AST，将原组件的事件禁用，添加 node id
 * @param  {Object} ASTNode 原 AST 树
 * @param  {String} moduleId 热替换模块 id
 * @return {Object} ASTNode
 */
const forgeAST = (ASTNode, moduleId) => {
  if (!ASTNode) {
    return
  }

  const nodeID = genVusionID(ASTNode)
  const attrsID = [{
    name: 'vusion-data-id',
    value: `"${nodeID}"`
  }, {
    name: 'vusion-module-id',
    value: `"${moduleId}"`
  }]
  const oldASTNode = Object.assign({}, ASTNode)

  if (!VNodeMap.get(nodeID)) {
    VNodeMap.set(nodeID, oldASTNode)
  }

  ASTNode.events && (ASTNode.events = null)

  if (ASTNode.hasOwnProperty('attrs')) {
    ASTNode.attrs = ASTNode.attrs.concat(attrsID)
  } else {
    ASTNode.attrs = attrsID
  }

  if (ASTNode.children) {
    ASTNode.children.map((child) => child.type === 1 ? forgeAST(child, moduleId) : child)
  }

  return ASTNode
}

const getVNodeMap = () => VNodeMap

exports.forgeRenderFunc = forgeRenderFunc
exports.forgeCompileFunc = forgeCompileFunc
exports.genVusionID = genVusionID
exports.forgeAST = forgeAST
exports.getVNodeMap = getVNodeMap
