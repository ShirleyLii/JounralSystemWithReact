import React, { Component } from 'react';
import 'whatwg-fetch';
import { getFromStorage, setInStorage } from '../../utils/storage';
import SpeechToText from 'speech-to-text';

class Entry extends Component {
    constructor(props) {
        super(props);

        this.state = {
            isLoading: true,
            token: '', //if theres a token, which means the user is signed in 
            entryAddError: '',
            entryAddTitle: '',
            entryAddEbody: '',

            listening: false,
            interimText: '',
            browserError: '',

        };

        this.onTextboxChangeEntryAddTitle = this.onTextboxChangeEntryAddTitle.bind(this);
        this.onTextboxChangeEntryAddEbody = this.onTextboxChangeEntryAddEbody.bind(this);

        this.onEntryAdd = this.onEntryAdd.bind(this);

    }

    onTextboxChangeEntryAddTitle(event) {
        this.setState({
            entryAddTitle: event.target.value,
        })
    }

    onTextboxChangeEntryAddEbody(event) {
        this.setState({
            entryAddEbody: event.target.value,
        })
    }

    startListening() {
        try {
        this.listener.startListening();
        this.setState({ listening: true });
        } catch (err) {
        
        }
    };

    stopListening(){
        this.listener.stopListening();
        this.setState({ 
            listening: false
        });
    };

    componentDidMount() {
        const onAnythingSaid = text => {
            this.setState({ interimText: text });
        };

        const onEndEvent = () => {
            if (this.state.listening) {
              this.startListening();
            }
        };
        
        const onFinalised = text => {
            this.setState({
              entryAddEbody: this.state.entryAddEbody + this.state.interimText + '. ',
              interimText: ''
            });
        };

        try {
            this.listener = new SpeechToText(onFinalised, onEndEvent, onAnythingSaid);
          } catch (browserError) {
            this.setState({ browserError: browserError.message });
        }

        const obj = getFromStorage('the_main_app');
        console.log(obj)
        if (obj && obj.token) {
            const { token } = obj;
            //verifyt toke
            fetch('api/account/verify?token=' + token)
                .then(res => res.json())
                .then(json => {
                    if (json.success) {
                        this.setState({
                            token: token,
                            isLoading: false
                        });
                    }
                    else {
                        this.setState({
                            isLoading: false,
                        })
                    }
                })
        }
        else {
            this.setState({
                isLoading: false,
            })
        }
    }



    // Add Entry Form here
    onEntryAdd() {
        //grab state]
        const {
            entryAddTitle,
            entryAddEbody,
        } = this.state;

        this.setState({
            isLoading: true,
        })
        // post requst to backend 

        fetch('/api/entry', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                title: entryAddTitle,
                ebody: entryAddEbody,
            }),
        })
            .then(res => res.json())
            .then(json => {
                if (json.success) {
                    this.setState({
                        entryAddError: json.message,
                        isLoading: false,
                        entryAddEbody: '',
                        entryAddTitle: '',
                    });
                }
                else {
                    this.setState({
                        entryAddError: json.message,
                        isLoading: false,
                    });
                }
            });

    }


    render() {
        const {
            isLoading,
            token,
            entryAddTitle,
            entryAddEbody,
            entryAddError,
            browserError, 
            interimText,  
            listening

        } = this.state;

        if (isLoading) {
            return (<div><p>Loading...</p></div>)
        }

        let buttonForListening;
        if (listening) {
            buttonForListening = (
              <button onClick={() => this.stopListening()}>
                Stop Listening
              </button>
            );
          } else {
            buttonForListening = (
              <button
                onClick={() => this.startListening()}
              >
                Start Listening
              </button>
            );
          }

        {
            return (
                <div>
                    <div className="Entryform">
                        
                        {
                            (entryAddError) ? (
                                <p>{entryAddError}</p>
                            ) : (null)
                        }
                        <p>Add a new journal entry</p>
                        <input type="text" placeholder="Title" value={entryAddTitle} onChange={this.onTextboxChangeEntryAddTitle} /><br />
                        <input type="text" className="wideInput" placeholder="Jounal body" value={entryAddEbody} onChange={this.onTextboxChangeEntryAddEbody} /><br />
                        <button onClick={this.onEntryAdd}>Add</button>
                        {
                            (browserError) ? (
                                <p>{browserError}</p>
                            ) : (buttonForListening)
                        }
                    </div>

                </div>

            )

        }


    }
}

export default Entry;
