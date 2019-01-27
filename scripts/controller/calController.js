//criando class
class CalController {
    //criando metodos
    constructor(){
        this._locale = 'pt-BR';
        this._displayCalcEl =   document.querySelector("#display");
        this._dateEl        =   document.querySelector("#data");
        this._timeEl        =   document.querySelector("#hora");
        this._currentDate;
        this.initialize(); 

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