#Lite UI System
a sample layout system,base on canvas api and native proxy.

Function
----
* dirty flag and GPU opotimize
* model bind


Example:
----
``` xml
<Layout width='100%' height='100%' background='#FFF'
	arguments="keys,contents,index">
	<List width="16%" height="100%"
		background='#ddd' 
		var='key' value="${keys}">
		<Button width="100%" height="60" 
			value="${key}" textAlign="center" action='${index = for.index}' 
			color="#333" background="${for.index == index? '#bbb':'#eee'}"/>
	</List>
	<Card id="content" background='#ddd' 
		width="84%" height="100%" left='16.2%'
		index="${index}" var="content" value='${contents}'>
		<Text padding="12" width="100%" height="8%"
			color="#000" background="#ccc"
			action="${content.play()}"
			value="${content.title}"/>
		<Layout width="100%" height="92%" top="8%"
			background="#ddd" >
			<Text padding="12" color="#333" width="100%" height="100%" 
				value="${content.value}"
				keywordPattern="/^[^\s]+/gm"
				keywordStyle="#933"/>
		</Layout>
	</Card>
</Layout>   
