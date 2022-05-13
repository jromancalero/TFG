
let x = 0;
let y = 0;

let div = document.querySelector('#gancho');
console.log(div)
let gacahaContainer = document.querySelector('#gacha__container');


window.addEventListener("keydown", (e)=>{
    moveBall(e,".gancho",".gacha__container")
})


function moveBall(e,gancho,gacha_container){
    const ball = document.querySelector(gancho);
    const stage = document.querySelector(gacha_container);
    limitsBall = ball.getBoundingClientRect();
    limitsStage = stage.getBoundingClientRect();
    let posotionBallXTranslate = 0;
    console.log(e.key);
    console.log(limitsBall,limitsStage);

    switch(e.key){
        case 'ArrowUp': 
            e.preventDefault();
            if(limitsBall.top < limitsStage.top)y++;
            y--;
        break;
        case 'ArrowDown': 
            e.preventDefault();
            if(limitsBall.bottom > limitsStage.bottom)y--;
            y++;
        break;
        case 'ArrowLeft': 
            e.preventDefault();
            if(limitsBall.left < 15)x++;
            x--;
            break;
        case 'ArrowRight': 
            e.preventDefault();
            if(limitsBall.right > 505)x--;
            x++;
            console.log(x);
        break;
        case 'Enter':
            posotionBallXTranslate = x*5;
            console.log(posotionBallXTranslate);
            ball.animate([
                {left:limitsBall.left},
                {transform:`translate(${posotionBallXTranslate}px,300px)`},
            ],{
                duration: 2000,
                direction:'normal'
            })
        break;
    }
    ball.style.transform = `translate(${x*5}px,${y*5}px)`;
    console.log(posotionBallXTranslate);
}
