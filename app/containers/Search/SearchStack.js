import React, { PropTypes, Component } from 'react'
import { TouchableHighlight, StyleSheet, Text, View ,Dimensions, Platform, Animated } from 'react-native'
import { Navigator } from 'react-native-deprecated-custom-components'
import { connect } from 'react-redux'
import { Navbar, StreamListView , CustomButton, Gear, Hamburger, Exit, FooterIcon}  from './../../components'
import { userOnboarded } from './../../redux/modules/users'
import { SearchContainer } from  './../../containers'

const { height,width } = Dimensions.get('window')

const SEARCH = 'Search';


class SearchStack extends Component {
  componentDidMount() {
  }

  handlerSelection (id,active){
    const newCounter = active ? this.state.needed-1 : this.state.needed+1;
    const isFinished = (newCounter <= 0); // if we have selected enough categories
    this.setState({
      needed: newCounter,
      readyToFinish: isFinished
    });

  }

  constructor (props) {
    super(props)
    this.state = {
      hamburgerMenuOpen: false,
      needed: 3, // the number of categories needed
      readyToFinish: false, // when the user has selected at least x needed categories
      openingMenuAnimation: new Animated.Value(),
      currentSection: SEARCH,
    }

    // console.log('FETCH ALL POSTS')
  }

  closeHamburger(){
    this.setState({
      hamburgerMenuOpen: false,
    })
    Animated.spring(     //Step 4
      this.state.openingMenuAnimation,
        {toValue: 0}
    ).start();  //Step 5
  }

  openHamburger(){
    this.setState({
      hamburgerMenuOpen: true,
    })
    this.state.openingMenuAnimation.setValue(0);  //Step 3
    Animated.spring(     //Step 4
      this.state.openingMenuAnimation,
        {toValue: height,}
    ).start();  //Step 5
  }


  _navigateToBrand(brandData){
  this.props.navigator.push({
      name: 'Brand',
      title: brandData.displayName,
      passProps: brandData,
    })
  }

  render () {
    var self = this;
    const NavigationBarRouteMapper = {
      LeftButton(route, navigator, index, navState) {
        if(index > 0) {
          return (
            <TouchableHighlight
                style={styles.leftNavButton }
                underlayColor="transparent"
                onPress={() => { if (index > 0) { navigator.pop() } }}>
              <Text style={styles.leftNavButtonText }>Back</Text>
            </TouchableHighlight>
        )}
        else { return null }
      },
      RightButton(route, navigator, index, navState) {
          return (<Hamburger style={styles.rightNavButton} active={true}  onPress={self.openHamburger.bind(self)} />)
      },
      Title(route, navigator, index, navState) {
        return <View style={styles.titleHolder}><Text
        numberOfLines={1}
        ellipsizeMode={'tail'}
        style={ styles.textTitle}>{route.title}</Text></View>
      }
    };


    return (
      <View style={styles.container}>
       <Animated.View style={[styles.hamburgerMenu,{height: this.state.openingMenuAnimation}]}>
        {this.state.hamburgerMenuOpen && <View  style={styles.closeHamburger }>
           <Exit  active={true}  onPress={this.closeHamburger.bind(this)} />
        </View>}
       </Animated.View>
        <Navigator

          navigationBar={
             <Navigator.NavigationBar
              ref={(r) => { this.navigatorRef = r; }}
              style={ styles.header }
              routeMapper={NavigationBarRouteMapper} />}
              initialRoute={{ title: 'Search', name: SEARCH, index: 0 }}
              renderScene={(route, navigator) => {
                console.log('REQUEST ROUTE IN SEARCH STACK', route.name)
                if(route.name === SEARCH){
                  return (
                    <View style={styles.categoriesList}>
                      <SearchContainer  />
                    </View>
                  )
                }
              }}
           />

        </View>
    )
  }
}

 const styles = StyleSheet.create({
  container: {
    height: height,
    width: width,
  },
  closeHamburger: {
    position: 'absolute',
    right: 8,
    top: 10,
  },
  hamburgerMenu: {
    backgroundColor: '#fff',
    height: 200,
    width: width,
    position: 'absolute',
    zIndex: 100,
  },
  leftNavButton:{
    width: 50,
    marginTop: (Platform.OS === 'android' ? 22 : 0),
    height: 35,
    alignItems: 'center'
  },
  rightNavButton:{
    width: 50,
    marginTop: (Platform.OS === 'android' ? 22 : 0),
    height: 35,
    margin: 0,
    right: 0,
    alignItems: 'center'
  },
  leftNavButtonText: {
    fontFamily: 'AvenirNextLTW01RegularRegular',
    fontSize: (Platform.OS === 'android' ? 14 : 12),
    color: '#000000',
    marginLeft: 10
  },
  titleHolder: {
    width: width-140 ,
    alignItems: 'center'
  },
  textTitle: {
      marginTop: (Platform.OS === 'android' ? 15 : 0),
      fontSize: (Platform.OS === 'android' ? 17 : 15),
      fontFamily: (Platform.OS === 'android' ? 'AvenirNextLTW01RegularRegular' :'AvenirNextLTW01BoldRegular'),
      color: '#000000'
  },
  header: {
      width: width,
      height: 60,
      position: 'absolute',
      top: 0,
      borderColor: '#000000',
      borderBottomWidth: 1,
      padding: 0,
      margin: 0,
    },
  footer: {
    width: width,
    flex: 1,
    height: 60,
    borderColor: '#111111',
    borderTopWidth: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  categoriesList: {
    marginTop: 60,
    flex: 1,
    width: width,
    height: height-160,
    padding: 0
  },
  bottomMenu: {
    paddingTop: 5,
    paddingLeft: 20,
    paddingRight: 20,
    height: 42,
    borderTopWidth: 1,
    borderColor: '#111111'
  },
  buttonContainer:{
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
  }

})



function mapStateToProps ({posts}) {
  return {
    posts: posts,
  }
}


export default connect()(SearchStack)

