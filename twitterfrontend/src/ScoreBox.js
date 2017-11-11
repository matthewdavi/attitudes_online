//@flow
import React from 'react';
import { Card, CardActions, CardHeader, CardTitle } from 'material-ui/Card';
import FlatButton from 'material-ui/FlatButton';
class ScoreBox extends React.Component {
  render() {
    return (
      <Card style={{ marginTop: 10 }}>
        <a
          onClick={() =>
            window.open(`https://twitter.com/${this.props.username}`)}
          style={{ cursor: 'pointer' }}
        >
          <CardHeader
            title={this.props.name}
            subtitle={this.props.username}
            avatar={this.props.avi}
          />
        </a>
        <CardTitle
          title={this.props.score}
          subtitle="Positivity Score"
          titleColor={this.props.scoreColor}
        />
        <CardActions>
          <FlatButton
            primary={true}
            label="Most positive tweet"
            href={this.props.mostPositive}
          />
          <FlatButton
            secondary={true}
            label="Most negative tweet"
            href={this.props.mostNegative}
          />
        </CardActions>
      </Card>
    );
  }
}
export default ScoreBox;
