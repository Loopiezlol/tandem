import React, {Component} from 'react';
import './User.css';

class User extends Component {

    constructor(props) {
        super(props);
        this.state = {tab:"info"};
    }


    handleClick = (id) => {
      let tab = this.state.tab;


      if (id === 0) {
        this.setState({
          tab: 'info',
        });
      }else if (id === 1) {
        tab = "love";
        this.setState({
          tab: 'love',
        });
      }
    }


    render() {


        const tab = {
          backgroundColor: '#e3e6ea',
          width: '180px',
          height: '80px',
          marginBottom: '50px',
        };

        const images = ["infoIcon.png","heartIcon.png","msgIcon.png"];

        const tabs = images.map((img, index) => {
          console.log(index);
            return <div key={index} onClick={() => this.handleClick({index}.index)} style={tab}>
                <img id="tabsIcon" src={img}/>
            </div>;
        });

        function TabOption (props) {
          const tab = props.tab;
          const info = props.info;
          if (tab==="info") {
            return (
              <Info userInfo = {info}/>
            )
          }
          else if (tab === "love") {
            return (
              <Interests interests = {info.interests}/>
            )
          }
        }




        function Info (props) {
          const userInfo = props.userInfo;
          const wrapperBg = {'backgroundColor' : '#8da3c6'};
          return (
            <div className="optionWrapper" style={wrapperBg}>
              <div id = "labels">Name </div><p id = "nameValue">{userInfo.firstName} {userInfo.lastName}</p>
              <div id = "labels">Languages </div>
                <div  id="languageInfo" >
                  <span><img id = "iconsProps" src="speakIcon.png"/>{userInfo.languageNative}</span>
                  <span><img id = "iconsProps" src="studyIcon.png"/>{userInfo.languageLearn}</span>
                </div>
                <div id="labels">
                  Who am I?
                </div>
                <p id="descriptionValue">{userInfo.desc}</p>
            </div>
          )
        }


        function Interests (props) {

          const wrapperBg = {'backgroundColor' : '#af5452'};

          const hobbies = props.interests.map(
            function (hobby) {
              return (
                <div id = "hobbyProps"># {hobby} </div>
              )
          });

          return (
             <div className="optionWrapper" style = {wrapperBg}>
                {hobbies}
             </div>
          )
        }

        return (


            <div id="profileWrap">

                <div>
                    <img id="profile-pic-sm" src="samplePic.png"/>
                </div>


                <div id="infoWrap">
                  {tabs}
                </div>

                <TabOption tab={this.state.tab} info={this.props.userInfo}/>


            </div>

        );
    }
}

export default User;
