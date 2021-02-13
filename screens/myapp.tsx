import React from 'react'
import { Text, View } from '../components/Themed';
import { TextInput, Button, ScrollView} from 'react-native';
import {Mp3, Mp3Song} from './Mp3'

export interface Mp3Song {
    link:string
    title:string
}
export class MyApp extends React.Component<{  }, { response: string }> {
    state = { response: '', text: '' , mp3array: []};
    onSubmit(){
        var request = new XMLHttpRequest();
        request.onreadystatechange = (e) => {
            if (request.readyState !== 4) {
                return;
            }

            if (request.status === 200) {
                this.setState({response: request.responseText});
                console.log(request.responseText);
                const text= request.responseText
                const mp3array = (text.match(/(https:.*?.mp3)/g))
                console.log('mp3array:')
                console.log(mp3array)
                const myRegex= /.*\/([^\/]*?)-[^\/-]*?-[^\/-]*?\.mp3/
                const mp3arrayWithTitles = mp3array.map(string=> {
                    try{
                        const match = myRegex.exec(string)
                        return{link:string, title:match[1]}
                    }
                    catch(e){
                        console.log(e)
                        return{ link:string, title:''}
                    }

                })
                console.log(mp3arrayWithTitles)
                this.setState({mp3array:mp3arrayWithTitles})
            } else {
                console.warn('error');
                console.warn(request)
            }
        };
        const  link= 'https://1nwnrgfyvd.execute-api.us-east-1.amazonaws.com/prod/'
        request.open('POST', link);
        request.setRequestHeader("Content-Type", "text/html");
        request.send(this.state.text);
    }
    render() {
        const shadow= {shadowColor: "#000",
            shadowOffset: {
            width: 0,
            height: 2,
            },
            shadowOpacity: 0.25,
            shadowRadius: 3.84,

            elevation: 5,
        }
        var mp3link = 'https://ncsmusic.s3.eu-west-1.amazonaws.com/tracks/000/000/853/phenomenon-1605895230-EleosL4jlP.mp3'
        mp3link = 'https://example.com'
        return <View style={{width:'98%', display:'flex', flexDirection:'column', height:'100%', alignItems:'stretch'}}>
            <View  style={{ flex:1, ...shadow }}>
                <TextInput
                    placeholder=" Search your song..."
                    style={{margin:10}}
                    onChangeText={text => this.setState({text:text})}
                    value={this.state.text}
                    onSubmitEditing={this.onSubmit.bind(this)}
            ></TextInput></View>
        <View style={{flexGrow:10, flex:1}}>
        <ScrollView >
            {this.state.mp3array.map(mp3data=> {return <Mp3 link={mp3data.link} title={mp3data.title}></Mp3>})}
        </ScrollView>
        </View>
        </View>;
    }

}