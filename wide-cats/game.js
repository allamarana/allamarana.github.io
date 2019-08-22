let app = new PIXI.Application({
    width: document.documentElement.clientWidth, 
    height: document.documentElement.clientHeight,
    antialias: true,
    transparent: 0
});
document.body.appendChild(app.view);
app.renderer.backgroundColor = 0x99A0AE;

var pictures = [
    '/assets/ready/1.jpg',
    '/assets/ready/2.jpg',
    '/assets/ready/3.jpg',
    '/assets/ready/4.jpg',
    '/assets/ready/5.jpg',
    '/assets/ready/6.jpg',
    '/assets/ready/7.jpg',
    '/assets/ready/8.jpg',
];


var sprites = [...pictures, ...pictures]
.map(picture => {
    var sprite = PIXI.Sprite.from(picture);
    sprite.picture = picture;
    return sprite;
});



function shuffle(a) {
    for (let i = a.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [a[i], a[j]] = [a[j], a[i]];
    }
    return a;
}

// shuffle(sprites);

var checked = [];
counter = 0;

for (var i = 0; i < sprites.length; i++) {
    
    var picNumX = 0;
    var picNumY = 0;
    var borderX = 0;
    var borderY = 0;
    
    if(app.view.width >= 1000 ){
        
        picNumX = 4;
        picNumY = 4;
        borderX = 10;
        // borderY = 5;
        
    }
    if (app.view.width < 1000 ){
        
        picNumX = 2;
        picNumY = 8;
        borderX = 5;
        // borderY = 5;
        
        
    }
    
    
    sprites[i].position.x = borderX + (i % picNumX) * (app.view.width/picNumX);
    sprites[i].position.y = borderY + (Math.floor(i/picNumX)) * (app.view.height/picNumY + 1);
    
    sprites[i].scale.x = (app.view.width / picNumX - 20) / 400;
    // sprites[i].scale.y = (app.view.height / picNumY - 10) / 200;
    sprites[i].scale.y = sprites[i].scale.x;
    const mask = new PIXI.Graphics();
    mask.beginFill(0xFFFFFF);
    mask.drawRect(sprites[i].position.x, sprites[i].position.y, app.view.width / picNumX - 20, app.view.height / picNumY - 10);
    mask.endFill();
    sprites[i].mask = mask;

    sprites[i].tint = 0;
    sprites[i].interactive = true;
    sprites[i].number = i;
    
    app.stage.addChild(sprites[i]);
    sprites[i].on('pointertap', event => {
        if (checked.length === 2) return;
        if (checked.length < 2 && event.target.number !== checked[0]){
            event.target.tint = 0xffffff;
            checked.push(event.target.number);
        } 
        if (checked.length === 2 && sprites[checked[1]].picture === sprites[checked[0]].picture){
            sprites[checked[0]].interactive = false;
            sprites[checked[1]].interactive = false;
            checked = [];
            counter++;
        }
        if (checked.length === 2 && sprites[checked[0]].picture!== sprites[checked[1]].picture) {
            
            setTimeout (() => {
                sprites[checked[0]].tint = 0;
                sprites[checked[1]].tint = 0;
                checked = [];
                
            }, 500);
        }
        if (counter === pictures.length) {
            setTimeout(() => alert('You win!'), 500);
        } 
    });
    
    
}
