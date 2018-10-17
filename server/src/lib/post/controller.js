import postManager from './manager'
import { handlerCustomError } from '../../middleware/error'
import { formatResult, errorResult } from '../../middleware/formatter'
import { isObjectId } from '../../middleware/util'

const createPost = async (req, res, next) => {
    console.log('createPost')

    try {
        postManager.insert(options, res)
        res.json(formatResult('文章添加成功'))
    }
    catch (e) {
        next(handlerCustomError(`文章添加失败${e.message}`), 200001)
    }
}

const findPostById = async (req, res, next) => {
    console.log('findPostById')
    const options = req.body
    const { postId } = options

    if (!postId) {
        return res.json(errorResult('postId不能为空', 201))
    }
    else if (!isObjectId(postId)){
        return res.json(errorResult('postId格式不正确', 203))
    }
    

    try {
        const result = await postManager.findOneById(postId)
        if (!result) {
            return res.json(errorResult('文章不存在', 202))
        }
        else {
            return res.json(formatResult(result))
        }
    }
    catch (e) {
        next(handlerCustomError(`文章查询失败：${e.message}`, 200002))
    }
}

const updatePost = async (req, res, next) => {
    console.log('updatePost')
    const options = req.body
    const { postId } = options
    console.log(options)
    const result = await postManager.updateOne(options)
}


export default {
    createPost,
    findPostById,
    updatePost
}