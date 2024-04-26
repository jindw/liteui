// //   Lexer,
// //   OrMethodOpts,
// //   tokenMatcher
// // } from 'chevrotain'
// let Lexer = require('chevrotain').Lexer;

// let TokenType = require('chevrotain').TokenType;

// let createToken = require('chevrotain').createToken;

// // abstract for + -
//  const AdditionOp = createToken({
//   name: 'AdditionOp',
//   pattern: Lexer.NA,
// })
//  const PlusOp = createToken({name: 'PlusOp', pattern: /\+/, categories: AdditionOp})
//  const MinusOp = createToken({name: 'MinusOp', pattern: /-/, categories: AdditionOp})

// // abstract for * /
//  const MultiplicationOp = createToken({
//   name: 'MultiplicationOp',
//   pattern: Lexer.NA,
// })
//  const TimesOp = createToken({name: 'TimesOp', pattern: /\*/, categories: MultiplicationOp})
//  const DivOp = createToken({name: 'DivOp', pattern: /\//, categories: MultiplicationOp})

//  const NamedExpression = createToken({
//   name: 'NamedExpression',
//   pattern: /[A-Za-z\u00C0-\u02AF_][A-Za-z0-9\u00C0-\u02AF._]*/
// })

// var lex = new Lexer([NamedExpression,PlusOp,MinusOp,TimesOp,DivOp],{ensureOptimizations: true})
// let ls = lex.tokenize("a+b-c*d/e");
// console.log(ls)


var s = "AF61200~AF612992018/10/298:00AF63300~AF633992019/6/68:00AF64700~AF647992019/1/218:00AF70200~AF702992019/7/158:00AF73400~AF734992018/10/298:00AF82000~AF820992019/1/218:00AF87700~AF877992018/1198:00AF90400~AF904992019/5/108:00AFN8800~AFN88992019/3/218:00AFP2200~AFP229920197/308:00AFP6400~AFP64992018/1198:00AFQ7600~AFQ769920194/138:00AFR0700-AFR07992019/4/238:00AFR2000~AFR209920193/138:00AFS2200~AFS22992019/3/298:00AFS2600~AFS26992019/2/28:00AFS4000~AFS40992019/1/88:00AFT3100~AFT31992019/6/258:00AFT7000~AFT70992019/5/208:00AFT8300~AFT83992019/8/98:00AFU2300~AFU23992019/4/238:00AFU7900~AFU79992019/2/128:00AFV4100~AFV419920197/158:00AFV5600~AFV56992018/12/288:00";
var s2 = `
2022-11-26  AFV1700
2022-11-09  AF74200
2022-10-28  AFV7500 
2022-10-28  AFS6100
2022-10-18 AF98900 
2022-10-18 AFN8200
2022-10-08  AF82300
2022-05021 AF73200

2018-09-23  AF77300
2018-09-23  AF81700
2018-10-05  AF96600
2018-12-06 AFY2000
2019-07-30 AFY3100
2019-06-06 AFY6700
2018-11-22 AFZ9000
2019-04-12 AFX8700
2018-12-06 AFX7200
2019-07-04 AFX6600
2018-12-06 AFX5200
2019-02-02 AFX4700
2019-02-24 AFX1300

2019-06-13 AFW5000
2018-12-17 AFW1000
2018-11-22 AFW0400
`

let m,exp = /(AF\w{5})~AF\w{5}(?:(\d\d\d\d\/?\d{1,2}\/?\d{1,2})\d+\:\d{2})?/g;
while(m = exp.exec(s)){
	console.log(m[1], (m[2] || '').replace(/(\d\d\d\d)\/?(\d{1,2})\/?(\d+)/,   (a,y,m,d)=>y+'-'+(m.length ==1? '0'+m:m) +'-'+(d.length ==1? '0'+d:d)   ))
}