const worker = new SharedWorker('worker.js')
worker.port.start();

worker.port.postMessage({
    scriptNo: 1,
    command: "store_port"
})

worker.port.postMessage({
    command: "get_data",
    scriptNo: 1
});

worker.port.addEventListener('message', (mes) => {
    console.log(mes.data);
	//alert(mes.data);
})

function send(){
    worker.port.postMessage({
        command: "send_data",
        text: "Message from script 1",
        scriptNo: 1
    })
}

function draw() {
    // Utworzenie obiektu klasy Szachownica
    const szachownica = new Szachownica();
    
}
class Pole{
    constructor(x, y, szer, wys, gracz){
        this.x = x;
        this.y = y;
        this.szer = szer;
        this.wys = wys;
        this.gracz = gracz;
        this.margin = 5;
        this.clicked = false;

        this.canvas = document.getElementById("plansza");
        this.ctx = this.canvas.getContext('2d');
        if(this.gracz == "bi") this.color = 100;
        else if(this.gracz == "cz") this.color = 200;

        this.odswiez();
    }

    zaznacz(){
        this.clicked=true;
        this.odswiez();
    }

    odznacz(){
        this.clicked=false;
        this.odswiez();
    }

    odswiez(){
        if(this.gracz != "none"){
            if (this.clicked){
                this.ctx.fillStyle = `rgb(0,255,60)`;
            }else{
                this.ctx.fillStyle = `rgb(${this.color},${this.color},${this.color})`;
            }
            const radius = this.szer/2 - 2*this.margin
            const centerX = this.x + this.szer/2;
            const centerY = this.y + this.szer/2;
            this.ctx.beginPath();
            this.ctx.arc(centerX, centerY, radius, 0, 2 * Math.PI);
            this.ctx.fill();
        }
    }

    getCoordinates(){
        return [this.x, this.y];
    }

    getPlayer(){
        return this.gracz;
    }
}

class Szachownica {

    constructor() {
        //init
        this.canvas = document.getElementById("plansza");
        var rect = this.canvas.getBoundingClientRect();
        console.log(rect.x, rect.y)
        
        this.ctx = this.canvas.getContext('2d');
        console.log(this.ctx.centerX);
        this.color = 255;
        this.liczbaPol = 8; //w rzędzie
        this.bokPola = 70;
        this.pola = Array.from({ length: this.liczbaPol }, () => Array.from({ length: this.liczbaPol }, () => 0));

        this.canvas.setAttribute("width", `${this.bokPola * this.liczbaPol}`);
        this.canvas.setAttribute("height", `${this.bokPola * this.liczbaPol}`);

        for (let i = 0; i < this.liczbaPol; i++) {
            for (let j = 0; j < this.liczbaPol; j++) {
                this.ctx.fillStyle = `rgb(${this.color},${this.color},${this.color})`;
                this.ctx.fillRect(j * this.bokPola, i * this.bokPola, this.bokPola, this.bokPola); //x, y, width, height
                this.gracz = "none";
                if(this.color==0 && i<=2) {
                    this.gracz = "bi";
                } else if(this.color==0 && i>4) {
                    this.gracz = "cz";
                }
                this.pola[i][j] = new Pole(j * this.bokPola, i * this.bokPola, this.bokPola, this.bokPola, this.gracz);
                this.pokolorujPola();
            }
            this.pokolorujPola();
        }


        addEventListener("click", (event) => {
            const myX = event.clientX;
            const myY = event.clientY;
            for (let i = 0; i < this.liczbaPol; i++){
                for (let j = 0; j < this.liczbaPol; j++){
                    let p = this.pola[i][j];
                    let poleX = this.canvas.getBoundingClientRect().x + p.x;
                    let poleY = this.canvas.getBoundingClientRect().y + p.y;
                    if((myX>=poleX && myX<=poleX+p.szer) && (myY>=poleY && myY<=poleY+p.wys)){
                        console.log(i, j);
                        p.zaznacz();
                    }else{
                        p.odznacz();
                    }
                }
            }
            

            
        });
    }

    pokolorujPola() {
        if (this.color == 0) {
            this.color = 255;
        } else {
            this.color = 0;

        }
    }
}


