import React, { Component }  from 'react';
import { connect } from 'react-redux'
import { CSSTransition} from 'react-transition-group';
import { actionCreators }  from './store';
import { HeaderWrapper, Logo, 
  Nav,NavItem,
  NavSearch,
  Addition,
  SearchInfo,
  SearchInfoTitle,
  SearchInfoSwitch,
  SearchInfoItem,
  SearchWrapper,
  But} from './style.js';

class Header extends Component {
  // 显示数据
  getListArea () {
    const {focused, list} = this.props
    if(focused) {
      return (
        <SearchInfo>
          <SearchInfoTitle>
            热门搜索
            <SearchInfoSwitch>换一换</SearchInfoSwitch>
          </SearchInfoTitle>
          <div>
            {
              list.map((item) => {
              return <SearchInfoItem key={item}>{item}</SearchInfoItem>
              })
            }
          </div>
        </SearchInfo>
      )
    }
  }
  render () {
    const {focused, handleInputFocus, handleInputBlur} = this.props
    return (
      <HeaderWrapper>
        <Logo />
        <Nav>
          <NavItem className="left">首页</NavItem>
          <NavItem className="left">下载App</NavItem>
          <NavItem className="right">登录</NavItem>
          <NavItem className="right"><span className="iconfont">&#xe636;</span></NavItem>
          <SearchWrapper>
            <CSSTransition
              in={focused}
              timeout={200}
              classNames="slide">
              <NavSearch className={focused ? 'focused': ''}
                onFocus={handleInputFocus}
                onBlur={handleInputBlur}
              ></NavSearch>
            </CSSTransition>
            <span className={focused ? 'focused iconfont': 'iconfont'}>&#xe60c;</span>
            {this.getListArea()}
          </SearchWrapper>
  
        </Nav>
        <Addition>
          <But className="writing"><span className="iconfont">&#xe61b;</span>写文章</But>
          <But className="reg">注册</But>
        </Addition>
      </HeaderWrapper>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    focused:state.getIn(['header', 'focused']),
    list:state.getIn(['header','list'])
  }
}
const mapDispathToProps = (dispatch) => {
  return {
    handleInputFocus() {
      dispatch(actionCreators.getList())
      dispatch(actionCreators.searchFocus())
    },
    handleInputBlur() {
      dispatch(actionCreators.searchBlur())
    }
  }
}
export default connect(mapStateToProps, mapDispathToProps) (Header)