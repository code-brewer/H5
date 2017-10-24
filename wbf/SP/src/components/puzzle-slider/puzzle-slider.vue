<template>
	<div class="wap-puzzle-slider">
		<div class="board-wrap">
			<p>第 <span>{{level}}</span> 关</p>
			<div class="board">
				<section class="start" @click="start()" v-show="!isStart">
					<div class="overlay"></div>
					<div class="play" v-show="startDuration==''" :style="{background: 'url('+$root.basePath+'src/images/play.png'+')', backgroundRepeat:'no-repeat'}"></div>
					<div class="text" v-show="startDuration&&startDuration!=''">{{startDuration}}</div>
					<img :src="images[imgPointer]">
				</section>
				<div v-for="el in elsArr" data-tile="{{el.num}}" class="s s{{el.num}}"
		    				:style="{width: el.width, paddingBottom: el.paddingBottom, top: el.top, left: el.left}"
		    				@touchstart="moveClicked(el.num)">
					<div class="i" :style="{background: 'url('+images[imgPointer]+')', backgroundSize: '100%', width: el.sub.width, paddingBottom: el.sub.paddingBottom, top: el.sub.top, left: el.sub.left}"></div>
				</div>
			</div>
		</div>
		<div class="intro" v-show="!isStart">
			<h3>点击开始游戏</h3>
			<h4>请在{{duration}}秒内完成拼图</h4>
		</div>
	</div>
