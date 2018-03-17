var matching_array = ['~','~', '!', '!', '@', '@', '#', '#', '$', '$', '%', '%', '^', '^', '&', '&', '*', '*', '+', '+', '=', '=', '|', '|'];
var matching_values = [];
var matching_tile_ids = [];
var tiles_flipped = 0;
Array.prototype.matching_tile_shuffle = function(){
    var i = this.length, j, temp;
    while(--i > 0){
        j = Math.floor(Math.random() * (i+1));
        temp = this[j];
        this[j] = this[i];
        this[i] = temp;
    }
}
function newBoard(){
	tiles_flipped = 0;
	var output = '';
    matching_array.matching_tile_shuffle();
	for(var i = 0; i < matching_array.length; i++){
		output += '<div id="tile_'+i+'" onclick="matchingFlipTile(this,\''+matching_array[i]+'\')"></div>';
	}
	document.getElementById('matching_board').innerHTML = output;
}
function matchingFlipTile(tile,val){
	if(tile.innerHTML == "" && matching_values.length < 2){
		tile.style.background = '#000';
		tile.style.color = "#FFF"
		tile.innerHTML = val;
		if(matching_values.length == 0){
			matching_values.push(val);
			matching_tile_ids.push(tile.id);
		} else if(matching_values.length == 1){
			matching_values.push(val);
			matching_tile_ids.push(tile.id);
			if(matching_values[0] == matching_values[1]){
				tiles_flipped += 2;
				// Clear both arrays
				matching_values = [];
            	matching_tile_ids = [];
				// Check to see if the whole board is cleared
				if(tiles_flipped == matching_array.length){
					alert("Congratulations! You've won! \nGenerating new board...");
					document.getElementById('matching_board').innerHTML = "";
					newBoard();
				}
			} else {
				function flip2Back(){
				    // Flip the 2 tiles back over
				    var tile_1 = document.getElementById(matching_tile_ids[0]);
				    var tile_2 = document.getElementById(matching_tile_ids[1]);
				    tile_1.style.background = 'url(res/cover.png) no-repeat';
            	    tile_1.innerHTML = "";
				    tile_2.style.background = 'url(res/cover.png) no-repeat';
            	    tile_2.innerHTML = "";
				    // Clear both arrays
				    matching_values = [];
            	    matching_tile_ids = [];
				}
				setTimeout(flip2Back, 700);
			}
		}
	}
}