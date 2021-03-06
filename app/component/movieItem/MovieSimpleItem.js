/**
 created by Lex. 2019/8/15
 **/

import React, {PureComponent} from 'react';
import {
  View,
  Text,
  Image, StyleSheet,
  TouchableOpacity
} from 'react-native';
import PropTypes from "prop-types";
import {withNavigation} from 'react-navigation';

//组件

//数据

//资源
const ITEM_HEIGHT = 166;
const ITEM_IMAGE_HEIGHT = 150;
const ITEM_IMAGE_WIDTH = 106;

const MARGIN_VERTICAL = 5;
const PADDING_VERTICAL = 8;
const ITEM_SIMPLE_HEIGHT = ITEM_IMAGE_HEIGHT + 2 * (MARGIN_VERTICAL + PADDING_VERTICAL);
export {ITEM_SIMPLE_HEIGHT};

class MovieSimpleItem extends PureComponent {

  static propTypes = {
    item: PropTypes.object.isRequired,
    isShowGrade: PropTypes.bool.isRequired,
    // Grade: PropTypes.number,
    // navigation: PropTypes.object.isRequired,
    disabled: PropTypes.bool,
  }

  constructor(props) {
    super(props);
  }

  render() {

    const {item, style} = this.props;

    if (item === {} || item === undefined) {
      return null;
    }

    const showOrgTitle = item.title == item.original_title;
    const peoples = item.directors?.concat(item?.casts);

    return (
      <TouchableOpacity
        disabled={this.props.disabled || false}
        onPress={() => {
          this.props.navigation.navigate('MovieDetail', {item: item})
        }}
        style={[styles.movie_item, style]}>
        <Image source={{uri: item.images?.small}} style={{width: ITEM_IMAGE_WIDTH, height: ITEM_IMAGE_HEIGHT}}
               resizeMode='contain'/>

        <View style={styles.movie_item_right}>
          <View>
            <Text style={styles.movie_title}>{item.title}</Text>
            {showOrgTitle ? null : <Text
              numberOfLines={1}
              style={styles.movie_org_title}>{'(' + item.original_title + ')'}</Text>
            }
          </View>

          <View
            style={{
              // paddingLeft: 5,
              flexDirection: 'row', alignItems: 'center'
            }}>
            {/*<Rating*/}
            {/*  readonly={true}*/}
            {/*  type='star'*/}
            {/*  ratingCount={5}*/}
            {/*  startingValue={transformRateToValue(rateValue)}*/}
            {/*  imageSize={13}*/}
            {/*  style={{width: 60}}*/}
            {/*/>*/}
            <View style={{flexDirection: 'row'}}>
              {this.props.isShowGrade ?
                <Text style={{flexDirection: 'row'}}>
                  <Text>{'评分：'}</Text>
                  <Text style={{fontSize: 13, color: '#000', fontWeight: 'bold'}}>{item?.rating?.average}</Text>
                </Text> :
                <Text>类型：</Text>
              }
              <Text style={{marginLeft: this.props.isShowGrade ? 10 : 0}} numberOfLines={1}>{
                item.genres?.map((Item, index, array) => (
                  <Text key={index} style={{
                    paddingHorizontal: 2,
                    color: '#614d62'
                  }}>{Item + (index === array.length - 1 ? '' : ' - ')}</Text>
                ))}
              </Text>
            </View>
          </View>

          <View>
            <Text style={{}}>{'首映：' + item.pubdates ?.[0]}</Text>
          </View>

          <Text numberOfLines={2} style={{flexDirection: 'row', alignItems: 'center', color: '#305058'}}>
            <Text style={{marginHorizontal: 3, fontSize: 13}}>导演及演员：</Text>
            {peoples?.map((item, index) => (
              <Text key={index}
                    onPress={() => {
                      console.info('Name', item.name)
                    }}
                    style={{marginHorizontal: 3, fontSize: 13}}>{item.name + '  '}</Text>
            ))}
          </Text>
        </View>

      </TouchableOpacity>
    );
  }

}

export default withNavigation(MovieSimpleItem);

const styles = StyleSheet.create({

  movie_title: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333'
  },
  movie_org_title: {
    fontSize: 15,
    fontWeight: 'bold',
    color: '#666'
  },
  textNumber: {
    backgroundColor: '#dea554',
    paddingHorizontal: 6,
    paddingVertical: 4,
    borderBottomLeftRadius: 8,
    borderTopRightRadius: 8
  },

  movie_item: {
    flexDirection: 'row',
    alignItems: 'center',
    marginHorizontal: 10,
    marginVertical: MARGIN_VERTICAL,
    backgroundColor: '#FFF',
    borderRadius: PADDING_VERTICAL,
    paddingVertical: 8,
    paddingHorizontal: 8
  },

  movie_item_right: {
    flex: 1,
    height: ITEM_IMAGE_HEIGHT,
    justifyContent: 'space-between',
    paddingTop: 15,
    paddingHorizontal: 10
  }
})
