		if($(this).prev().prop("disabled") && $("input[name='"+row+"']:checked").prop("id")) {
			console.log($("input[name='"+row+"']:checked").prop("id"))
			// enable the one that we clicked
			$(this).prev().prop("disabled",false)
			console.log(prevRow)
			console.log($(this).prev().prop("id"))
			console.log($("input[value='"+color+"']:checked").prop("id"))
			console.log($("input[value='"+prevColor+"']:checked").prop("id"))
			console.log($("input[value='"+prevColor+"'][name='"+prevRow+"']").prop("id"))
			// disable the color we are bumping out
			$("input[value='"+color+"']:checked").prop("disabled",true)
			// disable the one that was last checked in our row
			$("input[value='"+prevColor+"']:checked").prop("disabled",true)
			// Swtich the one we are replacing over
			$("input[value='"+prevColor+"'][name='"+prevRow+"']").prop("disabled",false)
			$("input[value='"+prevColor+"'][name='"+prevRow+"']").prop("checked",true)
