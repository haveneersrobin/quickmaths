import React from 'react';
import { Dimensions, NetInfo, StyleSheet, Text, View,Image} from 'react-native';
import Button from 'apsl-react-native-button';
import ImgButton from "../components/ImageButton";


export default class HomeScreen extends React.Component {

      render() {
        const { navigate } = this.props.navigation;
        return (
          <View style={styles.container}>
            {
                    <Text style={styles.textLarge}>
                        Welcome to QM !
                    </Text>
            }
            <View style={styles.buttonWrap}>
                <ImgButton onPress={() =>navigate('Menu')} text="Enter" img={require('../assets/button/red_button11.png')}/>
            </View>
          </View>
        );
      }
    }
    
    const styles = StyleSheet.create({
        buttonWrap: {
        },
        
        wrapper: {
            flex:1,
            justifyContent: 'center'
        },
        container: {
            flex: 1,
            alignItems: 'center',
            justifyContent: 'center'
        },
        textLarge: {
            fontFamily: 'lovelo',
            textAlign: 'center',
            fontSize:50,
            textShadowColor:'#34495e',
            color: '#2c3e50',
            textShadowOffset: { width: 3, height: 3 },
            textShadowRadius : 8,
            marginBottom: 20
        },
        btn: {
            width: 50,
            height: 50,
          }
    });
    