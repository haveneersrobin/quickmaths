import React from 'react';
import styled from 'styled-components/native'
import {StyleSheet, View, Text, Image} from 'react-native';

const BorderBox = styled.View`
    border: 2px solid black;
    flex:2;
    background-color: white;
    justify-content: center;
`;

const BottomBox = styled.View`
    border: 2px solid black;
    flex:2;
    background-color: steelblue;
`;

const MiniBox = styled.View`
    flex:1;
    background-color: white;
    border: 2px solid black;
`;

export default class ProfileScreen extends React.Component {

    render() {
        const {navigate} = this.props.navigation;  
        return(
            <View style = {styles.container}>
                <View style={{
                        flex: 3,
                        flexDirection: 'row',
                        justifyContent: 'center'}}>
                    <View style= {{ flex:1}}>
                        {/* TODO: path is niet dynamisch! */}
                        <Image style={{resizeMode:Image.resizeMode.contain}} source={require('../assets/img.png')}/>  
                    </View>
                    <View style= {{ flex:1, justifyContent: 'center', backgroundColor: 'white'}}>
                        <Text style={styles.textLarge}>
                            {this.props.navigation.state.params.user}
                        </Text>
                    </View>
                </View>
                <View style={{
                        flex: 1,
                        flexDirection: 'row',
                        backgroundColor: 'skyblue'}}>
                    <BorderBox>
                        <Text style={styles.textLarge}>
                            {this.props.navigation.state.params.playerstatus}
                        </Text>
                    </BorderBox>
                    <BorderBox>
                        <Text style={styles.textLarge}>
                            Achievements
                        </Text>
                    </BorderBox>
                </View>

                <BottomBox/>
                <BottomBox/>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'space-around',    
    },
    textLarge: {
        fontSize: 20,
        fontWeight: 'bold',
        color: 'black',
        textAlign: 'center'
    }
});
