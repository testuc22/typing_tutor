var typing = {
	vars:{
	 	_exercise_paragraph_block : $('.exercise-paragraph'),
	 	_test_block               : $('#test-area'),
	 	_total_char 			  : "",
	 	active_char               : "",
	 	correct_char              : 0,
	 	wrong_char                : 0,
	 	typing_counter            : 0,
	 	_total_count_block        : $('.results .total'),
	 	_correct_count_block      : ''
	},	
	init:function(){
		this.vars._total_char= this.vars._exercise_paragraph_block.text().length;

		this.init_exercise_paragraph();
		this.initEvents();
	},
	init_exercise_paragraph:function(){
		let paragraph = this.vars._exercise_paragraph_block.text();
		// console.log(paragraph,"paragraph");
		var _html = '';
		for (let i = 0; i < paragraph.length; i++) {
		  	_html += `<span class="normal-text">${paragraph.charAt(i)}</span>`;
		}
		if(_html) {
			this.vars._exercise_paragraph_block.html(_html);
			this.highlight_character(0);
		}
	},
	highlight_character:function(index){
		this.vars._exercise_paragraph_block.find('.normal-text').removeClass('active-char');
		this.vars._exercise_paragraph_block.find('.normal-text:eq('+index+')').addClass('active-char');
	},
	initEvents:function(){
		var parent_obj = this; 
		this.vars._test_block.on('keypress',function(evt){
			var charCode = evt.which || evt.keyCode;
			var charStr = String.fromCharCode(charCode);

		   	if (/[A-Za-z0-9\!\@#\$%\^&\*\(\)\-\_+= ]+$/.test(charStr)) {
		       	var isValidChar = parent_obj.validateCharacter(charStr);
		   	}	
		   	return;
		})
	},
	validateCharacter:function(char){
		var index = this.vars.typing_counter;
		var originalChar = 	this.vars._exercise_paragraph_block.find('.normal-text:eq('+index+')').text();
		console.log(index,"index",originalChar,"originalChar",char,"typed char");
		if(char === originalChar){
			console.log("correct");
			this.vars.typing_counter++;
			this.highlight_character(this.vars.typing_counter);
		}
		else{
			console.log("wrong");
			this.highlight_wrong_character();
		}
	},
	highlight_wrong_character:function(){
		var index = this.vars.typing_counter;
		this.vars._exercise_paragraph_block.find('.normal-text').removeClass('active-char');
		var next_char = index+1;
		this.vars._exercise_paragraph_block.find('.normal-text:eq('+next_char+')').addClass('active-char');
		this.vars._exercise_paragraph_block.find('.normal-text:eq('+index+')').addClass('wrong-char');
		this.vars.typing_counter++;
	}
}

var obj =  typing;
obj.init();