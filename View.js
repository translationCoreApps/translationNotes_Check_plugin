/**
 * @description:
 *  This class defines the entire view for translationNotes tool
 */
import React from 'react'
import { Row, Col, Tabs, Tab, Glyphicon } from 'react-bootstrap'
import CheckInfoCard from './subcomponents/CheckInfoCard.js'
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider'
import style from './css/style'

class View extends React.Component {
  render() {
    //Modules not defined within translationNotes
    const { ScripturePane, VerseCheck, TranslationHelps } = this.props.modules;
    // set the scripturePane to empty to handle react/redux when it first renders without required data
    let {contextIdReducer} = this.props;
    let scripturePane = <div></div>
    // pupulate scripturePane so that when required data is preset that it renders as intended.
    if (this.props.modulesSettingsReducer.ScripturePane !== undefined) {
      scripturePane = <ScripturePane {...this.props} />
    }
    let groupName = contextIdReducer.contextId.groupId;
    return (
      <MuiThemeProvider>
        <Row className="show-grid" style={{ margin: '0px', bottom: "0px", height: "100%" }}>
          <Col sm={12} md={6} lg={9} style={{ height: "100%", padding: '0px' }}>
            {scripturePane}
            <CheckInfoCard phraseTitle={groupName} openHelps={this.props.toggleHelps} showHelps={this.props.showHelps} title={contextIdReducer.contextId.quote} file={contextIdReducer.contextId.information} />
            <VerseCheck
              {...this.props}
            />
          </Col>
          <Col sm={12} md={6} lg={3} style={{ height: "100%", padding: "0px" }}>
            <div style={{ height: "100vh" }}>
              <Glyphicon glyph={this.props.showHelps ? "chevron-right" : "chevron-left"}
                style={this.props.showHelps ? style.tHelpsOpen : style.tHelpsClosed}
                onClick={this.props.toggleHelps} />
              <div style={{ display: this.props.showHelps ? "block" : "none", height: "100vh" }}>
                <TranslationHelps currentFile={this.props.currentFile}
                  online={this.props.online} />
              </div>
            </div>
          </Col>
        </Row>
      </MuiThemeProvider>
    );
  }
}


module.exports = View;
