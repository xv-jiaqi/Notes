var express = require('express');
var router = express.Router();

// 编码功能的函数 
function html_encode(str) {
  if (!str) return;
  return str
    .replace(/&/g, '&')
    .replace(/</g, '<')
    .replace(/>/g, '>')
    .replace(/\s/g, ' ')
    .replace(/\'/g, '\'')
    .replace(/\"/g, '"')
    .replace(/\n/g, '<br>');
}

/* GET home page. */
router.get('/', function (req, res, next) {
  res.set('X-XSS-Protection', 0);
  res.render('index', {title: 'XSS', xss: req.query.xss});
});

// 设置评论 
const comments = {};  // 评论缓存到内存

router.get('/comment', function (req, res, next) {
  res.render('comment', {title: 'XSS'});
});

router.get('/pushComment', function (req, res, next) {
  comments.v = html_encode(req.query.comment);
  res.json('ok');
});

// 获取评论 
router.get('/getComment', function (req, res, next) {
  res.json({comment: comments.v});
});


module.exports = router;
