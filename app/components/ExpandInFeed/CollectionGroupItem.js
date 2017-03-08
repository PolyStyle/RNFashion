import React, { PropTypes, Component } from 'react'
import { connect } from 'react-redux'
import { View, Text, StyleSheet, Image, Dimensions, TouchableOpacity,TouchableHighlight,TouchableWithoutFeedback} from 'react-native';
import { Gear, Hamburger, Heart, TagLabel, MoreDots, ScaledImage, ExpandInFeed} from './../../components'

import { fetchPost, hasLikedPost,unlikePost , likePost } from './../../redux/modules/posts'
const { height,width } = Dimensions.get('window');

const SIZE_GROUP_WIDTH = Math.floor(width/2) - 25;

const BIG_IMAGE_SIZE = Math.floor(SIZE_GROUP_WIDTH/2) - 9;
const SMALL_IMAGE_SIZE= Math.ceil(BIG_IMAGE_SIZE/2) - 3;
const SIZE_GROUP_HEIGHT = BIG_IMAGE_SIZE + 61;

const styles = StyleSheet.create({
  containerLeft: {
    height: SIZE_GROUP_HEIGHT,
    width: SIZE_GROUP_WIDTH,
    backgroundColor: '#252525',
    marginTop: 15,
    marginRight: 15,
    marginLeft: 5,
    borderRadius: 5,
    marginBottom: 5,
    paddingLeft: 5,
    paddingTop: 7
  },
  containerRight: {
    height: SIZE_GROUP_HEIGHT,
    width: SIZE_GROUP_WIDTH,
    backgroundColor: '#252525',
    marginTop: 15,
    marginLeft: 5,
    borderRadius: 5,
    marginBottom: 5,
    paddingLeft: 5,
    paddingTop: 7
  },
  descriptions: {
    backgroundColor: '#ffffff',
    paddingLeft: 10,
    paddingBottom: 30,
    paddingRight: 10
  },
  separationLine: {
    borderColor: '#dddddd',
    borderBottomWidth: 1,

  },

  descriptionText: {
    marginTop: 8,
    marginBottom: 12,
    fontSize: 11,
    color: '#666666'
  },
  textTitle: {
    color: '#cccccc',
    fontFamily: 'AvenirNextLTW01RegularRegular',
    fontSize: 13,
    lineHeight: 13,
  },
  previewContainer: {
    flex: 1,
    flexDirection: 'row',
    flexWrap: 'wrap',

  },
  bigImageContainer: {
    backgroundColor: '#333333',
    width: BIG_IMAGE_SIZE,
    height: BIG_IMAGE_SIZE,
    borderRadius: 3,
    overflow: 'hidden',
    marginLeft: 1,
  },
  bigImage: {
    width: BIG_IMAGE_SIZE,
    height: BIG_IMAGE_SIZE,
    borderRadius: 3,
  },
  smallImageContainer: {
    backgroundColor: '#333333',
    width: SMALL_IMAGE_SIZE,
    height: SMALL_IMAGE_SIZE,
    marginLeft: 6,
    marginBottom: 6,
    borderRadius: 2,
  },
  smallImage: {
    width: SMALL_IMAGE_SIZE,
    height: SMALL_IMAGE_SIZE,
    borderRadius: 3,
  }
});



class CollectionGroupItem extends Component {
  static propTypes = {
    onPress: PropTypes.func,
    active: PropTypes.bool,
    navigator: PropTypes.object
  }
  constructor (props) {
    super(props)
    this.state = {
      currentIndexInPosts: -1,
      exapndedMoreMenu: false,
      previewImages: []
    };
  }
  componentDidMount() {
    console.log('COLLECTION GROUP PROPS')
    console.log(this.props)
    // posts are in this.props.Posts
    // products are in this.props.Products

    const previewImages = this.props.Posts.slice(0,5).concat(this.props.Products.slice(0,5));
    this.setState({
      previewImages: previewImages,
    })
  }
  componentWillReceiveProps(nextProps){


  }

/*
<ScaledImage
                    styles={styles.smallImageContainer}
                    id={Math.floor(Math.random()*6000+1000)}
                    width={20}
                  />
*/
  render(){
     return (

          <View
            shouldRasterizeIOS={true}
            renderToHardwareTextureAndroid={true}
            style={(this.props.index % 2) ? styles.containerRight : styles.containerLeft}>
            <TouchableOpacity activeOpacity={0.1} onPress={this.props.selectItem}>
              <Text style={styles.textTitle}>{this.props.displayName}</Text>
              <Text style={styles.descriptionText}>125 Products, 120 Posts</Text>
              <View style={styles.previewContainer}>
                  <View style={styles.bigImageContainer}>
                    {this.state.previewImages[0] && <ScaledImage
                      styles={styles.bigImage}
                      id={this.state.previewImages[0].ImageId}
                      width={50}
                    />}
                  </View>


                 <View style={styles.previewContainer}>
                  <View style={styles.smallImageContainer}>
                   {this.state.previewImages[1] && <ScaledImage
                      styles={styles.smallImage}
                      id={this.state.previewImages[1].ImageId}
                      width={50}
                    />}
                  </View>
                  <View style={styles.smallImageContainer}>
                    {this.state.previewImages[2] && <ScaledImage
                      styles={styles.smallImage}
                      id={this.state.previewImages[2].ImageId}
                      width={50}
                    />}
                  </View>
                  <View style={styles.smallImageContainer}>
                    {this.state.previewImages[3]  &&<ScaledImage
                      styles={styles.smallImage}
                      id={this.state.previewImages[3].ImageId}
                      width={50}
                    />}
                  </View>
                  <View style={styles.smallImageContainer}>
                    {this.state.previewImages[4] && <ScaledImage
                      styles={styles.smallImage}
                      id={this.state.previewImages[4].ImageId}
                      width={50}
                    />}
                  </View>
                </View>
              </View>
            </TouchableOpacity>
          </View>
      )

  }
}





export default CollectionGroupItem


