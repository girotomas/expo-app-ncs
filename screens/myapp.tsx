import React from 'react'
import { Text, View } from '../components/Themed';
import { TextInput , Button} from 'react-native';

export class MyApp extends React.Component<{  }, { response: string }> {
    state = { response: '', text: '' };
    onSubmit(){
        var request = new XMLHttpRequest();
        request.onreadystatechange = (e) => {
            if (request.readyState !== 4) {
                return;
            }

            if (request.status === 200) {
                this.setState({response: request.responseText});
            } else {
                console.warn('error');
                console.warn(request)
            }
        };
        const  link= 'https://g0ym652bgj.execute-api.us-east-1.amazonaws.com/prod/'
        request.open('POST', link);
        request.send(this.state.text);
    }
    render() {
        return <View><Text>{this.state.response}</Text>
            <TextInput
                    style={{ height: 40, borderColor: 'gray', borderWidth: 1 }}
                    onChangeText={text => this.setState({text:text})}
                    value={this.state.text}
            ></TextInput>
            <Button
                onPress={this.onSubmit.bind(this)}
                title="Learn More"
                color="#841584"
            />
        </View>;
    }

}