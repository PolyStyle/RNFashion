import React, { PropTypes,Component } from 'react'
import { View, StyleSheet, Text, Image, Dimensions } from 'react-native'
import { LoginButton } from 'react-native-fbsdk'
import { colors, fontSizes } from './../../styles'
import { onAuthChange, handleAuthRemotely, facebookToken } from './../../redux/modules/authentication'
import { connect } from 'react-redux'

const { height,width } = Dimensions.get('window')

class LogIn extends Component {

  constructor(props) {
    super(props)
    this.state = {
      isLoading: false
    }
  }

  componentDidMount() {
    var _self = this; 
    // try to se if there is a login token from facebook SDK
    facebookToken()
      .then(function (accessToken) {
        if(accessToken){
          _self.setState({
            isLoading: true
          });
          _self.props.dispatch(handleAuthRemotely())
        }
      });
  }

  handleLoginFinished = (error, result) => {
    if (error) {
      //console.warn('Error in handleLoginFinished: ', error)
    } else if (result.isCancelled === true) {
      //console.log('Auth cancelled')
    } else {
      this.setState({
            isLoading: true
          });
      this.props.dispatch(handleAuthRemotely())
    }
  }

  render () {
    return (
          <View>
          {this.state.isLoading == false && 
            <View style={styles.loginContainer}>
              <LoginButton
                readPermissions={['email','public_profile']}
                style={{
                  height: 30,
                  width: 200,
                  marginBottom: 15,
                }}
                onLoginFinished={this.handleLoginFinished}/>
              <Text style={styles.assuranceText}>
                Don't worry. We don't post anything.
              </Text>
            </View>
          }
          </View>
         
    )
  }
}

export default connect()(LogIn)


const styles = StyleSheet.create({

  loginContainer: {
    paddingLeft: 30,
    paddingRight: 30,
    paddingTop: 20,
    alignItems: 'center',
  },
  assuranceText: {
    color: '#666',
    fontSize: 14,
    textAlign: 'center',
  },
})