</template>
<script>
	// import {getCreds} from '../../service'
	export default {
		props: {
			// 当前关卡
			level: {
				type: Number,
				default: 1
			},
			// 方块数量
			squares: {
				require: true,
				type: Number,
				default: 3
			},
			// 游戏素材集合
			images: {
				type: Array,
				default: function() {
					return []
				}
			},
			// 歌单素材集合
			urls: {
				type: Array,
				default: function() {
					return []
				}
			},
			
			// 当前关卡时间
			duration: {
				type: Number,
				default: 10
			},

			state: {
				type: String,
				default: ''
			},
			// 记录
			track: {
				require: true,
				type: String
			},
			glock: {
				require: true
			}
		},

		data() {
			return {
				// 是否开始
				isStart: false,
				// 开始倒计时
				startDuration: '',
				// 当前游戏素材指针
				imgPointer: 0,

				board: [],
				freeX: null, 
				freeY: null, 
				movedX: null, 
				movedY: null,

				elsArr: []

			}
		},

		ready() {
			this.imgPointer = Math.floor(Math.random()*this.images.length)
			

		},

		methods: {
			start() {
				if(this.startDuration) return;

				this.startDuration = 4;
				this.startTimer();

				this.state = 'startBefore'
				
			},
			startTimer() {
				this.startDuration--;
				if(this.startDuration<=0) {
					this.isStart = true;
					this.createBoard();
					this.shuffleBoard()
					this.drawBoard()
					this.state = 'startAfter'
					return;
				}

				setTimeout(function(){
					this.startTimer()
				}.bind(this), 1000)		
				
			},
			createBoard() {
				this.board = [];

				var num = 1;
				for (var y = 0; y < this.squares; y++) {
					var row = [];
					for (var x = 0; x < this.squares; x++) {
						row.push(num++);
					};
					this.board.push(row);
				}
				this.freeX = this.squares - 1;
		    	this.freeY = this.squares- 1;
		    	this.board[this.freeY][this.freeX] = 0;
			},
			drawBoard() {
				var step = 100 / this.squares;
				this.elsArr = [];

				for (var y = 0; y < this.squares; y++) {
					for (var x = 0; x < this.squares; x++) {
						if (this.board[y][x] != 0) {
							var el = {
								num: this.board[y][x], 
								width:  (100 / this.squares) + '%',
								paddingBottom: (100 / this.squares) + '%',
								top: step * y + '%',
								left: step * x + '%',
								sub: {
									width: (this.squares * 100) + '%',
									paddingBottom: (this.squares * 100) + '%',
									top: (Math.floor((this.board[y][x] - 1) / this.squares) * -100) + '%',
									left: (((this.board[y][x] - 1) % this.squares) * -100) + '%'
								}
							}

							this.elsArr.push(el)
						}
					};
				}
			},
			shuffleBoard() {
				// var index = 0;
				// var initData  = [];
				// if(this.glock) {
				// 	initData = this.glock.split(',');
				// }
				// else {
				// 	var arr = [];
				// 	for (var i = 0; i < this.squares*this.squares; i++) {
				// 		arr.push(i);
				// 	};
				
				// 	while (arr.length) {
				// 		var index = Math.floor(Math.random()*arr.length);
				// 		initData.push(arr[index])
				// 		arr.splice(index, 1);
				// 	}
				// }

				
		

				// for (var y = 0; y < this.squares; y++) {
		  //   		for (var x = 0; x < this.squares; x++) {
		  //   			if (index < initData.length) {
		  //   				this.board[y][x] = parseInt(initData[index++]);
		  //   				if (this.board[y][x] == 0) {
		  //   					this.freeX = x;
		  //   					this.freeY = y;
		  //   				}
		  //   			} else {
		  //   				return false;
		  //   			}
		  //   		}
		  //   	}
		    	 var moves = this.squares * 500;
			    	for (var i = 0; i < moves; i++) {
			    		this.moveTile(0);
			    	};

			},
			moveClicked(num) {
		    	var tileX = 0,
			    	tileY = 0,
			    	found = false;
		    	var moves = 0;
		    	for (var y = 0; y < this.squares; y++) {
		    		if (this.board[y][this.freeX] == num) {
		    			tileX = this.freeX;
		    			tileY = y;
		    			found = true;
		                // move up or down
		                moves = tileY - this.freeY;
		                if (moves > 0) {
		                	for (var i = 0; i < moves; i++) {
		                		this.moveTile(1);
		                        //drawBoard();
		                        this.updateTile();
		                    }
		                } else {
		                	moves = Math.abs(moves);
		                	for (var i = 0; i < moves; i++) {
		                		this.moveTile(2);
		                        //drawBoard();
		                        this.updateTile();
		                    }
		                }
		                break;
		            }
		        }
		        if (!found) {
		        	for (var x = 0; x < this.squares; x++) {
		        		if (this.board[this.freeY][x] == num) {
		        			tileX = x;
		        			tileY = this.freeY;
		        			found = true;
		                    // move left or right
		                    moves = tileX - this.freeX;
		                    if (moves > 0) {
		                    	for (var i = 0; i < moves; i++) {
		                    		this.moveTile(3);
		                            //drawBoard();
		                            this.updateTile();
		                        }
		                    } else {
		                    	moves = Math.abs(moves);
		                    	for (var i = 0; i < moves; i++) {
		                    		this.moveTile(4);
		                            //drawBoard();
		                            this.updateTile();
		                        }
		                    }
		                    break;
		                }
		            }
		        }
		        if (found) {
		        	if(this.track||this.track=='') {
		        		if(this.track.length>0){
			        		this.track += ',';
			        	}
			        	this.track += num;
		        	}
		        	

		        	if(this.isSolved()){
		        		this.showSolved();
		        	}
		        }
		    },

		    moveTile(dir) {
		    	if (dir == 0) {
		    		dir = Math.floor(Math.random() * 4) + 1;
		    		if (dir == 2 && this.freeY == 0) {
		    			dir = 1;
		    		} else if (dir == 1 && this.freeY == this.squares - 1) {
		    			dir = 2;
		    		} else if (dir == 4 && this.freeX == 0) {
		    			dir = 3;
		    		} else if (dir == 3 && this.freeX == this.squares - 1) {
		    			dir = 4;
		    		}
		    	}
		    	switch (dir) {
		            case 1: // up
		            if (this.freeY < this.squares - 1) {
		            	this.board[this.freeY][this.freeX] = this.board[this.freeY + 1][this.freeX];
		            	this.movedY = this.freeY;
		            	this.movedX = this.freeX;
		            	this.freeY++;
		            	this.board[this.freeY][this.freeX] = 0;
		            }
		            break;
		            case 2: // down
		            if (this.freeY > 0) {
		            	this.board[this.freeY][this.freeX] = this.board[this.freeY - 1][this.freeX];
		            	this.movedY = this.freeY;
		            	this.movedX = this.freeX;
		            	this.freeY--;
		            	this.board[this.freeY][this.freeX] = 0;
		            }
		            break;
		            case 3: // left
		            if (this.freeX < this.squares - 1) {
		            	this.board[this.freeY][this.freeX] = this.board[this.freeY][this.freeX + 1];
		            	this.movedY = this.freeY;
		            	this.movedX = this.freeX;
		            	this.freeX++;
		            	this.board[this.freeY][this.freeX] = 0;
		            }
		            break;
		            case 4: // right
		            if (this.freeX > 0) {
		            	this.board[this.freeY][this.freeX] = this.board[this.freeY][this.freeX - 1];
		            	this.movedY = this.freeY;
		            	this.movedX = this.freeX;
		            	this.freeX--;
		            	this.board[this.freeY][this.freeX] = 0;
		            }
		            break;
		        }
		    },

		    updateTile() {
		    	var step = 100 / this.squares;
		    	for (var i = 0; i < this.elsArr.length; i++) {
		    		if(this.elsArr[i].num == this.board[this.movedY][this.movedX]) {
		    			this.elsArr[i].top = this.movedY * step + "%"
		    			this.elsArr[i].left = this.movedX * step + "%"
		    		}
		    	};

		    },
		    isSolved() {
		    	if (this.freeX != this.squares - 1 || this.freeY != this.squares - 1) {
		    		return false;
		    	}
		    	var num = 0;
		    	for (var y = 0; y < this.squares; y++) {
		    		for (var x = 0; x < this.squares; x++) {
		    			if (++num < (this.squares * this.squares)) {
		    				if (this.board[y][x] != num) {
		    					return false;
		    				}
		    			}
		    		}
		    	}
		    	return true;
		    },
		    showSolved() {
		    	this.startDuration = '';

		    	this.state = 'success'
		    }
		}
	}
