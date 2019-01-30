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

    //pega a operação/operador
    pushOperation(value){
        this._operation.push(value);

        if(this._operation.length > 3){
            

            this.calc();

            console.log(this._operation);
        }
    }

    //faz o calculo das operações
    calc(){
        let last = this._operation.pop();
        let result = eval(this._operation.join(""));
        this._operation = [result, last];
        this.setLastNumbertoDisplay();
    }

    //verifica dentro do array se é uma operação o valor que vem
    isOperatior(value){
        return (['+', '-', '*', '/', '%'].indexOf(value) > -1);
    }

    //pega o valor do ultimo digito dentro do array
    getLastOperation() {
 
        return this._operation[this._operation.length - 1];
     
    }
     
    //seta o valor do ultimo digito dentro do array
    setLastOperation(value) {
     
        this._operation[ this._operation.length - 1] = value;
     
    }

    //seta no display a conta efetuada
    setLastNumbertoDisplay(){
        let lastNumber ;
        for(let i = this._operation.length-1; i >= 0; i--){
            if(!this.isOperatior(this._operation[i])){
                lastNumber = this._operation[i];
                break;
            }
        }

        this.displayCal = lastNumber;
    }
    //metodo que coloca cada valor em sequencia dentro de uma array adiciona cada valor no final de um array fazendo verificações
    addOperatin(value){
        
        if (isNaN(this.getLastOperation())){

            //String
            if(this.isOperatior(value)){
                //tocar o operador   

                this.setLastOperation(value);

            }else if(isNaN(value)) {

                //outra coisas
                console.log('outra coisas', value);

            }else{
                this.pushOperation(value);
                this.setLastNumbertoDisplay();
            }
        }else{
            if(this.isOperatior(value)){
                this.pushOperation(value);
            }else{
                let newValue = this.getLastOperation().toString() + value.toString();
                this.setLastOperation(parseInt(newValue));
                //atualizar display
                this.setLastNumbertoDisplay();
            }
            
        }

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
            this.addOperatin('+');
            break;
            case 'subtracao': 
            this.addOperatin('-');
            break;
            case 'multiplicacao': 
            this.addOperatin('*');
            break;
            case 'divisao': 
            this.addOperatin('/');
            break;
            case 'porcento': 
            this.addOperatin('%');
            break;
            case 'igual': 
            this.clearEntry();
            break;
            case 'ponto': 

            break;

            case '0':
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

            
            default:
            this.setError()
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