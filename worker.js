let port1;
let port2;
let ruch = 2;

// {
//     topic: "ruch",
//     data: ruch
// }

addEventListener('connect', (event) => {
    const port = event.ports[0];
    port.start();

    port.addEventListener('message', (mes) => {
        switch (mes.data.command){
            case "store_port":
                if(mes.data.scriptNo == 1) {
                    port1=port;
                }else{
                    port2=port;
                }
                port.postMessage({
                    topic: "ruch",
                    data: ruch
                })
                break;

        }
    })
})