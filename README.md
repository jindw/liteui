#Lite UI System
a sample layout system,base on canvas api and native proxy.

Example:
=====

		<Layout width='100%' height='100%' background='#FFF' arguments="keys,contents,index">
			<List width="16%" height="100%" background='#ddd' 
				var='key' value="${keys}" observe="${index}">
				<Button color="#333" textAlign="center" action='${index = for.index}' width="100%" height="60" 
					background="${for.index == index? '#bbb':'#eee'}" value="  ${key}"/>
			</List>
			<Card id="content" background='#ddd' 
				width="84%" height="100%" left='16.2%' top='0'
				index="${index}" var="content" value='${contents}'>
				<Text padding="12" color="#000" background="#ccc"
				     action="${content.play()}"
				     width="100%" height="8%" value="${content.title}"/>
				<Layout width="100%" height="92%" top="8%" background="#ddd" >
					<Text padding="12" color="#333" width="100%" height="100%" 
						value="${content.value}"
						keywordPattern="/^[^\s]+/gm"
						keywordStyle="#933"
						
						/>
				</Layout>
			</Card>
		</Layout>   