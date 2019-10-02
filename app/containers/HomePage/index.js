/*
 * HomePage
 *
 * This is the first thing users see of our App, at the '/' route
 */
/*eslint-disable */
import React from 'react';
import Unsplash from 'unsplash-js';
import StackGrid from 'react-stack-grid';
import sizeMe from 'react-sizeme';
import { Button, Modal } from 'antd';
import Searchx from '../../components/Search';
import { WrapperHomepage } from './styles';
// import BottomScrollListener from 'react-bottom-scroll-listener';

const unsplash = new Unsplash({
  applicationId:
    'b63847891c51c5247e92b4687bcb4ad0224ddf8cbb3908468c4f69495756d365',
});

class HomePage extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      fromChild: '',
      searchedItem: [],
      searched: [],
      nxtPage: 18,
      page: 1,
      visible: false,
      imgModal: '',
    };
    this.handleData = this.handleData.bind(this);
  }

  handleData(data) {
    this.setState({
      fromChild: data,
    });
    this.handleSearch(data);
    // this.trackScroll();
  }

  handleSearch(data) {
    // let x = 18;
    // setInterval(() => {
    //   x = x + 18;
    // }, 10000);
    this.setState({ searchedItem: [], searched: [] });
    unsplash.search
      .photos(data, this.state.page, this.state.nxtPage)
      .then(response => response.json())
      .then(json => {
        json.results.forEach(element => {
          this.state.searched.push(element);
        });
        this.setState({
          // eslint-disable-next-line react/no-access-state-in-setstate
          searchedItem: this.state.searched,
          // eslint-disable-next-line react/no-access-state-in-setstate
          page: this.state.page + 1,
        });
        console.log(this.state.searchedItem);
      });
    //   console.log(document.documentElement.children[1].childNodes[7].clientHeight);
    // console.log(document.getElementById('app').clientHeight);
  }

  loadMoreData() {
    const { searched, page } = this.state;
    unsplash.search
      .photos(this.state.fromChild, this.state.page, this.state.nxtPage)
      .then(response => response.json())
      .then(json => {
        json.results.forEach(element => {
          this.state.searched.push(element);
        });
        this.setState({
          // eslint-disable-next-line react/no-access-state-in-setstate
          searchedItem: searched,
          page: page + 1,
        });
        console.log(this.state.searchedItem);
      });
  }

  showModal = x => {
    this.setState({
      visible: true,
      imgModal: x,
    });
  };

  handleOk = e => {
    console.log(e);
    this.setState({
      visible: false,
    });
  };

  handleCancel = e => {
    console.log(e);
    this.setState({
      visible: false,
      imgModal: '',
    });
  };

  render() {
    const {
      size: { width },
    } = this.props;
    const renderSearch = this.state.searchedItem.map((item, i) => (
      <div className="search-box" key={i.toString()}>
        <img
          src={item.urls.small}
          alt=""
          onClick={() => this.showModal(item.urls.regular)}
        />
      </div>
    ));

    const renderLoadmore =
      this.state.searchedItem.length > 0 ? (
        <Button
          onClick={() => {
            this.loadMoreData();
          }}
        >
          Load More Images
        </Button>
      ) : (
        ''
      );

    return (
      <WrapperHomepage>
        <Searchx handlerFromParent={this.handleData} />
        <h1>
          {this.state.fromChild ? `${this.state.fromChild} pictures` : ''}
        </h1>
        <StackGrid
          columnWidth={
            width <= 575 ? '100%' : '50%' && width <= 991 ? '33.33%' : '25%'
          }
          gutterWidth={20}
          gutterheight={20}
          monitorImagesLoaded
        >
          {renderSearch}
        </StackGrid>
        <div className="loadmoreimgs">{renderLoadmore}</div>

        <Modal
          centered
          title="Basic Modal"
          visible={this.state.visible}
          onOk={this.handleOk}
          onCancel={this.handleCancel}
        >
          <img src={this.state.imgModal} alt="" />
        </Modal>
      </WrapperHomepage>
    );
  }
}

export default sizeMe()(HomePage);
