import React from 'react';
import {StyleSheet,View, Text} from 'react-native';


export default class ProfileScreen extends React.Component {

    render() {
        const {navigate} = this.props.navigation;  
        return(
            <View style = {styles.container}>
                <View style={{
                    flex: 1,
                    justifyContent: 'space-around'
                    }}>
                    <View style={{
                            flex: 3,
                            flexDirection: 'row',
                            justifyContent: 'space-around',
                            backgroundColor: 'powderblue'}}>
                        <View style= {{ flex:1, backgroundColor: 'black' }} />
                        <View style= {{ flex:1, backgroundColor: 'white', justifyContent: 'center' }}>
                            <Text style={styles.textLarge}>
                                {this.props.navigation.state.params.user}
                            </Text>
                        </View>
                    </View>
                    <View style={{
                            flex: 1,
                            flexDirection: 'row',
                            backgroundColor: 'skyblue'}}>
                        <View style= {{ flex:2, backgroundColor: 'white', justifyContent: 'center' }} >
                            <Text style={styles.textLarge}>
                              <Text> Speed Junkie {'\n'}{'\n'} </Text>
                            </Text>
                        </View>
                        <View style= {{ flex:1, backgroundColor: 'white' }} />
                        <View style= {{ flex:1, backgroundColor: 'white' }} />

                    </View>

                    <View style={{flex: 2, backgroundColor: 'steelblue'}} >

                    </View>
                    <View style={{flex: 2, backgroundColor: 'darkblue'}} />
                </View>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1
    },
    textLarge: {
        top: 10,
        fontSize: 20,
        fontWeight: 'bold',
        color: 'black',
        textAlign: 'center'
      }
});
