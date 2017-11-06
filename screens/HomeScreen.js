import React from 'react';
import { Dimensions, NetInfo, StyleSheet, Text, View,Image} from 'react-native';
import Button from 'apsl-react-native-button';
import ImgButton from "../components/ImageButton";
import resolveAssetSource from 'resolveAssetSource';


export default class HomeScreen extends React.Component {
      render() { 
        let source = resolveAssetSource(require('../assets/button/red_button11.png'));
        const { navigate } = this.props.navigation;
        return (
          <View style={styles.container}>
            {
                    <Text style={styles.textLarge}>
                        Welcome to QM !
                    </Text>
            }
            <View>
                <ImgButton 
                fontSize={30}
                paddingBottom={10}
                marginTop={30}
                width={source.width}
                height={source.height}
                scale={1.2}
                onPress={() =>navigate('Menu')}
                text="Enter"
                pressedImg={require('../assets/button/red_button12.png')}
                normalImg={require('../assets/button/red_button11.png')}/>
            </View>
          </View>
        );
      }
    }
    
    const styles = StyleSheet.create({
        
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
    