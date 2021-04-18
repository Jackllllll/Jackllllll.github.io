function click(pagenumber){
	$.get("http://www.vincentcto.com/st1/click.php",{'pagenumber':pagenumber,'datetime':new Date()})
}
function share(){
	$.get("http://www.vincentcto.com/st1/share.php",{'share':1,'datetime':new Date()})
}
