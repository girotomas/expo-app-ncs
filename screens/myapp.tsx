import React from 'react'
import { Text, View } from '../components/Themed';

export class MyApp extends React.Component<{  }, { response: string }> {
    state = { response: '' };
    componentDidMount(){
        var request = new XMLHttpRequest();
        request.onreadystatechange = (e) => {
            if (request.readyState !== 4) {
                return;
            }

            if (request.status === 200) {
                console.log('success', request.responseText);
            } else {
                console.warn('error');
            }
        };
        const  link= 'https://ncs.io/music-search?q=tobu&genre=&mood='
        request.open('GET', link);
        request.setRequestHeader("Origin", 'https://ncs.io');
        request.send()
    }
    render() {
        return <Text>{this.state.response}</Text>;
    }

}