</script>

<!-- <style lang="scss" src="./puzzle-slider.scss"></style> -->
<style lang="sass">
 	@function px2rem($px) {
		$return: #{($px / 8px / 2)}rem;

		@return $return;
	}
	.wap-puzzle-slider {
  	  div.board-wrap {
        width: px2rem(600px);
        margin: px2rem(10px) auto;
        background: #fff;
        padding: px2rem(10px);
        margin-top: px2rem(15px);
        z-index: 1;
        position: relative;
        > p {
            font-size: px2rem(24px);
            color: #000;
            margin: 0 0 1rem;
            text-align: center;
            > span {
                font-size: px2rem(32px);
                // color: $positive;
                font-weight: bold;
            }
        }
        div.board {
            width: 100%;
            border: px2rem(1px) solid #acacac;
            padding-bottom: 100%;
            position: relative;
            a {
                background-color: #609732;
                color: white;
                padding: px2rem(5px);
                display: inline-block;
                vertical-align: top;
                *vertical-align: auto;
                *zoom: 1;
                *display: inline;
                margin-top: px2rem(10px);
                text-decoration: none;
                border: px2rem(2px) solid #8abd5f;
                border-bottom-color: #3e7213;
                border-right-color: #3e7213;
            }
            div.s {
                height: 0;
                overflow: hidden;
                position: absolute;
                
                z-index: 9;
                -moz-transition: top 0.3s ease-out, left 0.3s ease-out;
                -o-transition: top 0.3s ease-out, left 0.3s ease-out;
                -webkit-transition: top 0.3s ease-out, left 0.3s ease-out;
                transition: top 0.3s ease-out, left 0.3s ease-out;
                &:after {
                    content: '';
                    position: absolute;
                    top: 0;
                    bottom: 0;
                    left: 0;
                    right: 0;
                    -moz-box-sizing: border-box;
                    -webkit-box-sizing: border-box;
                    box-sizing: border-box;
                    border: px2rem(1px) solid white;
                    border-top-color: gray;
                    border-left-color: gray;
                }
                
                .i {
                    content: '';
                    position: absolute;
                    height: 0;
                    background-repeat: no-repeat;
                    background-position: center center;
                    -moz-background-size: cover;
                    -o-background-size: cover;
                    -webkit-background-size: cover;
                    background-size: cover;
                }
            }
            &.solved {
                background-repeat: no-repeat;
                background-position: center center;
                -moz-background-size: cover;
                -o-background-size: cover;
                -webkit-background-size: cover;
                background-size: cover;
                div {
                    display: none;
                }
            }
            .start {
                position: absolute;
                left: 0;
                bottom: 0;
                top: 0;
                right: 0;
                text-align: center;
                .overlay {
                    position: absolute;
                    left: 0;
                    top: 0;
                    bottom: 0;
                    right: 0;
                }
                .overlay {
                    z-index: 1;
                    opacity: .5;
                    background: #000;
                }
                img {
                    z-index: 0;
                    position: relative;
                    width: 100%;
                    height: 100%;
                }
                .play {
                    position: absolute;
                    top: 50%;
                    left: 50%;
                    width: px2rem(246px);
                    height: px2rem(246px);
                    margin-top: px2rem(-123px);
                    margin-left: px2rem(-123px);
                    background-size: 100%;
                    z-index: 5;
                }
                .text {
                    font-size: 100px;
                    color: #fff;
                    position: absolute;
                    left: 50%;
                    top: 50%;
                    margin-left: px2rem(-100px);
                    margin-top: px2rem(-100px);
                    z-index: 3;
                    border: px2rem(10px) solid #fff;
                    height: px2rem(200px);
                    line-height: px2rem(195px);
                    width: px2rem(200px);
                    border-radius: px2rem(100px);
                    -webkit-border-radius: px2rem(100px);
                    -o-border-radius: px2rem(100px);
                }
            }
        }
    }
    div.intro {
        text-align: center;
        h3,
        h4 {
            color: #254268;
            font-family: 黑体;
            line-height: 40px;
        }
        h3{
        	font-size: 40px;
        	margin-top: 30px;
        }
    }
}

</style>