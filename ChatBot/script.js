onload = function(){
    // outputs a javascript object from the parsed json

        var chat = {
            messageToSend: '',
            messageResponses: [
                'Why did the web developer leave the restaurant? Because of the table layout.',
                'How do you comfort a JavaScript bug? You console it.',
                'An SQL query enters a bar, approaches two tables and asks: "May I join you?"',
                'What is the most used language in programming? Profanity.',
                'What is the object-oriented way to become wealthy? Inheritance.',
                'An SEO expert walks into a bar, bars, pub, tavern, public house, Irish pub, drinks, beer, alcohol'
            ],
            init: async function() {
                this.chatTree = new ChatTree();
                await this.chatTree.init();
                this.cacheDOM();
                this.bindEvents();
                await this.render();
            },
            cacheDOM: function() {
                this.$chatHistory = $('.chat-history');
                this.$button = $('button');
                this.$textarea = $('#message-to-send');
                this.$chatHistoryList =  this.$chatHistory.find('ul');
            },
            bindEvents: function() {
                this.$button.on('click', this.addMessage.bind(this));
                this.$textarea.on('keyup', this.addMessageEnter.bind(this));
            },
            render: async function() {
                this.scrollToBottom();
                if (this.messageToSend.trim() !== '') {
                    var template = Handlebars.compile( $("#message-template").html());
                    var context = {
                        messageOutput: this.messageToSend,
                        time: this.getCurrentTime()
                    };

                    this.input = this.messageToSend;
                    this.$chatHistoryList.append(template(context));
                    this.scrollToBottom();
                    this.$textarea.val('');

                    // responses
                    var templateResponse = Handlebars.compile( $("#message-response-template").html());
                    var contextResponse = {
                        response: await this.chatTree.getMessage(this.input),
                        time: this.getCurrentTime()
                    };

                    setTimeout(function() {
                        this.$chatHistoryList.append(templateResponse(contextResponse));
                        this.scrollToBottom();
                    }.bind(this), 1000);

                }

            },

            addMessage: function() {
                this.messageToSend = this.$textarea.val();
                this.render();
            },
            addMessageEnter: function(event) {
                // enter was pressed
                if (event.keyCode === 13) {
                    this.addMessage();
                }
            },
            scrollToBottom: function() {
                this.$chatHistory.scrollTop(this.$chatHistory[0].scrollHeight);
            },
            getCurrentTime: function() {
                return new Date().toLocaleTimeString().
                replace(/([\d]+:[\d]{2})(:[\d]{2})(.*)/, "$1$3");
            }
        };

        chat.init();
};

class ChatTree {

    constructor() {
    }

    async init(){
        const data = await this.reset();
        this.chatTree = data;
        this.firstMsg = true;
        console.log("inside done");
        return "Chat has now been terminated. Send hi to begin chat again !";
    }

    async reset(){
        const response = await fetch('chatTree.json');
        const jsonResponse = await response.json();
        return jsonResponse;
    }

    async getMessage(input){
        let resp = '';
        if(this.firstMsg===true) {
            this.firstMsg = false;
            resp += "Hey there buddy<br>";
        } else {

            if(("message" in this.chatTree) && (input.trim()==="Reset")) {
                return this.init();
            }

            if(isNaN(parseInt(input)) || parseInt(input)<=0 || parseInt(input) > this.chatTree['children'].length+1)
                return 'It seems like you gave a wrong input ! Go ahead try again !';

            if(parseInt(input)-1===this.chatTree['children'].length){
                this.init();
            }

            this.chatTree = this.chatTree['children'][parseInt(input)-1];
        }

        if("message" in this.chatTree){
            let data;
            if(this.chatTree['type']==="function"){
                if(this.chatTree['message']==="getJoke()"){
                    data = await eval(this.chatTree['message']);
                    data = data.value.joke;
                } else{
                    data = await eval(this.chatTree['message']);
                    data = data.articles[0].title;
                }
            } else{
                data = this.chatTree['message'];
            }
            resp += data;
            resp += "<br><br>Please input <b>Reset</b> to reset chat now";
        } else {
            for (let i in this.chatTree['child_msg']) {
                resp += String(parseInt(i) + 1) + ". " + this.chatTree['child_msg'][parseInt(i)] + "<br>";
            }
        }
        return resp;
    }
}

async function getJoke() {
    const response = await fetch('http://api.icndb.com/jokes/random');
    const jsonResp = await response.json();
    return jsonResp;
}

async function getNews() {
    const response = await fetch('http://newsapi.org/v2/top-headlines?country=in&pageSize=1&apiKey=a876816f98574cdfa23ffdc7d531c7bc');
    const jsonResp = await response.json();
    return jsonResp;
}