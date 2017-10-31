//@flow
import React from 'react';
import {
  Card,
  CardActions,
  CardHeader,
  CardTitle
} from 'material-ui/Card';
import FlatButton from 'material-ui/FlatButton';
class ScoreBox extends React.Component {
  render() {
    return (
      <Card style={{"marginTop":10}}>
        <a href={this.props.url}> <CardHeader
          title={this.props.name}
          subtitle={this.props.username}
          avatar={this.props.avi}
        /> </a>
        <CardTitle title={this.props.score} subtitle="Positivity Score" />
        <CardActions>
          <FlatButton label="Most positive tweet" href={this.props.mostPositive} />
          <FlatButton label="Most negative tweet" href={this.props.mostNegative} />
        </CardActions>
      </Card>
    );
  }
}
export default ScoreBox;
