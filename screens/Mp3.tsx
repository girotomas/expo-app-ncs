import React from 'react'
import { Text, View } from '../components/Themed';
import { TextInput , Button} from 'react-native';
import { WebView } from 'react-native-webview';



export class Mp3 extends React.Component<{ link:string, title:string}, {}> {
    render() {
        return <View style={{height:100, width:'100%'}}>
            <WebView style={{height:100}}
            originWhitelist={['*']}
            source={{ html: `      <p>${this.props.title}</p>
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<audio controls autoplay>
<source  src="${this.props.link}" type="audio/ogg">
Your browser does not support the audio element.
</audio> `}}
        ></WebView>
        </View>
    }
}