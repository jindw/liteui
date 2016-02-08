var fs = require('fs')
var jsi = require('jsi/lib/cmd')
var cmd = ['node','cmd.js', process.argv[2] || 'a']
var files = [
/* */
"example-greek-alphabet.js#load",
"liteui/liteui.js",
"liteui/native-canvas.js",
"liteui/ui-list.js",
"liteui/ui-picker.js",
"liteui/ui-text.js",
"liteui/uibase.js",
"liteui/uiconfig.js",
"liteui/xul.js",

].map(function(p){return 'assets/'+p});
files.push(
"xmldom",
"xmldom/dom",
'xmldom/sax'
)
cmd.push('-f','true' ,'-ns','greek','-o','temp.js')
//console.log(cmd)
jsi.cmd(cmd.concat(files))

if(/^m(erge)?$/.test(process.argv[2])){
	var html = fs.readFileSync('./index.html').toString();
	var js = fs.readFileSync('./temp.js').toString().replace(/^\s+(.*)/gm,'$1');
	//fs.unlink('./temp.js')
	
	var tokens = html.match(/([\s\S]*?)<script\s[\s\S]*?<\/script>([\s\S]+)$/);
	var output = tokens[1] + '<script>'+js+'</script>'+tokens[2];
	fs.writeFile('./output.html',output);
}
//console.log("fileout:"+output)

//jsi.cmd(cmd.concat('m',files))
