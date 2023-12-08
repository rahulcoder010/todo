import React from 'react';
                    import './App.css';

                    class App extends React.Component {
                        constructor(props) {
                            super(props);
                            this.state = { value: '' };
                        }

                        handleChange(event) {
                            this.setState({ value: event.target.value });
                        }

                        render() {
                            return (
                                <div className="App">
                                    <h1>Calculator</h1>
                                    <input type="text" value={this.state.value} onChange={this.handleChange} />
                                </div>
                            );
                        }
                    }

                    export default App;