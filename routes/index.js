
var doAction = require("./doAction")

currentView = false

exports.pageA = function (req,res ) {
  var assignment = doAction.GetAssignment(req.query.id)
  currentView = true
  res.render('index',{assignment,fburl: req.cookies.fburl, viewAlt: currentView})
}

exports.pageB = function (req,res ) {
  currentView = false
  var assignment = doAction.GetAssignment(req.query.id)
  res.render('index',{assignment,fburl: req.cookies.fburl, viewAlt: currentView})
}

exports.view = function (req,res ) {
  if(currentView) {
    res.redirect('/page_A')
  } else {
    res.redirect('/page_B')
  }
  // var assignment = doAction.GetAssignment(req.query.id)
  // res.render('index',{assignment,fburl: req.cookies.fburl})
}

exports.Assignment = function (req,res ) {
  res.render('Assignment')
}

exports.calendar = function (req,res ) {
  var temp = doAction.GetCalendarData()
  res.render('calendar',{data: temp })
}

exports.Todolist = function (req,res ) {
  res.render('Todolist')
}

exports.Planforme = function (req,res ) {
  var assignment = doAction.GetAssignment(req.query.id)
  res.render('Planforme',{assignment})
}


