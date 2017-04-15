var playerCount;
var colors = ["#e91e63","#9c27b0","#3f51b5","#2196f3","#00bcd4","#8bc34a","#cddc39","#ffeb3b","#ff9800"]
var tmpl = $.templates(
		`<input type="radio" name="cor{{:name}}" id="cor{{:index}}" value="{{:color}}" />
	  	<label for="cor{{:index}}" class="selectBox"></label>`);

var selectedColors = []

function createColorSelectors(numPlayers){
	playerCount = numPlayers
	$("form").text("")
	for(var i = 0; i < numPlayers; i++){
		var id = "colorBox"+i
		$("form").append(
`<div id='player#${i}' class='player'>
	<input type='text' placeholder='player${i+1}' maxlength="7"/>
	<div id='${id}' class='colorBox'></div>
</div>`)
		createColors(colors,"#"+id)
	}
}

function createColors(colors,id) {
	$("#final").attr("hidden",true)
	selectedColors = []
	colors.forEach((color, i) => {
		var renderd = tmpl.render({
			color: color,
			index: id.slice(-1)+i,
			name:id.slice(-1)
		})
		$(renderd)
			.css({ backgroundColor: color,
				   borderColor: color })
			.mouseover( function() { $(this).css("border-color","#666") })
			.mouseout( function() { $(this).css("border-color",color) })
			.click(onClick)
			.appendTo(id)
	})
}

var onClick = function () {
	if($(this).prop("tagName") != "LABEL"){return}
	var row = $(this).prop("for").slice(-2,-1)
	var color = $(this).prev().val()
	var prevColor = selectedColors[row]
	if($(this).prev().prop("disabled")) {return}
	$("input[value='"+prevColor+"']:disabled").prop("disabled",false)
	selectedColors[row] = color
	console.log(selectedColors)
	$("input[value='"+color+"']").prop("disabled",true)
	$(this).prev().prop("disabled",false)
	$("input:disabled").next().css("opacity","0.1")
	$("input:not(:disabled)").next().css("opacity","1")

	if(selectedColors.filter(color => color).length >= playerCount){
		$("#final").attr("hidden",false)
	}
}

function submit(){
    var names = $('input[type=text]').get().map((node,i) => $(node).val()?$(node).val():"player"+(i+1))
    var players = selectedColors.reduce((arr,color,i) => {
        arr.push({name:names[i], color:color})
        return arr
    },[])
    $('main').remove()
    $('*').css({margin:0,padding:0})
    $('body').prepend(`<canvas id = "canvas"></canvas>`)
    startGame(players)
}
