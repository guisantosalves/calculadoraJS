class CalcController{
    constructor(){

        this._operation = [];
        //quando se cria um atributo privado é necessário os getters and setters deles
        this._currentDate;
        this._locale = 'PT-BR'
        //pega as informações vinculadas a esses IDs
        this._displayCalcEL = document.querySelector("#display");
        this._dateEl = document.querySelector("#data");
        this._timeEL = document.querySelector("#hora");
        this.initialize();
        this.initButtonsEvents();
    }

    initialize(){

        this.setDisplayDateTime();

        //setInterval fica recarregado essas funções a cada 1000 milisegundos
        //deixando a calc mais interativa
        let interval = setInterval(()=>{

            this.setDisplayDateTime();

        }, 1000);

        //pega o id do setInterval e faz ele parar em 10 sec
        /*
        setTimeout(()=>{
            clearInterval(interval);
        }, 10000);
        */
    }

    addEventListenerAll(element, events, fn){

        events.split(' ').forEach(event => {
            element.addEventListener(event, fn, false);
        })
    }

    clearAll(){
        this._operation = [];
    }

    clearEntry(){
        this._operation.pop();
    }

    setError(){
        this.displayCalc = 'Error';
    }

    getLastOperation(){
        return this._operation[this._operation.length-1];
    }

    setLastOperator(value){
        this._operation[this._operation.length-1] = value;
    }

    isOperator(value){
        //indexOf(value) => procura se dentro do array existe um valor igual ao passado e retorna o indice
        let aux = ['+', '-', '*', '%','/'].indexOf(value)
        if(aux > -1){
            return true;
        }else{
            return false;
        }
    }

    addOperation(value){

        console.log('A', value, isNaN(this.getLastOperation()));

        if(isNaN(this.getLastOperation())){
            //string
            if(this.isOperator(value)){

                //trocar o operador
                this.setLastOperator(value);

            }else if(isNaN(value)){

                //outra coisa
                console.log(value)

            }else{

                this._operation.push(value);
            }

        } else {
            //number
            if(this.isOperator(value)){

                this._operation.push(value);

            }else{

                let newValue = this.getLastOperation().toString() + value.toString();
                this.setLastOperator(parseInt(newValue));

            }
            
        }

        
        console.log(this._operation);
    }


    execBtn(value){
        switch(value){
            case 'ac':
                this.clearAll();
                break;
            case 'ce':
                this.clearEntry();
                break;
            case 'soma':
                this.addOperation('+');
                break;
            case 'subtracao':
                this.addOperation('-');
                break;
            case 'divisao':
                this.addOperation('/');
                break;
            case 'multiplicacao':
                this.addOperation('*');
                break;
            case 'porcento':
                this.addOperation('%');
                break;
            case 'igual':
                
                break;
            case '.':
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
                this.addOperation(parseInt(value));
                break;

            default:
                this.setError();
                break; 
        }
    }

    initButtonsEvents(){
        
        //falando que pega todos os g que são filhos do id buttons e parts
        let buttons = document.querySelectorAll("#buttons > g, #parts > g");

        buttons.forEach((btn, index) => {

            this.addEventListenerAll(btn, 'click drag', e => {

                let textBtn = btn.className.baseVal.replace("btn-","");

                this.execBtn(textBtn);

            });

            this.addEventListenerAll(btn, "mouseover mouseup mousedown", e=>{
                btn.style.cursor = "pointer";
            });
        });

    }

    setDisplayDateTime(){
        this.displayDate = this.currentDate.toLocaleDateString(this._locale, 
        {
            day: "2-digit", 
            mouth: "long", 
            year: "numeric"
        });
        this.displayTime = this.currentDate.toLocaleTimeString(this._locale);
    }

    get displayTime(){
        return this._timeEL.innerHTML;
    }

    set displayTime(value){
        this._timeEL.innerHTML = value;
    }

    get displayDate(){
        return this._dateEl.innerHTML;
    }

    set displayDate(value){
        this._dateEl.innerHTML = value;
    }

    get displayCalc(){

        return this._displayCalcEL.innerHTML;
    }

    set displayCalc(value){

        this._displayCalcEL.innerHTML = value;
    }

    get currentDate(){
        return new Date();

    }

    set currentDate(value){
        this_currentDate = value;
    }

}