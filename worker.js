let port1;
let port2;

addEventListener('connect', (event) => {
    const port = event.ports[0];
    port.start();

    port.addEventListener('message', (mes) => {
        switch (mes.data.command){
            case "store_port":
                if(mes.data.scriptNo == 1) port1=port;
                else port2=port;
                break;

            case "get_data":
                port.postMessage(`Script ${mes.data.scriptNo}`);
                break;

            case "send_data":
                if(mes.data.scriptNo == 1){
                    port2.postMessage(mes.data.text);
                }else{
                    port1.postMessage(mes.data.text);
                }
                break;
        }
    })
})