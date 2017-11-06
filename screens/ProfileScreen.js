import React from 'react';
import {StyleSheet,View} from 'react-native';


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
                        <View style= {{ flex:1, backgroundColor: 'blue' }} />
                    </View>
                    <View style={{
                            flex: 1,
                            flexDirection: 'row',
                            backgroundColor: 'skyblue'}}>
                        <View style= {{ flex:2, backgroundColor: 'red' }} />
                        <View style= {{ flex:1, backgroundColor: 'black' }} />
                        <View style= {{ flex:1, backgroundColor: 'green' }} />

                    </View>

                    <View style={{flex: 2, backgroundColor: 'steelblue'}} />
                    <View style={{flex: 2, backgroundColor: 'darkblue'}} />
                </View>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1
    }
});