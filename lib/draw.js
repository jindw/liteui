// class Draw {
//   constructor(el) {
//     this.el = el;
//     this.width = el.width;
//     this.height = el.height;
//     this.offsetEL = el.cloneNode();
//     this.ctx = this.el.getContext('2d');
    
//   }

//   flush(){
//   	//var ctx = this.el.getContext('2d');
//   	//ctx.putImageData(this.ctx.getImageData(0,0,this.width,this.height),0,0)

//   }
//   clear() {
//     this.ctx.clearRect(0, 0, this.width, this.height);
//     return this
//   }
//   setFont(font){
//   	this.ctx.font= font;//"25px Arial";
//   	return this;
//   }
//   setStrokeStyle(strokeStyle){
//   	this.ctx.strokeStyle = strokeStyle;
//   	return this;
//   }
//   save() {
//     this.ctx.save();
//     this.ctx.beginPath();
//     return this;
//   }

//   restore() {
//     this.ctx.restore();
//     return this;
//   }

//   beginPath(x,y) {
//     this.ctx.beginPath();
//     return this;
//   }



//   closePath() {
//     this.ctx.closePath();
//     return this;
//   }

//   measureText(text) {
//     return this.ctx.measureText(text);
//   }

//   rect(x, y, width, height) {
//     this.ctx.rect(x, y, width, height);
//     return this;
//   }

//   scale(x, y) {
//     this.ctx.scale(x, y);
//     return this;
//   }

//   rotate(angle) {
//     this.ctx.rotate(angle);
//     return this;
//   }

//   translate(x, y) {
//     this.ctx.translate(x, y);
//     return this;
//   }

//   transform(a, b, c, d, e) {
//     this.ctx.transform(a, b, c, d, e);
//     return this;
//   }

//   fillRect(x, y, w, h) {
//     this.ctx.fillRect(x, y, w, h);
//     return this;
//   }

//   strokeRect(x, y, w, h) {
//     this.ctx.strokeRect(x, y, w, h);
//     return this;
//   }

//   fillText(text, x, y, maxWidth) {
//     this.ctx.fillText(text, x, y, maxWidth);
//     return this;
//   }

//   strokeText(text, x, y, maxWidth) {
//     this.ctx.strokeText(text, x, y, maxWidth);
//     return this;
//   }
// }

// export default {};
// export {
//   Draw
// }
