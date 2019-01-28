//criando class
class CalController {
    //criando metodos
    constructor(){
        this._operation = [];
        this._locale = 'pt-BR';
        this._displayCalcEl =   document.querySelector("#display");
        this._dateEl        =   document.querySelector("#data");
        this._timeEl        =   document.querySelector("#hora");
        this._currentDate;
        this.initialize(); 
        this.initbuttonsEvents();

    }
    //metodo de controle de pegar um valor
    get displayTime(){
        return this._timeEl.innerHTML;
    }

    get displayDate(){
        return this._dateEl.innerHTML;
    }

    get displayCal(){
        return this._displayCalcEl.innerHTML;
    }

    get currentDate(){
        return new Date();
    }

    //metodo de controle de setar um valor
    set displayTime(value){
        this._timeEl.innerHTML = value;
    }

    set displayDate(value){
        this._dateEl.innerHTML = value;
    }
    
    set displayCal(value){
        this._displayCalcEl.innerHTML = value;
    }

    set currentDate(value){
        this._currentDate = value;
    }

    
    initialize(){ 
        //seta primeiro para a cada refresh da pagina não esperar 1 segundo    
        this.setDisplayDateTime();
        //setar a função cada 1 segundo para o relogio continuar passando os segundos
        setInterval(()=>{
            this.setDisplayDateTime();
        }, 1000);
      
    }
    //metodo que vai limpar todo o o array tornando vazio
    clearAll(){
        this._operation = [];

    }

    //metodo que vai limpar o ultimo valor colocado dentro de um array ou o ultimo valor de um array
    clearEntry(){
        this._operation.pop();

    }
    //metodo que coloca cada valor em sequencia dentro de uma array adiciona cada valor no final de um array
    addOperatin(value){
        this._operation.push(value);
        console.log(this._operation);
    }

    //metodo que apresenta error no display
    setError(){

        this.displayCal = "ERROR";
    }
    //metodo feito para passar varios eventos
    addEventListenerAll(element, events, fn){
        //split transforma uma string em um array depois faz um loop percorrendo todos os buões
        events.split(' ').forEach(event =>{
            element.addEventListener(event , fn, false);
        })
    }
    // metodo que vai ficar fazendo o switch para cada butão
    execBtn(value){
        switch(value){
            case 'ac': 
            this.clearAll();
            break;
            case 'c': 
            this.clearEntry();
            break;
            case 'soma': 
            this.clearEntry();
            break;
            case 'subtrai': 
            this.clearEntry();
            break;
            case 'multiplicacao': 
            this.clearEntry();
            break;
            case 'divisao': 
            this.clearEntry();
            break;
            case 'porcento': 
            this.clearEntry();
            break;
            case 'igual': 
            this.clearEntry();
            break;
            default:
            this.setError()
            break;

            case '1':
            case '2':
            case '3':
            case '4':
            case '5':
            case '6':
            case '7':
            case '8':
            case '9':
                this.addOperatin(parseInt(value));
            break;
        }
    }

    //evento que percorre todos os butoes
    initbuttonsEvents(){
       let buttons =  document.querySelectorAll("#buttons > g, #parts > g");
        
       buttons.forEach((btn, index)=>{
            //chama o o metodo que vai cuida do eventos para pega o valor do botão clicado
           this.addEventListenerAll(btn, 'click drag', e=> {
                let textBtn = btn.className.baseVal.replace("btn-", "");
                this.execBtn(textBtn);

           });
            //chama o metodo pasando os eventos para fazer apaece o curso do mause quando colocado em cima do butão
           this.addEventListenerAll(btn, 'mouseover mouseup mousedown', e=>{
            btn.style.cursor = "pointer";
           });

       })

    }


    //metedo que traz as funções de data e hora de acordo com local
    setDisplayDateTime(){
        this.displayDate = this.currentDate.toLocaleDateString(this._locale, {
            day: "2-digit", 
            month: "long",
            year: "numeric"
        });
        this.displayTime = this.currentDate.toLocaleTimeString(this._locale);
    }
}